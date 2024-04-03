import * as THREE           from "three";
import * as ethers          from "ethers";
import gsap                 from "gsap";
import { RootState }        from "@react-three/fiber";
import Contract             from "./Contract";
import ChestItem, { Loot }  from "./ChestItem";
import Experience           from "../Experience";
import Resources            from "../Utils/Resources";
import Materials            from "../Utils/Materials";
import Raycaster            from "../Utils/Raycaster";
import Sounds               from "../Sounds";
import PreLoader            from "../PreLoader";
import Factory              from "../Utils/Factory";
import { batchLootTx }      from "../../Lib/web3/transactions";


type Mesh =  THREE.Mesh<THREE.BufferGeometry, THREE.Material>

export default class Chest {
  // Class
  experience: Experience
  root: RootState
  raycaster: Raycaster
  factory: Factory
  scene: THREE.Scene
  resources: Resources        
  preLoader: PreLoader
  materials: Materials
  time: THREE.Clock
  sounds: Sounds
  chestSC?: Contract

  // Scene
  chestModel: any
  chestScene: THREE.Group
  chestStructure: THREE.Object3D
  lootAllButton: any                      = undefined
  lootSelectedButton: any                 = undefined
  resource: any     
  originPos: THREE.Vector3                = new THREE.Vector3()
  animation: {[key: string]: any}         = {}
  openYaxisOffset: number                 = 1.3
  selected: { [key: string]: ChestItem }  = {}
  locked: boolean                         = false
  openned: boolean                        = false

  // blockchain
  contract: ethers.Contract | undefined   = undefined
  loots: ChestItem[]                      = []
  events: string[]                        = ["Deposit", "Looted"]

  // PostProcessing
  outlineChest: any

  constructor() 
  {
    this.experience     = Experience.Instance()
    this.root           = this.experience.root
    this.raycaster      = this.experience.raycaster
    this.factory        = this.experience.factory
    this.scene          = this.experience.scene
    this.resources      = this.experience.resources
    this.preLoader      = this.experience.preLoader 
    this.materials      = this.experience.materials
    this.time           = this.experience.root.clock
    this.sounds         = this.experience.sounds

    this.chestModel     = this.resources.items.chestModel
    this.chestScene     = this.chestModel.scene
    this.chestStructure = this.chestScene.getObjectByName("Object_7")!
    this.resource       = this.resources.items.scene

    this.outlineChest   = this.experience.root["outlineChestHover"]

    this.setGLTF()
    this.setLootButton()
    this.setAnimation()
    this.setEvent()
  }

  setGLTF() 
  {
    this.chestModel.scene.position.copy(new THREE.Vector3(1.64, 0, 8.76))
    this.chestModel.scene.rotation.y = -(Math.PI * 0.25)
    this.originPos.copy(this.chestModel.scene.position)

    this.chestStructure.layers.enable(1)
    this.chestStructure.layers.disableAll()
    
    this.chestStructure.name = "chest"

    this.scene.add(this.chestModel.scene)
  }

  setLootButton()
  {
    this.lootAllButton      = this.resources.items.buttonLootAll.scene.children[0]
    this.lootSelectedButton = this.resources.items.buttonLootSelected.scene.children[0]

    this.lootAllButton!.position.copy(this.chestScene.position)
    this.lootAllButton!.children[0].material.toneMapped = false
    this.chestScene.getWorldQuaternion(this.lootAllButton!.quaternion)

    this.lootSelectedButton!.position.copy(this.chestScene.position)
    this.lootSelectedButton!.children[0].material.toneMapped = false
    this.chestScene.getWorldQuaternion(this.lootSelectedButton!.quaternion)

    this.raycaster.objectsToTest.push(this.lootAllButton, this.lootSelectedButton)
    this.scene.add(this.lootAllButton!, this.lootSelectedButton!)
  }

  setAnimation() 
  {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.chestModel.scene)
    
    this.animation.action = {}
    this.animation.action.open = this.animation.mixer.clipAction(this.chestModel.animations[0])
    this.animation.action.current = this.animation.action.open
  }

  










  /***********************************|
  |              Events               |
  |__________________________________*/


  setEvent()
  {
    // Click
    this.preLoader.on("start", () => {
  
      this.chestSC = this.experience.world.lootBoxScene!.smartContracts.chestSC
      
      this.experience.world.lootBoxScene?.smartContracts.chestSC.on("import chestSC", async (newAddress: string) => {
        
        if ( this.contract?.address ) this.contract!.removeAllListeners() 
        this.contract = this.chestSC!.interface

        for (const event of this.events) { this.contract!.on( event, (event) => {this.refreshLoots(); console.log("event: ", event)} ) }

        this.refreshLoots()
        
      })
  
    })

    
    this.raycaster.on("click_chest", () => 
    {
      let action = this.animation.action.current
      let open   = this.sounds.openChest
      let close  = this.sounds.closeChest

      // Close chest
      if (action.paused) 
      {
        action.paused = false
        close.play()
        
        setTimeout(() => action.stop(), 500)
        
        this.closeAnimation()
      }
      // Open chest
      else 
      {
        action.play()
        open.play()
        setTimeout(() => action.paused = true, 500)
      }
    })

    
    this.raycaster.on("click_button", async (obj3dName: string) => 
    {
      let buttonName      = obj3dName.split('_')[1]
      let wallet          = this.experience.world.user!.wallet
      let chestSC         = this.chestSC
      let args: any       = { items: [], tokenIds: [], amounts: []} 
      let types: number[] = []
      
      this.clickButtonAnimation(this[`${buttonName}Button`])
      
      if (buttonName === "lootAll")
      {
        const loots = await this.contract!.callStatic.look()

        args.items      = loots.items
        args.tokenIds   = loots.tokenIds
        args.amounts    = loots.amounts
        types           = loots.type_

        const tx = await batchLootTx(wallet, chestSC!.interface!, args, types, this.experience.toast)
        chestSC!.handleTxs(tx, "chestSC", "batchLoot")
      }
      else if (buttonName === "lootSelected" && Object.values(this.selected).length > 0)
      {
        for (const loot of Object.values(this.selected)) {
          args.items.push(loot.item.address)
          args.tokenIds.push(loot.item.id)
          args.amounts.push(loot.item.amount)
          types.push(loot.item.type)
        }
        
        const tx = await batchLootTx(wallet, chestSC!.interface!, args, types, this.experience.toast)
        chestSC!.handleTxs(tx, "chestSC", "batchLoot")
      }
    })


    // Hover
    this.raycaster.on("mouse_enter_chest", (obj3dName: string) => {

      this.chestStructure.layers.enable(1) // This will enable the outline effect of oering object

    })

    this.raycaster.on("mouse_leave_chest", (obj3dName: string) => {

      this.chestStructure.layers.disable(1) // This will enable the outline effect of oering object

    })

    this.raycaster.on("mouse_enter_button", (obj3dName: string) => {

      let buttonName = obj3dName.split('_')[1]

      this[`${buttonName}Button`].layers.enable(2)
      this[`${buttonName}Button`].children[0].material.emissiveIntensity = 10
      this[`${buttonName}Button`].children[0].material.emissive = new THREE.Color("#CE48E7")
      
    })
    
    this.raycaster.on("mouse_leave_button", (obj3dName: string) => {
      
      let buttonName = obj3dName.split('_')[1]
      
      this[`${buttonName}Button`].layers.disable(2)
      this[`${buttonName}Button`].children[0].material.emissiveIntensity = 0.5
      this[`${buttonName}Button`].children[0].material.emissive = new THREE.Color("#FFFFFF")

    })
  }












  /**
   * On event catch refresh the loots in the chest
   */
  async refreshLoots() 
  {
    const currentLoots: Loot[]   = this.loots.map(loot => loot.item)
    const newLoots: Loot[]       = await this.contract!.callStatic.look().then(result => this.parseLoot(result)) 
    let meshToRemove: Mesh[]     = []
    let lootsToAdd: Loot[]       = []
    

    meshToRemove = this.loots.filter(loot => {
      
      return !newLoots.map(newLoot => JSON.stringify(newLoot)).includes(JSON.stringify(loot.item))

    }).map((loot) => loot.mesh)


    lootsToAdd = newLoots.filter(newLoot => {

      return !currentLoots.map(loot => JSON.stringify(loot)).includes(JSON.stringify(newLoot))

    })

    this.removeLoots(meshToRemove)
    this.addLoots(lootsToAdd)

    this.loots = this.loots.filter(loot => !meshToRemove.map(remove => remove.uuid).includes(loot.mesh.uuid))
  }

  removeLoots(loots: Mesh[])
  {
    for (const loot of loots)
    {
      loot.geometry.dispose()
      loot.material.dispose()
      
      this.raycaster.objectsToTest.filter((elem: THREE.Mesh) => elem.name.startsWith(loot.name.split('_')[0]) )
      if (Object.keys(this.selected).includes(loot.uuid)) delete this.selected[loot.uuid]

      this.scene.remove(loot)
    }
    if ( Object.values(this.selected).length === 0 ) this.lootSelectedButton.material.color = new THREE.Color("#5E5E5E") 
  }

  addLoots(loots: Loot[]) 
  {
    for (let i = 0; i < loots.length; i++) 
    {
      this.loots.push(

        new ChestItem(this, {
          address: loots[i].address,
          id: loots[i].id,
          amount: loots[i].amount,
          type: loots[i].type,
        })

      )
    }

    // Set selction for layer 2 & disable all object3d's layer
    this.outlineChest.selection.set(this.raycaster.objectsToTest)
    this.raycaster.objectsToTest.forEach(object3D => object3D.layers.disable(2))
  }

  parseLoot(rawLoots: {items: string[], tokenIds: ethers.BigNumberish[], amounts: ethers.BigNumberish[], type_: number[]}): Loot[]
  {
    let loots: Loot[] = []

    rawLoots.items.forEach((loot, index) => {

      loots.push({
        address: rawLoots.items[index],
        id: rawLoots.tokenIds[index],
        amount: rawLoots.amounts[index],
        type: rawLoots.type_[index]
      })

    }) 

    return loots
  }









  /***********************************|
  |            Animations             |
  |__________________________________*/


  async openAnimation() 
  {
    if (this.animation.action.current.paused) 
    {
      if (this.locked === false && this.openned === false) 
      {
        this.locked = true


        let chestDirection = this.chestScene.getWorldDirection(new THREE.Vector3()) // Getting the dirrection of our chest (looking at)
        chestDirection.x = -chestDirection.x                                  // rotate this direction by 90deg

        // 1. Items animation
        /************************************************************************************************************************ */

        for(let i = 0; i < this.loots.length; i++ ) 
        {
          // Calculing final position of current item
          let finalPos = new THREE.Vector3().copy(this.originPos)                                                       // chest pos
          finalPos.add( new THREE.Vector3().addScalar(i - ( this.loots.length / 2 ) + 0.5).multiply(chestDirection) )   // X axis
          finalPos.add(new THREE.Vector3(0, Math.cos(Math.sin(-this.time.getElapsedTime())) + this.openYaxisOffset, 0)) // Y axis                                                // Y axis

          let itemPos = this.loots[i].mesh!.position
          let itemRotation = this.loots[i].mesh!.rotation

          
          gsap.to(itemPos,       { duration: 0.5, ease: "power1.out", x: finalPos.x, y: finalPos.y, z: finalPos.z })
          gsap.to(itemRotation,  { duration: 0.5, ease: "power1.out", x: itemRotation.x, y: itemRotation.y, z: itemRotation.z * Math.PI })

          await this.sleep(200)
          
          setTimeout(() => this.loots[i].out = true, 300)
        }

        /************************************************************************************************************************ */


        await this.sleep(600)


        // 2. Button animation
        /************************************************************************************************************************ */
        
        if (Object.values(this.loots).length > 0) 
        {
          let pos = new THREE.Vector3().copy(this.originPos)
          let scale = new THREE.Vector3().copy(this.lootAllButton!.scale)
          gsap.to(this.lootAllButton!.position,       { duration: 1, ease: "power1.out", x: pos.x, y: pos.y + 1, z: pos.z })
          gsap.to(this.lootAllButton!.scale,          { duration: 1, ease: "power1.out", x: scale.x + 0.1, y: scale.y + 0.1, z: scale.z + 0.1 })
          gsap.to(this.lootSelectedButton!.position,  { duration: 1, ease: "power1.out", x: pos.x, y: pos.y + 1, z: pos.z })
          gsap.to(this.lootSelectedButton!.scale,     { duration: 1, ease: "power1.out", x: scale.x + 0.1, y: scale.y + 0.1, z: scale.z + 0.1 })
          
          await this.sleep(1100)
  
          pos.copy(this.lootAllButton!.position)
          gsap.to(this.lootAllButton!.position,       { duration: 0.4, ease: "power1.out", x: pos.x + chestDirection.x, y: pos.y, z: pos.z + chestDirection.z })
          gsap.to(this.lootSelectedButton!.position,  { duration: 0.4, ease: "power1.out", x: pos.x - chestDirection.x, y: pos.y, z: pos.z - chestDirection.z })
        }
        
        /************************************************************************************************************************ */
        

        this.openned = true
        this.locked = false
      }

      // 3. Animaton once all the item has been set up hovering above the chest
      this.loots.forEach((loot: ChestItem) => loot.update())
    }
  }


  closeAnimation()
  {
    for(const loot of this.loots) {
      loot.mesh!.position.copy(this.chestScene.position)
      loot.out = false
    }
    this.lootAllButton?.position.copy(this.originPos)
    this.lootAllButton?.scale.subScalar(0.1)
    this.lootSelectedButton?.position.copy(this.originPos)
    this.lootSelectedButton?.scale.subScalar(0.1)
    
    this.openned = false
  }


  async clickButtonAnimation(button: THREE.Mesh)
  {
    let initScale = new THREE.Vector3().copy(button.scale)
    gsap.to(button.scale, { duration: 0.1, ease: "power1.out", x: button.scale.x, y: button.scale.y, z: 0.03 })

    await this.sleep(100)
    
    gsap.to(button.scale,  { duration: 0.1, ease: "power1.out", x: button.scale.x, y: button.scale.y, z: initScale.z })
  }









  /***********************************|
  |         Public functions          |
  |__________________________________*/






  /**
   * @name sleep
   * @notice Just stop the function where it is called until "ms" second is passed
   * @param ms The waiting time in milliseconds
   * @returns a Promise
   */
  sleep(ms: number): Promise<unknown> 
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  update() 
  {
    this.animation.mixer.update(0.02)
    this.openAnimation()
  }
}
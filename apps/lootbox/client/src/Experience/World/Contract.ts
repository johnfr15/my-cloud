import { ethers }     from "ethers"
import * as THREE     from "three"
import { RootState }  from "@react-three/fiber"
import LootBoxScene   from "./LootBoxScene"
import User           from "./User"
import Sounds         from "../Sounds"
import Experience     from "../Experience"
import Toast          from "../Utils/Toast"
import Resources      from "../Utils/Resources"
import Factory        from "../Utils/Factory"
import Materials      from "../Utils/Materials"
import Raycaster      from "../Utils/Raycaster"
import EventEmitter   from "../Utils/EventEmitter"

type Functions = {
  [key: string]: {
    front:              { [key: string]: any }
    contractFunctions:  { [key: string]: any }
    lib:                { [key: string]: any }
    icon:               string
  }
}

export default class Contract extends EventEmitter {
  // Classes
  experience: Experience
  toast: Toast
  scene: THREE.Scene
  raycaster: Raycaster
  factory: Factory
  root: RootState
  materials: Materials
  resources: Resources
  sounds: Sounds
  lootBoxScene?: LootBoxScene
  user?: User

  // contract
  private _address?: string
  interface?: ethers.Contract
  abi: string[] & Object[]
  deployer: ethers.ContractFactory
  pending = {}
  deployed: string[] = []
  receipt: string[] = []
  
  // mesh
  model: any
  functions: Functions = {}
  inputsScreen: any
  metaScreen: any
  network: any
  meshAddress?: THREE.Mesh
  events: {[key: string]: any} = {}










  /***********************************|
  |               INIT                |
  |__________________________________*/

  /**
   * @constructor
   * @param abi       The interface where we can interact with the functions
   * @param meshes    The Object3D mesh that hold all the contract informations
   * @param bytecode  Needed to deploy this contract
   * @param address   If contract is already deployed
   */
  constructor(abi: string[] & Object[], meshes: THREE.Mesh, bytecode: string, address?: string)
  {
    super()

    this.experience   = Experience.Instance()
    this.toast        = this.experience.toast
    this.scene        = this.experience.scene
    this.factory      = this.experience.factory
    this.raycaster    = this.experience.raycaster
    this.root         = this.experience.root
    this.materials    = this.experience.materials
    this.resources    = this.experience.resources
    this.sounds       = this.experience.sounds
    
    
    this.abi            = abi
    this.model          = meshes
    this.inputsScreen   = meshes.children.find(child => child.name.split('_').pop() === "inputsScreen")
    this.metaScreen     = meshes.children.find(child => child.name.split('_').pop() === "metaScreen")
    this.network        = meshes.children.find(child => child.name.split('_').pop() === "network")
    this.deployer       = new ethers.ContractFactory(abi, bytecode, this.user?.wallet.signer)

    if (address) 
    { 
      this.interface = new ethers.Contract(address, abi)
      this._address = address
    }

    this.parseFunctions()
    this.setEvents()
  }


  


  
  /**
   * @name setFunctions
   * @notice Extract each mesh functions of that contract and keep their default material
   */
  private parseFunctions()
  {
    for(const mesh of this.model.children)
    {
      if (mesh.name.split('_')[1] === "function" && mesh.name.split('_').length === 3)
      { 
        const name = mesh.name.split('_').pop()
        this.functions[name] = {front: {}, contractFunctions: {}, lib: {}, icon: ""}
        
        // set lib, needed while hovering in & out of function
        this.functions[name].lib.materials = { default: mesh.material                        }
        this.functions[name].lib.scales    = { default: new THREE.Vector3().copy(mesh.scale) }
      
        
        // set front
        this.functions[name].front.body = mesh
        const text                      = this.model.getObjectByName(`${mesh.name}_text`)
        text.geometry.copy(this.factory.createTextGeometry(name, {size: 0.02}))

        const multiplier = name.length > 6 ? (6 / name.length) * 1.6 : 1
        text.scale.multiply(new THREE.Vector3(multiplier, multiplier, 0.05))

        // set HTML form function of the current contract
        const contractName = mesh.name.split('_')[0]
        this.functions[name].contractFunctions = 
          this.experience.root[contractName]?.children.find((mesh: any) => mesh.name === contractName + ' ' + name )
      
      }
    }
  }






  /**
   * @name setEvents
   * @notice When user will focus on the contract "mesh" (he/she clicked on the mesh contract)
   *         this contract will listen for all the events possible when interacting with it
   */
  private setEvents() 
  {
    for(const mesh of this.model.children)
    {
      if (mesh.name.split('_')[1] === "function")
      {
        // Hovering function
        this.experience.raycaster.on( "enter" + mesh.name, () => {

          this.sounds.playFuncHover("hover2")
          mesh.scale.multiplyScalar(1.2)

        })
        // Leave hovering function
        this.experience.raycaster.on( "leave" + mesh.name, () => {

          const funcName = mesh.name.split('_').pop()

          mesh.material = this.functions[funcName].lib.materials.default
          mesh.scale.copy(this.functions[funcName].lib.scales.default)
        })

        // Clicked on functions
        this.experience.raycaster.on( "click_" + mesh.name, (event) => {
          
          const funcName = mesh.name.split('_').pop()
          
          if (funcName === "deploy" || funcName === "import") 
          {
            this.metaScreen.add(this.functions[funcName].contractFunctions)
            this.metaScreen.visible = true
          }
          else
          {
            this.inputsScreen.add(this.functions[funcName].contractFunctions)
            this.functions[funcName].contractFunctions.rotation.copy(this.inputsScreen.rotation)
            this.inputsScreen.visible = true
          }
  
        })

        // Go back to main screen
        this.experience.raycaster.on( "main", (event) => {

          this.inputsScreen.visible = false
          this.metaScreen.visible = false

        })
      
      } 
    }

    this.raycaster.on("mouse_enter_" + this.model.name, () => {
      this.model.layers.enable(1)
    })

    this.raycaster.on("mouse_leave_" + this.model.name, () => {
      this.model.layers.disable(1)
    })


  }









  
  /***********************************|
  |             Public                |
  |__________________________________*/
  
  async handleTxs(tx: any, contractName: string, funcName: string)
  {
    let wallet = this.experience.world.user!.wallet
    window.setTimeout(() => this.toast.txSent({wallet, contractName, funcName, tx}), 100)

    this._txPending()
    this.pending[tx.hash] = tx
    
    try {

      const receipt = await tx.wait()
      this._txSuccess()
      this.toast.txValided({ wallet: wallet, contractName, funcName, tx })
      this.receipt.push(tx)
      delete this.pending[tx.hash]
      console.log(receipt)

    } catch (error: any) {

      this._txFailed()
      this.toast.txFailed({ wallet, contractName, funcName, tx, error })
      delete this.pending[tx.hash]
      return

    }
  }

  async handleDeployment(tx: any, contractName: string, funcName: string): Promise<any>
  {
    let wallet = this.experience.world.user!.wallet
    window.setTimeout(() => this.toast.txSent({wallet, contractName, funcName, tx}), 100)

    this._txPending()
    this.pending[tx.deployTransaction.hash] = tx

    try {

      await tx.deployed()
      this.toast.deploy({ wallet, contractName, funcName, tx })

    } catch (error) {

      this._txFailed()
      this.toast.txFailed({ wallet, contractName, funcName, tx, error })
      delete this.pending[tx.deployTransaction.hash]
      return 

    }

    this.deployed.push(tx.address)
    this.receipt.push(tx)
    delete this.pending[tx.deployTransaction.hash]

    this.attachAddress(tx.address)
    this._txSuccess()
  }

  public attachAddress(contractAddress: string): void
  {
    this.interface = new ethers.Contract(contractAddress, this.abi, this.experience.world.user?.wallet.signer)
    this._address = contractAddress

    this.network.material = this.materials.items.ethConnected
    this.network.children[0].intensity = 2
    this.network.children[0].distance = 5
    this.network.children[0].color.copy(this.materials.items.ethConnected.color)
  }


  getAddress(): string | undefined
  {
    return this._address
  }

  update() {
    if (this._address) this.network.rotation.z += 0.025
  }

  _txSuccess(): void
  {
    this.network.material = this.materials.items.txValided
    this.network.children[0].color.copy(this.materials.items.txValided.color)
    setTimeout(() => {
      this.network.material = this.materials.items.ethConnected
      this.network.children[0].color.copy(this.materials.items.ethConnected.color)
    }, 10000)
  }

  _txPending(): void
  {
    this.network.material = this.materials.items.txPending
    this.network.children[0].color.copy(this.materials.items.txPending.color)
  }
  _txFailed(): void
  {
    this.network.material = this.materials.items.txFailed
    this.network.children[0].color.copy(this.materials.items.txFailed.color)
  }
}
import * as THREE from "three";
import Experience from "../Experience";
import Resources from "../Utils/Resources";
import Materials from "../Utils/Materials";
import { ethers, BigNumberish, } from "ethers";
import Chest from "./Chest";
import Factory from "../Utils/Factory"
import Raycaster from "../Utils/Raycaster";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { MeshStandardMaterial } from "three";

export type Loot = {
  address: string
  id: BigNumberish
  amount: BigNumberish
  type: number
}

const interfaceType = {
  "1": "erc20",
  "2": "erc721",
  "3": "erc1155",
}

export default class ChestItem {
  // Class
  experience: Experience
  factory: Factory
  raycaster: Raycaster
  chest: Chest
  time: THREE.Clock
  item: Loot
  scene: THREE.Scene

  indexId: string
  out: boolean = false
  locked: boolean = false
  resources: Resources
  materials: Materials
  contract: ethers.Contract
  mesh: THREE.Mesh<TextGeometry, MeshStandardMaterial> = new THREE.Mesh()

  // PostProcessing
  outlineChest: any

  constructor(chest: Chest, item: Loot) {
    this.experience = Experience.Instance()
    this.factory = this.experience.factory
    this.raycaster = this.experience.raycaster
    this.chest = chest
    this.time = this.experience.root.clock
    this.item = item
    this.resources = this.experience.resources
    this.materials = this.experience.materials
    this.scene = this.experience.scene

    let abi = this.resources.items[`${interfaceType[item.type]}Abi`].abi
    this.contract = new ethers.Contract(item.address, abi, this.experience.world.user?.wallet.signer)
    this.indexId = ethers.utils.hashMessage(JSON.stringify(item))

    this.outlineChest  = this.experience.root["outlineChestHover"]

    this.setMesh(item)
    this.setEvents()
  }

  setMesh(item: Loot)
  {
    switch(item.type) 
    {
      case 1:
        this.mesh = this.factory.createErc20Mesh(item.address)

        this.mesh.position.copy(this.chest.originPos)
        this.mesh.name = `chestItem${this.indexId}_erc20`
        this.mesh.children.forEach(item => item.name = item.name.replace("chestItem", `chestItem${this.indexId}`))
        break
        
      case 2:
        this.mesh = this.factory.createErc721Mesh(item.address, item.id.toString())

        this.mesh.position.copy(this.chest.originPos)
        this.mesh.name = `chestItem${this.indexId}_erc721`
        this.mesh.children.forEach(item => item.name = item.name.replace("chestItem", `chestItem${this.indexId}`))
      break
        
      case 3:
        this.mesh = this.factory.createErc1155Mesh(item.address, item.id.toString())

        this.mesh.position.copy(this.chest.originPos)
        this.mesh.name = `chestItem${this.indexId}_erc1155`
        this.mesh.children.forEach(item => item.name = item.name.replace("chestItem", `chestItem${this.indexId}`))
      break

      default:
        console.error("Error with the type of item");
        return
    }

    this.raycaster.objectsToTest.push(this.mesh)
    this.mesh.children.forEach(item => this.raycaster.objectsToTest.push(item))

    this.scene.add(this.mesh)
  }

  setEvents() {

    this.raycaster.on(`mouse_enter_chestItem${this.indexId}`, (obj3dName: string) => {

      if (this.locked === false) 
      {
        this.mesh!.layers.enable(2)
        this.mesh!.material.emissiveIntensity = 5
        this.mesh!.material.emissive = new THREE.Color("#FF773D")
      }
      
    })
    
    this.raycaster.on(`mouse_leave_chestItem${this.indexId}`, (obj3dName: string) => {
      
      if (this.locked === false)
      {
        this.mesh!.layers.disable(2)
        this.mesh!.material.emissiveIntensity = 0
        this.mesh!.material.emissive = new THREE.Color("#61FCFF")
      }
      
    })

    this.raycaster.on(`select_chestItem${this.indexId}`, (args: string) => {

      if (this.chest.selected[this.mesh.uuid])
      {
        this.mesh!.material.emissiveIntensity = 0
        delete this.chest.selected[this.mesh.uuid]
        if ( Object.values(this.chest.selected).length === 0 ) this.chest.lootSelectedButton.material.color = new THREE.Color("#5E5E5E") 
        this.locked = false
      }
      else
      {
        this.chest.selected[this.mesh.uuid] = this
        this.chest.lootSelectedButton.material.color = new THREE.Color("#197DE7")
        this.mesh!.material.emissiveIntensity = 2
        this.mesh!.material.emissive = new THREE.Color("#61FCFF")
        this.locked = true
      }

    })
  }

  update() {
    if (this.out) {
      this.mesh!.position.y = Math.cos(Math.sin(-this.chest.time.getElapsedTime())) + this.chest.openYaxisOffset
      this.mesh!.rotation.y = this.chest.time.getElapsedTime()
    }
  }
}
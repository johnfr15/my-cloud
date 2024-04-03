import * as THREE from "three";
import { MeshStandardMaterial } from "three";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import Experience from "../Experience";
import Resources from "./Resources";

export default class Factory {
  experience: Experience
  resources: Resources
  erc20?: any
  erc721?: any
  erc1155?: any
  button?: any

  constructor() 
  {
    this.experience = Experience.Instance()
    this.resources = this.experience.resources
  
    this.resources.on("ready", () => {
      this.erc20 = this.resources.items.erc20Model
      this.erc721 = this.resources.items.erc721Model
      this.erc1155 = this.resources.items.erc1155Model
      this.button = this.resources.items.buttonModel
    })

  }

  public createTextMesh(text: string, color: string = "white", obj?: any): THREE.Mesh<THREE.BufferGeometry, THREE.Material>
  {
    const textGeometry = new TextGeometry(
      text.split('').join(' '), 
      {
        font: this.resources.items.aovel, 
        size: obj?.size || 0.5,
        height: obj?.height || 0.2,
        curveSegments: obj?.curveSegments || 12,
        bevelEnabled: obj?.bevelEnabled || true,
        bevelThickness: obj?.bevelThickness || 0.03,
        bevelSize: obj?.bevelSize || 0.02,
        bevelOffset: obj?.bevelOffset || 0,
        bevelSegments: obj?.bevelSegments || 5
      }
    )
    textGeometry.center()
    const textMaterial = new THREE.MeshMatcapMaterial({ color: color })
    // textMaterial.wireframe = true
    const mesh = new THREE.Mesh(textGeometry, textMaterial)
    mesh.castShadow = true
    mesh.name = text
    return mesh
  }

  public createTextGeometry(text: string, obj?: any)
  {
    const textGeometry = new TextGeometry(
      text.split('').join(' '), 
      {
        font: this.resources.items.aovel, 
        size: obj?.size || 0.5,
        height: obj?.height || 0.2,
        curveSegments: obj?.curveSegments || 12,
        bevelEnabled: obj?.bevelEnabled || true,
        bevelThickness: obj?.bevelThickness || 0,
        bevelSize: obj?.bevelSize || 0,
        bevelOffset: obj?.bevelOffset || 0,
        bevelSegments: obj?.bevelSegments || 5
      }
    )
    textGeometry.center()
    
    return textGeometry
  }

  public createErc20Mesh(address: string, name: string = "erc20"): THREE.Mesh<TextGeometry, MeshStandardMaterial>
  {
    const token = this.erc20.scene.clone()
    token.name = address

    const nameGeometry = this.createTextGeometry(name, { size: 0.5 })

    token.getObjectByName("chestItem_erc20_nameF").geometry.copy(nameGeometry)
    token.getObjectByName("chestItem_erc20_nameB").geometry.copy(nameGeometry)

    token.children[0].material = new THREE.MeshStandardMaterial().copy(token.children[0].material)
    token.children[0].material.toneMapped = false

    return token.children[0]
  }

  public createErc721Mesh(address: string, id: string, name: string = "erc721"): THREE.Mesh<TextGeometry, MeshStandardMaterial>
  {
    const token = this.erc721.scene.clone()
    
    const nameGeometry = this.createTextGeometry(name, { size: 0.05, height: 0.02 })
    const idGeometry = this.createTextGeometry(id, { size: 0.05, height: 0.02 })

    token.getObjectByName("chestItem_erc721_name").geometry.dispose()
    token.getObjectByName("chestItem_erc721_id").geometry.dispose()

    token.getObjectByName("chestItem_erc721_name").geometry = nameGeometry
    token.getObjectByName("chestItem_erc721_id").geometry = idGeometry

    token.children[0].material = new THREE.MeshStandardMaterial().copy(token.children[0].material)
    token.children[0].material.toneMapped = false

    return token.children[0]
  }

  public createErc1155Mesh(address: string, id: string, name: string = "erc1155"): THREE.Mesh<TextGeometry, MeshStandardMaterial>
  {
    const token = this.erc1155.scene.clone()
    
    const nameGeometry = this.createTextGeometry(name, { size: 0.05, height: 0.02 })
    const idGeometry = this.createTextGeometry(id, { size: 0.05, height: 0.02 })

    token.getObjectByName("chestItem_erc1155_name").geometry.dispose()
    token.getObjectByName("chestItem_erc1155_id").geometry.dispose()

    token.getObjectByName("chestItem_erc1155_name").geometry = nameGeometry
    token.getObjectByName("chestItem_erc1155_id").geometry = idGeometry

    token.children[0].material = new THREE.MeshStandardMaterial().copy(token.children[0].material)
    token.children[0].material.toneMapped = false

    return token.children[0]
  }

}
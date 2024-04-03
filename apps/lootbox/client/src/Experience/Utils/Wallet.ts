import * as THREE from "three";
import * as web3D from "../../Lib/web3";
import Experience from "../Experience";
import Factory from "./Factory";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import Resources from "./Resources";
import User from "../World/User";

declare global {
  interface Window { ethereum: any }
}

export default class Wallet {
  experience: Experience
  user: User
  scene: THREE.Scene
  resources: Resources
  factory: Factory
  
  ethereum?: any
  provider?: Web3Provider
  signer?: any
  isConnected = false
  network = ''
  mesh: { [key: string]: THREE.Mesh<THREE.BufferGeometry, THREE.Material> } = {}

  constructor(user: User) {
    this.experience = Experience.Instance()
    this.user = user
    this.scene = this.experience.scene
    this.resources = this.experience.resources;
    this.factory = this.experience.factory

    this.ethereum = window.ethereum
    this.provider = window.ethereum && new ethers.providers.Web3Provider(window.ethereum);

    this.setConnect()

  }

  private setConnect(): void
  {
    this.mesh["connect"] = this.factory.createTextMesh("connect", "#5f2300")
    this.mesh["connected"] = this.factory.createTextMesh("connected", "green")

    this.mesh["connect"].position.set(3, 2, 0)
    this.mesh["connected"].position.set(3, 2, 0)
    this.mesh["connect"].rotation.y = -Math.PI * 0.15
    this.mesh["connected"].rotation.y = -Math.PI * 0.15

    this.scene.add(this.mesh["connect"])
  }

  public async connect(): Promise<boolean> 
  {
    try 
    {
      // Get signer
      this.ethereum = window.ethereum
      window.ethereum.on('chainChanged', (chainId: number) => window.location.reload());
      await this.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("selected address: ", this.ethereum.selectedAddress)
      this.provider = new ethers.providers.Web3Provider(this.ethereum);
      this.signer = await this.provider.getSigner()
      this.isConnected = true
      
      // Set up network
      this.network = web3D.constants.NETWORKS[this.ethereum.networkVersion] // get the name of network
      if (this.mesh[this.network] === undefined)
      {
        this.mesh[this.network] = this.factory.createTextMesh(this.network, "purple")
      }
      this.mesh[this.network].scale.set(0.5, 0.5, 0.5)
      this.mesh[this.network].position.copy(this.mesh["connect"].position)
      this.mesh[this.network].rotation.copy(this.mesh["connect"].rotation)
      this.mesh[this.network].position.y -= 0.5
      console.log("network: ", this.network)
      
      // Switch meshes
      this.scene.remove(this.mesh.connect)
      this.scene.add(this.mesh[this.network])
      this.scene.add(this.mesh.connected)
      return true
    }
    catch (error: any) { console.error(error.message); return ( false ) }
  }

  public disconnect(): void 
  {
    this.isConnected = false
    this.scene.remove(this.mesh.connected)
    this.scene.remove(this.mesh[this.network])
    this.scene.add(this.mesh.connect)
  }

  public update(): void {}
}
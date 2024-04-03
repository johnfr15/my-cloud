import * as THREE from "three";
import Experience from "../Experience";
import Resources from "../Utils/Resources";
import EnvironmentDebug from "../Debug/EnvironmentDebug";

export default class Environment {
  // Class
  experience: Experience
  scene: THREE.Scene
  resources: Resources
  debug?: EnvironmentDebug

  // environment
  ambientLights: {[key: string]: THREE.AmbientLight | any} = {}
  pointLights: {[key: string]: THREE.PointLight | any} = {}
  pointLightsHelper: {[key: string]: THREE.PointLight | any} = {}
  directionalLights: {[key: string]: THREE.DirectionalLight | any} = {}
  directionalLightsHelper: {[key: string]: THREE.DirectionalLight | any} = {}
  spotLights: {[key: string]: THREE.DirectionalLight | any} = {}
  spotLightsHelper: {[key: string]: THREE.DirectionalLight | any} = {}
  environmentMap: { [key: string]: any } = {}

  constructor() 
  {
    this.experience = Experience.Instance()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // this.setLights()
    // this.setEnvironmentMap()
    this.setDebug()
  }

  private setLights(): void
  {
    this.ambientLights["ambientLight"] = new THREE.AmbientLight('#ffffff', 0.1)
    this.pointLights["pointLight"] = new THREE.PointLight("#ffffff", 0.5)
    this.pointLights["pointLight"].castShadow = true
    this.pointLights["pointLight"].position.y = 10
    this.scene.add(this.ambientLights["ambientLight"], this.pointLights["pointLight"])
  }

  private setEnvironmentMap(): void
  {
    this.environmentMap.intensity = 0.4 
    this.environmentMap.texture = this.resources.items.environmentMapTexture
    this.environmentMap.texture.encoding = THREE.sRGBEncoding
    
    this.scene.environment = this.environmentMap.texture

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.material.needsUpdate = true
        }
      })
    }

    this.environmentMap.updateMaterial()
  }

  private setDebug()
  {
    if (this.experience.debug.active)
    {
      this.debug = new EnvironmentDebug(this)
    }
  }

}
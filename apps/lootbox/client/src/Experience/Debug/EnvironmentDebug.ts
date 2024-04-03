import * as THREE from "three"
import GUI from "lil-gui";
import Experience from "../Experience";
import Debug from "../Utils/Debug";
import Environment from "../World/Environment";
import Camera from "../Camera";

export default class EnvironmentDebug {
  experience: Experience
  scene: THREE.Scene
  camera: Camera
  debug: Debug
  environment: Environment

  lightGroup: THREE.Group

  // Debug
  debugFolder: GUI | undefined
  debugFolders: { [key: string]: GUI} = {}
  debugFunc: { [key: string]: any} = {}


  /***********************************|
  |          Initialization           |
  |__________________________________*/

  constructor(environment: Environment) {
    this.experience = Experience.Instance()
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.debug = this.experience.debug
    this.environment = environment
    this.lightGroup = new THREE.Group()

    this.scene.add(this.lightGroup)

    if (this.debug.active)
    {
      this.debugFolder = this.debug.ui!.addFolder("Environment")
      this.debugFolder.add(this, "createPointLight")
      // this.debugFolder.add(this, "createDirectionalLight")
      // this.debugFolder.add(this, "createSpotLight")

      // Ambient light
      this.debugFolders["ambientDebugFolder"] = this.debugFolder.addFolder("ambient light")
      this.debugFolders["ambientDebugFolder"].addColor(this.environment.ambientLights["ambientLight"], "color")
      this.debugFolders["ambientDebugFolder"].add(this.environment.ambientLights["ambientLight"], "intensity").min(0).max(1).step(0.001)
      
      // Sun light
      this.debugFolders["pointDebugFolder"] = this.debugFolder.addFolder("point light")
      this.debugFolders["pointDebugFolder"].addColor(this.environment.pointLights["pointLight"], "color")
      this.debugFolders["pointDebugFolder"].add(this.environment.pointLights["pointLight"], "intensity").min(0).max(1000).step(0.001)
      this.debugFolders["pointDebugFolder"].add(this.environment.pointLights["pointLight"].position, "x").min(-500).max(500).step(0.1).name("position x")
      this.debugFolders["pointDebugFolder"].add(this.environment.pointLights["pointLight"].position, "y").min(-500).max(500).step(0.1).name("position y")
      this.debugFolders["pointDebugFolder"].add(this.environment.pointLights["pointLight"].position, "z").min(-500).max(500).step(0.1).name("position z")
      this.debugFolders["pointDebugFolder"].add(this.environment.pointLights["pointLight"].rotation, "x").min(-3.14).max(3.14).step(0.1).name("rotation x")
      this.debugFolders["pointDebugFolder"].add(this.environment.pointLights["pointLight"].rotation, "y").min(-3.14).max(3.14).step(0.1).name("rotation y")
      this.debugFolders["pointDebugFolder"].add(this.environment.pointLights["pointLight"].rotation, "z").min(-3.14).max(3.14).step(0.1).name("rotation z")
    }
  }

  /***********************************|
  |            Point light            |
  |__________________________________*/

  createPointLight() 
  {
    const length = Object.entries(this.environment.pointLights).length
    
    // create mesh
    this.environment.pointLights[`pointLight ${length}`] = new THREE.PointLight("#ffffff", 0.3)
    this.lightGroup.add(this.environment.pointLights[`pointLight ${length}`])
    
    // create debug folder
    const params = {
      removePointLight: () => this.removePointLight(length),
      helper: false
    }

    this.debugFolders["pointDebugFolder"] = this.debugFolder!.addFolder(`point light ${length}`)
    this.debugFolders["pointDebugFolder"].add(params, "removePointLight")
    this.debugFolders["pointDebugFolder"].add(params, "helper").onChange((value: boolean) => this.togglePointLightHelper(length, value))
    this.debugFolders["pointDebugFolder"].addColor(this.environment.pointLights[`pointLight ${length}`], "color")
    this.debugFolders["pointDebugFolder"].add(this.environment.pointLights[`pointLight ${length}`], "intensity").min(0).max(1000).step(0.1)
    this.debugFolders["pointDebugFolder"].add(this.environment.pointLights[`pointLight ${length}`].position, "x").min(-500).max(500).step(0.1).name("position x")
    this.debugFolders["pointDebugFolder"].add(this.environment.pointLights[`pointLight ${length}`].position, "y").min(-500).max(500).step(0.1).name("position y")
    this.debugFolders["pointDebugFolder"].add(this.environment.pointLights[`pointLight ${length}`].position, "z").min(-500).max(500).step(0.1).name("position z")
    this.debugFolders["pointDebugFolder"].add(this.environment.pointLights[`pointLight ${length}`].rotation, "x").min(-3.14).max(3.14).step(0.1).name("rotation x")
    this.debugFolders["pointDebugFolder"].add(this.environment.pointLights[`pointLight ${length}`].rotation, "y").min(-3.14).max(3.14).step(0.1).name("rotation y")
    this.debugFolders["pointDebugFolder"].add(this.environment.pointLights[`pointLight ${length}`].rotation, "z").min(-3.14).max(3.14).step(0.1).name("rotation z")
  }

  removePointLight(key: number)
  {
    this.environment.pointLights[`pointLight ${key}`].dispose()
    this.scene.remove(this.environment.pointLights[`pointLight ${key}`])

    this.debugFolders["pointDebugFolder"].destroy()
  }

  togglePointLightHelper(key:number, value: boolean)
  {
    if (value)
    {
      const sphereSize = 1;
      const pointLightHelper = new THREE.PointLightHelper( this.environment.pointLights[`pointLight ${key}`], sphereSize );
      this.scene.add(pointLightHelper)

      this.environment.pointLightsHelper[`pointLightHelper ${key}`] = pointLightHelper
    } 
    else
    {
      let helper = this.environment.pointLightsHelper[`pointLightHelper ${key}`]
      helper.dispose()
      this.scene.remove(helper)
    }
  }

  /***********************************|
  |        Directional light          |
  |__________________________________*/
  /*
  createDirectionalLight() 
  {
    const length = Object.entries(this.environment.directionalLights).length
    
    // create mesh
    this.environment.directionalLights[`directionalLight ${length}`] = new THREE.DirectionalLight("#ffffff", 0.3)
    this.lightGroup.add((this.environment.directionalLights[`directionalLight ${length}`]))
    
    // create debug folder
    const params = {
      removePointLight: () => this.removeDirectionalLight(length),
      helper: false
    }

    this.debugFolders["directionalDebugFolder"] = this.debugFolder!.addFolder(`directional light ${length}`)
    this.debugFolders["directionalDebugFolder"].add(params, "removePointLight")
    this.debugFolders["directionalDebugFolder"].add(params, "helper").onChange((value: boolean) => this.toggleDirectionalLightHelper(length, value))
    this.debugFolders["directionalDebugFolder"].addColor(this.environment.directionalLights[`directionalLight ${length}`], "color")
    this.debugFolders["directionalDebugFolder"].add(this.environment.directionalLights[`directionalLight ${length}`], "castShadow")
    this.debugFolders["directionalDebugFolder"].add(this.environment.directionalLights[`directionalLight ${length}`], "intensity").min(0).max(1000).step(0.1)
    this.debugFolders["directionalDebugFolder"].add(this.environment.directionalLights[`directionalLight ${length}`].position, "x").min(-500).max(500).step(0.1).name("position x")
    this.debugFolders["directionalDebugFolder"].add(this.environment.directionalLights[`directionalLight ${length}`].position, "y").min(-500).max(500).step(0.1).name("position y")
    this.debugFolders["directionalDebugFolder"].add(this.environment.directionalLights[`directionalLight ${length}`].position, "z").min(-500).max(500).step(0.1).name("position z")
    this.debugFolders["directionalDebugFolder"].add(this.environment.directionalLights[`directionalLight ${length}`].rotation, "x").min(-3.14).max(3.14).step(0.1).name("rotation x")
    this.debugFolders["directionalDebugFolder"].add(this.environment.directionalLights[`directionalLight ${length}`].rotation, "y").min(-3.14).max(3.14).step(0.1).name("rotation y")
    this.debugFolders["directionalDebugFolder"].add(this.environment.directionalLights[`directionalLight ${length}`].rotation, "z").min(-3.14).max(3.14).step(0.1).name("rotation z")
  }

  removeDirectionalLight(key: number)
  {
    this.environment.directionalLights[`directionalLight ${key}`].dispose()
    this.scene.remove(this.environment.directionalLights[`directionalLight ${key}`])

    this.debugFolders["directionalDebugFolder"].destroy()
  }

  toggleDirectionalLightHelper(key:number, value: boolean)
  {
    if (value)
    {
      const sphereSize = 1;
      const directionalLightHelper = new THREE.DirectionalLightHelper( this.environment.directionalLights[`directionalLight ${key}`], sphereSize );
      this.scene.add(directionalLightHelper)

      this.environment.directionalLightsHelper[`directionalLightHelper ${key}`] = directionalLightHelper
    } 
    else
    {
      let helper = this.environment.directionalLightsHelper[`directionalLightHelper ${key}`]
      helper.dispose()
      this.scene.remove(helper)
    }
  }
  */

  /***********************************|
  |            Spot light             |
  |__________________________________*/
  /*
  createSpotLight() 
  {
    const length = Object.entries(this.environment.spotLights).length
    
    // create mesh
    this.environment.spotLights[`spotLight ${length}`] = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
    this.lightGroup.add(this.environment.spotLights[`spotLight ${length}`])
    
    // create debug folder
    const params = {
      removePointLight: () => this.removePointLight(length),
      helper: false
    }

    this.debugFolders["spotDebugFolder"] = this.debugFolder!.addFolder(`spot light ${length}`)
    this.debugFolders["spotDebugFolder"].add(params, "removePointLight")
    this.debugFolders["spotDebugFolder"].add(params, "helper").onChange((value: boolean) => this.toggleSpotLightHelper(length, value))
    this.debugFolders["spotDebugFolder"].addColor(this.environment.spotLights[`spotLight ${length}`], "color")
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`], "intensity").min(0).max(1000).step(0.1)
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`], "penumbra").min(0).max(100).step(0.1)
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`], "decay").min(0).max(100).step(0.1)
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`].position, "x").min(-500).max(500).step(0.1).name("position x").onChange(() => this.environment.spotLights[`spotLight ${length}`].target.position.copy(this.environment.spotLights[`spotLight ${length}`].position))
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`].position, "y").min(-500).max(500).step(0.1).name("position y")
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`].position, "z").min(-500).max(500).step(0.1).name("position z")
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`].rotation, "x").min(-3.14).max(3.14).step(0.1).name("rotation x")
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`].rotation, "y").min(-3.14).max(3.14).step(0.1).name("rotation y")
    this.debugFolders["spotDebugFolder"].add(this.environment.spotLights[`spotLight ${length}`].rotation, "z").min(-3.14).max(3.14).step(0.1).name("rotation z").onChange(() => this.environment.spotLights[`spotLight ${length}`].target.rotation.copy(this.environment.spotLights[`spotLight ${length}`].rotation))
  }

  removeSpotLight(key: number)
  {
    this.environment.spotLights[`spotLight ${key}`].dispose()
    this.scene.remove(this.environment.spotLights[`spotLight ${key}`])

    this.debugFolders["spotDebugFolder"].destroy()
  }

  toggleSpotLightHelper(key:number, value: boolean)
  {
    if (value)
    {
      const spotLightHelper = new THREE.SpotLightHelper( this.environment.spotLights[`spotLight ${key}`]);
      this.scene.add(spotLightHelper)

      this.environment.spotLightsHelper[`pointLightHelper ${key}`] = spotLightHelper
      window.requestAnimationFrame(() => spotLightHelper.update())
    } 
    else
    {
      let helper = this.environment.pointLightsHelper[`pointLightHelper ${key}`]
      helper.dispose()
      this.scene.remove(helper)
    }
  }

  update()
  {
    this.lightGroup.updateMatrix()
  }
  */
}
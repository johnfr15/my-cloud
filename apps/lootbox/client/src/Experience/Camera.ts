import * as THREE         from "three";
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls.js';
import gsap               from "gsap";
import Experience         from './Experience';
import Debug              from './Utils/Debug';
import GUI                from 'lil-gui';
import User               from "./World/User";
import Controller         from "./Controller";
import { Vector3 }        from "three";

export default class Camera {

  /***********************************|
  |         State variables           |
  |__________________________________*/

  // Classes
  experience: Experience
  debug: Debug
  time: THREE.Clock
  scene: THREE.Scene
  user?: User
  controller: Controller

  // States of Camera
  instance: THREE.PerspectiveCamera | any
  controls: OrbitControls | any
  camAngle: { [key: string]: () => void } = {}
  transitions: { [key: string]: (duration: number, ...args) => void } = {}
  pointing: boolean     = false
  _currentPosition      = new THREE.Vector3(0, 5, -9)
  _currentLookat        = new THREE.Vector3(0, 0, 20)
  cameraToggle: Object  = { unlockCamera: false }
  cam: boolean          = false

  // Debug
  debugFolder: GUI | any
  positionDebugFolder: GUI | any
  targetDebugFolder: GUI | any

  
  
  
  
  /***********************************|
   |          Initialization           |
   |__________________________________*/
   //##############################################################################
   
   constructor(controls: OrbitControls, camera: any) {
     this.experience = Experience.Instance()
     this.debug = this.experience.debug
     this.time = this.experience.root.clock
     this.scene = this.experience.scene 
     this.controller = this.experience.controller
     this.instance = camera
     this.controls = controls
     
    this.setCamAngles()
    this.setTransitions()
    this.setDebug()
    
    this.camAngle.default()
    
    window.addEventListener("pointerdown", (event) => this.pointing = true)
    window.addEventListener("pointerup", (event) => this.pointing = false)
  }
  




  /***********************************|
  |      Camera & Orbit control       |
  |__________________________________*/






  /***********************************|
  |          Camera angles            |
  |__________________________________*/
  
  /**
   * @notice Manage how the user can turn around with his camera when focusing on object
   *         after a transition.
   */
  setCamAngles(): void
  {
    this.camAngle.unlocked = () =>
    {
      this.controls.maxDistance = 100
      this.controls.minDistance = 0
      this.controls.minAzimuthAngle = 0
      this.controls.maxAzimuthAngle = Math.PI * 1.999
      this.controls.minPolarAngle = 0
      this.controls.maxPolarAngle = Math.PI
      this.cam = true
    }
    
    this.camAngle.default = () =>
    {
      this.controls.minDistance = 7
      this.controls.maxDistance = 100
      this.controls.minAzimuthAngle = 0 
      this.controls.maxAzimuthAngle = Math.PI * 1.9999
      this.controls.minPolarAngle = Math.PI * 0.2
      this.controls.maxPolarAngle = Math.PI * 0.55
      this.cam = false
    }
    
    this.camAngle.smartContract = () =>
    {
      this.controls.minDistance = 3
      this.controls.maxDistance = 6
      this.controls.minAzimuthAngle = -(Math.PI * 0.1) //left
      this.controls.maxAzimuthAngle = Math.PI * 0.1 //right
      this.controls.minPolarAngle = Math.PI * .4
      this.controls.maxPolarAngle = Math.PI * .53
    }

    this.camAngle.transition = () =>
    {
      this.controls.maxDistance = 30
      this.controls.minDistance = 0
      this.controls.minAzimuthAngle = 0
      this.controls.maxAzimuthAngle = Math.PI * 1.999
      this.controls.minPolarAngle = 0
      this.controls.maxPolarAngle = Math.PI
      this.cam = true
      this.controls.enableZoom = false
    }
  }





  /***********************************|
  |            Transitions            |
  |__________________________________*/
  
  /**
   * @notice Here is the transitions applied to the camera when user is focusing 
   *         on a specific object when clicked on it
   */

  setTransitions(): void 
  {
    /**
     * Default
     */
    this.transitions.default = async (duration) =>
    {
      this.controls.enableRotate = false
      this.controls.enableZoom = false

      this._currentPosition = this._CalculateIdealOffset()
      this._currentLookat = this._CalculateIdealLookat()

      this.instance.position.copy(this._currentPosition);
      this.controls.target = this._currentLookat

      this.controls.enableRotate = true
      this.controls.enableZoom = true
    }

    /**
     * Chest contract
    */
    this.transitions.chestContract = async (duration) =>
    {

      this.controls.enableRotate = false
      this.controls.enableZoom = false

      let tmp = new THREE.Vector3()
      tmp.copy(this.controls.target)
      this.controls.target = tmp

      gsap.to(this.instance.position, { duration: duration, ease: "power1.out", x: -2.9, y: 1, z: 11.74 })

      gsap.to( this.controls.target, { duration: duration, ease: "power1.out", x: -1.56, y: 0.82, z: 12.82 })
      

      await this.sleep(duration)
      this.controls.enableRotate = true
      this.controls.enableZoom = true
    }
    
    /**
     * Erc20 contract
     */
    this.transitions.erc20Contract = async (duration) =>
    {
      this.controls.enableRotate = false
      this.controls.enableZoom = false
  
      let tmp = new THREE.Vector3()
      tmp.copy(this.controls.target)
      this.controls.target = tmp
  
      gsap.to(this.instance.position, { duration: duration, ease: "power1.out", x: -23.2, y: 1, z: -13.35 })
  
      gsap.to( this.controls.target, { duration: duration, ease: "power1.out", x: -25.97, y: 0.86, z: -13.38 })
      
  
      await this.sleep(duration * 1000)
      this.controls.enableRotate = true
      this.controls.enableZoom = true
    }

    /**
     * Erc721 contract
     */
    this.transitions.erc721Contract = async (duration) =>
    {
      this.controls.enableRotate = false
      this.controls.enableZoom = false
  
      let tmp = new THREE.Vector3()
      tmp.copy(this.controls.target)
      this.controls.target = tmp
  
      gsap.to(this.instance.position, { duration: duration, ease: "power1.out", x: -21.4, y: 1, z: -15.47 })
  
      gsap.to( this.controls.target, { duration: duration, ease: "power1.out", x: -21.36, y: 0.86, z: -17.69 })
  
      await this.sleep(duration * 1000)
      this.controls.enableRotate = true
      this.controls.enableZoom = true
    }

    /**
     * Erc1155 contract
     */
    this.transitions.erc1155Contract = async (duration) =>
    {
      this.controls.enableRotate = false
      this.controls.enableZoom = false
  
      let tmp = new THREE.Vector3()
      tmp.copy(this.controls.target)
      this.controls.target = tmp
  
      gsap.to(this.instance.position, { duration: duration, ease: "power1.out", x: -18.5, y: 1, z: -13.5 })
  
      gsap.to( this.controls.target, { duration: duration, ease: "power1.out", x: -16.09, y: 0.86, z: -13.55 })
      
      await this.sleep(duration * 1000)

      this.controls.enableRotate = true
      this.controls.enableZoom = true
    }
    
    /**
     * Inputs screen
     */
    this.transitions.inputsScreen = async (duration: number, target: string) =>
    {
      this.controls.enableRotate = false
      this.controls.enableZoom = false
      
    
      const direction = this.experience.world.lootBoxScene?.smartContracts[target].inputsScreen.getWorldDirection(new Vector3())
      const targetPos = this.experience.world.lootBoxScene?.smartContracts[target].inputsScreen.getWorldPosition(new Vector3())
      
      const cameraPos = new THREE.Vector3().addVectors(targetPos, direction.multiplyScalar(1.4))

      gsap.to( this.instance.position, { duration: duration, ease: "power1.out", x: cameraPos.x, y: cameraPos.y, z: cameraPos.z } )

      gsap.to( this.controls.target, { duration: duration, ease: "power1.out", x: targetPos.x, y: targetPos.y, z: targetPos.z } )
  
      await this.sleep(duration * 1000)


      this.controls.enableRotate = true
    }

    /**
     * Meta screen
     */
    this.transitions.metaScreen = async (duration: number, target: string) =>
    {
      this.controls.enableRotate = false
      this.controls.enableZoom = false

      // Get the directional view of our target to place the camera jus in front of it
      const direction = this.experience.world.lootBoxScene?.smartContracts[target].metaScreen.getWorldDirection(new Vector3())
      const targetPos = this.experience.world.lootBoxScene?.smartContracts[target].metaScreen.getWorldPosition(new Vector3())
      const cameraPos = new THREE.Vector3().addVectors(targetPos, direction.multiplyScalar(1.2))

      // Smooth animation when positioning the camera
      gsap.to( this.instance.position, { duration: duration, ease: "power1.out", x: cameraPos.x, y: cameraPos.y, z: cameraPos.z } )
      gsap.to( this.controls.target, { duration: duration, ease: "power1.out", x: targetPos.x, y: targetPos.y, z: targetPos.z } )

      await this.sleep(duration * 1000)


      this.controls.enableRotate = true

    }
  }





  /***********************************|
  |               Debug               |
  |__________________________________*/

  setDebug()
  {
    if(this.debug.active)
    {
      this.debugFolder = this.debug.ui!.addFolder('camera')
      this.debugFolder.add(this.controls, 'enablePan')

      this.debugFolder
      .add(this.cameraToggle, 'unlockCamera')
      .onChange(() => { this.cam ? this.camAngle.default() : this.camAngle.unlocked() })   
    }
  }

  //##############################################################################
  
    
    
  





  

  /***********************************|
  |        Private functions          |
  |__________________________________*/
     
  _CalculateIdealOffset() {
    const idealOffset = new THREE.Vector3(0, 10, -18);
    idealOffset.applyQuaternion(this.experience.world.user?.gotchi.scene.quaternion);
    idealOffset.add(this.experience.world.user?.gotchi.scene.position);
    return idealOffset;
  }

  _CalculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 0, 20);
    idealLookat.applyQuaternion(this.experience.world.user?.gotchi.scene.quaternion);
    idealLookat.add(this.experience.world.user?.gotchi.scene.position);
    return idealLookat;
  }

  _CalculateIdealLookatPointing() {
    const idealLookat = new THREE.Vector3(0, 2, 0);
    idealLookat.applyQuaternion(this.user?.gotchi.scene.quaternion);
    idealLookat.add(this.user?.gotchi.scene.position);
    return idealLookat;
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


  /**
   * @name target
   * @notice For each frame this will update the camera toward the player 
   *         It won't be used if user is focus on an element.
   */
  target(): void
  {
    if (this.controller?.getCurrentMode() === undefined) 
    {
      if (this.user?.isMoving && !this.pointing) 
      {
        const idealOffset = this._CalculateIdealOffset();
        const idealLookat = this._CalculateIdealLookat();
        
        const t = 0.05 - Math.pow(0.001, this.time.elapsedTime);
        
        this._currentPosition.lerp(idealOffset, t);
        this._currentLookat.lerp(idealLookat, t);
        
        this.instance.position.copy(this._currentPosition);
      }
  
      if (this.pointing) 
      {
        const idealLookat = this._CalculateIdealLookatPointing();
        
        const t = 0.05 - Math.pow(0.001, this.time.elapsedTime);
        
        this._currentLookat.lerp(idealLookat, t);
      }
      
      this.instance.lookAt(this._currentLookat) ;
    }
  }

  update(): void {
    this.target()
    if (this.controls.enabled) this.controls.update()
  }
}
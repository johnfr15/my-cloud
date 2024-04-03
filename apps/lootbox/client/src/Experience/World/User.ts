import * as THREE         from "three";
import { Scene, Vector3 } from "three";
import { clone }          from 'three/examples/jsm/utils/SkeletonUtils.js';
import GUI                from "lil-gui";
import Experience         from "../Experience";
import Debug              from "../Utils/Debug";
import Resources          from "../Utils/Resources";
import Time               from "../Utils/Time";
import Wallet             from "../Utils/Wallet";
import Camera             from "../Camera";
import Controller         from "../Controller";
import Room               from "../Utils/Room";
import LootBoxScene       from "./LootBoxScene";

const UP    = ["ArrowUp", 'w', 'W']
const DOWN  = ["ArrowDown", 's', 'S']
const LEFT  = ["ArrowLeft", 'a', 'A']
const RIGHT = ["ArrowRight", 'd', 'D']

export default class User {
  // Class
  experience: Experience
  room: Room
  scene: Scene
  resources: Resources
  camera: Camera
  controller: Controller
  time: Time
  debug: Debug
  wallet: Wallet
  lootBoxScene: LootBoxScene

  // Model
  fox: { [key: string]: any } = {}
  gotchi: { [key: string]: any } = {}
  isMoving: boolean = false
  movements: { [key: string]: boolean } = {
    "ArrowUp": false, 
    "ArrowDown": false, 
    "ArrowLeft": false, 
    "ArrowRight": false,
  }
  movementType: string = "idle"
  movementMultiplier: { [key: string]: number } = {"idle": 1, "walk": 1, "run": 3}

  // Debug
  debugFolder: GUI | undefined
  positionDebugFolder: GUI | undefined
  rotationDebugFolder: GUI | undefined

  constructor() 
  {
    this.experience   = Experience.Instance()
    this.room         = Room.Instance()
    this.wallet       = new Wallet(this)
    this.scene        = this.experience.scene
    this.resources    = this.experience.resources
    this.time         = this.experience.time
    this.camera       = this.experience.camera
    this.controller   = this.experience.controller
    this.lootBoxScene = this.experience.world.lootBoxScene!
    this.fox.model    = this.resources.items.foxModel
    this.gotchi.model = this.resources.items.gotchiModel
    this.debug        = this.experience.debug
    this.camera.user  = this

    this.setGLTF()
    this.setAnimations()
    this.setActions()
    this.room.listen()
  }

  private setGLTF(): void 
  {
    this.gotchi.scene = clone(this.lootBoxScene.gotchi)
    this.scene.add(this.gotchi.scene)

    this.gotchi.scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) { child.castShadow = true; child.receiveShadow = true }
    })
    this.camera.controls.target = this.gotchi.scene.position 
  }

  private setAnimations(): void 
  {
    this.gotchi.animation        = {}
    this.gotchi.animation.mixer  = new THREE.AnimationMixer(this.gotchi.scene)

    this.gotchi.animation.action       = {}
    this.gotchi.animation.action.idle  = this.gotchi.animation.mixer.clipAction(this.gotchi.model.animations[0])
    this.gotchi.animation.action.walk  = this.gotchi.animation.mixer.clipAction(this.gotchi.model.animations[1])
    this.gotchi.animation.action.run   = this.gotchi.animation.mixer.clipAction(this.gotchi.model.animations[1])

    this.gotchi.animation.action.current = this.gotchi.animation.action.idle
    this.gotchi.animation.action.current.play()
  }
  
  private setActions(): void 
  {
    // Player is moving
    window.addEventListener("keydown", (event) => 
    {
      this.room.socket.emit("keydown", event.key)
      
      // Run
      if (UP.includes(event.key)) 
      {
        this.isMoving = true
        this.movements["ArrowUp"] = true
        this.movements["ArrowDown"] = false
        this.movementType = "run"
        this.gotchi.animation.action.current = this.gotchi.animation.action.run
        this.gotchi.animation.action.current.play()
        this.gotchi.animation.action.idle.stop()
      }
        
      // Walk
      if (DOWN.includes(event.key)) 
      {
        this.isMoving = true
        this.movements["ArrowDown"] = true
        this.movements["ArrowUp"] = false
        this.movementType = "walk"
        this.gotchi.animation.action.current = this.gotchi.animation.action.walk
        this.gotchi.animation.action.current.play()
        this.gotchi.animation.action.idle.stop()
      }

      // Rotate left
      if (LEFT.includes(event.key)) 
      {
        this.movements["ArrowLeft"] = true
        if (!this.isMoving) 
        { 
          this.movementType = "walk"
          this.gotchi.animation.action.current = this.gotchi.animation.action.walk
          this.gotchi.animation.action.current.play() 
        }
      }

      // Rotate right
      if (RIGHT.includes(event.key))
      {
        this.movements["ArrowRight"] = true
        if (!this.isMoving) 
        { 
          this.movementType = "walk"
          this.gotchi.animation.action.current = this.gotchi.animation.action.walk
          this.gotchi.animation.action.current.play()
        }
      }
    }) 

    // Player stop moving
    window.addEventListener("keyup", (event) => 
    {
      this.room.socket.emit("keyup", event.key)

      if (UP.includes(event.key) || DOWN.includes(event.key))
      {
        UP.includes(event.key) ? this.movements["ArrowUp"] = false : this.movements["ArrowDown"] = false
        this.isMoving = false
        this.movementType = "idle"
        this.gotchi.animation.action.current = this.gotchi.animation.action.idle
        this.gotchi.animation.action.walk.stop()
        this.gotchi.animation.action.current.play()
      }
      
      if (LEFT.includes(event.key) || RIGHT.includes(event.key))
      {
        LEFT.includes(event.key) ? this.movements["ArrowLeft"] = false : this.movements["ArrowRight"] = false
        if (!this.isMoving) 
        { 
          this.movementType = "idle"
          this.gotchi.animation.action.current = this.gotchi.animation.action.idle
          this.gotchi.animation.action.walk.stop()
          this.gotchi.animation.action.current.play()
        }
      }
    })
  }

  // Update the position of user for each frame depending of the key pressed => {up, down, left, right}
  private move(): void
  {
    const vector = new Vector3()
    const direction: THREE.Vector3 = this.gotchi.scene.getWorldDirection(vector)
    
    if (this.movements.ArrowUp)
    {
      this.gotchi.scene.position.z += (this.time.deltaTime * direction.z) * 9
      this.gotchi.scene.position.x += (this.time.deltaTime * direction.x) * 9
      this.room.socket.emit("move", this.gotchi.scene.position, this.gotchi.scene.rotation)
    }

    if (this.movements.ArrowDown)
    {
      this.gotchi.scene.position.z -= (this.time.deltaTime * direction.z) * 3
      this.gotchi.scene.position.x -= (this.time.deltaTime * direction.x) * 3
      this.room.socket.emit("move", this.gotchi.scene.position, this.gotchi.scene.rotation)
    }

    if (this.movements.ArrowLeft)
    {
      this.gotchi.scene.rotation.y += this.time.deltaTime * 3
      this.room.socket.emit("move", this.gotchi.scene.position, this.gotchi.scene.rotation)
    }

    if (this.movements.ArrowRight)
    {
      this.gotchi.scene.rotation.y -= this.time.deltaTime * 3
      this.room.socket.emit("move", this.gotchi.scene.position, this.gotchi.scene.rotation)
    }
  }

  public update(): void 
  {
    this.move()
    this.gotchi.animation.mixer.update(this.time.deltaTime * this.movementMultiplier[this.movementType])
  }
}
import * as THREE         from "three";
import { Scene }          from "three";
import { clone }          from 'three/examples/jsm/utils/SkeletonUtils.js';
import Experience         from "../Experience";
import Resources          from "../Utils/Resources";
import Room               from "../Utils/Room";
import Time               from "../Utils/Time";
import LootBoxScene       from "./LootBoxScene";

const UP    = ["ArrowUp", 'w', 'W']
const DOWN  = ["ArrowDown", 's', 'S']
const LEFT  = ["ArrowLeft", 'a', 'A']
const RIGHT = ["ArrowRight", 'd', 'D']

export default class Player {
  socketID: string

  // Class
  experience: Experience
  room: Room
  scene: Scene
  time: Time
  resources: Resources
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

  constructor(socketID: string) 
  {
    this.socketID     = socketID
    this.experience   = Experience.Instance()
    this.room         = Room.Instance()
    this.scene        = this.experience.scene
    this.time         = this.experience.time
    this.resources    = this.experience.resources
    this.lootBoxScene = this.experience.world.lootBoxScene!
    this.fox.model    = this.resources.items.foxModel
    this.gotchi.model = this.resources.items.gotchiModel

    this.setGLTF()
    this.setAnimations()
  }

  private setGLTF(): void 
  {
    this.gotchi.scene = clone(this.experience.world.lootBoxScene!.gotchi)
    this.gotchi.scene.position.set( 0, 0, 0 );
    this.scene.add(this.gotchi.scene)
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


  onKeyup(key: string): void 
  {
    if (UP.includes(key) || DOWN.includes(key))
    {
      UP.includes(key) ? this.movements["ArrowUp"] = false : this.movements["ArrowDown"] = false
      this.isMoving = false
      this.movementType = "idle"
      this.gotchi.animation.action.current = this.gotchi.animation.action.idle
      this.gotchi.animation.action.walk.stop()
      this.gotchi.animation.action.current.play()
    }

    if (LEFT.includes(key) || RIGHT.includes(key))
    {
      LEFT.includes(key) ? this.movements["ArrowLeft"] = false : this.movements["ArrowRight"] = false
      if (!this.isMoving) 
      { 
        this.movementType = "idle"
        this.gotchi.animation.action.current = this.gotchi.animation.action.idle
        this.gotchi.animation.action.walk.stop()
        this.gotchi.animation.action.current.play()
      }
    }
  }

  onKeydown(key: string): void 
  {
    // Run
    if (UP.includes(key)) 
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
    if (DOWN.includes(key)) 
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
    if (LEFT.includes(key)) 
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
    if (RIGHT.includes(key))
    {
      this.movements["ArrowRight"] = true
      if (!this.isMoving) 
      { 
        this.movementType = "walk"
        this.gotchi.animation.action.current = this.gotchi.animation.action.walk
        this.gotchi.animation.action.current.play()  
      }
    }
  }

  onMove(args): void 
  {
    this.gotchi.scene.position.copy(args.position)
    this.gotchi.scene.rotation.copy(args.rotation)
  }

  public update(): void 
  {
    this.gotchi.animation.mixer.update(this.time.deltaTime * this.movementMultiplier[this.movementType])
  }
}
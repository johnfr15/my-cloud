import * as THREE     from "three"
import { sources }    from "./sources"
import { RootState }  from "@react-three/fiber"
import Camera         from "./Camera"
import PreLoader      from "./PreLoader"
import Sounds         from "./Sounds"
import Controller     from "./Controller"
import Resources      from "./Utils/Resources"
import Debug          from "./Utils/Debug"
import Raycaster      from "./Utils/Raycaster"
import Factory        from "./Utils/Factory"
import Materials      from "./Utils/Materials"
import Toast          from "./Utils/Toast"
import Time           from "./Utils/Time"
import Room           from "./Utils/Room"
import World          from "./World/World"

export default class Experience {
  private static _instance: Experience | null;

  root: RootState
  room: Room
  toast: Toast
  debug: Debug
  time: Time
  scene: THREE.Scene
  resources: Resources
  preLoader: PreLoader
  factory: Factory
  mouse: THREE.Vector2
  sounds: Sounds
  camera: Camera
  controller: Controller
  world: World
  materials: Materials
  raycaster: Raycaster
  config = { touch: false }
  
  constructor(root: RootState, controls: any) {
    // Singleton
    this.root             = root
    Experience._instance  = this
    this.room             = new Room()
    
    // loading 
    this.resources = new Resources(sources)
    this.preLoader = new PreLoader()
    
    // set up Utils classes
    this.mouse  = root.mouse
    this.toast  = new Toast()
    this.debug  = new Debug()
    this.time   = new Time(root.clock) 
    this.sounds = new Sounds()
    
    // Set up the scene in canvas (loading page)
    this.scene      = root.scene
    this.factory    = new Factory()
    this.camera     = new Camera(controls, root.camera)
    this.controller = new Controller()
    
    
    // Set up the world with all the models & how we will interact with them
    this.world      = new World()
    this.materials  = new Materials()
    this.raycaster  = new Raycaster()
    
    //config
    window.addEventListener('touchstart', () => { this.config.touch = true }, { once: true })

  }

  update(): void {
    this.time.tick()
    this.camera.update()
    this.room.update()
    this.world.update()
    this.raycaster.update()
  }

  public static Instance(root?: RootState, controls?: any)
  {
    return this._instance || (this._instance = new this(root!, controls));
  }
}

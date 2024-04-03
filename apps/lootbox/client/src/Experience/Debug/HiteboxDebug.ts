import * as THREE from "three"
import GUI from "lil-gui";
import Experience from "../Experience";
import Debug from "../Utils/Debug";
import Raycaster from "../Utils/Raycaster";

export default class HitboxDebug {
  experience: Experience
  scene: THREE.Scene
  raycaster: Raycaster
  debug: Debug

  // Debug
  debugFolder: GUI | undefined
  debugHitboxes: { [key: string]: GUI} = {}
  helpers: THREE.Box3Helper[] = []


  /***********************************|
  |          Initialization           |
  |__________________________________*/

  constructor() {
    this.experience = Experience.Instance()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.raycaster = this.experience.raycaster

    let param = {
      hitboxes: false
    }

    this.debug.ui!.add(param, "hitboxes").onChange((value: boolean) => {
      if (value)
      {
        for (const box of this.raycaster.hitboxes) {
          const helper = new THREE.Box3Helper( box, new THREE.Color(0xff0000) )
          this.helpers.push(helper)
          this.scene.add(helper)
        }
      } 
      else
      {
        this.helpers.forEach((helper) => this.scene.remove(helper))
        this.helpers = []
      }
    })

  }
}
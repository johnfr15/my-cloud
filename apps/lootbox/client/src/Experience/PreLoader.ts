import * as THREE from "three";
import Experience from "./Experience";
import Resources from "./Utils/Resources";
import EventEmitter from "./Utils/EventEmitter";

export default class PreLoader extends EventEmitter {
  experience: Experience
  scene: THREE.Scene
  resources: Resources

  progressRatio: number = 0
  overlay: HTMLElement = document.querySelector('.overlay')!
  startButton: HTMLButtonElement = document.querySelector('button.start')!
  progressBar: HTMLElement = document.getElementById("progressPercentage")!
  
  constructor() {
    super()

    this.experience = Experience.Instance()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Progress
    this.resources.on('itemLoaded', () =>
    {
      this.progressRatio = (this.resources.loaded + 1)/ this.resources.toLoad
        
      this.progressBar.innerHTML = Math.trunc(this.progressRatio * 100).toString()
    })

    //Loaded
    this.resources.on('ready', () =>
    {
      window.setTimeout(() => { this.readyScreen() }, 2500)
    })
  }

  readyScreen()
  {
    const progress = document.getElementById("progress")!
    progress.remove()

    this.startButton.style.display = "inline"
    this.startButton.classList.add('fadeIn')

    this.startButton.addEventListener("click", async () => {

    // Remove overlay and button
    this.overlay.classList.add('fade')
    this.startButton.classList.add('fadeOut')

    window.setTimeout(() =>
    {
        this.startButton.remove()
        this.overlay.remove()
    }, 2000)

    // Emit Event
    this.trigger('start')

    }, { once: true });
  }

  sleep(ms: number) 
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
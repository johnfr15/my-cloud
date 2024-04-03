import * as THREE from "three";
import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
  clock: THREE.Clock
  oldTime: number = 0
  elapsedTime: number = 0
  deltaTime: number = 16

  constructor(clock: THREE.Clock) {
    super()

    this.clock = clock
  }

  tick() {
    this.elapsedTime = this.clock.getElapsedTime()
    this.deltaTime = this.elapsedTime - this.oldTime
    this.oldTime = this.elapsedTime;
  }
}
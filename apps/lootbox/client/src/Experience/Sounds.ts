import { Howl, Howler } from 'howler';
import Experience from "./Experience";
import Debug from "./Utils/Debug";
import arcade from "../static/sounds/arcade.mp3";
import click from "../static/sounds/click.mp3";
import bloop from "../static/sounds/bloop.mp3";
import whoosh from "../static/sounds/whoosh.mp3";
import star from "../static/sounds/star.wav";
import futuristic2 from "../static/sounds/futuristic_set_2.wav";
import openChest from "../static/sounds/openning_chest.mp3";
import openLockedChest from "../static/sounds/openning_locked_chest.mp3";
import closeChest from "../static/sounds/closing_chest.mp3";

export default class Sounds {
  muted: boolean = false
  experience: Experience
  debug: Debug
  arcade: any
  click: any
  bloop: any
  whoosh: any
  star: any
  openChest: any
  openLockedChest: any
  closeChest: any
  funcHover: any

  constructor() {
    this.experience = Experience.Instance()
    this.debug = this.experience.debug

    this.arcade           = new Howl({ src: [arcade] });
    this.click            = new Howl({ src: [click] });
    this.bloop            = new Howl({ src: [bloop] });
    this.whoosh           = new Howl({ src: [whoosh] });
    this.star             = new Howl({ src: [star] });
    this.openChest        = new Howl({ src: [openChest] });
    this.openLockedChest  = new Howl({ src: [openLockedChest] });
    this.closeChest       = new Howl({ src: [closeChest] });
    this.funcHover        = new Howl({
      src: [futuristic2],
      sprite: {
        hover1: [0, 500],
        hover2: [500, 500],
        hover3: [1000, 500],
        hover4: [1500, 500],
      }
    });
  }

  setMute()
  {
    // Set up
    this.muted = typeof this.debug !== 'undefined'
    Howler.mute(this.muted)

    // M Key
    window.addEventListener('keydown', (_event) =>
    {
      if(_event.key === 'm')
      {
        this.muted = !this.muted
        Howler.mute(this.muted)
      }
    })

    // Tab focus / blur
    document.addEventListener('visibilitychange', () =>
    {
      if(document.hidden)
      {
        Howler.mute(true)
      }
      else
      {
        Howler.mute(this.muted)
      }
    })
  }

  playArcade()                   { this.arcade.play()          }
  playClick()                    { this.click.play()           }
  playBloop()                    { this.bloop.play()           }
  playWhoosh()                   { this.whoosh.play()          }
  playStar()                     { this.star.play()            }
  playOpenChest()                { this.openChest.play()       }
  playOpenLockedChest()          { this.openLockedChest.play() }
  playCloseChest()               { this.closeChest.play()      }
  playFuncHover(name: string)    { this.funcHover.play(name)   }
}
import Experience   from './Experience'
import Camera       from './Camera'
import Resources    from './Utils/Resources'
import Sounds       from './Sounds'
import PreLoader    from './PreLoader'
import LootBoxScene from './World/LootBoxScene'
import Materials    from './Utils/Materials'

export default class Controller
{
  experience: Experience
  camera: Camera
  resources: Resources
  sounds: Sounds
  preLoader: PreLoader
  config: Object
  lootBoxScene?: LootBoxScene
  materials?: Materials
  // animation: Animation

  // logic
  private logic: {[key: string]: any} = {}

  // controls
  worldControls:              {[key: string]: () => {}} = {}
  chestSCContractControls:    {[key: string]: () => {}} = {}
  erc20SCContractControls:    {[key: string]: () => {}} = {}
  erc721SCContractControls:   {[key: string]: () => {}} = {}
  erc1155SCContractControls:  {[key: string]: () => {}} = {}
  camControls:                {[key: string]: (...args) => {}} = {}

  constructor()
  {
    // Setup
    this.experience = Experience.Instance()
    this.camera     = this.experience.camera
    this.resources  = this.experience.resources
    this.sounds     = this.experience.sounds
    this.preLoader  = this.experience.preLoader
    this.config     = this.experience.config

    this.setLogic()
    this.setWorldControls()
    this.setChestContractControls()
    this.setErc20ContractControls()
    this.setErc721ContractControls()
    this.setErc1155ContractControls()
    this.setCamControls()
  

    this.resources.on('ready', () =>
    {
      this.lootBoxScene = this.experience.world.lootBoxScene
      this.materials    = this.experience.materials
    })

  }
  
  setLogic()
  {
    this.logic.buttonsLocked  = false
    this.logic.mode           = []
    this.camera.controller    = this

    this.logic.lockButtons = async (lockDuration: number) =>
    {
      this.logic.buttonsLocked = true
      await this.sleep(lockDuration)
      this.logic.buttonsLocked = false
    }
  }

  // Project selection

  setWorldControls()
  {
    this.worldControls.chestSC = async () =>
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === undefined)
      {
        // window.addEventListener("mousemove")
        this.sounds.playClick()
        this.logic.mode.push('chestContract')
        this.camControls.toChestContract()
      }
    }
    
    this.worldControls.erc20SC = async () =>
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === undefined)
      {
        this.sounds.playClick()
        this.logic.mode.push('erc20Contract')
        this.camControls.toErc20Contract()
      }
    }
    
    this.worldControls.erc721SC = async () =>
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === undefined)
      {
        this.sounds.playClick()
        this.logic.mode.push('erc721Contract')
        this.camControls.toErc721Contract()
      }
    }
    
    this.worldControls.erc1155SC = async () =>
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === undefined)
      {
        this.sounds.playClick()
        this.logic.mode.push('erc1155Contract')
        this.camControls.toErc1155Contract()
      }
    }
    
    this.worldControls.goBack = async () =>
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) !== undefined)
      {
        this.sounds.playBloop()
        this.camControls.toDefault()
        this.logic.mode.pop()
        
      }
    }
  }

  setChestContractControls() 
  {
    this.chestSCContractControls.inputsScreen = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === "chestContract")
      {
        this.sounds.playClick()
        this.logic.mode.push('inputsScreen')
        this.camControls.toInputsScreen("chestSC") // Give the groupe name's of the targeted model
      }
    }

    this.chestSCContractControls.metaScreen = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === "chestContract")
      {
        this.sounds.playClick()
        this.logic.mode.push('metaScreen')
        this.camControls.toMetaScreen("chestSC") // Give the groupe name's of the targeted model
      }
    }

    this.chestSCContractControls.main = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) !== "chestContract")
      {
        this.sounds.playClick()
        this.logic.mode.pop()
        this.camControls.toChestContract(0.5) // Give the groupe name's of the targeted model
        this.experience.raycaster.trigger("main")

      }
    }
  }

  setErc20ContractControls() 
  {
    this.erc20SCContractControls.inputsScreen = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === "erc20Contract")
      {
        this.sounds.playClick()
        this.logic.mode.push('inputsScreen')
        this.camControls.toInputsScreen("erc20SC") // Give the groupe name's of the targeted model
      }
    }

    this.erc20SCContractControls.metaScreen = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === "erc20Contract")
      {
        this.sounds.playClick()
        this.logic.mode.push('metaScreen')
        this.camControls.toMetaScreen("erc20SC") // Give the groupe name's of the targeted model
      }
    }

    this.erc20SCContractControls.main = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) !== "erc20Contract")
      {
        this.sounds.playClick()
        this.logic.mode.pop()
        this.camControls.toErc20Contract(0.5) // Give the groupe name's of the targeted model
        this.experience.raycaster.trigger("main")

      }
    }
  }

  setErc721ContractControls() 
  {
    this.erc721SCContractControls.inputsScreen = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === "erc721Contract")
      {
        this.sounds.playClick()
        this.logic.mode.push('inputsScreen')
        this.camControls.toInputsScreen("erc721SC") // Give the groupe name's of the targeted model
      }
    }

    this.erc721SCContractControls.metaScreen = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === "erc721Contract")
      {
        this.sounds.playClick()
        this.logic.mode.push('metaScreen')
        this.camControls.toMetaScreen("erc721SC") // Give the groupe name's of the targeted model
      }
    }

    this.erc721SCContractControls.main = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) !== "erc721Contract")
      {
        this.sounds.playClick()
        this.logic.mode.pop()
        this.camControls.toErc721Contract(0.5) // Give the groupe name's of the targeted model
        this.experience.raycaster.trigger("main")

      }
    }
  }


  setErc1155ContractControls() 
  {
    this.erc1155SCContractControls.inputsScreen = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === "erc1155Contract")
      {
        this.sounds.playClick()
        this.logic.mode.push('inputsScreen')
        this.camControls.toInputsScreen("erc1155SC") // Give the groupe name's of the targeted model
      }
    }

    this.erc1155SCContractControls.metaScreen = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) === "erc1155Contract")
      {
        this.sounds.playClick()
        this.logic.mode.push('metaScreen')
        this.camControls.toMetaScreen("erc1155SC") // Give the groupe name's of the targeted model
      }
    }

    this.erc1155SCContractControls.main = async () => 
    {
      if ( this.logic.buttonsLocked === false && this.logic.mode.at(-1) !== "erc1155Contract")
      {
        this.sounds.playClick()
        this.logic.mode.pop()
        this.camControls.toErc1155Contract(0.5) // Give the groupe name's of the targeted model
        this.experience.raycaster.trigger("main")

      }
    }
  }


  // camera transitions and angles
  setCamControls()
  {
    this.camControls.toDefault = async () =>
    {
      this.logic.lockButtons(1500)
      this.camera.camAngle.transition()
      this.camera.transitions.default(1.5)
      await this.sleep(1500)
    }

    this.camControls.toChestContract = async (transition: number = 1.5) =>
    {
      this.sounds.playWhoosh()
      
      // Adding 10% more than sleep so it won't clash with the listener (listenContract) of Raycaster
      this.logic.lockButtons(transition * 1100)
      this.camera.camAngle.transition()
      this.camera.transitions.chestContract(transition)
      await this.sleep(transition * 1000)
    }

    this.camControls.toErc20Contract = async (transition: number = 1.5) =>
    {
      this.sounds.playWhoosh()

      this.logic.lockButtons(transition * 1100)
      this.camera.camAngle.transition()
      this.camera.transitions.erc20Contract(transition)
      await this.sleep(transition * 1100)
    }

    this.camControls.toErc721Contract = async (transition: number = 1.5) =>
    {
      this.sounds.playWhoosh()

      this.logic.lockButtons(transition * 1100)
      this.camera.camAngle.transition()
      this.camera.transitions.erc721Contract(transition)
      await this.sleep(transition * 1100)
    }

    this.camControls.toErc1155Contract = async (transition: number = 1.5) =>
    {
      this.sounds.playWhoosh()

      this.logic.lockButtons(transition * 1100)
      this.camera.camAngle.transition()
      this.camera.transitions.erc1155Contract(transition)
      await this.sleep(transition * 1100)
    }

    this.camControls.toInputsScreen = async (target) =>
    {
      this.sounds.playWhoosh()

      this.logic.lockButtons(500)
      this.camera.camAngle.transition()
      this.camera.transitions.inputsScreen(.5, target)
      await this.sleep(1500)
    }

    this.camControls.toMetaScreen = async (target) =>
    {
      this.sounds.playWhoosh()

      this.logic.lockButtons(500)
      this.camera.camAngle.transition()
      this.camera.transitions.metaScreen(.5, target)
      await this.sleep(1500)
    }
  }

  getCurrentMode(): string | undefined {
    return this.logic.mode.at(-1)
  }

  getMode(): string[] {
    return this.logic.mode
  }

  isLocked(): boolean {
    return this.logic.buttonsLocked
  }

  sleep(ms: number) 
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
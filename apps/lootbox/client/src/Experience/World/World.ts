import * as THREE     from "three"
import Chest          from "./Chest";
import Environment    from "./Environment";
import LootBoxScene   from "./LootBoxScene";
import User           from "./User";
import Experience     from "../Experience";
import Resources      from "../Utils/Resources";

export default class World {
  // Classes
  experience: Experience
  scene: THREE.Scene
  resources: Resources
  lootBoxScene?: LootBoxScene
  user?: User
  environment?: Environment
  chest?: Chest


  constructor() {

    this.experience = Experience.Instance();
    this.scene      = this.experience.scene;
    this.resources  = this.experience.resources;


    this.resources.on("ready", async () => 
    {
      this.lootBoxScene   = await new LootBoxScene()
      this.user           = new User();
      this.environment    = new Environment();
      this.chest          = new Chest()
    })

  }

  update(): void 
  {
    this.user?.update()
    this.lootBoxScene?.update()
    this.chest?.update()
  }

}
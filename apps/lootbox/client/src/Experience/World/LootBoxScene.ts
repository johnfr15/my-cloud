import * as THREE from "three";
import Experience from "../Experience";
import Resources  from "../Utils/Resources";
import Materials  from "../Utils/Materials";
import Contract   from "./Contract";

export default class LootBoxScene {
  // Class
  experience: Experience
  scene:      THREE.Scene
  resources:  Resources
  materials:  Materials

  // Models
  resource:   any
  contracts:  any
  floor:      any
  house:      any
  lamp:       any
  nature:     any
  steps:      any
  portal:     any
  gotchi:     any
  walls:      {[key: string]: any} = {}
  models:     {[key: string]: any} = {}

  // smart-contracts
  smartContracts: {[key: string]: any} = {}


  constructor() {
    this.experience = Experience.Instance()
    this.scene      = this.experience.scene
    this.materials  = this.experience.materials
    this.resources  = this.experience.resources

    this.parseModel()
    this.setMaterials()
    this.setSmartContract()

  }
  
  parseModel()
  {

    this.contracts            = this.resources.items.contractsModel.scene
    this.floor                = this.resources.items.floorModel.scene
    this.house                = this.resources.items.houseModel.scene
    this.lamp                 = this.resources.items.lampModel.scene
    this.nature               = this.resources.items.natureModel.scene
    this.steps                = this.resources.items.stepsModel.scene
    this.portal               = this.resources.items.portalModel.scene
    this.gotchi               = this.resources.items.gotchiModel.scene

    // Wall
    this.walls["wall1"]       = this.resources.items.wall1Model.scene
    this.walls["wall2"]       = this.resources.items.wall2Model.scene
    this.walls["wall3"]       = this.resources.items.wall3Model.scene
    this.walls["wall4"]       = this.resources.items.wall4Model.scene
    this.walls["wall5"]       = this.resources.items.wall5Model.scene
    this.walls["wall6"]       = this.resources.items.wall6Model.scene
    this.walls["wall7"]       = this.resources.items.wall7Model.scene
    this.walls["wall8"]       = this.resources.items.wall8Model.scene
    this.walls["wall9"]       = this.resources.items.wall9Model.scene
    this.walls["wall10"]      = this.resources.items.wall10Model.scene
    this.walls["wallDoor1"]   = this.resources.items.wallDoor1Model.scene
    this.walls["wallDoor2"]   = this.resources.items.wallDoor2Model.scene
    this.walls["wallOrigin"]  = this.resources.items.wallOriginModel.scene
    
    // contracts
    this.models.chestSC   = this.contracts.getObjectByName("chestSC")
    this.models.erc20SC   = this.contracts.getObjectByName("erc20SC")
    this.models.erc721SC  = this.contracts.getObjectByName("erc721SC")
    this.models.erc1155SC = this.contracts.getObjectByName("erc1155SC")
    
    // nature
    this.models.clickMe = this.nature.getObjectByName("clickMe")
    
    // floor
    this.models.grass   = this.floor.getObjectByName("forest_ground")
    this.models.road    = this.floor.getObjectByName("road")

    // portal
    this.models.armature  = this.portal.getObjectByName("armature")
    this.models.portal    = this.portal.getObjectByName("portal")
    this.models.stairs    = this.portal.getObjectByName("stairs")

    

    this.scene.add(this.floor, this.contracts, this.house, this.lamp, this.nature, this.steps, ...Object.values(this.walls), this.portal)
  }

  setMaterials()
  {
    this.resources.on("texturesMapped", () => 
    {
      this.lamp.getObjectByName('poleLights').children[0].intensity = 0.4
      this.lamp.getObjectByName('poleLights').children[1].intensity = 0.4

      this.lamp.traverse(child => child.isMesh ? child.material.toneMapped      = false : "")
      this.contracts.traverse(child => child.isMesh ? child.material.toneMapped = false : "")
      this.steps.traverse(child => child.isMesh ? child.material.toneMapped     = false : "")

      // chestSC
      this.models.chestSC.getObjectByName("chestSC_function_deploy").material             = this.materials.items.deployContract
      this.models.chestSC.getObjectByName("chestSC_function_import").material             = this.materials.items.import
      this.models.chestSC.getObjectByName("chestSC_function_addWhitelist").material       = this.materials.items.addWhitelist
      this.models.chestSC.getObjectByName("chestSC_function_batchDeposit").material       = this.materials.items.deposit
      this.models.chestSC.getObjectByName("chestSC_function_loot").material               = this.materials.items.loot
      this.models.chestSC.getObjectByName("chestSC_function_batchLoot").material          = this.materials.items.batchLoot
      this.models.chestSC.getObjectByName("chestSC_function_transferOwnership").material  = this.materials.items.transferOwnership
      this.models.chestSC.getObjectByName("chestSC_network").material                     = this.materials.items.contractInterfaceMaterial
      this.models.chestSC.getObjectByName("chestSC_interface").material                   = this.materials.items.contractInterfaceMaterial
      this.models.chestSC.getObjectByName("chestSC_inputsScreen").material                = this.materials.items.contractInterfaceMaterial
      this.models.chestSC.getObjectByName("chestSC_metaScreen").material                  = this.materials.items.contractInterfaceMaterial
      this.models.chestSC.getObjectByName("chestSC_metaScreen").visible                   = false
      this.models.chestSC.getObjectByName("chestSC_inputsScreen").visible                 = false
      // // erc20SC
      this.models.erc20SC.getObjectByName("erc20SC_function_deploy").material             = this.materials.items.deployContract
      this.models.erc20SC.getObjectByName("erc20SC_function_import").material             = this.materials.items.import
      this.models.erc20SC.getObjectByName("erc20SC_function_approve").material            = this.materials.items.approveErc20
      this.models.erc20SC.getObjectByName("erc20SC_function_transfer").material           = this.materials.items.transferErc20
      this.models.erc20SC.getObjectByName("erc20SC_function_mint").material               = this.materials.items.mintErc20
      this.models.erc20SC.getObjectByName("erc20SC_function_burn").material               = this.materials.items.burnErc20
      this.models.erc20SC.getObjectByName("erc20SC_function_transferOwnership").material  = this.materials.items.transferOwnership
      this.models.erc20SC.getObjectByName("erc20SC_network").material                     = this.materials.items.contractInterfaceMaterial
      this.models.erc20SC.getObjectByName("erc20SC_interface").material                   = this.materials.items.contractInterfaceMaterial
      this.models.erc20SC.getObjectByName("erc20SC_inputsScreen").material                = this.materials.items.contractInterfaceMaterial
      this.models.erc20SC.getObjectByName("erc20SC_metaScreen").material                  = this.materials.items.contractInterfaceMaterial
      this.models.erc20SC.getObjectByName("erc20SC_metaScreen").visible                   = false
      this.models.erc20SC.getObjectByName("erc20SC_inputsScreen").visible                 = false
      // erc721SC
      this.models.erc721SC.getObjectByName("erc721SC_function_deploy").material             = this.materials.items.deployContract
      this.models.erc721SC.getObjectByName("erc721SC_function_import").material             = this.materials.items.import
      this.models.erc721SC.getObjectByName("erc721SC_function_approve").material            = this.materials.items.approveErc721
      this.models.erc721SC.getObjectByName("erc721SC_function_setApprovalForAll").material  = this.materials.items.approveAllErc721
      this.models.erc721SC.getObjectByName("erc721SC_function_safeTransferFrom").material   = this.materials.items.transferErc721
      this.models.erc721SC.getObjectByName("erc721SC_function_safeMint").material           = this.materials.items.mintErc721
      this.models.erc721SC.getObjectByName("erc721SC_function_burn").material               = this.materials.items.burnErc721
      this.models.erc721SC.getObjectByName("erc721SC_function_transferOwnership").material  = this.materials.items.transferOwnership
      // this.models.erc721SC.getObjectByName("erc721SC_function_renounceOwnership").material  = this.materials.items.renounceOwnership
      this.models.erc721SC.getObjectByName("erc721SC_network").material                     = this.materials.items.contractInterfaceMaterial
      this.models.erc721SC.getObjectByName("erc721SC_interface").material                   = this.materials.items.contractInterfaceMaterial
      this.models.erc721SC.getObjectByName("erc721SC_inputsScreen").material                = this.materials.items.contractInterfaceMaterial
      this.models.erc721SC.getObjectByName("erc721SC_metaScreen").material                  = this.materials.items.contractInterfaceMaterial
      this.models.erc721SC.getObjectByName("erc721SC_metaScreen").visible                   = false
      this.models.erc721SC.getObjectByName("erc721SC_inputsScreen").visible                 = false
      // erc1155SC
      this.models.erc1155SC.getObjectByName("erc1155SC_function_deploy").material             = this.materials.items.deployContract
      this.models.erc1155SC.getObjectByName("erc1155SC_function_import").material             = this.materials.items.import
      this.models.erc1155SC.getObjectByName("erc1155SC_function_setApprovalForAll").material  = this.materials.items.approveAllErc1155
      this.models.erc1155SC.getObjectByName("erc1155SC_function_safeTransferFrom").material   = this.materials.items.transferErc1155
      this.models.erc1155SC
      .getObjectByName("erc1155SC_function_safeBatchTransferFrom").material                   = this.materials.items.batchTransferErc1155
      this.models.erc1155SC.getObjectByName("erc1155SC_function_mint").material               = this.materials.items.mintErc1155
      this.models.erc1155SC.getObjectByName("erc1155SC_function_mintBatch").material          = this.materials.items.batchMintErc1155
      this.models.erc1155SC.getObjectByName("erc1155SC_function_burn").material               = this.materials.items.burnErc1155
      this.models.erc1155SC.getObjectByName("erc1155SC_function_burnBatch").material          = this.materials.items.batchBurnErc1155
      this.models.erc1155SC.getObjectByName("erc1155SC_function_transferOwnership").material  = this.materials.items.transferOwnership
      // this.models.erc1155SC.getObjectByName("erc1155SC_function_renounceOwnership").material  = this.materials.items.renounceOwnership
      this.models.erc1155SC.getObjectByName("erc1155SC_network").material                     = this.materials.items.contractInterfaceMaterial
      this.models.erc1155SC.getObjectByName("erc1155SC_interface").material                   = this.materials.items.contractInterfaceMaterial
      this.models.erc1155SC.getObjectByName("erc1155SC_inputsScreen").material                = this.materials.items.contractInterfaceMaterial
      this.models.erc1155SC.getObjectByName("erc1155SC_metaScreen").material                  = this.materials.items.contractInterfaceMaterial
      this.models.erc1155SC.getObjectByName("erc1155SC_metaScreen").visible                   = false
      this.models.erc1155SC.getObjectByName("erc1155SC_inputsScreen").visible                 = false
      // grass
      this.models.grass.material.map.repeat = new THREE.Vector2(2, 3)
      this.models.grass.material.wrapS      = THREE.RepeatWrapping
      this.models.grass.material.wrapT      = THREE.RepeatWrapping
      // portal
      this.models.portal.material       = this.materials.items.portalLightMaterial
      this.models.portal.material.side  = THREE.DoubleSide
      // gotchi
      this.gotchi.getObjectByName("body").children[0].material = this.materials.items.gotchiBody
      this.gotchi.getObjectByName("eth").material              = this.materials.items.portalLightMaterial

      
    })
  }

  setSmartContract()
  {
    this.resources.on("texturesMapped", () => 
    {
      this.smartContracts.chestSC    = new Contract( this.resources.items.chestAbi.abi,     this.models.chestSC,    this.resources.items.chestAbi.bytecode   )
      this.smartContracts.erc20SC    = new Contract( this.resources.items.erc20Abi.abi,     this.models.erc20SC,    this.resources.items.erc20Abi.bytecode   )
      this.smartContracts.erc721SC   = new Contract( this.resources.items.erc721Abi.abi,    this.models.erc721SC,   this.resources.items.erc721Abi.bytecode  )
      this.smartContracts.erc1155SC  = new Contract( this.resources.items.erc1155Abi.abi,   this.models.erc1155SC,  this.resources.items.erc1155Abi.bytecode )
    })
  }

  update() 
  {
    for( const contract of Object.values(this.smartContracts) ) { contract.update() }
    this.materials.items.portalLightMaterial.uniforms.uTime.value = this.experience.time.elapsedTime.toFixed(2)
  }
}
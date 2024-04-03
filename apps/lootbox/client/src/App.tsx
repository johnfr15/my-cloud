import { useEffect, useRef, useState }    from "react";
import { useToast }                       from "@chakra-ui/react"
import { useControls }                    from 'leva';
import { extend, useThree, useFrame }     from "@react-three/fiber";
import { OrbitControls, Stars, Sparkles } from "@react-three/drei"
import { Bloom, EffectComposer, Outline } from '@react-three/postprocessing'
import Experience               from "./Experience/Experience";
import LevaHelper               from "./helper/LevaHelper";

import Import                   from "./fiber/InterfaceContract/Import";
import SetApprovalForAll        from "./fiber/InterfaceContract/SetApprovalForAll";
import TransferOwnership        from "./fiber/InterfaceContract/TransferOwnership";

import ChestDeployer            from "./fiber/InterfaceContract/chest/ChestDeployer";
import AddWhitelist             from "./fiber/InterfaceContract/chest/AddWhitelist";
import BatchDeposit             from "./fiber/InterfaceContract/chest/BatchDeposit";
import Loot                     from './fiber/InterfaceContract/chest/Loot'
import BatchLoot                from './fiber/InterfaceContract/chest/BatchLoot'

import ERC20Deployer            from "./fiber/InterfaceContract/erc20/ERC20Deployer";
import ApproveERC20             from "./fiber/InterfaceContract/erc20/ApproveERC20";
import TransferErc20            from "./fiber/InterfaceContract/erc20/TransferERC20";
import MintERC20                from "./fiber/InterfaceContract/erc20/MintERC20";
import BurnERC20                from "./fiber/InterfaceContract/erc20/BurnERC20";

import ERC721Deployer           from "./fiber/InterfaceContract/erc721/ERC721Deployer";
import ApproveERC721            from "./fiber/InterfaceContract/erc721/ApproveERC721";
import SafeTransferFromErc721   from "./fiber/InterfaceContract/erc721/SafeTransferFromErc721";
import SafeMintERC721           from "./fiber/InterfaceContract/erc721/SafeMintERC721";
import BurnERC721               from "./fiber/InterfaceContract/erc721/BurnERC721";

import ERC1155Deployer          from "./fiber/InterfaceContract/erc1155/ERC1155Deployer";
import SafeTransferFromErc1155  from "./fiber/InterfaceContract/erc1155/SafeTransferFrom1155";
import SafeBatchTransferFrom    from "./fiber/InterfaceContract/erc1155/SafeBatchTransferFrom";
import MintERC1155              from "./fiber/InterfaceContract/erc1155/MintERC1155";
import MintBatchERC1155         from "./fiber/InterfaceContract/erc1155/MintBatchERC1155";
import BurnERC1155              from "./fiber/InterfaceContract/erc1155/BurnERC1155";
import BurnBatchERC1155         from "./fiber/InterfaceContract/erc1155/BurnBatchERC1155";



extend({ OrbitControls })

function App() {
  const [experience, setExperience] = useState<Experience>()
  const [MaterialParsed, setMaterialParsed] = useState(false)
  const root                        = useThree()
  const toast                       = useToast()
  const controlsRef                 = useRef<any>()
  const starsRef                    = useRef<any>()
  const inputsFunctionRef           = useRef<any>()
  const outLineRef                  = useRef<any>()
  const outLineChestRef             = useRef<any>()
  const composerRef                 = useRef<any>()
  const chestRef                    = useRef<any>()
  const erc20Ref                    = useRef<any>()
  const erc721Ref                   = useRef<any>()
  const erc1155Ref                  = useRef<any>()

  useEffect(() => {
    root["toast"]             = toast
    root["controls"]          = controlsRef.current
    root["outlineHover"]      = outLineRef.current
    root["outlineChestHover"] = outLineChestRef.current
    root["chestSC"]           = chestRef.current
    root["erc20SC"]           = erc20Ref.current
    root["erc721SC"]          = erc721Ref.current
    root["erc1155SC"]         = erc1155Ref.current

    setExperience(Experience.Instance(root, controlsRef.current))

    experience?.resources.on("ready", () => {
      setMaterialParsed(true)
    })

  }, [root, toast, experience])


  useFrame( () => { experience?.update() } )

  const { radius, depth, count, factor, saturation, speed } = useControls('sky', {

    radius:     { value: 64,    min: 0, max: 100    },
    depth:      { value: 130,   min: 0, max: 500    },
    count:      { value: 9000,  min: 0, max: 100000 },
    factor:     { value: 4,     min: 0, max: 20     },
    saturation: { value: 10,    min: 0, max: 1      },
    speed:      { value: 3,     min: 0, max: 10     },

  })


  const { intensity, luminanceThreshold, luminanceSmoothing } = useControls('bloom', {

    intensity:            { value: 2,     min: 0, max: 10, step: 0.1 },
    luminanceThreshold:   { value: 0.9,   min: 0, max: 1             },
    luminanceSmoothing:   { value: 0.025, min: 0, max: 1             },

  })


  return (
    <>
      {MaterialParsed && <LevaHelper />}
      <color args={ ["black"] } attach="background" />
      <OrbitControls args={ [root.camera, root.gl.domElement] } ref={controlsRef} />
      <Stars ref={starsRef} radius={radius} depth={depth} count={count} factor={factor} saturation={saturation} speed={speed} />
      

      <EffectComposer ref={composerRef} autoClear={false}>
        <Outline
            ref={outLineRef}
            selection={[]}
            selectionLayer={ 1 }
            xRay
            edgeStrength={2.5}
            visibleEdgeColor={0xffffff}
            hiddenEdgeColor={0x22090a}
         />
        <Outline
            ref={outLineChestRef}
            selection={[]}
            selectionLayer={ 2 }
            edgeStrength={5}
            blur={true}
            visibleEdgeColor={0x7aaeff}
            hiddenEdgeColor={0x22090a}
         />
      
        <Bloom mipmapBlur intensity={ intensity } luminanceThreshold={ luminanceThreshold } luminanceSmoothing={ luminanceSmoothing } />
      </EffectComposer>

      <Sparkles size={4}  scale={[25,4,20]} position={[-5,1.5,-15]} count={ 50 }/>


    
      <group ref={inputsFunctionRef} >
        
        <group ref={chestRef} >
          { experience &&
            <>
              <ChestDeployer     group={"chestSC"} experience={experience} />
              <Import            group={"chestSC"} experience={experience} />
              <AddWhitelist      group={"chestSC"} experience={experience} />
              <BatchDeposit      group={"chestSC"} experience={experience} />
              <Loot              group={"chestSC"} experience={experience} />
              <BatchLoot         group={"chestSC"} experience={experience} />
              <TransferOwnership group={"chestSC"} experience={experience} props={{ rotation: [0, 0.64, 0] }} />
            </>
          }
        </group>
        
        <group ref={erc20Ref}>
          { experience &&
            <>
              <ERC20Deployer     group={"erc20SC"} experience={experience} />
              <Import            group={"erc20SC"} experience={experience} />
              <ApproveERC20      group={"erc20SC"} experience={experience} />
              <MintERC20         group={"erc20SC"} experience={experience} />
              <BurnERC20         group={"erc20SC"} experience={experience} />
              <TransferErc20     group={"erc20SC"} experience={experience} />
              <TransferOwnership group={"erc20SC"} experience={experience} props={{  }} />
            </>
          }
        </group>

        <group ref={erc721Ref}>
          { experience &&
            <>
              <ERC721Deployer          group={"erc721SC"} experience={experience} />
              <Import                  group={"erc721SC"} experience={experience} />
              <ApproveERC721           group={"erc721SC"} experience={experience} props={{ rotation: [ 0, Math.PI * 1.5, 0 ] }} />
              <SetApprovalForAll       group={"erc721SC"} experience={experience} props={{ rotation: [ 0, Math.PI * 1.5, 0 ] }} />
              <SafeMintERC721          group={"erc721SC"} experience={experience} props={{ rotation: [ 0, Math.PI * 1.5, 0 ] }} />
              <SafeTransferFromErc721  group={"erc721SC"} experience={experience} props={{ rotation: [ 0, Math.PI * 1.5, 0 ] }} />
              <BurnERC721              group={"erc721SC"} experience={experience} props={{ rotation: [ 0, Math.PI * 1.5, 0 ] }} />
              <TransferOwnership       group={"erc721SC"} experience={experience} props={{ rotation: [ 0, Math.PI * 1.5, 0 ] }} />
            </>
          }
        </group>

        <group ref={erc1155Ref}>
          { experience &&
            <>
              <ERC1155Deployer         group={"erc1155SC"} experience={experience} />
              <Import                  group={"erc1155SC"} experience={experience} />
              <SetApprovalForAll       group={"erc1155SC"} experience={experience} />
              <SafeTransferFromErc1155 group={"erc1155SC"} experience={experience} />
              <SafeBatchTransferFrom   group={"erc1155SC"} experience={experience} />
              <MintERC1155             group={"erc1155SC"} experience={experience} />
              <MintBatchERC1155        group={"erc1155SC"} experience={experience} />
              <BurnERC1155             group={"erc1155SC"} experience={experience} />
              <BurnBatchERC1155        group={"erc1155SC"} experience={experience} />
              <TransferOwnership       group={"erc1155SC"} experience={experience} /> 
            </>
          }
        </group>

      </group>
     
    </>
  );
}

export default App
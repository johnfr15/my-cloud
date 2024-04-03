import { useRef, useState } from "react"
import { Html } from "@react-three/drei"
import Experience from "../../../Experience/Experience"
import Contract from "../../../Experience/World/Contract";
import { useForm } from "react-hook-form";
import { ChakraProvider, FormLabel, Input, Box, Stack, Text, Button } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { deployTx } from "../../../Lib/web3/transactions";

const ChestDeployer: React.FC<{group: string, experience: Experience}>  = ({ group, experience }) => {
  




  /***********************************|
  |              HOOKS                |
  |__________________________________*/

  const { user } = experience.world
  const [contract, setContract] = useState<Contract>()
  const [mode, setCurrMode] = useState<string | undefined>(undefined)
  const [connected, setConnected] = useState<boolean>()
  const deployRef = useRef<any>()
  const { register, handleSubmit } = useForm();





  /***********************************|
  |            FUNCTIONS              |
  |__________________________________*/

  const onSubmit = async (data) => {
    let tx;
    try {
      tx = await deployTx(user!.wallet, contract!.deployer, data, group, experience.toast)
      contract!.handleDeployment(tx, group, "deploy")

      experience.controller[group + "ContractControls"].main()
      setCurrMode(experience.controller.getCurrentMode())
    } catch (error: any) {
      experience.toast.txFailed({wallet: user!.wallet, contractName: group, funcName: "deploy", tx: tx, error: error.message})
    }
  };




  
  /***********************************|
  |             EVENTS                |
  |__________________________________*/

  experience.raycaster.on( `click_${group}_function_deploy`, () => { 
    setCurrMode(experience.controller.getCurrentMode())
    setContract(experience.world.lootBoxScene!.smartContracts[group])
    setConnected(experience.world.user!.wallet.isConnected)
  })






  /***********************************|
  |            EXPERIENCE             |
  |__________________________________*/

  return (
    <mesh ref={deployRef} name={group + " deploy"} scale={0.6} position={ [ 0, -1, 0 ] }>

      {mode === "metaScreen" &&
          <Html
            center
            distanceFactor={5}
            position={ [ 0, 1.67, 0 ] }
            rotation={ [ 0, -0.015, 0 ] }
            transform
          >

            <ChakraProvider>
              <Box border={"2px solid #9ecaed"}  overflowY="auto" width="268px" height={"268px"} padding="1rem" borderRadius={"32px"} textAlign="center" textColor={'white'} boxShadow={"inset 0 0 20px #9ecaed, 0 0 20px #9ecaed"}>
                <Box>
                  <Text pb="0.5rem" fontWeight={"bold"} sx={{fontSize: "1rem"}} >Deploy chest</Text>
                  <Box as='button' fontSize={"10px"} position={"fixed"} top="20px" right="20px" onClick={() => {
                    experience.controller.chestSCContractControls.main()
                    setCurrMode(experience.controller.getCurrentMode())
                  }}
                  >
                    Back <ChevronRightIcon />
                  </Box>
                </Box>

                <Stack py="0.5rem" alignItems={"left"} >

                  <Box>
                    <FormLabel>Name (optional)</FormLabel>
                    <Input fontSize={"8px"} size="sm" padding="0.3rem" placeholder="gotchi lootbox" borderRadius={"5px"} {...register("name")} />
                    <FormLabel>type (optional)</FormLabel>
                    <Input fontSize="8px" size="sm" padding="0.3rem" placeholder="ebik !" borderRadius={"5px"} {...register("type")} />
                  </Box>

                  { connected ?
                    <Button onClick={handleSubmit(onSubmit)} alignSelf="center" mt="2rem !important" maxH="2rem" maxW="5rem" px="0.5rem" borderRadius="0.2rem" bg="blue.500" >Send Tx</Button>
                    :
                    <Button onClick={() => { user?.wallet.connect().then((result) => setConnected(result)) }} maxH="2rem" px="0.5rem" borderRadius="0.2rem" background="orange" >Connect</Button>
                  }

                </Stack>
              </Box>
            </ChakraProvider>

          </Html>
      }
    </mesh>
  )
}

export default ChestDeployer
import { useRef, useState } from "react"
import { Html } from "@react-three/drei"
import Experience from "../../../Experience/Experience"
import { useForm } from "react-hook-form";
import { ChakraProvider, FormLabel, Input, Box, Stack, Text, Button, Spacer } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { burnERC20Tx } from "../../../Lib/web3/transactions"
import Contract from "../../../Experience/World/Contract";

const BurnERC20: React.FC<{group: string, experience: Experience}>  = ({ group, experience }) => {
  




  /***********************************|
  |              HOOKS                |
  |__________________________________*/

  const { user } = experience.world
  const [contract, setContract] = useState<Contract>()
  const [mode, setCurrMode] = useState<string | undefined>(undefined)
  const [connected, setConnected] = useState<boolean>()
  const burnRef = useRef<any>()
  const { register, handleSubmit } = useForm();


  


  /***********************************|
  |            FUNCTIONS              |
  |__________________________________*/

  const onSubmit = async (data) => {
    const tx = await burnERC20Tx(user!.wallet, contract?.interface!, data, experience.toast)
    contract!.handleTxs(tx, group, "burn")
    experience.controller[group + "ContractControls"].main()
    setCurrMode(experience.controller.getCurrentMode())
  };

  
  


  /***********************************|
  |             EVENTS                |
  |__________________________________*/

  experience.raycaster.on( `click_${group}_function_burn`, () => { 
    setCurrMode(experience.controller.getCurrentMode())
    setContract(experience.world.lootBoxScene!.smartContracts[group])
    setConnected(experience.world.user!.wallet.isConnected) 
  })


  


  /***********************************|
  |            EXPERIENCE             |
  |__________________________________*/

  return (
    <mesh ref={burnRef} name={`${group} burn`} scale={0.6} position={ [ 0, -1, 0 ] }>

      {mode === "inputsScreen" &&
          <Html
            center
            distanceFactor={5}
            position={ [ 0, 1.67, 0 ] }
            transform
          >
            <ChakraProvider>
              <Box border={"2px solid #9ecaed"} overflowY="auto" width="268px" height={"268px"} padding="1rem" borderRadius={"32px"} textAlign="center" textColor={'white'} boxShadow={"inset 0 0 20px #9ecaed, 0 0 20px #9ecaed"}>

    {/* HEADER */}

                <Box>
                  <Text pb="0.5rem" fontWeight={"bold"} sx={{fontSize: "1rem"}} >Mint</Text>
                  <Box as="button" fontSize={"10px"} position={"fixed"} top="20px" right="20px" onClick={() => {
                    experience.controller[group + "ContractControls"].main()
                    setCurrMode(experience.controller.getCurrentMode())
                  }}
                  >
                    Back <ChevronRightIcon />
                  </Box>
                </Box>

    {/* HEADER END */}

    {/* BODY */}

                <Stack py="1rem" alignItems={"center"} h="85%">

                  <Box width={"100%"}>
                    <FormLabel>amounts</FormLabel>
                    <Input type="number" min="0" placeholder="100" px="1" size="sm" fontSize={"0.5rem"} borderRadius="md" {...register("amount", { required: true })} />
                  </Box>

                  <Spacer />

                  { connected ?
                    <Button onClick={handleSubmit(onSubmit)} alignSelf="center" mt="1rem !important" maxW="5rem" p="0.4rem" borderRadius="0.2rem" bg="blue.500" >Send Tx</Button>
                    :
                    <Button onClick={() => { user?.wallet.connect().then((result) => setConnected(result)) }} mt="1rem !important" p="0.4rem" borderRadius="0.2rem" background="orange" >Connect</Button>
                  }

                </Stack>

    {/* BODY END */}
              </Box>
            </ChakraProvider>
          </Html>
      }
    </mesh>
  )
}

export default BurnERC20 
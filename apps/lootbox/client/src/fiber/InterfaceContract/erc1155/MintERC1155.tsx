import { useRef, useState } from "react"
import { useForm }          from "react-hook-form";
import { Html }             from "@react-three/drei"
import { ChevronRightIcon } from '@chakra-ui/icons'
import { ChakraProvider, FormLabel, Input, Box, Stack, Text, Button, HStack, Spacer } from '@chakra-ui/react'
import { mintERC1155Tx }    from "../../../Lib/web3/transactions"
import Experience           from "../../../Experience/Experience"
import Contract             from "../../../Experience/World/Contract";

const MintERC1155: React.FC<{group: string, experience: Experience, props?: any}>  = ({ group, experience, props }) => {
  




  /***********************************|
  |              HOOKS                |
  |__________________________________*/

  const { user } = experience.world
  const [contract, setContract] = useState<Contract>()
  const [mode, setCurrMode] = useState<string | undefined>(undefined)
  const [connected, setConnected] = useState<boolean>()
  const mintRef = useRef<any>()
  const { register, handleSubmit, formState: { errors } } = useForm();


  


  /***********************************|
  |            FUNCTIONS              |
  |__________________________________*/

  const onSubmit = async (data) => {
    const tx = await mintERC1155Tx(user!.wallet, contract?.interface!, data, experience.toast)
    contract!.handleTxs(tx, group, "mint")
    experience.controller[group + "ContractControls"].main()
    setCurrMode(experience.controller.getCurrentMode())
  };

  
  


  /***********************************|
  |             EVENTS                |
  |__________________________________*/

  experience.raycaster.on( `click_${group}_function_mint`, () => { 
    setCurrMode(experience.controller.getCurrentMode())
    setContract(experience.world.lootBoxScene!.smartContracts[group])
    setConnected(experience.world.user!.wallet.isConnected) 
  })


  


  /***********************************|
  |            EXPERIENCE             |
  |__________________________________*/

  return (
    <mesh ref={mintRef} name={`${group} mint`} scale={0.6} position={ [ 0, -1, 0 ] }>

      {mode === "inputsScreen" &&
          <Html
            center
            distanceFactor={5}
            position={ [ 0, 1.67, 0 ] }
            rotation={ props?.rotation }
            transform
          >
            <ChakraProvider>
              <Box border={"2px solid #9ecaed"} overflowY="auto" width="268px" height={"268px"} padding="1rem" borderRadius={"32px"} textAlign="center" textColor={'white'} boxShadow={"inset 0 0 20px #9ecaed, 0 0 20px #9ecaed"}>
                <Box>
                  <Text fontWeight={"bold"} sx={{fontSize: "1rem"}} >mint</Text>
                  <Text pb="0.5rem" sx={{fontSize: "0.4rem"}} >{contract!.getAddress()}</Text>
                  <Box as="button" fontSize={"10px"} position={"fixed"} top="20px" right="20px" onClick={() => {
                    experience.controller[group + "ContractControls"].main()
                    setCurrMode(experience.controller.getCurrentMode())
                  }}
                  >
                    Back <ChevronRightIcon />
                  </Box>
                </Box>

                <Stack py="1rem" alignItems={"center"} h="85%">

                  <Box width={"100%"}>


                    <FormLabel fontSize={"xs"} mb="0">Receiver address</FormLabel>
                    <Input placeholder="0x..." px="1" size="sm" fontSize={"0.5rem"} borderRadius="md" {...register("to", { required: true, maxLength: 42, minLength: 42, pattern: /^0x[A-Fa-f0-9]{40}$/i})} />
                    {errors.address?.type  === "pattern"  && <p style={{color: "red", fontSize: "6px"}}>Address must start with "0x" and follow by 40 "Aa-Ff" and/or "0-9"<br />example: 0x0A2b6922FcFF343D51efB4bE45CFBA5Cd7aa08B6</p>}
                    {errors.address?.type  === "required" && <p style={{color: "red", fontSize: "10px"}}>Address is required</p>}
                    {(errors.address?.type === "minLength" || errors.address1?.type === "maxLength") && <p style={{color: "red", fontSize: "10px"}}>Address must be 42 long</p>}
                    
                    
                    <HStack alignItems={"center"} mt="1rem">
                      <Text fontSize={"xs"}>Id</Text>
                      <Input _hover={{boxShadow:"inset 0 0 2px white, 0 0 2px white"}} border="none" type="number" min="0" maxW="20%" fontSize="8px" padding="0.3rem" placeholder="0" size="sm" borderRadius={"5px"} {...register("id", {required: true})} />
                      {errors.id?.type === "required" && <Text textAlign={"center"} color="red" fontSize="10px">Id is required</Text>}
                      <Spacer />
                      <Text fontSize={"xs"}>Amount</Text>
                      <Input _hover={{boxShadow:"inset 0 0 2px white, 0 0 2px white"}} border="none" type="number" min="0" maxW="20%" fontSize="8px" padding="0.3rem" placeholder="3" size="sm" borderRadius={"5px"} {...register("amount", {required: true})} />
                      {errors.amount?.type === "required" && <Text textAlign={"center"} color="red" fontSize="10px">Amount is required</Text>}
                    </HStack>

                    <FormLabel m="0" mt="1rem" fontSize={"xs"}>Datas (optional)</FormLabel>
                    <Input placeholder="" px="1" size="sm" fontSize={"0.5rem"} borderRadius="md" {...register("datas")} />


                  </Box>

                  <Spacer />

                  { connected ?
                    <Button onClick={handleSubmit(onSubmit)} alignSelf="center" mt="1rem !important" maxW="5rem" p="0.4rem" borderRadius="0.2rem" bg="blue.500" >Send Tx</Button>
                    :
                    <Button onClick={() => { user?.wallet.connect().then((result) => setConnected(result)) }} mt="1rem !important" p="0.4rem" borderRadius="0.2rem" background="orange" >Connect</Button>
                  }

                </Stack>
              </Box>
            </ChakraProvider>

          </Html>
      }
    </mesh>
  )
}

export default MintERC1155 

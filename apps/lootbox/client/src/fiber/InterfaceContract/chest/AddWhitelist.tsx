import { useRef, useState } from "react"
import { Html } from "@react-three/drei"
import Experience from "../../../Experience/Experience"
import { useForm } from "react-hook-form";
import { ChakraProvider, FormLabel, Input, Box, Stack, Text, Button, Flex, Center } from '@chakra-ui/react'
import { AddIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Contract from "../../../Experience/World/Contract";
import { addWhitelistTx } from "../../../Lib/web3/transactions";

const AddWhitelist: React.FC<{group: string, experience: Experience}> = ({ group, experience }) => {





  /***********************************|
  |              HOOKS                |
  |__________________________________*/

  const { user } = experience.world
  const [contract, setContract] = useState<Contract>()
  const [mode, setCurrMode] = useState<string | undefined>()
  const [addr, setAddr] = useState<any[]>([])
  const [connected, setConnected] = useState<boolean>()
  const addWhitelistRef = useRef<any>()
  const { register, handleSubmit, formState: { errors } } = useForm();





  /***********************************|
  |            FUNCTIONS              |
  |__________________________________*/

  const onSubmit = async (data) => {
    let args: any = Object.entries(data).slice(0, addr.length + 1).map((elem) => elem[1])
    args = new Set(args)

    const tx = await addWhitelistTx(user!.wallet, contract?.interface!, [...args], experience.toast)
    contract!.handleTxs(tx, group, "addWhitelist")
    
    experience.controller[group + "ContractControls"].main()
    setCurrMode(experience.controller.getCurrentMode())
  };
  




  /***********************************|
  |             EVENTS                |
  |__________________________________*/

  experience.raycaster.on( "click_chestSC_function_addWhitelist", () => { 
    setCurrMode(experience.controller.getCurrentMode())
    setContract(experience.world.lootBoxScene!.smartContracts[group])
    setConnected(experience.world.user!.wallet.isConnected)
  })

  



  /***********************************|
  |            EXPERIENCE             |
  |__________________________________*/

  return (
    <mesh ref={addWhitelistRef} name={group + " addWhitelist"} scale={0.6} position={ [0, -1, 0] }  >

      {mode === "inputsScreen" &&
          <Html
            center
            distanceFactor={5}
            position={ [ 0, 1.66, 0 ] }
            rotation={ [ 0, Math.PI * 0.206, 0 ] }
            transform
          >
            <ChakraProvider>
              <Box border={"1px solid #9ecaed"}  overflowY="auto" width="268px" height={"268px"} padding="1rem" borderRadius={"32px"} textAlign="center" textColor={'white'} boxShadow={"inset 0 0 20px #9ecaed, 0 0 20px #9ecaed"}>
                <Box>
                  <Text pb="0.5rem" fontWeight={"bold"} sx={{fontSize: "1rem"}} >Add whitelist</Text>
                  <Box as="button" fontSize={"10px"} position={"fixed"} top="20px" right="20px" onClick={() =>{
                    experience.controller.chestSCContractControls.main()
                    setCurrMode(experience.controller.getCurrentMode())
                  }}
                  >
                    Back <ChevronRightIcon />
                  </Box>
                </Box>

                <Stack py="0.5rem" alignItems={"left"} >

                  <FormLabel>Address</FormLabel>
                  <Input fontSize="8px" padding="0.3rem" placeholder="0x..." size="sm" borderRadius={"5px"} {...register("address1", {required: true, maxLength: 42, minLength: 42, pattern: /^0x[A-Fa-f0-9]{40}$/i})} />
                  {errors.address1?.type === "pattern" && <Text color="red" fontSize="6px">Address must start with "0x" and follow by 40 "Aa-Ff" and/or "0-9"<br />example: 0x0A2b6922FcFF343D51efB4bE45CFBA5Cd7aa08B6</Text>}
                  {errors.address1?.type === "required" && <Text color="red" fontSize="10px">Address is required</Text>}
                  {(errors.address1?.type === "minLength" || errors.address1?.type === "maxLength") && <Text color="red" fontSize="10px">Address must be 42 long</Text>}

                  {addr.map((elem, index) => {

                    return (
                      <Box key={index}>
                        <Flex  alignItems={"left"} >
                          <Input fontSize="7px" p="0.1rem" size="sm" placeholder="0x..." borderRadius={"5px"} {...register(`address${index + 2}`, {required: true, maxLength: 42, minLength: 42, pattern: /^0x[A-Fa-f0-9]{40}$/i})} />
                          <Center>
                            <Button 
                            onClick={() => { addr.splice(index, 1); setAddr(new Array(addr.length).fill('yolo')) }}
                            ml="1rem" 
                            size={"xs"}
                            backgroundColor={"red"} 
                            borderRadius="5rem"
                            >
                              <CloseIcon boxSize="0.5rem" />
                            </Button>
                          </Center>
                        </Flex>
                        {errors[`address${index + 2}`]?.type === "pattern" && <p style={{color: "red", fontSize: "6px"}}>Address must start with "0x" and follow by 40 "a-f" and/or "0-9"</p>}
                        {errors[`address${index + 2}`]?.type === "required" && <p style={{color: "red", fontSize: "10px"}}>Address is required</p>}
                        {(errors[`address${index + 2}`]?.type === "minLength" || errors.address1?.type === "maxLength") && <p style={{color: "red", fontSize: "10px"}}>Address must be 42 long</p>}
                      </Box>)
                  })}

                  <Button alignSelf={'center'} backgroundColor={"green"} width="1.5rem" height="1.5rem" p="0.8rem" borderRadius="10rem" onClick={() => setAddr(new Array(addr.length + 1).fill('yolo'))}><AddIcon boxSize="0.5rem" /></Button>
                  
                  { connected ?
                    <Button onClick={handleSubmit(onSubmit)} alignSelf="center" mt="3rem !important" maxH="2rem" maxW="5rem" px="0.5rem" borderRadius="0.2rem" bg="blue.500">Send Tx</Button>
                    :
                    <Button onClick={() => { user?.wallet.connect().then((result) => setConnected(result)) }} style={{marginTop: "4rem", marginLeft: "auto", marginRight: "auto", fontSize: "1rem"}} px="0.5rem" borderRadius="0.2rem" background="orange" >Connect</Button>
                  }

                </Stack>
              </Box>
            </ChakraProvider>

          </Html>


      }

    </mesh>
  )
}

export default AddWhitelist
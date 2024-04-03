import { useRef, useState } from "react"
import { Html } from "@react-three/drei"
import Experience from "../../../Experience/Experience"
import { useForm } from "react-hook-form";
import { ChakraProvider, FormLabel, Input, Box, Stack, Text, Button, Flex, HStack } from '@chakra-ui/react'
import { ChevronRightIcon, AddIcon, CloseIcon } from '@chakra-ui/icons'
import Contract from "../../../Experience/World/Contract";
import { batchLootTx } from "../../../Lib/web3/transactions";
import { Select } from '@chakra-ui/react'

const defaultBatchLoots = {item: [], tokenIds: [], amounts: [], type_: []}
const TYPE = ["", "ERC20", "ERC721", "ERC1155"];

const BatchLoot: React.FC<{group: string, experience: Experience}> = ({ group, experience }) => {





  /***********************************|
  |              HOOKS                |
  |__________________________________*/

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } }         = useForm();
  const { user }                    = experience.world
  const [contract, setContract]     = useState<Contract>()
  const [mode, setCurrMode]         = useState<string | undefined>()
  const [batch, setBatch]           = useState<any[]>([])
  const [loots, setLoots]           = useState<{item: string[], tokenIds: any[], amounts: any[], type_: any[]}>(defaultBatchLoots)
  const [connected, setConnected]   = useState<boolean>()
  const batchLootRef                = useRef<any>()




  

  /***********************************|
  |            FUNCTIONS              |
  |__________________________________*/

  const onSubmit = async (data) => 
  {
    const indexes: string[]   = Object.entries(data).filter((elem) => elem[0].startsWith("address")).map((elem: any) => elem[1]).slice(0, batch.length + 1)

    const addresses: string[] = indexes.map(type => loots.item[parseInt(type)])
    const ids: string[]       = Object.entries(data).filter((elem) => elem[0].startsWith("id")).map((elem: any)     => elem[1]).slice(0, batch.length + 1)
    const amounts: string[]   = Object.entries(data).filter((elem) => elem[0].startsWith("amount")).map((elem: any) => elem[1]).slice(0, batch.length + 1)
    const types: number[]     = indexes.map(type => loots.type_[parseInt(type)])

    const args = { items: addresses, tokenIds: ids, amounts: amounts }
    const tx = await batchLootTx(user!.wallet, contract?.interface!, args, types, experience.toast)
    contract!.handleTxs(tx, group, "batchLoot")

    experience.controller[group + "ContractControls"].main()
    setCurrMode(experience.controller.getCurrentMode())
  };

  const lookInside = async (): Promise<any> => 
  {
    const contract = experience.world.lootBoxScene!.smartContracts[group].interface
    const chest = await contract.connect(experience.world.user?.wallet.signer)
    const res = await chest.look()
    return {item: res[0], tokenIds: res[1], amounts: res[2], type_: res[3]}
  }





  /***********************************|
  |             EVENTS                |
  |__________________________________*/

  experience.raycaster.on( `click_${group}_function_batchLoot`, async () => { 
    setCurrMode(experience.controller.getCurrentMode())
    setContract(experience.world.lootBoxScene!.smartContracts[group])
    setConnected(experience.world.user!.wallet.isConnected)
    setLoots(await lookInside())
  })

  



  /***********************************|
  |            EXPERIENCE             |
  |__________________________________*/

  return (
    <mesh ref={batchLootRef} name={group + " batchLoot"} scale={0.6} position={ [0, -1, 0] }  >

      {mode === "inputsScreen" &&
          <Html
            distanceFactor={5}
            position={ [ 0, 1.66, 0 ] }
            rotation={ [ 0, Math.PI * 0.206, 0 ] }
            transform
          >
            <ChakraProvider>
              <Box border={"1px solid #9ecaed"}  overflowY="auto" width="268px" height={"268px"} padding="1rem" borderRadius={"32px"} textAlign="center" textColor={'white'} boxShadow={"inset 0 0 20px #9ecaed, 0 0 20px #9ecaed"}>

                <Box>
                  <Text pb="0.5rem" fontWeight={"bold"} sx={{fontSize: "1rem"}} >BatchLoot</Text>
                  <Box as="button" fontSize={"10px"} position={"fixed"} top="20px" right="20px" onClick={() =>{
                    experience.controller.chestSCContractControls.main()
                    setCurrMode(experience.controller.getCurrentMode())
                  }}
                  >
                    Back <ChevronRightIcon />
                  </Box>
                </Box>


                <Stack alignItems={"left"} spacing="2rem" >
                  <Box>
                    <FormLabel  m="0" width="3.7rem" position={"relative"} left="5" overflow={"hidden"} >Batch 1</FormLabel>
                    <Box border="0.01rem solid white" borderRadius={"xl"} textAlign="left" p="0.5rem">

                      <Box >
                        <Text fontSize={"xs"}>Address</Text>
                        <Select fontSize={"0.8rem"} placeholder='Select option' _hover={{boxShadow:"inset 0 0 2px white, 0 0 2px white"}} border="none" {...register("address", {required: true})}>
                          {loots.item.length && loots.item.map((elem, index) => {
                            return (<option key={index} value={index}>{TYPE[loots.type_[index].toString()]} - {elem} - ID {loots.tokenIds[index].toString()}</option>)
                          })}
                        </Select>
                      </Box>

                      <HStack mt="1rem" alignItems={"center"}>
                          <Text fontSize={"xs"}>Id</Text>
                          <Input type="number" id="id" value={loots.tokenIds[parseInt(watch().address)] ?? '0'}  disabled={!loots.item.length} _hover={{boxShadow:"inset 0 0 2px white, 0 0 2px white"}} border="none"  min="0" maxW="10%" fontSize="8px" padding="0.3rem" placeholder="0" size="sm" borderRadius={"5px"} {...register("id", {required: true})} />
                          {errors.amount1?.type === "required" && <Text textAlign={"center"} color="red" fontSize="10px">Amount is required</Text>}
                          <Text fontSize={"xs"}>Amount</Text>
                          <Input 
                            type="number" 
                            id="amount" 
                            disabled={!loots.item.length} 
                            _hover={{boxShadow:"inset 0 0 2px white, 0 0 2px white"}} 
                            border="none" 
                            min={loots.type_[parseInt(watch().address)] === 1 ? "0" : "1"} 
                            max={loots.amounts[parseInt(watch().address)]} 
                            step=".000000000000000001" 
                            maxW="100%" 
                            fontSize="8px" 
                            padding="0.3rem" 
                            placeholder="1" 
                            size="sm" 
                            borderRadius={"5px"} 
                            {...register("amount", { required: true } )} 
                          />
                          {errors.amount1?.type === "required" && <Text textAlign={"center"} color="red" fontSize="10px">Amount is required</Text>}
                      </HStack>
                     </Box>
                  </Box>


                     {batch.map((elem, index) => {

                        return (
                          <Box key={index}>

                            <Flex position={"relative"} left="5">
                              <FormLabel  m="0" width="3.7rem"  overflow={"hidden"} >Batch {index + 2}</FormLabel>

                              <Button 
                              onClick={() => { batch.splice(index, 1); setBatch(new Array(batch.length).fill('yolo')) }}
                              ml="1rem"
                              size={"xs"}
                              backgroundColor={"red"} 
                              borderRadius="5rem"
                              >
                                <CloseIcon boxSize="0.5rem" />
                              </Button>
                            </Flex>

                            <Box border="0.01rem solid white" borderRadius={"xl"} textAlign="left" p="0.5rem">
      
                              <Box >
                                <Text fontSize={"xs"}>Address</Text>
                                <Select fontSize={"0.8rem"} placeholder='Select option' _hover={{boxShadow:"inset 0 0 2px white, 0 0 2px white"}} border="none" {...register("address" + (index + 1), {required: true})}>

                                  {loots.item.length && loots.item.map((elem, index) => {
                                    return (
                                    <option 
                                      key={index} 
                                      value={index} 
                                      disabled={Object.entries(watch()).map(elem => {return elem[0].startsWith("address") ?  parseInt(elem[1]) : ""}).includes(index)} // disable if option has already been taken
                                    >
                                      {TYPE[loots.type_[index].toString()]} - {elem} - ID {loots.tokenIds[index].toString()}
                                    </option>
                                    )})
                                  }

                                </Select>
                              </Box>
      
                              <HStack mt="1rem" alignItems={"center"}>

                                  <Text fontSize={"xs"}>Id</Text>
                                  <Input 
                                    type="number" 
                                    id="id" 
                                    value={loots.tokenIds[parseInt(watch()[`address${index + 1}`])] ?? '0'}  
                                    disabled={!loots.item.length} 
                                    _hover={{boxShadow:"inset 0 0 2px white, 0 0 2px white"}} 
                                    border="none"  
                                    min="0" 
                                    maxW="10%" 
                                    fontSize="8px" 
                                    padding="0.3rem" 
                                    placeholder="0" 
                                    size="sm" 
                                    borderRadius={"5px"} 
                                    {...register("id" + (index + 1), {required: true})} 
                                  />
                                  {errors[`id${index + 1}`]?.type === "required" && <Text textAlign={"center"} color="red" fontSize="10px">Amount is required</Text>}
                                  
                                  <Text fontSize={"xs"}>Amount</Text>
                                  <Input 
                                    type="number" 
                                    id="amount" 
                                    disabled={!loots.item.length} 
                                    _hover={{boxShadow:"inset 0 0 2px white, 0 0 2px white"}} 
                                    border="none" 
                                    min={loots.type_[   parseInt( watch()[ `address${index + 1}` ] ) ] === 1 ? "0" : "1"} 
                                    max={loots.amounts[ parseInt( watch()[ `address${index + 1}` ] ) ]                  } 
                                    step=".000000000000000001" 
                                    maxW="100%" 
                                    fontSize="8px" 
                                    padding="0.3rem" 
                                    placeholder="1" 
                                    size="sm" 
                                    borderRadius={"5px"} 
                                    {...register("amount" + index + 1, { required: true } )} 
                                  />
                                  {errors[`amount${index + 1}`]?.type === "required" && <Text textAlign={"center"} color="red" fontSize="10px">Amount is required</Text>}
                              </HStack>
                           </Box>
                          </Box>
                           )
                      })}
                  
                  <Button alignSelf={'center'} backgroundColor={"green"} width="1.5rem" height="1.5rem" p="0.8rem" borderRadius="10rem" onClick={() => setBatch(new Array(batch.length + 1).fill('yolo'))}><AddIcon boxSize="0.5rem" /></Button>
                  
                  { connected ?
                    <Button disabled={!loots.item.length} onClick={handleSubmit(onSubmit)} alignSelf="center" maxH="2rem" maxW="5rem" px="0.5rem" borderRadius="0.2rem" bg="blue.500">Send Tx</Button>
                    :
                    <Button onClick={() => { user?.wallet.connect().then((result) => setConnected(result)) }} alignSelf="center" maxH="2rem" maxW="5rem" px="0.5rem" borderRadius="0.2rem" bg="orange" >Connect</Button>
                  }

                </Stack>
              </Box>
            </ChakraProvider>
          </Html>
      }
    </mesh>
  )
}

export default BatchLoot
import { useRef, useState } from "react"
import { Html } from "@react-three/drei"
import Experience from "../../Experience/Experience"
import { useForm } from "react-hook-form";
import { ChakraProvider, FormLabel, Input, Box, Text, Button } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Contract from "../../Experience/World/Contract";
import { transferOwnershipTx } from "../../Lib/web3/transactions";

const TransferOwnership: React.FC<{group: string, experience: Experience, props?: any}> = ({ group, experience, props = {} }) => {





  /***********************************|
  |              HOOKS                |
  |__________________________________*/

  const { user } = experience.world
  const [contract, setContract] = useState<Contract>()
  const [mode, setCurrMode] = useState<string | undefined>()
  const [connected, setConnected] = useState<boolean>()
  const transferOwnershipRef = useRef<any>()
  const { register, handleSubmit, formState: { errors } } = useForm();





  /***********************************|
  |            FUNCTIONS              |
  |__________________________________*/

  const onSubmit = async (data) => {

    const tx = await transferOwnershipTx(user!.wallet, contract?.interface!, data.address, group, experience.toast)
    contract!.handleTxs(tx, group, "transferOwnership")
  };
  




  /***********************************|
  |             EVENTS                |
  |__________________________________*/

  experience.raycaster.on( `click_${group}_function_transferOwnership`, () => { 
    setCurrMode(experience.controller.getCurrentMode())
    setContract(experience.world.lootBoxScene!.smartContracts[group])
    setConnected(experience.world.user!.wallet.isConnected)
    transferOwnershipRef.current.applyQuaternion(experience.world.lootBoxScene!.smartContracts[group].inputsScreen.quaternion)
  })

  



  /***********************************|
  |            EXPERIENCE             |
  |__________________________________*/

  return (
    <mesh ref={transferOwnershipRef} name={group + " transferOwnership"} scale={0.6} position={ [0, -1, 0] }  >

      {mode === "inputsScreen" &&
          <Html
            center
            distanceFactor={5}
            position={ [ 0, 1.66, 0 ] }
            rotation={ props?.rotation }
            transform
          >
            <ChakraProvider>
              <Box border={"1px solid #9ecaed"}  overflowY="auto" width="268px" height={"268px"} padding="1rem" borderRadius={"32px"} textAlign="center" textColor={'white'} boxShadow={"inset 0 0 20px #9ecaed, 0 0 20px #9ecaed"}>
                <Box>
                  <Text pb="0.5rem" fontWeight={"bold"} sx={{fontSize: "1rem"}} >Transfer ownership</Text>
                  <Box as="button" fontSize={"10px"} position={"fixed"} top="20px" right="20px" onClick={() =>{
                    experience.controller[`${group}ContractControls`].main()
                    setCurrMode(experience.controller.getCurrentMode())
                  }}
                  >
                    Back <ChevronRightIcon />
                  </Box>
                </Box>

                <Box mt="2rem">
                  <FormLabel>New owner</FormLabel>
                  <Input placeholder="0x..." px="1" size="sm" fontSize={"0.5rem"} borderRadius="md" {...register("address", { maxLength: 42, minLength: 42, pattern: /^0x[A-Fa-f0-9]{40}$/i})} />
                  {errors.address?.type === "pattern" && <p style={{color: "red", fontSize: "6px"}}>Address must start with "0x" and follow by 40 "Aa-Ff" and/or "0-9"<br />example: 0x0A2b6922FcFF343D51efB4bE45CFBA5Cd7aa08B6</p>}
                  {errors.address?.type === "required" && <p style={{color: "red", fontSize: "10px"}}>Address is required</p>}
                  {(errors.address?.type === "minLength" || errors.address1?.type === "maxLength") && <p style={{color: "red", fontSize: "10px"}}>Address must be 42 long</p>}
                </Box>
                  
                { connected ?
                  <Button onClick={handleSubmit(onSubmit)} alignSelf="center" mt="4rem !important" maxH="2rem" maxW="5rem" px="0.5rem" borderRadius="0.2rem" bg="blue.500">Send Tx</Button>
                  :
                  <Button onClick={() => { user?.wallet.connect().then((result) => setConnected(result)) }} style={{marginTop: "4rem", marginLeft: "auto", marginRight: "auto", fontSize: "1rem"}} px="0.5rem" borderRadius="0.2rem" background="orange" >Connect</Button>
                }

              </Box>
            </ChakraProvider>

          </Html>


      }

    </mesh>
  )
}

export default TransferOwnership
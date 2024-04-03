import { useRef, useState } from "react"
import { Html } from "@react-three/drei"
import Experience from "../../Experience/Experience"
import { useForm } from "react-hook-form";
import { ChakraProvider, FormLabel, Input, Box, Stack, Text, Button, Spacer } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Import: React.FC<{group: string, experience: Experience}>  = ({ group, experience }) => {
  // hooks
  const { user } = experience.world
  const [connected, setConnected] = useState<boolean>()
  const [mode, setCurrMode] = useState<string | undefined>(undefined)
  const importRef = useRef<any>()
  const { register, handleSubmit, formState: { errors } } = useForm();

  // functions
  const onSubmit = (data) => { 
    experience.world.lootBoxScene!.smartContracts[group].attachAddress(data.address)
    experience.controller[group + "ContractControls"].main()
    setCurrMode(experience.controller.getCurrentMode())
    experience.world.lootBoxScene!.smartContracts[group].trigger("import " + group)

    window.setTimeout(() => experience.toast.import(data.address), 100)
  };
  
  // Events
  experience.raycaster.on( `click_${group}_function_import`, () => { 
    setCurrMode(experience.controller.getCurrentMode())
  })


  // Front
  return (
    <mesh ref={importRef} name={group + " import"} scale={0.6} position={ [ 0, -1, 0 ] }>

      {mode === "metaScreen" &&
          <Html
            center
            distanceFactor={5}
            position={ [ 0, 1.67, 0 ] }
            rotation={ [ 0, -0.015, 0 ] }
            transform
          >
            <ChakraProvider>
              <Box border={"2px solid #9ecaed"} overflowY="auto" width="268px" height={"268px"} padding="1rem" borderRadius={"32px"} textAlign="center" textColor={'white'} boxShadow={"inset 0 0 20px #9ecaed, 0 0 20px #9ecaed"}>
                <Box>
                  <Text pb="0.5rem" fontWeight={"bold"} sx={{fontSize: "1rem"}} >Import {group}</Text>
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
                    <FormLabel>address</FormLabel>
                    <Input placeholder="0x..." px="1" size="sm" fontSize={"0.5rem"} borderRadius="md" {...register("address", { maxLength: 42, minLength: 42, pattern: /^0x[A-Fa-f0-9]{40}$/i})} />
                    {errors.address?.type === "pattern" && <p style={{color: "red", fontSize: "6px"}}>Address must start with "0x" and follow by 40 "Aa-Ff" and/or "0-9"<br />example: 0x0A2b6922FcFF343D51efB4bE45CFBA5Cd7aa08B6</p>}
                    {errors.address?.type === "required" && <p style={{color: "red", fontSize: "10px"}}>Address is required</p>}
                    {(errors.address?.type === "minLength" || errors.address1?.type === "maxLength") && <p style={{color: "red", fontSize: "10px"}}>Address must be 42 long</p>}
                  </Box>

                  <Spacer />

                  { connected ?
                    <Button onClick={handleSubmit(onSubmit)} alignSelf="center" mt="2rem !important" maxH="2rem" maxW="5rem" px="0.5rem" borderRadius="0.2rem" bg="blue.500" >Import</Button>
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

export default Import 
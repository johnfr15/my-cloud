import {
    Button,
    Box,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'



export const Context: React.FC<{ messages: any[] }> = ({ messages }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()





    /***********************************|
    |            COMPONENTS             |
    |__________________________________*/
    return (
      <>
        <Button onClick={onOpen} mt={4} mx={1}>Context</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Context</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                { messages.map(( message: any, index: number ) => {
                    return (
                        <Box my="3" rounded={20} bgColor={"#1A202C"} p={5} key={index}>
                            <Text>Role: { message.role }</Text>
                            <Text fontWeight={'bold'}>{ message.content ?? '' }</Text>
                        </Box>
                    )
                })}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
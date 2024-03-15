import { useState } from 'react';
import { Link } from "react-router-dom"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
  


interface SignupLayoutProps {
    register?: ( value: FormValues ) => void; // Adjust the type of 'data' based on your form data structure
    errorRegistering?: string;
    signinPath?: string
}

type FormValues = {
    username: string,
    firstName: string,
    lastName: string,
    email: string
    password: string
    remember: boolean
}

const defaultProps: SignupLayoutProps = {
    register: ( value: FormValues ) => console.log(value),
    signinPath: '/signin',
}



export const SignupLayout = ( props: SignupLayoutProps ) => 
{
    const { register, errorRegistering, signinPath } = { ...defaultProps, ...props }
    const { handleSubmit, register: registerInput, formState: { isSubmitting } } = useForm<FormValues>()
    const [showPassword, setShowPassword] = useState(false)

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
        <form onSubmit={ handleSubmit(register!) }>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" {...registerInput('username', { required: 'This is required' } ) }/>
                        </FormControl>

                        <HStack>
                            <Box>
                                <FormControl id="firstName">
                                <FormLabel>First Name</FormLabel>
                                <Input type="text" {...registerInput('firstName') } />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                <FormLabel>Last Name</FormLabel>
                                <Input type="text" {...registerInput('lastName') } />
                                </FormControl>
                            </Box>
                        </HStack>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" {...registerInput('email', { required: 'This is required' } ) }/>
                        </FormControl>

                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input 
                                    type={showPassword ? 'text' : 'password'} 
                                    {...registerInput('password', { required: 'This is required' } ) }
                                />
                                <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        { errorRegistering && <Text color={'red.700'}>{errorRegistering}</Text> }

                        <Stack spacing={10} pt={2}>
                            <Button
                                type='submit'
                                isLoading={ isSubmitting }
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                            >
                                Sign up
                            </Button>
                        </Stack>

                        <Stack align={'center'}>
                            <Stack direction={{ base: 'column', sm: 'row' }}>
                                <Text align={'center'}>Already a user?</Text>
                                <Text color={'blue.400'}><Link to={ signinPath! }>Login</Link></Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </form>
    </Flex>
  )
}

export default SignupLayout
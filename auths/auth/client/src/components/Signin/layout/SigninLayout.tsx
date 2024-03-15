import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
// TODO OAuthentication methods
// import { OAuthButtonGroup } from './utils/OAuthButtonGroup'
import { useForm } from 'react-hook-form'
  


interface LoginLayoutProps {
    login?: ( value: FormValues ) => void; // Adjust the type of 'data' based on your form data structure
    errorLogin?: string;
    signupPath?: string
    resetPath?: string
}

type FormValues = {
    email: string
    password: string
    remember: boolean
}

const defaultProps: LoginLayoutProps = {
    login: ( value: FormValues ) => console.log(value),
    signupPath: '/signup',
    resetPath: '/reset-password',
}



export const SigninLayout = ( props: LoginLayoutProps ) => 
{
    const { login, errorLogin, signupPath, resetPath } = { ...defaultProps, ...props }
    const { handleSubmit, register, formState: { isSubmitting } } = useForm<FormValues>()

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
        <form onSubmit={ handleSubmit(login!) }>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>

                    <Stack                     
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                    >
                        <Text color="fg.muted">Don't have an account?</Text>
                        <Link to={ signupPath! }>
                            <Text color={'blue.400'}>Sign up</Text>
                        </Link>
                    </Stack>
                </Stack>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" 
                                {...register('email', { required: 'This is required' } ) }
                            />
                        </FormControl>

                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" 
                                {...register('password', { required: 'This is required' } ) } 
                            />
                            { errorLogin && <Text fontWeight={'bold'} color={'crimson'}>{ errorLogin }</Text>} 
                        </FormControl>

                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox {...register('remember') }>Remember me</Checkbox>
                                <Link to={ resetPath! }>
                                    <Text color={'blue.400'}>Forgot password?</Text>
                                </Link>
                            </Stack>

                            <Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    type={'submit'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    isLoading={isSubmitting}
                                >
                                    Sign in
                                </Button>
                                {/* 
                                    // TODO OAuthentication methods

                                    <HStack>
                                        <Divider />
                                        <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                                            or continue with
                                        </Text>
                                        <Divider />
                                    </HStack>
                                    <OAuthButtonGroup /> 
                                */}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </form>
    </Flex>
  )
}

export default SigninLayout
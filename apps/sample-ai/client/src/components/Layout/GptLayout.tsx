import {
    FormLabel,
    FormControl,
    Button,
    Box,
    Text,
    Textarea,
  } from '@chakra-ui/react'
import { UseFormReturn } from 'react-hook-form'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { Context } from './Context';
  
type GptLayoutProps = {
    modelName?: string,
    modelDescription?: string,
    form?: UseFormReturn,
    onSubmit?: (value: any) => Promise<void>,
    dialog?: ChatCompletionMessageParam[],
    messages?: any,
    answering?: string
}

const Gpt35TurboLayout = ( props: GptLayoutProps ) =>
{
const { modelName, modelDescription, dialog, messages, answering, form, onSubmit } = props 
const { handleSubmit, register, formState: { isSubmitting } } = form as UseFormReturn

return (
    <Box width={'100%'} p={'10rem'}>

        <Text fontSize={'3xl'} >{ modelName }</Text>
        <Text fontSize={'xl'} >{ modelDescription }</Text>

        <br />
        <br />

        <Box>
        { dialog && dialog.map(( message: any, index: number ) => {
                return (
                    <Box 
                    my="3" 
                    rounded={20} 
                    whiteSpace="pre-wrap"
                    fontFamily="monospace"
                    bgColor={"#2D3748"} 
                    border={message.role === 'error' ? '1px' : ''}  
                    borderColor={message.role === 'error' ? '#C53030' : ''} 
                    p={5} 
                    key={index}
                    >
                        <Text fontWeight={'bold'} >{ message.role === 'user' ? 'You' : 'Bot' }</Text>
                        <Text color={ message.role === 'error' ? '#C53030' : ''} >{ message.content }</Text>
                    </Box>
                )
        })}
        { answering && 
            <Box my="3" p={5} whiteSpace="pre-wrap" fontFamily="monospace" rounded={20} bgColor={"#2D3748"}>
                <Text fontWeight={'bold'}>{ 'Bot' }</Text>
                <Text>{ answering }</Text>
            </Box>
        }
        </Box>
        
        <br />

        <form onSubmit={ handleSubmit(onSubmit!) }>
            <FormControl>

                <FormLabel htmlFor='url'>message</FormLabel>
                <Textarea
                    id='message'
                    placeholder='Tell me a joke.'
                    {...register('message', { required: 'This is required' } ) }
                />

            </FormControl>

            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
            <Context messages={messages} />
        </form>

    </Box>
)
}

export default Gpt35TurboLayout
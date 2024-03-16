import axios from 'axios';
import { useForm } from 'react-hook-form'
import { FormLabel, FormControl, Button, Box, Text, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

const { VITE_API_ADDRESS, VITE_SERVICE_BASE_PATH } = import.meta.env

const DALL_E_3 = () =>
{
    const [ messages, setMessages ] = useState<{[key: string]: string}[]>([])
    const { handleSubmit, register, formState: { isSubmitting } } = useForm()


    const onSubmit = async( values: any ) => 
    {
        const discussion = messages
        discussion.push( { role: "user", content: values.message })

    
        try {
            
            const data = JSON.stringify({
                model: "dall-e-3",
                messages: values.messages, 
                size: "1024x1024",
                quality: "standard",
                n: 1,
            })
            const response: any = await axios.post( `http://${VITE_API_ADDRESS}${VITE_SERVICE_BASE_PATH}/openai/dalle-e-3`, data )
            console.log(response)
            

        } catch (error: any) {

            let errorMessage = "An error occurred while processing your request.";

            if (error instanceof SyntaxError)
                errorMessage = "Failed to parse JSON. Please check the format of the data.";
            if (error instanceof Error)
                errorMessage = error.message.replace(" in organization org-C0Z95EOOs3fhdEFYe9U53Tr1", '')

            console.log(errorMessage)
        }
    }





    /***********************************|
    |            CONSTRUCTOR            |
    |__________________________________*/
    useEffect(() => 
    {
        const context = [
            { role: "system", content: "Your name is Jonathan now and you are a helful assistant." },
        ]

        setMessages( context )
    }, [])





    /***********************************|
    |            COMPONENTS             |
    |__________________________________*/
    return (
        <Box width={'100%'} p={'10rem'} id="tsparticles">

            <Text fontSize={'3xl'} >DALL-E 3</Text>
            <Text fontSize={'xl'} >Images generator</Text>

            <br />
            <br />

            <Text >Coming soon 👀...</Text> 

            <br />

            <form onSubmit={ handleSubmit(onSubmit) }>
                <FormControl>

                    <FormLabel htmlFor='url'>message</FormLabel>
                    <Textarea
                        id='message'
                        placeholder='A cat riding a Harley Davidson with sun glasses.'
                        {...register('message', { required: 'This is required' } ) }
                    />

                </FormControl>

                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' disabled={true} >
                    Submit
                </Button>
            </form>

        </Box>
    )
}

export default DALL_E_3
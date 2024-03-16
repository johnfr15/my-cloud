import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FormLabel, FormControl, Button, Box, Text, Textarea, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { tools, Functions } from "../../../tools"
import ConnectButton from "../../Layout/Wallet";
import { useWeb3ModalProvider  } from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const { VITE_API_ADDRESS, VITE_SERVICE_BASE_PATH } = import.meta.env

const GPT_3_5_TURBO_ACTION = ( ) =>
{
    const [ messages, setMessages ] = useState<ChatCompletionMessageParam[]>([])
    const [ logs, stdout ] = useState('')
    const { handleSubmit, register, formState: { isSubmitting } } = useForm()
    const { walletProvider } = useWeb3ModalProvider()





    const completion = async( response: any ) => {

        let reason = response.choices[0].finish_reason
        let message = response.choices[0].message
    
        if ( reason === "tool_calls" )
        {
            while ( reason !== 'stop' )
            {
                const call = message.tool_calls[0]
                const func = call.function
    
                const funcName: string = func.name
                const args = JSON.parse( func.arguments )
    
                if ( funcName === 'swap' )
                {
                    if ( !walletProvider )
                        throw new Error('You need to connect your wallet first')
    
                    const provider = new BrowserProvider( walletProvider )
                    const signer = await provider.getSigner()
                    await Functions[ funcName ]( signer, ...Object.values( args ) ) 
    
                    stdout((prev: string) => prev + "Transaction success\n\n")
    
                    return 0
                }
    
                let res = null
                if ( Object.keys( args ).length > 0 )
                    res = Functions[ funcName ]( args, stdout )
                else
                    res = Functions[ funcName ]( stdout )

                
                messages.push(
                    {
                        role: "function",
                        content: res.toString(),
                        name: funcName,
                    }
                )
                setMessages( (prev: any) => prev.concat( messages ) )
    
                const data = JSON.stringify({ 
                    messages: messages, 
                    tools: tools, 
                    tool_choice: 'auto' 
                })
                const response: any = await axios.post( `http://${VITE_API_ADDRESS}${VITE_SERVICE_BASE_PATH}/openai/gpt-3.5-turbo-1106`, data )

                reason = response.data.choices[0].finish_reason
                message = response.data.choices[0].message
            }
        }
    
        if ( reason === "stop" )
        {
            setMessages(( prev: any ) => prev.concat( {role: "assistant", content: message.content} ))
            stdout(( prev: any ) => prev + message.content + '\n\n' )
        }
        
    }

    const onSubmit = async( values:any ) => 
    {
        const discussion = messages
        
        try {
            
            discussion.push( { role: "user", content: values.message })
            
            const data = JSON.stringify({ 
                messages: messages, 
                tools: tools, 
                tool_choice: 'auto' 
            })
            const response = await axios.post( `http://${import.meta.env.VITE_API_ADDRESS}/openai/gpt-3.5-turbo-1106`, data )

            console.log( response )

            await completion( response.data )

        } catch (error: any) {

            let errorMessage = "An error occurred while processing your request.";

            if (error instanceof SyntaxError)
                errorMessage = "Failed to parse JSON. Please check the format of the data.";
            if (error instanceof Error)
                errorMessage = error.message

            stdout( (prev: string) => prev + errorMessage + '\n\n' )
        }
    }





    /***********************************|
    |            CONSTRUCTOR            |
    |__________________________________*/
    useEffect(() => 
    {
        const context: ChatCompletionMessageParam[]  = [
            { role: "system", content: "Your name is Jonathan now and you are a helful assistant." },
            { role: "system", content: "You can only use the 'tools' I provided to you to help me. NOTHING ELSE !" },
            { role: "system", content: "You can only use the type ['number', 'string', 'object', 'boolean'] for the functions's argument." },
            { role: "system", content: "Of course if you need the user to specify more details about the parameters needed for a function you have in mind, you can output the user a message" },
            { role: "system", content: "Of course if none of the function is found for my question you can output me a message" },
        ]

        setMessages( context )
    }, [])





    /***********************************|
    |            COMPONENTS             |
    |__________________________________*/
    return (
        <Box width={'100%'} p={'10rem'} id="tsparticles">

            <Text fontSize={'3xl'} >GPT-3.5-turbo-1106</Text>
            <Stack>
                <Text fontSize={'xl'} >Chat completion by using pre defined functions</Text>
                <ConnectButton />
            </Stack>

            <br />
            <br />

            <Box>
                <Text>Functions</Text>
                { tools.map((tool: any, index: number) => {

                    return (
                        <Button
                        key={index} 
                        // onClick={() => {}} 
                        mx='1'
                        padding={0}
                        >
                            { tool.image || tool.icon }
                        </Button>
                    )

                })}
            </Box>

            <br />
            <br />

            <Box><pre>{ logs }</pre></Box>

            <br />

            <form onSubmit={ handleSubmit(onSubmit) }>
                <FormControl>

                    <FormLabel htmlFor='url'>message</FormLabel>
                    <Textarea
                        id='message'
                        placeholder='Can you add 3 and 45 then with the result multiply it by 4'
                        {...register('message', { required: 'This is required' } ) }
                    />

                </FormControl>

                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </form>

        </Box>
    )
}

export default GPT_3_5_TURBO_ACTION
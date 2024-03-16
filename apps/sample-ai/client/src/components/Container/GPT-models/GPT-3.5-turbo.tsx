import React from "react"
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const { VITE_API_ADDRESS, VITE_SERVICE_BASE_PATH } = import.meta.env

const Gpt35TurboContainer = ( props: any ) =>
{
    const [ messages, setMessages ] = useState<ChatCompletionMessageParam[]>([])
    const [ dialog, setDial ] = useState<ChatCompletionMessageParam[]>([])
    const [ answering, setAnswering ] = useState<string>('')
    const form = useForm()


    const onSubmit = async( values: any ) => 
    {
        let reader: ReadableStreamDefaultReader | null = null

        setDial( (prev: any[]) => prev.concat({ role: "user", content: values.message }) )
        setMessages( (prev: any[]) => prev.concat({ role: "user", content: values.message }) )
        const context = messages.concat({ role: "user", content: values.message })

        console.log("context: ", context)
        try {

            const data = JSON.stringify({ messages: context })
            const response = await fetch( `http://${VITE_API_ADDRESS}${VITE_SERVICE_BASE_PATH}/openai/gpt-3.5-turbo`, {
                method: 'POST',
                body: data
            })

            if ( response.body === null )
                throw new Error(`HTTP error! Status: ${response.status}`);

            // Access the ReadableStream
            const stream: ReadableStream = response.body;
            reader = stream.getReader();

            // Loop to read stream from server and update the component
            let text = ''
            while ( true ) 
            {
              const { done, value } = await reader.read();
        
              if ( done ) break;
        
              // Assuming the stream is encoded in UTF-8
              const chunk = new TextDecoder().decode(value);
              text += chunk

              // dynamic answering component one it is finish it will be dialog displaying the message from the bot
              setAnswering( (prev) => prev + chunk )
            }
            
            // Update the last message 
            setDial( (prev: ChatCompletionMessageParam[]) => prev.concat({ role: 'assistant', content: text}) )
            setMessages( (prev: ChatCompletionMessageParam[]) => prev.concat({ role: 'assistant', content: text}) )
            setAnswering( '' )

        } catch (error: any) {

            if ( error instanceof Error )
                setDial( (prev: any[]) => prev.concat({role: 'error', content: error?.message + '\n\n'}) )
            else
                setDial( (prev: any[]) => prev.concat({role: 'error', content: "An error occured\n\n"}) )

        } finally {

            if ( reader )
                reader.releaseLock();

        }
    }




    /***********************************|
    |            CONSTRUCTOR            |
    |__________________________________*/
    useEffect(() => {
        const context: ChatCompletionMessageParam[] = [
            { role: "system", content: "Your name is Jonathan now and you are a helful assistant." }
        ]

        setMessages( context )
    }, [])





    /***********************************|
    |               LAYOUT              |
    |__________________________________*/
    // If the container has children return the Layout with the business logic or nothing
    if ( React.isValidElement(props.children) )
    {
        return React.cloneElement( 
            props.children, 
            { 
                ...props, 
                messages, 
                dialog, 
                answering, 
                form, 
                onSubmit, 
                modelName: "GPT-3.5-turbo", 
                modelDescription: "Chat completion"
            }
        )
    }
    
    return <></> 
}

export default Gpt35TurboContainer
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import {
  FormLabel,
  FormControl,
  Button,
  Box,
  Textarea,
  Text,
} from '@chakra-ui/react'

const { VITE_API_ADDRESS, VITE_SERVICE_BASE_PATH } = import.meta.env

type FormValues = {
    message: string
    voice: Voice
}
type Voice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"
const voiceOptions: Voice[] = ["alloy", "echo", 'fable', 'onyx', 'nova', 'shimmer']

const TTS_1 = () =>
{
    const [ blob, setBlob ] = useState<null | Blob>( null )
    const [ currentVoice, setVoice ] = useState<Voice>( "alloy" )
    const [ error, setError ] = useState<string | null>( null )
    const { handleSubmit, register, formState: { isSubmitting } } = useForm<FormValues>()
    


    const onSubmit = async( values: FormValues ) => {

        let reader: ReadableStreamDefaultReader | null = null

        try {
            
            const data: string = JSON.stringify({ 
                message: values.message,
                voice: currentVoice
            })
            const response = await fetch( `http://${VITE_API_ADDRESS}${VITE_SERVICE_BASE_PATH}/openai/tts-1`, {
                method: 'POST',
                body: data
            })

            if ( response.body === null )
                throw new Error(`HTTP error! Status: ${response.status}`);

            // Access the ReadableStream
            const stream: ReadableStream = response.body;
            reader = await stream.getReader();

            // Loop to read stream from server and update the component
            const loop = true
            const chunks = []
            while ( loop ) 
            {
              const { done, value } = await reader.read();
        
              if (done) break;
        
              chunks.push( value )
            } 
            
            const blob = new Blob(chunks, { type: 'audio/mpeg' });
            setBlob( blob )
            setError(null)
            
        } catch (error) {
            
            if ( error instanceof Error )
                setError( error.message )
            else
                setError('An error occured')
        }
    }





    /***********************************|
    |            COMPONENTS             |
    |__________________________________*/
    return (
        <Box width={'100%'} p={'10rem'}>

            <Text fontSize={'3xl'} >TTS-1</Text>
            <Text fontSize={'sm'} >Text-to-speech</Text>
            <Text fontSize={'xl'} >Create audio speech</Text>

            <br />
            <br />

            <Box>
                <Text>Voice options</Text>
                { voiceOptions.map((voice: Voice, index: number) => {

                    return (
                        <Button
                        key={index} 
                        onClick={() => setVoice(voice)} 
                        color={currentVoice === voice ? 'teal' : 'white'}
                        m='1'
                        >
                            {voice}
                        </Button>
                    )

                })}
            </Box>

            <br />
            <br />

            <form onSubmit={ handleSubmit(onSubmit) }>
                <FormControl>

                    <FormLabel htmlFor='url'>message</FormLabel>
                    <Textarea
                        id='message'
                        placeholder='Write your speech here'
                        {...register('message', { required: 'This is required' } ) }
                    />

                </FormControl>

                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </form>

            <br />

            { blob && <AudioPlayer blob={ blob }>{ currentVoice }</AudioPlayer> }
            { error && <Text color={'red'}>{ error }</Text> }
        </Box>
    )
}




// Audio component
const AudioPlayer = ( props: any ) => 
{
    // const [audioChunks, setAudioChunks] = useState([]) as any;
    // const [, setAudioBlob] = useState(null) as any;
    const [ audioURL, setAudioURL ] = useState(null) as any;


    useEffect(() => 
    {
        const url = URL.createObjectURL( props.blob );
        setAudioURL( url );
    }, [props.blob])




    /***********************************|
    |            COMPONENTS             |
    |__________________________________*/
    return (
        <div>
            <audio id="userInput" src={ audioURL } controls />
        </div>
    );
};

export default TTS_1
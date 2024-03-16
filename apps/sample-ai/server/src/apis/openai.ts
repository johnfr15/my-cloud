import { Hono } from 'hono'
import { stream, streamText } from 'hono/streaming'
import OpenAI from 'openai';
import { Stream } from 'openai/streaming';
import { readableStreamAsyncIterable } from 'openai/streaming';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
});

const api = new Hono()


/**
 * @dev Endpoint for simple chat completion
 * 
 * @dev see the documentation for all details
 * @dev https://platform.openai.com/docs/guides/text-generation/chat-completions-api
 * 
 * @param body {object}
 *      - messages: The context of all the conversation so far
 * 
 */
api.post('/gpt-3.5-turbo', async(c) => {

    try {

        return streamText(c, async(stream) => {

            const body: any = await c.req.json()
    
            // Send the message to chat GPT
            const r_stream: Stream<OpenAI.Chat.ChatCompletionChunk> = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                n: 1,
                messages: body.messages,
                stream: true,
                user: 'john'
            })

            for await ( const chunk of r_stream )
            {
                await stream.write( chunk.choices[0]?.delta?.content || '' )
            }

        })

    } catch (error) {
     
        console.log(error)
        return c.json( error )

    }
})



/**
 * @dev Endpoint for text to speech generation
 * 
 * @dev see the documentation for all details
 * @dev https://platform.openai.com/docs/guides/text-to-speech
 * 
 * @param body {object}
 *      - messages: The message to be translated to audio 
 *      - voice: You can choose a voice tone (see documentation above)
 * 
 */
api.post('/tts-1', async(c) => {

    try {

        return stream(c, async(stream) => {

            const body: any = await c.req.json()
        
            // Send the message to chat GPT
            const response:any =  await openai.audio.speech.create({
                model: "tts-1",
                input: body.message,
                voice: body.voice,
                response_format: 'mp3',
                speed: 1,
            })

            c.header('Content-Type', 'audio/mpeg'); // Adjust the content type if needed
            c.header('Content-Disposition', 'attachment; filename="example.mp3"'); // Adjust the content type if needed

        
            const readableStream = response.body as unknown as NodeJS.ReadableStream;

            // Convert the readable stream to an async iterator
            const asyncIterator = readableStreamAsyncIterable(readableStream);

            // Iterate over the chunks and write them to the stream
            for await (const chunk of asyncIterator) {
                await stream.write(chunk as Uint8Array);
            }

            // Close the stream
            stream.close();
        })
        
    } catch (error: any) {

        console.log(error)
        return c.json( error, error.status )

    }
})



/**
 * @dev Endpoint for functions calling by AI
 * 
 * @dev see the documentation for all details
 * @dev https://platform.openai.com/docs/guides/function-calling
 * 
 * @param body {object}
 *      - messages: The context of all the conversation 
 *      - tools: An object with all the functions's details available in the from the front end
 *      - tool_choices: We can choose which function is callable by default it is set to "auto" so every function can be pick by the AI
 * 
 */
api.post('/gpt-3.5-turbo-1106', async(c) => {

    const body: any = await c.req.json()

    try {

        // Send the message to chat GPT
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            n: 1,
            messages: body.messages,
            tools: body.tools,
            tool_choice: body.tool_choice,
        })

        return c.json( response )
        
    } catch (error) {
        
        console.log(error)
        return c.json( error )

    }
})



/**
 * @dev Endpoint for Image generation
 * 
 * @dev see the documentation for all details
 * @dev https://platform.openai.com/docs/guides/images
 * 
 * @param body {object}
 *      - message: An representation of the image wanted
 * 
 */
api.post('/dalle-e-3', async(c) => {

    const body: any = await c.req.json()

    try {

        // Send the message to chat GPT
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: body.message,
            size: "1024x1024",
            quality: "standard",
            n: 1,
        })

        return c.json( response )
        
    } catch (error) {
        
        console.log(error)
        return c.json( error )

    }
})

export default api
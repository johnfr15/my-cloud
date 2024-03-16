import { confetti } from "tsparticles-confetti"
import UniswapV3 from "./libWeb3/UniswapV3"
import { Image } from "@chakra-ui/react"
import { AddIcon, MinusIcon, CloseIcon, QuestionOutlineIcon } from '@chakra-ui/icons'


export const tools = [
    // Add function
    {
        type: "function", 
        function: { 
            name: 'add', 
            description: 'add 2 numbers', 
            parameters: {
                type: "object",
                properties: {
                    x: {
                        type: 'number',
                        description: 'Fist number',
                        default: 0
                    },
                    y: {
                        type: 'number',
                        description: 'Second number',
                        default: 0
                    },
                },
                required: ["x", "y"]
            }
        },
        image: null,
        icon: <AddIcon />
    },
    // Substract function
    {
        type: "function", 
        function: { 
            name: 'substract', 
            description: 'Substract 2 numbers', 
            parameters: {
                type: "object",
                properties: {
                    x: {
                        type: 'number',
                        description: 'Fist number',
                        default: 0,
                    },
                    y: {
                        type: 'number',
                        description: 'Second number',
                        default: 0
                    },
                },
                required: ["x", "y"]
            }
        },
        image: null,
        icon: <MinusIcon />,
    },
    // Multiply function
    {
        type: "function", 
        function: { 
            name: 'multiply', 
            description: 'Multiply 2 numbers', 
            parameters: {
                type: "object",
                properties: {
                    x: {
                        type: 'number',
                        description: 'Fist number',
                        default: 0,
                    },
                    y: {
                        type: 'number',
                        description: 'Second number',
                        default: 0
                    },
                },
                required: ["x", "y"]
            }
        },
        image: null,
        icon: <CloseIcon />
    },
    // Secret function
    {
        type: "function", 
        function: { 
            name: 'secret', 
            description: 'Its a secret !', 
        },
        image: null,
        icon: <QuestionOutlineIcon />
    },
    //Swap
    {
        type: "function",
        function: {
          name: 'swap',
          description: 'Swap tokens',
          parameters: {
            type: "object",
            properties: {
              signer: {
                type: 'object',
                description: 'Wallet to perform the swap',
              },
              path: {
                type: 'array',
                description: 'Token swap path [inputTokenAddress, outputTokenAddress]',
                items: {
                  type: 'string',
                },
              },
              amount: {
                type: 'string',
                description: 'The amount of token to be swapped for the other one.',
              },
              chain: {
                type: 'string',
                description: 'The chain\'s name to operate the swap',
              },
              options: {
                type: 'object',
                properties: {
                  slipage: {
                    type: 'number',
                    description: 'Slippage protection against price movement or too high price impact (default is 0.5%)',
                  },
                  deadline: {
                    type: 'number',
                    description: 'Maximum amount of time (in unix time) before the trade gets reverted',
                  },
                  tradeType: {
                    type: 'number',
                    description: 'The type of this trade "0" means that we will trade the exact amount of input token for the other and "1" means we will trade for the exact ouput amount',
                  },
                },
              },
            },
            required: ["signer", "path", "amount", "chain"],
          }
        },
        image: <Image src={ "https://upload.wikimedia.org/wikipedia/commons/e/e7/Uniswap_Logo.svg" } boxSize={"30px"}/>,
        icon: null
    }
]





/***********************************|
|            FUNCTIONS              |
|__________________________________*/

export const Functions: {[ key: string ]: any} = {
    
    add: ( args: { x: number,  y: number }, stdout: any ) => {
    
        const { x, y } = args 
    
        stdout( (prev: any) => prev + `Calculating ${x} + ${y}...\n`)
        stdout( (prev: any) => prev + `Result: ${ x + y }\n\n`)

        return (x + y)
    },



    substract: ( args: { x: number,  y: number }, stdout: any  ) => {
    
        const { x, y } = args 
    
        stdout( (prev: any) => prev + `Calculating ${x} - ${y}...`)
        stdout( (prev: any) => prev + `Result: ${ x - y }\n\n`)
        
        return (x - y)
    },



    multiply: ( args: { x: number,  y: number }, stdout: any ) => {
    
        const { x, y } = args 
    
        stdout( (prev: any) => prev + `Calculating ${x} * ${y}...\n`)
        stdout( (prev: any) => prev + `Result: ${ x * y }\n\n`)
        
        return (x * y)
    },



    secret: ( stdout: any ) => {

        stdout( (prev: any) => prev + "This is a secret function!\n\n" );
        confetti("tsparticles")
        return "Shh, it's a secret!";

    },



    swap: UniswapV3.swap
}

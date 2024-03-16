import erc20_abi from "./abis/erc20"
import pool_v3_abi from "./abis/pool_v3"
import quoter_v2_abi from "./abis/quoter_v2"
import factory_v3_abi from "./abis/factory_v3"
import swap_router_abi from "./abis/swap_router"
import non_fungible_manager_abi from "./abis/non_fungible_manager"
import { Chains, SwapOptions, RemoveOptions, AddOptions } from "../types"







// ABIS
export const ERC20_ABI = erc20_abi
export const SWAP_ROUTER_ABI = swap_router_abi
export const QUOTER_V2_ABI = quoter_v2_abi
export const FACTORY_ABI = factory_v3_abi
export const POOL_ABI = pool_v3_abi
export const NFT_MANAGER_ABI = non_fungible_manager_abi





// ADDRESSES
export const NATIVE_TOKEN = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

export const SWAP_ROUTER : { [key: string]: any } = {
  ethereum: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  arbitrum: "0xE592427A0AEce92De3Edee1F18E0157C05861564", 
  optimism: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  polygon: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  bsc: "",

  ethereumTestnet: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  arbitrumTestnet: "", 
  optimismTestnet: "",
  polygonTestnet: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  bscTestnet: "",
}

export const QUOTER_V2 : { [key: string]: any } = {
  ethereum: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  arbitrum: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e", 
  optimism: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  polygon: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  bsc: "0x78D78E420Da98ad378D7799bE8f4AF69033EB077",

  ethereumTestnet: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  arbitrumTestnet: "", 
  optimismTestnet: "",
  polygonTestnet: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  bscTestnet: "0x78D78E420Da98ad378D7799bE8f4AF69033EB077",
}

export const FACTORY : { [key: string]: any } = {
  ethereum: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  arbitrum: "0x1F98431c8aD98523631AE4a59f267346ea31F984", 
  optimism: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  polygon: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  bsc: "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7",

  ethereumTestnet: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  arbitrumTestnet: "0x4893376342d5D7b3e31d4184c08b265e5aB2A3f6", 
  optimismTestnet: "",
  polygonTestnet: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  bscTestnet: "0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7",
}

export const NFT_MANAGER : { [key: string]: any } = {
  ethereum: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  arbitrum: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88", 
  optimism: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  polygon: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  bsc: "0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613",

  ethereumTestnet: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  arbitrumTestnet: "", 
  optimismTestnet: "",
  polygonTestnet: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  bscTestnet: "0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613",
}




// Tokens
export const TOKENS: { [key in Chains]: any } = {

  ethereum: {
    eth: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },

  polygon: {
    matic: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    weth: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    usdc:'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    dai:'0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    usdt:'0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },

  arbitrum: {
    eth: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    usdc:'0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    dai:'0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    usdt:'0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  },
  
  optimism: {
    eth: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: "0x4200000000000000000000000000000000000006",
    dai: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    usdc: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    usdt: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  },

  bsc: {
    bnb: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    weth: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    dai: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    usdc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    usdt: '0x55d398326f99059fF775485246999027B3197955',
  },

  

  ethereumTestnet: {
    eth: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    dai: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
    usdc:'0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557',
    usdt:'0x509Ee0d083DdF8AC028f2a56731412edD63223B9',
  },

  polygonTestnet: {
    matic: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    weth: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
    usdc:'0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7',
    usdt:'0x3813e82e6f7098b9583FC0F33a962D02018B6803',
    dai:'0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1',
  },

  arbitrumTestnet: {
    eth: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: '0xEe01c0CD76354C383B8c7B4e65EA88D00B06f36f',
    usdc:'0x179522635726710Dd7D2035a81d856de4Aa7836c',
    usdt:'0xE742da76701dc9BB348EB931959DD42B9DF04Ff6',
    dai: '0x02668f5a60D637D21e39689B68B675ed4A7B696d',
  },

  optimismTestnet: {
    eth: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    weth9: "0x4200000000000000000000000000000000000006",
    usdc:'0x7E07E15D2a87A24492740D16f5bdF58c16db0c4E',
    usdt:'0x853eb4bA5D0Ba2B77a0A5329Fd2110d5CE149ECE',
    dai: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  }
}

// Misc

export const MAX_TICK = 887272
export const MIN_TICK = -887272
export const MAX_UINT128 = "0xffffffffffffffffffffffffffffffff";

export const DEFAULT_SWAP_OPTION: SwapOptions = {
  slipage: 0.5, // 0.5% of slipage tolerance
  deadline: Math.floor( Date.now() / 1000 ) + 60 * 20, // 20 minutes from the current Unix time
  tradeType: 0, // Exact input
}

export const DEFAULT_ADD_OPTION: AddOptions = {
  max: false,
  slipage: 0.5, // 0.5% of slipage tolerance
  deadline: Math.floor( Date.now() / 1000 ) + 60 * 20, // 20 minutes from the current Unix time
  tokenId: undefined
}

export const DEFAULT_REMOVE_OPTION: RemoveOptions = {
  slipage: 0.5, // 0.5% of slipage tolerance
  deadline: Math.floor( Date.now() / 1000 ) + 60 * 20, // 20 minutes from the current Unix time
  percent: 100,
  tokenId: undefined
}



// Chains

export const CHAIN_ID: { [ key in Chains ]: number } = {

  ethereum: 1,
  arbitrum: 42161,
  polygon: 137,
  optimism: 10,
  bsc: 56,

  ethereumTestnet: 5,
  arbitrumTestnet: 421613,
  polygonTestnet: 80001,
  optimismTestnet: 420,
}

export const CHAIN_ID_TO_NAME: { [ key: number ]: Chains } = {

  1: "ethereum", 
  42161: "arbitrum",
  137: "polygon", 
  10: "optimism",
  56: "bsc",

  5: "ethereumTestnet",
  421613: "arbitrumTestnet",
  80001: "polygonTestnet",
  420: "optimismTestnet",

}
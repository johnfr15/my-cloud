import { Contract, JsonRpcSigner } from "ethers"

export type Token = {
    chainId: number
    address: string
    name: string
    symbol: string
    decimals: number
    logoURI: string
}

export type Pool = {
    tokenA: Token
    tokenB: Token
    pair: string
    fees: number
    tickSpacing: number,
    liquidity: bigint,
    sqrtPriceX96: bigint,
    tick: number,
    Quoter: Contract
    Pool: Contract
}

export type Trade = {
    tokenIn: Token
    tokenOut: Token
    path: [string, string]
    amountIn: bigint
    amountOut: bigint
    amountInMax: bigint | undefined
    amountOutMin: bigint | undefined
    sqrtPriceLimitX96: bigint
    to: string
    priceImpact: number
    pool: Pool
    slipage: number
    deadline: number
    chain: Chains
    tradeType: number
}

export enum TradeType {
    EXACT_INPUT,
    EXACT_OUTPUT
}

export enum Fees {
    VERY_LOW = 100, // 0.01%
    LOW = 500,      // 0.05%
    MEDIUM = 3000,  // 0.3%
    BIG = 10000     // 1%
}

export type SwapOptions = {
    slipage?: number
    deadline?: number
    tradeType?: 0 | 1
}

export type AddOptions = {
    max?: boolean
    slipage?: number
    deadline?: number
    tokenId?: number
}

export type RemoveOptions = {
    slipage?: number
    deadline?: number
    percent?: number
    tokenId?: number
}

export type Position = {
    tokenId: number
    nonce: bigint
    operator: string
    token0: string
    token1: string
    fee: number
    tickLower: number
    tickUpper: number
    liquidity: bigint
    feeGrowthInside0LastX128: bigint
    feeGrowthInside1LastX128: bigint
    tokensOwed0: bigint
    tokensOwed1: bigint
}

export type Chains = 'arbitrum' | 'polygon' | 'optimism' | 'ethereum' | 'bsc' | 'polygonTestnet' | 'arbitrumTestnet' |
                    'ethereumTestnet' | 'optimismTestnet'

export type ApproveTx = {
    signer: JsonRpcSigner
    Erc20: Contract
    token: Token
    chain: Chains
    spender: string
    amount: bigint
}

export type SwapTx = {
    signer: JsonRpcSigner
    trade: Trade
    SwapRouter: Contract
}

export type AddLiquidityTx = {
    signer: JsonRpcSigner
    pool: Pool
    tokenA: Token
    tokenB: Token
    fee: Fees
    tokenId: number | undefined
    tickLower: number
    tickUpper: number
    amountADesired: bigint
    amountBDesired: bigint
    amountAMin: bigint
    amountBMin: bigint
    to: string
    deadline: number
    chain: Chains
    NftManager: Contract
}

export type RemoveLiquidityTx = {
    signer: JsonRpcSigner
    pool: Pool
    lp: Token
    token0: Token
    token1: Token
    position: Position
    liquidity: bigint
    amount0: bigint
    amount1: bigint
    amount0Min: bigint
    amount1Min: bigint
    deadline: number
    percent: number
    chain: Chains
    NftManager: Contract
}


// NonfungiblePositionManager

export type ExactInput = {
    path: string
    recipient: string
    deadline: number
    amountIn: bigint
    amountOutMinimum: bigint
}

export type ExactOutput = {
    path: string
    recipient: string
    deadline: number
    amountOut: bigint
    amountInMaximum: bigint
}

export type ExactInputSingle = {
    tokenIn: string
    tokenOut: string
    fee: number
    recipient: string
    deadline: number
    amountIn: bigint
    amountOutMinimum: bigint
    sqrtPriceLimitX96: bigint
}

export type ExactOutputSingle = {
    tokenIn: string
    tokenOut: string
    fee: number
    recipient: string
    deadline: number
    amountOut: bigint
    amountInMaximum: bigint
    sqrtPriceLimitX96: bigint
}

export type Mint = {
    token0: string
    token1: string
    fee: number
    tickLower: number
    tickUpper: number
    amount0Desired: bigint
    amount1Desired: bigint
    amount0Min: bigint
    amount1Min: bigint
    recipient: string
    deadline: number
}

export type IncreaseLiquidity = {
    tokenId: number
    amount0Desired: bigint
    amount1Desired: bigint
    amount0Min: bigint
    amount1Min: bigint
    deadline: number
}

export type DecreaseLiquidity = {
    tokenId: bigint
    liquidity: bigint
    amount0Min: bigint
    amount1Min: bigint
    deadline: bigint
}


// QuoterV2

export type QuoteExactInputSingleParams = {
    tokenIn: string
    tokenOut: string
    amountIn: bigint
    fee: number
    sqrtPriceLimitX96: bigint
}

export type QuoteExactOutputSingleParams = {
    tokenIn: string
    tokenOut: string
    amount: bigint
    fee: number
    sqrtPriceLimitX96: bigint
}
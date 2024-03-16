import chains from "../../config/chains";
import tokens from "../../config/tokens";
import { BEST_FEE_POOL } from "../../config/feePool";
import { Token, Pool, Chains, Position } from "../../types";
import { ethers, JsonRpcSigner, Contract, JsonRpcProvider } from "ethers";
import { ERC20_ABI, TOKENS, CHAIN_ID, QUOTER_V2, QUOTER_V2_ABI, CHAIN_ID_TO_NAME, FACTORY, FACTORY_ABI, POOL_ABI } from "../../config/constants"


export const resolve_chain = ( signer: JsonRpcSigner, chain: Chains ): JsonRpcSigner => {
    
    const provider = resolve_provider( CHAIN_ID[ chain ] )
    signer = new JsonRpcSigner( provider, signer.address )

    return signer
}

export const get_token = async( tokenAddress: string, chain: Chains ): Promise<Token> => {

    const Tokens: {[key: string ]: Token[]} = tokens 
    const TokensChain: Token[] = Tokens[ chain ]

    if ( is_native( tokenAddress, chain ) )
        tokenAddress = TOKENS[ chain ].weth9


    const token = Object.values(TokensChain).find( (token: Token) => 
    {
        if ( BigInt( token.address ) !== BigInt( tokenAddress ) ) 
            return false
        if ( token.chainId !== CHAIN_ID[ chain ] )               
            return false

        return true
    })


    if ( token === undefined )
        throw new Error(`Error: Can't find token ${ tokenAddress } on network ${ chain }, please add it to /config/tokens.ts`)
    

    return token
}


/**
 * 
 * @param chainId   // Orbiter id 
 */
export const resolve_provider = ( chainId: number ): JsonRpcProvider => {

    const chain_info = Object.values( chains ).find(( item ) => parseInt( item.chainId ) === chainId )

    const provider = new JsonRpcProvider( chain_info!.rpc[0] )

    return provider
}


export const get_pool = async( tokenA: Token, tokenB: Token, signer: JsonRpcSigner, chain: Chains ): Promise<Pool> => {

    try {
        
        const QuoterV2 = new Contract( QUOTER_V2[ chain ], QUOTER_V2_ABI, signer )
        const Factory = new Contract( FACTORY[ chain ], FACTORY_ABI, signer )

        const bestFee = get_best_fee( tokenA, tokenB, chain )
        const pair = await Factory.getPool( tokenA.address, tokenB.address, bestFee )


        if ( BigInt( pair ) === BigInt( 0 ) )
            throw new Error(`Error: pair for token ${ tokenA.symbol }/${ tokenB.symbol } Fee: ${ bestFee } not created yet.`)
    
    
        const Pool = new Contract( pair, POOL_ABI, signer )
        const [ slot0, liquidity, tickSpacing, ] = await Promise.all([
            Pool.slot0(),
            Pool.liquidity(),
            Pool.tickSpacing(),
        ])
        const { token0, token1 } = sort_tokens( tokenA, tokenB, '0', '0')

    
        const pool: Pool = {
            tokenA: token0,
            tokenB: token1,
            pair: pair,
            fees: bestFee,
            tickSpacing: parseInt( tickSpacing.toString() ),
            liquidity: liquidity,
            sqrtPriceX96: slot0[0],
            tick: parseInt( slot0[1].toString() ),
            Quoter: QuoterV2,
            Pool: Pool
        }
    
        return pool

    } catch (error) {
        
        throw( error )

    }
}

export const get_balance = async(
    tokenAddress: string, 
    signer: JsonRpcSigner,
): Promise<{ bigint: bigint, string: string, decimals: number }> => {
    
    let balance: bigint;
    let decimals: number

    try {

        const erc20 = new Contract(tokenAddress, ERC20_ABI, signer);
        const network = await signer.provider?.getNetwork()

        if ( is_native( tokenAddress, CHAIN_ID_TO_NAME[ parseInt( network!.chainId.toString() ) ]  ) )
        {
            balance  = await signer.provider!.getBalance( signer.address )
            decimals = 18
        }
        else
        {
            balance = await erc20.balanceOf( signer.address );
            decimals = await erc20.decimals();
        }

        let formated = ethers.formatUnits( balance , decimals );
        
        return { 
            bigint: balance,
            string: formated, 
            decimals: decimals
        };

    } catch (error) {

        throw( error )

    }

}

export const get_quote = ( amountA: number, tokenA: Token, pool: Pool ): bigint => {

    const { sqrtPriceX96 } = pool

    const x =  pool.tokenA
    const y =  pool.tokenB

    // see https://ethereum.stackexchange.com/questions/9868 5/computing-the-uniswap-v3-pair-price-from-q64-96-number
    // see https://www.youtube.com/watch?v=hKhdQl126Ys
    const priceX96_to_price0 = (parseFloat( sqrtPriceX96.toString() ) /  2 ** 96) ** 2

    const priceX = priceX96_to_price0 * ( (10 ** x.decimals) / (10 ** y.decimals) )
    const priceY = 1 / priceX

    const token_price = BigInt( tokenA.address ) === BigInt( pool.tokenA.address ) ? priceX : priceY
    
    const token_quoted = BigInt( tokenA.address ) === BigInt( pool.tokenA.address ) ? pool.tokenB : pool.tokenA
    const quote = (token_price * amountA).toFixed( token_quoted.decimals )

    const amountB = ethers.parseUnits( quote, token_quoted.decimals )
    
    return amountB
}

export const is_balance = async(signer: JsonRpcSigner, addressA: string, addressB: string): Promise<number> => {

    try {

        const balanceA = await get_balance( addressA, signer )
        const balanceB = await get_balance( addressB, signer )

        if ( balanceA.string === '0.0' || balanceB.string === '0.0' )
            return 0;
        else
            return 1;
        
    } catch (error: any) {
        
        throw error

    }
}


export const sort_tokens = ( tokenA: Token, tokenB: Token, amountA: string | null, amountB: string | null ): { token0: Token, token1: Token, amount0: bigint, amount1: bigint } => {

    const token0 = BigInt( tokenA.address ) < BigInt( tokenB.address ) ? tokenA : tokenB
    const token1 = BigInt( tokenA.address ) > BigInt( tokenB.address ) ? tokenA : tokenB 
    const amount0 = BigInt( token0.address ) === BigInt( tokenA.address ) ? ethers.parseUnits( amountA ?? '0', tokenA.decimals) : ethers.parseUnits( amountB ?? '0', tokenB.decimals)
    const amount1 = BigInt( token1.address ) === BigInt( tokenA.address ) ? ethers.parseUnits( amountA ?? '0', tokenA.decimals) : ethers.parseUnits( amountB ?? '0', tokenB.decimals)

    return { token0, token1, amount0, amount1 }
}

export const is_native = ( token: string, chain: Chains ): boolean => {

    if ( token === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" ) return true
    if ( token === TOKENS[ chain ].weth9 )                        return true

    return false
}

export const is_position = ( position: Position, tokenA: Token, tokenB: Token, chain: Chains ): boolean => {


    const pos0 = BigInt( position.token0 )
    const pos1 = BigInt( position.token1 )
    const tokA = BigInt( tokenA.address )
    const tokB = BigInt( tokenB.address )

    const fee = parseInt( position.fee.toString() )
    const bestFee = get_best_fee( tokenA, tokenB, chain )

    if ( pos0 === tokA && pos1 === tokB && fee === bestFee ) return true
    if ( pos0 === tokB && pos1 === tokA && fee === bestFee ) return true

    return false
}

const get_best_fee = ( tokenA: Token, tokenB: Token, chain: Chains ): number => {

    const pool = tokenA.symbol + '_' + tokenB.symbol

    const bestFee = BEST_FEE_POOL[ chain ][ pool ]

    if ( bestFee === undefined )
        throw new Error(`Error: Unknown best fee for pool ${ pool } on ${ chain }`)

    return bestFee
}

export const parse_position = ( position: any, tokenId: number ): Position | undefined => {

    if ( position === undefined )
        return undefined

    const parsed: Position = {
        tokenId: tokenId,
        nonce: position['0'],
        operator: position['1'],
        token0: position['2'],
        token1: position['3'],
        fee: position['4'],
        tickLower: position['5'],
        tickUpper: position['6'],
        liquidity: position['7'],
        feeGrowthInside0LastX128: position['8'],
        feeGrowthInside1LastX128: position['9'],
        tokensOwed0: position['10'],
        tokensOwed1: position['11'],
    }

    return parsed
}


export const log_balances = async(signer: JsonRpcSigner, chain: Chains) => {

    const Dai  = new Contract(TOKENS[ chain ].dai, ERC20_ABI, signer)
    const Usdc = new Contract(TOKENS[ chain ].usdc, ERC20_ABI, signer)
    const Usdt = new Contract(TOKENS[ chain ].usdt, ERC20_ABI, signer)
    const Weth = new Contract(TOKENS[ chain ].weth9, ERC20_ABI, signer)

    const nativeBalance = await signer.provider!.getBalance( signer.address ) 
    const daiBalance    = await Dai.balanceOf( signer.address ) 
    const usdcBalance   = await Usdc.balanceOf( signer.address ) 
    const usdtBalance   = await Usdt.balanceOf( signer.address ) 
    const wethBalance   = await Weth.balanceOf( signer.address ) 

    console.log("\n")
    console.log( "Balance NATIVE: ", ethers.formatUnits( nativeBalance ) )
    console.log( "Balance DAI:    ", ethers.formatUnits( daiBalance ) )
    console.log( "Balance USDC:   ", ethers.formatUnits( usdcBalance, 6) )
    console.log( "Balance USDT:   ", ethers.formatUnits( usdtBalance, 6) )
    console.log( "Balance WETH:   ", ethers.formatUnits( wethBalance, 18) )
    console.log("\n")
}
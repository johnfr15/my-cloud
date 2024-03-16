import { get_token_id } from "../utils/add"
import { ethers, JsonRpcSigner, Contract } from "ethers";
import { AddLiquidityTx, AddOptions, Chains, Pool, Token } from "../../types";
import { MAX_TICK, MIN_TICK, NFT_MANAGER, NFT_MANAGER_ABI } from "../../config/constants";
import { get_token, get_balance, get_pool, sort_tokens, is_balance, get_quote } from "../utils";


export const get_add_liq_tx = async(
    signer: JsonRpcSigner, 
    addressA: string,
    amountA: string | null,
    addressB: string,
    amountB: string | null,
    chain: Chains,
    options: AddOptions
): Promise<AddLiquidityTx> => {

    let addTx: AddLiquidityTx;
    
    try {

        const token_a: Token = await get_token( addressA, chain )
        const token_b: Token = await get_token( addressB, chain )
        const { token0, token1, amount0, amount1 } = sort_tokens( token_a, token_b, amountA, amountB )

        const pool: Pool = await get_pool( token0, token1, signer, chain )

        if ( await is_balance(signer, token_a.address, token_b.address) === 0 )
            throw new Error(`balance is empty for token ${ token_a.symbol } or ${ token_b.symbol } or both.`)

        if ( options.max )
        {
            addTx = await get_max_liq( signer, pool, chain, options )
        }
        else
        {
            let addr: string = amount0 ? pool.tokenA.address : pool.tokenB.address
            let amount: bigint = amount0 ? amount0 : amount1!
            addTx = await get_liq( signer, pool, addr, amount, chain, options )
        }

        return addTx

    } catch (error: any) {
        
        throw error

    }
}

const get_max_liq = async(
    signer: JsonRpcSigner, 
    pool: Pool,
    chain: Chains,
    options: AddOptions
): Promise<AddLiquidityTx> => {

    try {

        const NftManager = new Contract( NFT_MANAGER[ chain ], NFT_MANAGER_ABI, signer )

        const tokenId = options.tokenId ?? await get_token_id( pool.tokenA, pool.tokenB, chain, signer )

        const balanceA = await get_balance( pool.tokenA.address, signer )
        const balanceB = await get_balance( pool.tokenB.address, signer )

        const quote_a = get_quote( parseFloat( balanceA.string ), pool.tokenA, pool )
        const quote_b = get_quote( parseFloat( balanceB.string ), pool.tokenB, pool )

        /*
         * @dev If the amount of token B we can buy is bigger than our actual balance of token B that means
         *      that token B is our max token to add
         */
        const b_is_min_balance: boolean = quote_a > balanceB.bigint 

        let balance_a: bigint = b_is_min_balance ? quote_b : balanceA.bigint
        let balance_b: bigint = b_is_min_balance ? balanceB.bigint : quote_a
        let balance_a_min: bigint = balance_a * BigInt( 100 * 100 - (options.slipage! * 100) ) / BigInt( 100 * 100 )
        let balance_b_min: bigint = balance_b * BigInt( 100 * 100 - (options.slipage! * 100) ) / BigInt( 100 * 100 )


        const add_liquidity: AddLiquidityTx = {
            signer: signer,
            pool: pool,
            tokenA: pool.tokenA,
            tokenB: pool.tokenB,
            fee: pool.fees,
            tokenId: tokenId,
            tickLower: MIN_TICK - (MIN_TICK % pool.tickSpacing),
            tickUpper: MAX_TICK - (MAX_TICK % pool.tickSpacing),
            amountADesired: balance_a,
            amountBDesired: balance_b,
            amountAMin: balance_a_min,
            amountBMin: balance_b_min,
            to: signer.address,
            deadline: options.deadline!,
            chain: chain,
            NftManager: NftManager
        }

        return add_liquidity 

    } catch (error: any) {

        throw error
        
    }
}

const get_liq = async(
    signer: JsonRpcSigner, 
    pool: Pool, 
    addr: string, 
    amount: bigint, 
    chain: Chains,
    options: AddOptions
): Promise<AddLiquidityTx> => {

    try {

        const NftManager = new Contract( NFT_MANAGER[ chain ], NFT_MANAGER_ABI, signer )

        const tokenId = options.tokenId ?? await get_token_id( pool.tokenA, pool.tokenB, chain, signer )
        
        const token_1: Token = BigInt( pool.tokenA.address ) === BigInt( addr ) ? pool.tokenA : pool.tokenB
        const token_2: Token = BigInt( pool.tokenA.address ) !== BigInt( addr ) ? pool.tokenA : pool.tokenB

        const balance_1 = await get_balance( token_1.address, signer )
        const balance_2 = await get_balance( token_2.address, signer )

        const amount_1 = amount
        const amount_2 = get_quote( parseFloat( ethers.formatUnits( amount_1, token_1.decimals ) ), token_1, pool )
        
        const amount_1_min: bigint = amount_1 * BigInt( 100 * 100 - (options.slipage! * 100) ) / BigInt( 100 * 100 )
        const amount_2_min: bigint = amount_2 * BigInt( 100 * 100 - (options.slipage! * 100) ) / BigInt( 100 * 100 )


        if ( amount_1 > balance_1.bigint )
            throw new Error(`${ token_1.symbol }: Unsufficient balance.`)
        if ( amount_2 > balance_2.bigint )
            throw new Error(`${ token_2.symbol }: Unsufficient balance.\nNeeded ${ ethers.formatUnits(amount_2, token_2.decimals) } but got ${ balance_2.string }`)


        const token_1_is_min = BigInt( pool.tokenA.address ) === BigInt( token_1.address )


        const add_liquidity: AddLiquidityTx = {
            signer: signer,
            pool: pool,
            tokenA: token_1_is_min ? token_1 : token_2,
            tokenB: token_1_is_min ? token_2 : token_1,
            fee: pool.fees,
            tokenId: tokenId,
            tickLower: MIN_TICK - (MIN_TICK % pool.tickSpacing),
            tickUpper: MAX_TICK - (MAX_TICK % pool.tickSpacing),
            amountADesired: token_1_is_min ? amount_1 : amount_2,
            amountBDesired: token_1_is_min ? amount_2 : amount_1,
            amountAMin: token_1_is_min ? amount_1_min : amount_2_min,
            amountBMin: token_1_is_min ? amount_2_min : amount_1_min,
            to: signer.address,
            deadline: options.deadline!,
            chain: chain,
            NftManager: NftManager
        }

        return add_liquidity

    } catch(error) {

        throw error

    }
}
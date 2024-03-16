import { JsonRpcSigner, Contract } from "ethers";
import { get_amounts } from "../utils/remove";
import { find_position } from "../utils/remove";
import { get_pool, get_token, sort_tokens } from "../utils";
import { CHAIN_ID, NFT_MANAGER, NFT_MANAGER_ABI } from "../../config/constants";
import { Pool, RemoveLiquidityTx, Token, Chains, RemoveOptions, Position } from "../../types";


export const get_remove_tx = async(
    signer: JsonRpcSigner, 
    tokenA: string, 
    tokenB: string, 
    chain: Chains,
    options: RemoveOptions
): Promise<RemoveLiquidityTx> => {

    try {
        
        const token_a: Token     = await get_token( tokenA, chain )
        const token_b: Token     = await get_token( tokenB, chain )
        const { token0, token1 } = sort_tokens( token_a, token_b, '0', '0' )
        const pool: Pool         = await get_pool( token0, token1, signer, chain )

        const removeTx: RemoveLiquidityTx = await get_removeLiq( signer, pool, chain, options )

        return removeTx

    } catch (error: any) {
        
        throw error

    }
}

const get_removeLiq = async(
    signer: JsonRpcSigner, 
    pool: Pool,
    chain: Chains,
    options: RemoveOptions
): Promise<RemoveLiquidityTx> => {

    const { tokenId, percent, slipage, deadline } = options

    try {

        const NftManager = new Contract( NFT_MANAGER[ chain ], NFT_MANAGER_ABI, signer )
        const position: Position = await find_position( pool.tokenA, pool.tokenB, chain, signer, tokenId )

        if ( position.liquidity === BigInt( 0 ))
            throw new Error( `Error: There is no liquidity in this position.`)

        const liquidity = position.liquidity * BigInt( percent! * 100 ) / BigInt( 100 * 100 )
        const { amount0, amount1 } = await get_amounts( position.tokenId, liquidity, deadline!, NftManager )

        const amount0Min = amount0 * BigInt( 100 * (100 - slipage!) ) / BigInt( 100 * 100 )
        const amount1Min = amount1 * BigInt( 100 * (100 - slipage!) ) / BigInt( 100 * 100 )


        const removeLiq: RemoveLiquidityTx = {
            signer: signer,
            pool: pool,
            lp: { chainId: CHAIN_ID[ chain ], address: pool.pair, decimals: 1, symbol: "LP", name: "Uniswap LP", logoURI: "" },
            token0: pool.tokenA,
            token1: pool.tokenB,
            position: position,
            liquidity: liquidity,
            amount0: amount0,
            amount1: amount1,
            amount0Min: amount0Min,
            amount1Min: amount1Min,
            deadline: deadline!,
            percent: percent!,
            chain: chain,
            NftManager: NftManager
        } 
        
        return removeLiq

    } catch (error) {
        
        throw error

    }
}
import { ethers, JsonRpcSigner } from 'ethers';
import { resolve_chain } from './utils';
import { exec_swap } from './transactions/swap';
import { get_swap_tx } from './calldata/swapCalldata';
import { exec_approve } from './transactions/approve';
import { get_add_liq_tx } from './calldata/addLiqCalldata';
import { get_approve_tx } from './calldata/approveCalldata';
import { get_remove_tx } from './calldata/withdrawLiqCalldata';
import { exec_add_liquidity } from './transactions/addLiquidity';
import { exec_decrease, exec_collect } from './transactions/remove';
import { AddOptions, Chains, SwapOptions, RemoveOptions } from '../types';
import { DEFAULT_REMOVE_OPTION, DEFAULT_SWAP_OPTION, DEFAULT_ADD_OPTION, NFT_MANAGER, SWAP_ROUTER } from "../config/constants"





/**
 * @name swap
 * @param signer        - JsonRpcSigner to perform the swap
 * @param path          - token swap from path[0](input) to path[1](output) 
 * @param amountIn      - The amount of exact token (in token) to be swapped for the other one (out token)
 * @param amountOut     - The amount of exact token (out token) to be received for swaping the other one (in token)
 * @param chain         - The chain's name to operate the swap
 * @param options
 *        - slipage:      (optional) protection against price movement or to high price impact default is 0.5%
 *        - deadline:     (optional) Maximum amount of time (in unix time) before the trade get reverted
 */
export const swap = async(
    signer: JsonRpcSigner,
    path: [string, string],
    amount: string,
    chain: Chains,
    options?: SwapOptions
) => {
    
    // signer = resolve_chain( signer, chain )
    options = { ...DEFAULT_SWAP_OPTION, ...options }

    try {

        if ( path[0] === undefined || path[1] === undefined )
            throw new Error(`Error: token undefined path[0]: ${ path[0] }, path[1]: ${ path[1] }.`)
        if ( options.slipage! < 0.01 || options.slipage! > 100 )
            throw new Error(`Slipage parameter must be a number between 0.01 and 100.`)


        const swapTx = await get_swap_tx( signer, path, amount, chain, options )
        const approve_amount = ethers.formatUnits( swapTx.trade.amountInMax ?? swapTx.trade.amountIn, swapTx.trade.tokenIn.decimals)

        const approveTx = await get_approve_tx( signer, swapTx.trade.tokenIn, SWAP_ROUTER[ chain ], approve_amount, chain )

        /*========================================= TX =================================================================================================*/
        await exec_approve( approveTx )
        await exec_swap( swapTx! )
        /*=============================================================================================================================================*/
        
    } catch (error: any) {

        console.log( error )

    }
}


 


/**
 * @name addLiquidity
 * @param signer        - JsonRpcSigner to perform the swap
 * @param addressA      - First token
 * @param amountA       - Amount of first token. if set to null will check for amountB or max
 * @param addressB      - Second token
 * @param amountB       - Amount of second token. if set to null will check for amountA or max
 * @param chain         - The chain's name to operate the swap
 * @param options
 *        - max:        (optional) If activated it will check for the highest amount possible from tokenA and tokenB  
 *        - slipage:    (optional) Protection against price movement or to high price impact default is 0.5%
 *        - deadline:   (optional) Maximum amount of time (in unix time) before the trade get reverted
 *        - tokenId:    (optional) The id of the pool being used (this will faster the function and reduce the calls made to the provider)
 */
export const addLiquidity = async(
    signer: JsonRpcSigner,                        
    addressA: string,                       
    amountA: string | null,     
    addressB: string,                       
    amountB: string | null,     
    chain: Chains,
    options?: AddOptions
): Promise<void> => {

    signer = resolve_chain( signer, chain )
    options = { ...DEFAULT_ADD_OPTION, ...options }

    try {

        if ( options!.slipage! < 0.01 || options!.slipage! > 100 )
            throw new Error("Slipage need to be a number between 2 and 100");
        if ( amountA === null && amountB === null && options!.max === false )
            throw new Error("Need to provide at least a value for 'amountA' or 'amountB' or set max");

        
        // Get add liquidity Tx
        const addTx = await get_add_liq_tx( signer, addressA, amountA, addressB, amountB, chain, options )
        const { tokenA, tokenB, amountADesired, amountBDesired } = addTx
        const approve_amount_a = ethers.formatUnits( amountADesired, tokenA.decimals )
        const approve_amount_b = ethers.formatUnits( amountBDesired, tokenB.decimals )


        // Get approve token 'a' Tx
        const approveATx = await get_approve_tx(signer, tokenA, NFT_MANAGER[ chain ], approve_amount_a, chain)

        // Get approve token 'b' Tx
        const approveBTx = await get_approve_tx(signer, tokenB, NFT_MANAGER[ chain ], approve_amount_b, chain)

        /*========================================= TX =================================================================================================*/
        await exec_approve( approveATx )
        await exec_approve( approveBTx )
        await exec_add_liquidity( addTx )
        /*=============================================================================================================================================*/
        
    } catch (error: any) {

        console.log( error )

    }
}





/**
 * @name removeLiquidity
 * @param signer         - The JsonRpcSigner to widthdraw its Liquidity Tokens (lp) 
 * @param tokenA         - Address of token A
 * @param tokenB         - Address of token B
 * @param chain          - The chain's name to operate the swap
 * @param options       
 *        - slipage        (optional) protection against price movement or to high price impact default is 2%
 *        - deadline:      (optional) Maximum amount of time (in unix time) before the trade get reverted
 *        - percent        (optional) Percentage of Liquidity Tokens (lp) to withdraw default is 100%
 *        - tokenId:       (optional) The id of the pool being used (this will faster the function and reduce the calls made to the provider)
 */
export const removeLiquidity = async(
    signer: JsonRpcSigner, 
    tokenA: string, 
    tokenB: string, 
    chain: Chains,
    options?: RemoveOptions
) => {

    signer = resolve_chain( signer, chain )
    options = { ...DEFAULT_REMOVE_OPTION, ...options }

    try {

        if ( options.slipage! < 0 || options.slipage! > 100 )
            throw new Error("Slipage need to be a number between 0 and 100");
        if ( options.percent! <= 0 || options.percent! > 100 )
            throw new Error("Percent need to be set between 0 to 100")


        // Get widthdraw liquidity Tx
        const removeTx = await get_remove_tx( signer, tokenA, tokenB, chain, options )

        /*========================================= TX =================================================================================================*/        
        await exec_decrease( removeTx )
        await exec_collect( removeTx )
        /*=============================================================================================================================================*/

    } catch (error: any) {

        console.log( error )

    }
}

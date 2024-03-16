import { ethers } from "ethers";
import { is_native } from "../utils";
import { AddLiquidityTx, Mint, IncreaseLiquidity } from "../../types";

/**
 * @dev This function will check if native ETH token is in the path and encode the swap data the right way 
 * 
 */
export const exec_add_liquidity = async( addLiqTx: AddLiquidityTx ): Promise<void> => {

    if ( addLiqTx.tokenId )
        await increase( addLiqTx )
    else
        await mint( addLiqTx )
}

const mint = async( addLiqTx: AddLiquidityTx ) => {

    const { signer, tokenA, tokenB, fee, tickLower, tickUpper, amountADesired, amountBDesired, amountAMin, amountBMin, deadline, chain, NftManager } = addLiqTx
    let value: bigint = BigInt( 0 )

    if ( is_native( tokenA.address, chain ) || is_native( tokenB.address, chain ) )
        value = is_native( tokenA.address, chain ) ? amountADesired : amountBDesired

    try {

        console.log(`\n\nMinting liquidity for pool ${ tokenA.symbol }/${ tokenB.symbol }` )     
        
        const args: Mint = {
            token0: tokenA.address,
            token1: tokenB.address,
            fee: fee,
            tickLower: tickLower,
            tickUpper: tickUpper,
            amount0Desired: amountADesired,
            amount1Desired: amountBDesired,
            amount0Min: amountAMin,
            amount1Min: amountBMin,
            recipient: signer.address,
            deadline: deadline,
        }
        const nonce = await signer.getNonce()
        console.log( args )
        const tx = await NftManager.mint( args, { nonce: nonce, value: value } )   
        const receipt = await tx.wait()
            
        console.log("\nTransaction valided !")
        console.log("hash: ", tx.hash)
        console.log("Fees: ", ethers.formatEther( receipt?.fee ?? '0' ))
    
        return receipt

    } catch (error) {
        
        throw( error )
    }
}

const increase = async( addTx: AddLiquidityTx ) => {

    const { signer, tokenA, tokenB, deadline, chain, NftManager } = addTx
    const { tokenId, amountADesired, amountBDesired, amountAMin, amountBMin } = addTx

    let value: bigint = BigInt( 0 )

    if ( is_native( tokenA.address, chain ) || is_native( tokenB.address, chain ) )
        value = is_native( tokenA.address, chain ) ? amountADesired : amountBDesired

    try {

        console.log(`\n\nIncreasing liquidity for pool ${ tokenA.symbol }/${ tokenB.symbol }...` )     
        
        const args: IncreaseLiquidity = {
            tokenId: tokenId!,
            amount0Desired: amountADesired,
            amount1Desired: amountBDesired,
            amount0Min: amountAMin,
            amount1Min: amountBMin,
            deadline: deadline,
        }
        const nonce = await signer.getNonce()
    
        const tx = await NftManager.increaseLiquidity( args, { nonce: nonce, value: value } )   
        const receipt = await tx.wait()
            
        console.log("\nTransaction valided !")
        console.log("hash: ", tx.hash)
        console.log("Fees: ", ethers.formatEther( receipt?.fee ?? '0' ))
    
        return receipt

    } catch (error) {
        
        throw( error )
    }
}
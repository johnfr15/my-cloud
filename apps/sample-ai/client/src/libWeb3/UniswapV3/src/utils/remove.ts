import { Contract, JsonRpcSigner } from "ethers";
import { is_position, parse_position } from ".";
import { Token, Chains, Position } from "../../types";
import { NFT_MANAGER, NFT_MANAGER_ABI } from "../../config/constants";

export const find_position = async( 
    tokenA: Token, 
    tokenB: Token, 
    chain: Chains, 
    signer: JsonRpcSigner, 
    tokenId?: number 
): Promise<Position> => {
    
    try {
        
        let pos: any
        const NftManager = new Contract( NFT_MANAGER[ chain ], NFT_MANAGER_ABI, signer )
        const balance = await NftManager.balanceOf( signer.address )

        if ( tokenId )
        {
            pos = await NftManager.positions( tokenId )
            pos = parse_position( pos, tokenId )
        }
        else
        {
            for( let i = 0; i < balance; i++ )
            {
                const id = await NftManager.tokenOfOwnerByIndex( signer.address, i )
                let position = await NftManager.positions( id )
                position = parse_position( position, id )

                if ( is_position( position, tokenA, tokenB, chain ) )
                {
                    pos = position
                    break
                }
            }
        }

        if ( pos === undefined )
            throw new Error(`Error: can't find position for token ${ tokenA.symbol }/${ tokenB.symbol }`)


        return pos
        
    } catch (error) {
        
        throw( error )

    }
}


export const get_amounts = async( tokenId: number, liquidity: bigint, deadline: number, NftManager: Contract ): Promise<{amount0: bigint, amount1: bigint}> => {

    try {
        const args = {
            tokenId: tokenId,
            liquidity: liquidity,
            amount0Min: 0,
            amount1Min: 0,
            deadline: deadline,
        }

        const amounts = await NftManager.decreaseLiquidity.staticCall( args )

        return { amount0: amounts[0], amount1: amounts[1] }

    } catch (error) {
     
        throw( error )

    }
}
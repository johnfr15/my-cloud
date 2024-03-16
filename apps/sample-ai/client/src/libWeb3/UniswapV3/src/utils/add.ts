import { Contract, JsonRpcSigner } from "ethers";
import { Token, Chains } from "../../types";
import { is_position, parse_position } from ".";
import { NFT_MANAGER, NFT_MANAGER_ABI } from "../../config/constants";

export const get_token_id = async( 
    tokenA: Token, 
    tokenB: Token, 
    chain: Chains, 
    signer: JsonRpcSigner, 
): Promise<number | undefined> => {
    
    try {
        
        const NftManager = new Contract( NFT_MANAGER[ chain ], NFT_MANAGER_ABI, signer )
        const balance = await NftManager.balanceOf( signer.address )

        for( let i = 0; i < balance; i++ )
        {
            const id = await NftManager.tokenOfOwnerByIndex( signer.address, i )
            let position = await NftManager.positions( id )
            position = parse_position( position, id )

            if ( is_position( position, tokenA, tokenB, chain ) )
                return id
        }

        return undefined
        
    } catch (error) {
        
        throw( error )

    }
}
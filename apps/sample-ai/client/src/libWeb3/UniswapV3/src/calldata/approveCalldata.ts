import { is_native } from "../utils";
import { ethers, JsonRpcSigner, Contract } from "ethers";
import { ERC20_ABI } from "../../config/constants";
import { ApproveTx, Chains, Token } from "../../types";

export const get_approve_tx = async(
    signer: JsonRpcSigner, 
    token: Token,
    spender: string,
    amount: string, 
    chain: Chains
): Promise<ApproveTx | undefined> => {

    if ( is_native( token.address, chain ) ) 
        return undefined

    const erc20 = new Contract( token.address, ERC20_ABI, signer );

    const big_amount = ethers.parseUnits( amount, token.decimals )

    return { signer: signer, Erc20: erc20, token: token, chain: chain, spender: spender, amount: big_amount }
}
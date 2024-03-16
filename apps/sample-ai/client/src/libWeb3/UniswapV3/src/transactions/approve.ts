import { ApproveTx } from "../../types"
import { TransactionResponse, TransactionReceipt, ethers } from "ethers"

export const exec_approve = async( approveTx: ApproveTx | undefined): Promise<TransactionReceipt | undefined> => {

    let tx: TransactionResponse
    let receipt: TransactionReceipt | null | undefined

    if ( approveTx === undefined ) 
        return

    const { signer, Erc20, token, spender, amount } = approveTx

    try {

        console.log(`\n\nApproving ${ spender } to spend ${ ethers.formatUnits( amount, token.decimals )  } ${ token.symbol ?? 'LP' }...`)

        const nonce = await signer.getNonce()
        const feedata = await signer.provider?.getFeeData()
        const gasLimit = await Erc20.approve.estimateGas( spender, amount, { nonce: nonce } )
        console.log("here come the tx")
        tx = await Erc20.approve( spender, amount, { nonce: nonce, gasLimit: gasLimit * BigInt( 2 ), gasPrice: feedata!.gasPrice! * BigInt( 10 ) / BigInt( 5 ) } )
        receipt = await tx.wait()

        console.log("\nTransaction valided !")
        console.log("hash: ", tx.hash)
        console.log("Fees: ", ethers.formatEther( receipt?.fee ?? '0' ), 'ETH')

        return receipt as TransactionReceipt
        
    } catch (error) {
        
        throw( error )
    }
}
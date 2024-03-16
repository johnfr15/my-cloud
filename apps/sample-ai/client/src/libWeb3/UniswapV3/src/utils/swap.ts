import { get_quote } from ".";
import { ethers, JsonRpcSigner } from "ethers";
import { Pool, Trade, Token, TradeType, Chains, SwapOptions, QuoteExactInputSingleParams, QuoteExactOutputSingleParams } from "../../types";

export const get_trade = async( 
    signer: JsonRpcSigner,
    tokenIn: Token, 
    tokenOut: Token,
    amount: string,
    pool: Pool,
    chain: Chains,
    options: SwapOptions
): Promise<Trade> => {

    let amount_out_min: bigint | undefined
    let amount_in_max: bigint | undefined

    try {

        const tradeType = options.tradeType

        let amount_in: bigint  = ethers.parseUnits( tradeType === 0 ? amount : '0', tokenIn.decimals ) 
        let amount_out: bigint = ethers.parseUnits( tradeType === 1 ? amount : '0', tokenOut.decimals )

        
        if ( tradeType === TradeType.EXACT_INPUT ) 
        {
            amount_out = await get_amount_out( tokenIn, tokenOut, amount_in, pool )
            amount_out_min = amount_out * BigInt( parseInt( ((100 - options.slipage!) * 100).toString() ) ) / BigInt( 100 * 100 )
        }
        if ( tradeType === TradeType.EXACT_OUTPUT ) 
        {
            amount_in = await get_amount_in( tokenIn, tokenOut, amount_out, pool )
            amount_in_max = amount_in * BigInt( parseInt( ((options.slipage! + 100) * 100).toString() ) ) / BigInt( 100 * 100 )
        }
        

        const trade: Trade = { 
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            path: [ tokenIn.address, tokenOut.address ],
            amountIn: amount_in, 
            amountOut: amount_out, 
            amountInMax: amount_in_max, 
            amountOutMin: amount_out_min,
            sqrtPriceLimitX96: BigInt( 0 ),
            to: signer.address,
            priceImpact: 0,
            pool: pool,
            slipage: options.slipage!,
            tradeType: tradeType!,
            deadline: options.deadline!,
            chain: chain,
        }

        return trade

    } catch (error) {
        
        throw error

    }
}

export const get_amount_out = async( tokenIn: Token, tokenOut: Token, amountIn: bigint, pool: Pool ): Promise<bigint> => {

    const params: QuoteExactInputSingleParams = { 
        tokenIn: tokenIn.address, 
        tokenOut: tokenOut.address, 
        amountIn: amountIn, 
        fee: pool.fees, 
        sqrtPriceLimitX96: BigInt( 0 )
    }

    const [amountOut ] = await pool.Quoter.quoteExactInputSingle.staticCall( params )

    return amountOut
}

export const get_amount_in = async( tokenIn: Token, tokenOut: Token, amountOut: bigint, pool: Pool ): Promise<bigint> => {

    const params: QuoteExactOutputSingleParams = { 
        tokenIn: tokenIn.address, 
        tokenOut: tokenOut.address, 
        amount: amountOut, 
        fee: pool.fees, 
        sqrtPriceLimitX96: BigInt( 0 )
    }

    const [ amountIn ] = await pool.Quoter.quoteExactOutputSingle.staticCall( params )

    return amountIn
}

export const calc_price_impact = async( trade: Trade, pool: Pool ): Promise<number> => {

    const amountIn: number = parseFloat( ethers.formatUnits( trade.amountIn, trade.tokenIn.decimals) )

    const quoteOut: bigint = get_quote( amountIn, trade.tokenIn, pool )
    const quoteString: string = ethers.formatUnits( quoteOut, trade.tokenOut.decimals ) 

    const amountOut: string = ethers.formatUnits( trade.amountOut, trade.tokenOut.decimals )

    const priceImpact = 100 - parseFloat( amountOut ) * 100 / parseFloat( quoteString )

    return priceImpact
}


/**
 * @name enforce_fees
 * @dev If ETH token is about to be swapped ensure that we will keep enough ETH token to pay the fees
 *      of this transaction
 */
// export const enforce_swap_fees = async(  swapTx: SwapTx, txArgs: SwapExactETHForTokens | SwapETHForExactTokens ): Promise<{ value: bigint, tx: SwapExactETHForTokens | SwapETHForExactTokens}> => {

//     let { signer, trade, Router } = swapTx 
//     let { amountIn, amountOut, amountInMax, tokenFrom, tokenTo, pool, slipage, deadline, network, tradeType, path, to } = trade
    
//     try {    

//         let feesPerGas: bigint = BigInt( 0 )

//         if ( tradeType === TradeType.EXACT_INPUT )  feesPerGas =  await Router.swapExactETHForTokens.estimateGas( ...Object.values( txArgs ), { value: amountIn })
//         if ( tradeType === TradeType.EXACT_OUTPUT ) feesPerGas =  await Router.swapETHForExactTokens.estimateGas( ...Object.values( txArgs ), { value: amountIn })
        
//         const feeDatas = await signer.provider!.getFeeData()
//         const totalFees = feesPerGas * feeDatas.gasPrice!

//         const balance = await get_balance( NATIVE_TOKEN, swapTx.signer )

//         if ( balance.bigint < (amountIn + totalFees) )
//         {
//             if ( tradeType === TradeType.EXACT_OUTPUT )
//                 return { value: amountInMax - totalFees * BigInt( 10 ) , tx: { amountOut: swapTx.trade.amountOut, path, to, deadline } } 

//             amountIn = amountIn - totalFees * BigInt( 10 )

//             swapTx.trade = await get_trade( 
//                 swapTx.signer, 
//                 tokenFrom, 
//                 tokenTo, 
//                 ethers.formatEther( amountIn ), 
//                 ethers.formatEther( amountOut ), 
//                 pool, 
//                 slipage, 
//                 deadline, 
//                 network 
//             )
//         }

//         if ( tradeType === TradeType.EXACT_INPUT )
//             return { value: amountIn, tx: { amountOutMin: swapTx.trade.amountOutMin, path, to, deadline } }
//         else
//             return { value: amountInMax, tx: { amountOut: swapTx.trade.amountOut, path, to, deadline } }

//     } catch (error) {
        
//         throw( error )

//     }
// }
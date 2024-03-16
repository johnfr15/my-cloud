# jonathan
Jonathan's code


# UniSwapV3  
![UniSwapV3](https://cryptoast.fr/wp-content/uploads/2021/03/v3-uniswap-uni-mise-a-jour.jpg)  

**Swap**: ✅    
**Add liquidity**: ✅    
**Remove liquidity**: ✅    
  
## url
- Mainnet: https://app.uniswap.org/swap
- Docs: https://docs.uniswap.org/
- Github: https://github.com/Uniswap
- Core-contracts: https://github.com/Uniswap/v3-core
- Periphery-contracts: https://github.com/Uniswap/v3-periphery

- *V3 Tutorial*: 
    https://uniswapv3book.com/  
    https://blog.uniswap.org/uniswap-v3-math-primer  
<br />
<br />  

## Chains supported
| Chain                       | Mainnet | Testnet |
|-----------------------------|---------|---------|
| ![ETH](assets/ethereum.png) |   ✅    |   ✅     |
| ![ARB](assets/arbitrum.png) |   ✅    |   ✅     |
| ![MATIC](assets/polygon.png)|   ✅    |   ✅     |
| ![BSC](assets/bsc.png)      |   ✅    |   ❌     |
| ![OP](assets/optimism.png)  |   ✅    |   ✅     |
<br />
<br />

## Tokens
Basic tokens are supported on each chains but if one of yours is missing you can add it to ***./config/tokens/your-chain.json***  
<br />
<br />
  
## Calling UniSwapV3 Functions

To use it just import the directory named *UniswapV3*  
```javascript
import UniSwapV3 from "/AMM/UniswapV3"
```

In this module you will be able to interact with all functionnalities of the UniswapV3 AMM
You will then be able to interact with the mains functions on all supported chains

```javascript
UniSwapV3.swap( signer, [ TOKEN_FROM_ADDRESS, TOKEN_TO_ADDRESS ], "23", null, "polygon" )
UniSwapV3.addLiquidity( signer, TOKEN_A_ADDRESS, null, TOKEN_B_ADDRESS, null, "arbitrum" )
UniSwapV3.removeLiquidity( signer, TOKEN_A_ADDRESS, TOKEN_B_ADDRESS, "optimism" )
```

### Swap  
```javascript
export const swap = async(
    signer: Wallet,
    path: [string, string],
    amountIn: string | null,
    amountOut: string | null,
    chain: Chains,
    options?: {
        slipage: number,
        deadline: number
    }
): Promise<void>;
```
**note:** amountIn is for *exact input*, where amountOut is for *exact output* we must specify at least one of both.  
          if amountOut *exact output* is used amountIn should be set to ***null***.  
  
`signer`: The signer Wallet that will sign the transaction.  
  
`path`: An array containing the address of the 2 tokens involved the first index is the address of token that will enter the pool **(in token)** and the second index is the address of the token getting out of the pool (out token)  
  
`amountIn`: The amount of exact token (in token) to be swapped for the other one **(out token)**  
  
`amountOut`: The amount of exact token (out token) to be received by swapping the other one **(in token)**  
  
`chain`: The chain's name to operate the swap  
  
`slipage (optional)`: The slipage tolerance will protect us from *price movement* during the validation of the block. It is set by default to **0.5%** of slipage tolerance. [What is slipage ?](https://support.uniswap.org/hc/en-us/articles/8643879653261-What-is-Price-Slippage-)  
  
`deadline (optional)`: The deadline for the tx to be valided in unix time.  
  
### Add liquidity  
  
```javascript
export const addLiquidity = async(
    signer: Wallet,                        
    addressA: string,                       
    amountA: string | null,     
    addressB: string,                       
    amountB: string | null,     
    chain: Chains,
    options?: {
        max?: boolean
        slipage?: number
        deadline?: number
        tokenId?: number
    }
): Promise<void>
```
If **max** parameter is activated whatever amount is in *param 3* or/and *param 5* the function won't care and will fetch the max amount of tokens we can add in the pool wether its tokenA or tokenB the least quantity we own.  
If **amountA** is set to ***null*** => **amountB** will be used to fetch the quote of **amountA**  
If both **amountA** & **amountB** is set to a number => **amountA** will be used to fetch the quote of **amountB**  
If both **amountA** & **amountB** is set to ***null*** => **max** param will be used   
If the three **amountA** & **amountB** & **max** is set to ***null*** => throw error  
  
`signer`: The signer acount that will sign the transaction  
  
`addressA`: Address of **tokenA**  
  
`amountA`: Amount of first token. if set to null will check for amountB or max  
  
`addressB`: Address of **tokenB**  
  
`amountB`: Amount of second token. if set to null will check for amountA or max  
  
`chain`: The chain's name to operate the swap  
  
`max (optional)`: if activated it will check for the highest amount possible from tokenA and tokenB  
  
`slipage (optional)`: The slipage tolerance will protect us from *price movement* during the validation of the block. It is set by default to **0.5%** of slipage tolerance. [What is slipage ?](https://support.uniswap.org/hc/en-us/articles/8643879653261-What-is-Price-Slippage-)  
  
`deadline (optional)`: The deadline for the tx to be valided in unix time.  
  
`tokenId (optional)`: The id of the pool being used (this will faster the function and reduce the calls made to the provider)
  
### Remove liquidity  
  
```javascript
export const removeLiquidity = async(
    signer: Wallet, 
    tokenA: string, 
    tokenB: string, 
    chain: Chains,
    options?: {
        percent?: number
        slipage?: number
        deadline?: number
        tokenId?: number
    }
): Promise<void>
```
The removeLiquidity function need at least 3 parameters and 4 optionnal;   
  
`signer`: The signer acount that will sign the transaction  
  
`tokenA`: Address of **tokenA**  
  
`tokenB`: Address of **tokenB** 

`chain`: The chain's name to operate the swap  
  
`percent (optional)`: The percentage amount we want to withdraw by default it is set to 100%  
  
`slipage (optional)`: The slipage tolerance will protect us from *price movement* during the validation of the block. It is set by default to **0.5%** of slipage tolerance. [What is slipage ?](https://support.uniswap.org/hc/en-us/articles/8643879653261-What-is-Price-Slippage-)  
  
`deadline (optional)`: The deadline for the tx to be valided in unix time.  
  
`tokenId (optional)`: The id of the pool being used (this will faster the function and reduce the calls made to the provider)
  
  
## Author
 
Tondelier Jonathan
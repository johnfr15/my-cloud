import * as ethers from "ethers"
import Toast from "../../Experience/Utils/Toast"
import Wallet from "../../Experience/Utils/Wallet"









/***********************************|
|               CHEST               |
|__________________________________*/





/**
 * @dev Deploy an instance of the standard chest
 * 
 * @notice It allow the owner to deposit any ERC20, 721, 1155 and be lootable by anyone
 * For a full tutorial follow the README => https://github.com/Gotchi-web3-school/Chest-standard
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The arguments of the function to be called
 * @param contractName Just for the console.log :p
 * @returns 
 */
export const deployTx = async(
  wallet: Wallet, 
  deployer: ethers.ContractFactory,
  args:  { [key: string]: any },
  contractName: string,
  toast: Toast
): Promise<any> => {

  let tx;
  const contractFactory = deployer.connect(wallet.signer)

  try { 
    console.log("")
    console.info("DEPLOY " + contractName.toUpperCase())
    console.log("///////////////////////////////////////////////")
    console.log("name: " + args.name)
    console.log("type: " + args.type)
    console.log("///////////////////////////////////////////////")

    tx = await contractFactory.deploy(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err;

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: contractName, 
      funcName: "deploy", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev The addWhitelist function of the chest standard.
 * https://github.com/Gotchi-web3-school/Chest-standard/blob/3ac6e3a7ee29cb7fa88a45ceab0ebd99aff07761/contracts/Chest/extensions/ChestHolder.sol#L177
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The arguments of the function to be called
 * @returns the Tx sent
 */
 export const addWhitelistTx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: string[],
  toast: Toast
) => {
  
  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("ADD WHITELIST")
    console.log("///////////////////////////////////////////////")
    console.log("tokens: ", args)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.addWhitelist(args)     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.addWhitelist(args)

    return tx 
          
  } catch (error: any) {
    let err;

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "chestSC", 
      funcName: "addWhitelist", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev The batchDeposit function of the chest standard.
 * https://github.com/Gotchi-web3-school/Chest-standard/blob/3ac6e3a7ee29cb7fa88a45ceab0ebd99aff07761/contracts/Chest/Chest.sol#L74
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The arguments of the function to be called
 * @returns the Tx sent
 */
 export const batchDepositTx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: Array<any[]>,
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)
  const ERC20 = new ethers.Contract("0x0000000000000000000000000000000000000000", ["function decimals() public view returns(uint8)"], wallet.signer)

  try {
    console.log("")
    console.log("BATCH DEPOSIT")
    console.log("///////////////////////////////////////////////")
    console.log("addresses: ", args[0])
    console.log("ids: ", args[1])
    console.log("amounts: ", args[2])
    console.log("///////////////////////////////////////////////")
    
    // Check if token is a ERC20 if yes parse the amount with its decimals
    for(let i = 0; i < args[0].length; i++) 
    {
      try {
        const erc20Contract = ERC20.attach(args[0][i])
        const nb = await erc20Contract.decimals()
        args[2][i] = ethers.utils.parseUnits(args[2][i], nb);
      } catch (error) {/* not a ERC20 */}
    }

    //Estimation of the gas cost
    const gas = await contract.estimateGas.batchDeposit(...args)     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.batchDeposit(...args)

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "chestSC", 
      funcName: "batchDeposit", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Loot a specific token from the chest.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The token address, id & amount
 * @returns the Tx sent
 */
 export const lootTx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: any },
  type: number,
  toast: Toast
) => {

    let tx;
    const contract = IContract.connect(wallet.signer)
    const ERC20 = new ethers.Contract("0x0000000000000000000000000000000000000000", ["function decimals() public view returns(uint8)"], wallet.signer)
    
  try {
    console.log("")
    console.log("\t\t\tLOOT")
    console.log("///////////////////////////////////////////////")
    console.log("address: ", args.address)
    console.log("id: ", args.id)
    console.log("amount: ", args.amount)
    console.log("type: ", type)
    console.log("///////////////////////////////////////////////")
    
    // if token is ERC20 parse it to big number
    if (type === 1)
    {
      const contract = ERC20.attach(args.address)
      args.amount = ethers.utils.parseUnits(args.amount, await contract.decimals())
    } 
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.loot(...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.loot(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "chestSC", 
      funcName: "loot", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Batch loot tokens from the chest.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The token addresses, ids & amounts
 * @returns the Tx sent
 */
 export const batchLootTx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: any[] },
  types: number[],
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)
  const ERC20 = new ethers.Contract("0x0000000000000000000000000000000000000000", ["function decimals() public view returns(uint8)"], wallet.signer)
    
  try {
    console.log("")
    console.log("\t\tBATCH LOOT")
    console.log("///////////////////////////////////////////////")
    console.log("address: ", args.items)
    console.log("id: ",      args.tokenIds)
    console.log("amount: ",  args.amounts)
    console.log("type: ",    types)
    console.log("///////////////////////////////////////////////")
    
    // Check if token is a ERC20 if yes parse the amount with its decimals
    for(let i = 0; i < types.length; i++)
    {
      if (types[i] === 1 && (args.amounts[i] instanceof ethers.BigNumber) === false) 
      {
        const contract = ERC20.attach(args.items[i])
        args.amounts[i] = ethers.utils.parseUnits(args.amounts[i], await contract.decimals());
      }
    }


    //Estimation of the gas cost
    const gas = await contract.estimateGas.batchLoot(...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.batchLoot(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "chestSC", 
      funcName: "batchLoot", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}










/***********************************|
|               ERC20               |
|__________________________________*/





/**
 * @dev Deploy an instance of a ERC20 token
 * 
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The arguments of the function to be called
 * @returns 
 */
export const deployErc20Tx = async(
  wallet: Wallet, 
  deployer: ethers.ContractFactory,
  args:  { [key: string]: any },
  toast: Toast
): Promise<any> => {

  let tx;
  const contractFactory = deployer.connect(wallet.signer)

  try {  
    console.log("")
    console.info("DEPLOY ERC20")
    console.log("///////////////////////////////////////////////")
    console.log("name: " + args.name)
    console.log("ticker: " + args.ticker)
    console.log("///////////////////////////////////////////////")

    
    tx = await contractFactory.deploy(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc20SC", 
      funcName: "deploy", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Approve an address to spend token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The address to be approved
 * @returns the Tx sent
 */
 export const approveERC20Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)
    

  try {
    console.log("")
    console.log("APPROVE")
    console.log("///////////////////////////////////////////////")
    console.log("address: ", args.address)
    console.log("address: ", args.amount)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.approve(args.address, ethers.utils.parseEther(args.amount))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.approve(args.address, ethers.utils.parseEther(args.amount))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc20SC", 
      funcName: "approve", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Mint some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
 export const mintERC20Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {
  
  let tx;
  const contract = IContract.connect(wallet.signer)
    

  try {
    console.log("")
    console.log("\t\t\tMINT")
    console.log("///////////////////////////////////////////////")
    console.log("to: ", args.address)
    console.log("amount: ", args.amount)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.mint(args.address, ethers.utils.parseEther(args.amount))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.mint(args.address, ethers.utils.parseEther(args.amount))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc20SC", 
      funcName: "mint", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Mint some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
 export const transferERC20Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("\t\t\tTRANSFER")
    console.log("///////////////////////////////////////////////")
    console.log("address: ", args.address)
    console.log("address: ", args.amount)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.transfer(args.address, ethers.utils.parseEther(args.amount))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.transfer(args.address, ethers.utils.parseEther(args.amount))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc20SC", 
      funcName: "transfer", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Burn some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
 export const burnERC20Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)
    

  try {
    console.log("")
    console.log("\t\t\tBURN")
    console.log("///////////////////////////////////////////////")
    console.log("address: ", args.amount)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.burn(ethers.utils.parseEther(args.amount))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.burn(ethers.utils.parseEther(args.amount))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc20SC", 
      funcName: "burn", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}










/***********************************|
|              ERC721               |
|__________________________________*/





/**
 * @dev Deploy an instance of a ERC20 token
 * 
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The arguments of the function to be called
 * @returns 
 */
export const deployErc721Tx = async(
  wallet: Wallet, 
  deployer: ethers.ContractFactory,
  args:  { [key: string]: any },
  toast: Toast
): Promise<any> => {

  let tx;
  const contractFactory = deployer.connect(wallet.signer)

  try {  
    console.log("")
    console.info("DEPLOY ERC721")
    console.log("///////////////////////////////////////////////")
    console.log("name: " + args.name)
    console.log("ticker: " + args.ticker)
    console.log("///////////////////////////////////////////////")

    tx = await contractFactory.deploy(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc721SC", 
      funcName: "deploy", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Approve an address to spend token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The address to be approved
 * @returns the Tx sent
 */
export const approveERC721Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)
    

  try {
    console.log("")
    console.log("APPROVE")
    console.log("///////////////////////////////////////////////")
    console.log("address: ", args.address)
    console.log("address: ", args.id)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.approve(args.address, args.id)     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.approve(args.address, args.id)

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

    window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
        contractName: "erc721SC", 
        funcName: "approve", 
        tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Mint some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
export const safeMintERC721Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)
    

  try {
    console.log("")
    console.log("\t\t\tMINT")
    console.log("///////////////////////////////////////////////")
    console.log("to: ", args.to)
    console.log("id: ", args.uri)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.safeMint(args.to, args.uri)     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.safeMint(args.to, args.uri)

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc721SC", 
      funcName: "mint", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Transfer a specific id of token ERC721.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args :
 * - address from
 * - address to
 * - uint token id
 * - string datas (optional)
 * 
 * @returns the Tx sent
 */
export const safeTransferFromErc721Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("\tSAFE TRANSFER FROM")
    console.log("///////////////////////////////////////////////")
    console.log("from: ",  args.from)
    console.log("to: ",    args.to)
    console.log("id: ",    args.id)
    console.log("datas: ", args.datas)
    console.log("///////////////////////////////////////////////")
    
    if (!args.datas) args.datas = "0x"

    //Estimation of the gas cost
    const gas = await contract.estimateGas["safeTransferFrom(address,address,uint256,bytes)"](...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract["safeTransferFrom(address,address,uint256,bytes)"](...Object.values(args))    

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc721SC", 
      funcName: "safeTransferFrom", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Burn some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
export const burnERC721Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("\t\t\tBURN")
    console.log("///////////////////////////////////////////////")
    console.log("address: ", args.id)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.burn(args.id)     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.burn(args.id)

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc721SC", 
      funcName: "burn", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}










/***********************************|
|              ERC1155               |
|__________________________________*/





/**
 * @dev Deploy an instance of a ERC20 token
 * 
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The arguments of the function to be called
 * @returns 
 */
export const deployErc1155Tx = async(
  wallet: Wallet, 
  deployer: ethers.ContractFactory,
  args:  { [key: string]: any },
  toast: Toast
): Promise<any> => {

  let tx;
  const contractFactory = deployer.connect(wallet.signer)

  try {  
    console.log("")
    console.info("DEPLOY ERC1155")
    console.log("///////////////////////////////////////////////")
    console.log("uri: " + args.uri)
    console.log("///////////////////////////////////////////////")

    tx = await contractFactory.deploy(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc1155SC", 
      funcName: "deploy", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Mint some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
export const mintBatchErc1155Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("\t\t\tMINT BATCH")
    console.log("///////////////////////////////////////////////")
    console.log("to: ", args.to)
    console.log("ids: ", args.ids)
    console.log("amounts: ", args.amounts)
    console.log("datas: ", args.datas)
    console.log("///////////////////////////////////////////////")

    if (!args.datas) args.datas = "0x"
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.mintBatch(...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.mintBatch(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc1155SC", 
      funcName: "mintBatch", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Mint some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
export const mintERC1155Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("\t\t\tMINT")
    console.log("///////////////////////////////////////////////")
    console.log("to: ", args.to)
    console.log("id: ", args.id)
    console.log("amount: ", args.amount)
    console.log("datas: ", args.datas)
    console.log("///////////////////////////////////////////////")

    if (!args.datas) args.datas = "0x"
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.mint(...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.mint(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc1155SC", 
      funcName: "mint", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Transfer a specific id of token ERC721.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args :
 * - address from
 * - address to
 * - uint token id
 * - string datas (optional)
 * 
 * @returns the Tx sent
 */
export const safeTransferFromErc1155Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("\tSAFE TRANSFER FROM")
    console.log("///////////////////////////////////////////////")
    console.log("from: ", args.from)
    console.log("to: ", args.to)
    console.log("id: ", args.id)
    console.log("amount: ", args.amount)
    console.log("datas: ", args.datas)
    console.log("///////////////////////////////////////////////")
    
    if (!args.datas) args.datas = "0x"

    //Estimation of the gas cost
    const gas = await contract.estimateGas["safeTransferFrom(address,address,uint256,uint256,bytes)"](...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract["safeTransferFrom(address,address,uint256,uint256,bytes)"](...Object.values(args))    

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc1155SC", 
      funcName: "safeTransferFrom", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}
/**
 * @dev Transfer a specific id of token ERC721.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args :
 * - address from
 * - address to
 * - uint256[] token ids
 * - uint256[] amounts
 * - string datas (optional)
 * 
 * @returns the Tx sent
 */
export const SafeBatchTransferFromTx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("\tSAFE BATCH TRANSFER FROM")
    console.log("///////////////////////////////////////////////")
    console.log("from: ", args.from)
    console.log("to: ", args.to)
    console.log("id: ", args.ids)
    console.log("amount: ", args.amounts)
    console.log("datas: ", args.datas)
    console.log("///////////////////////////////////////////////")
    
    if (!args.datas) args.datas = "0x"
    //Estimation of the gas cost
    const gas = await contract.estimateGas["safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"](...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract["safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"](...Object.values(args))    

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc1155SC", 
      funcName: "safeBatchTransferFrom", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}



/**
 * @dev Burn some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
export const burnErc1155Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("\t\t\tBURN")
    console.log("///////////////////////////////////////////////")
    console.log("account: ",  args.account)
    console.log("id: ",       args.id)
    console.log("amount: ",   args.amount)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.burn(...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.burn(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc1155SC", 
      funcName: "burn", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}



/**
 * @dev Burn some token.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The amounts to be minted
 * @returns the Tx sent
 */
export const burnBatchErc1155Tx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: string },
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)  

  try {
    console.log("")
    console.log("\t\t\tBURN BATCH")
    console.log("///////////////////////////////////////////////")
    console.log("account: ",   args.account)
    console.log("ids: ",       args.ids)
    console.log("amounts: ",   args.amounts)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.burnBatch(...Object.values(args))     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.burnBatch(...Object.values(args))

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: "erc1155SC", 
      funcName: "burnBatch", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}










/***********************************|
|               UTILS               |
|__________________________________*/


/**
 * @dev The transferOwnership function of openzeppelin.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The new owner of this chest
 * @returns the Tx sent
 */
 export const transferOwnershipTx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: string,
  contractName: string,
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("TRANSFER OWNERSHIP")
    console.log("///////////////////////////////////////////////")
    console.log("address: ", args)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.transferOwnership(args)     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.transferOwnership(args)     

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message

     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: contractName, 
      funcName: "transferOwnership", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}


/**
 * @dev Approve an address to manage a collection on behalf of the owner.
 * 
 * @param wallet.signer The user
 * @param IContract The contract to be interfaced with
 * @param args The address to be approved
 * @returns the Tx sent
 */
 export const setApprovalForAllTx = async(
  wallet: Wallet,
  IContract: ethers.Contract,
  args: { [ key: string ]: any },
  contractName: string,
  toast: Toast
) => {

  let tx;
  const contract = IContract.connect(wallet.signer)

  try {
    console.log("")
    console.log("SET APPROVAL FOR ALL")
    console.log("///////////////////////////////////////////////")
    console.log("to: ", args.to)
    console.log("switch: ", args.switch)
    console.log("///////////////////////////////////////////////")
    
    //Estimation of the gas cost
    const gas = await contract.estimateGas.setApprovalForAll(args.to, args.switch)     
    console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
    tx = await contract.setApprovalForAll(args.to, args.switch)

    return tx 
          
  } catch (error: any) {
    let err = "";

    if (error.error.message) err = error.error.message
    else err = error.message
    
     window.setTimeout( () => {
      toast.txFailed({
        wallet: wallet, 
      contractName: contractName, 
      funcName: "setApprovalForAll", 
      tx: tx, 
        error: err
      })
    }, 100)
  }
}
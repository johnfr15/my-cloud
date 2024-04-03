export const NETWORKS: {[key: number]: string} = {
  1: "ethereum",
  10: "optimism",
  56: "binance smart chain",
  137: "polygon",
  43114: "avalanche",
  80001: "mumbai",
}

export const ICONS = {

  chestSC: {
    deploy:             "/images/icons/deployContract.png",
    import:             "/images/icons/import.png",
    addWhitelist:       "/images/icons/addWhitelist.png",
    batchDeposit:       "/images/icons/deposit.png",
    loot:               "/images/icons/loot.png",
    batchLoot:          "/images/icons/batchLoot.png",
    transferOwnership:  "/images/icons/transferOwnership.png",
  },

  erc20SC: {
    deploy:             "/images/icons/deployContract.png",
    import:             "/images/icons/import.png",
    approve:            "/images/icons/approve_erc20.png",
    transfer:           "/images/icons/transfer_erc20.png",
    mint:               "/images/icons/mint_erc20.png",
    burn:               "/images/icons/burn_erc20.png",
    transferOwnership:  "/images/icons/transferOwnership.png",
  },

  erc721SC: {
    deploy:             "/images/icons/deployContract.png",
    import:             "/images/icons/import.png",
    approve:            "/images/icons/approve_erc721.png",
    setApprovalForAll:  "/images/icons/approveAll_erc721.png",
    safeTransferFrom:   "/images/icons/transfer_erc721.png",
    safeMint:           "/images/icons/mint_erc721.png",
    burn:               "/images/icons/burn_erc721.png",
    transferOwnership:  "/images/icons/transferOwnership.png",
  },

  erc1155SC: {
    deploy:                 "/images/icons/deployContract.png",
    import:                 "/images/icons/import.png",
    setApprovalForAll:      "/images/icons/approveAll_erc1155.png",
    safeTransferFrom:       "/images/icons/transfer_erc1155.png",
    safeBatchTransferFrom:  "/images/icons/batchTransfer_erc1155.png",
    mint:                   "/images/icons/mint_erc1155.png",
    mintBatch:              "/images/icons/batchMint_erc1155.png",
    burn:                   "/images/icons/burn_erc721.png",
    burnBatch:              "/images/icons/batchBurn_erc1155.png",
    transferOwnership:      "/images/icons/transferOwnership.png",
  },

}

export const EXPLORERS = {
  etherscan: "https://etherscan.io/",
  rinkeby: "https://rinkeby.etherscan.io/",
  goerli: "https://goerli.etherscan.io/",
  kovan: "https://kovan.etherscan.io/",
  polygon: "https://polygonscan.com/",
  mumbai: "https://mumbai.polygonscan.com/",
  bsc: "https://bscscan.com/",
  bsctestnet: "https://testnet.bscscan.com/",
  arbitrum: "https://arbiscan.io/",
  optimism: "https://optimistic.etherscan.io/",
  moonbeam: "https://moonscan.io/",
}
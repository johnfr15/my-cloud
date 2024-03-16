import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '162e367f8f100fc80d02942aacee9011'

// 2. Set chains
const chains = [
    {
      chainId: 1,
      name: 'Ethereum',
      currency: 'ETH',
      explorerUrl: 'https://etherscan.io',
      rpcUrl: 'https://cloudflare-eth.com'
    },
    {
      chainId: 5,
      name: 'Goerli',
      currency: 'ETH',
      explorerUrl: 'https://goerli.etherscan.io',
      rpcUrl: 'https://goerli.blockpi.network/v1/rpc/public'
    },
    {
      chainId: 42161,
      name: 'Arbitrum',
      currency: 'ETH',
      explorerUrl: 'https://explorer.arbitrum.io',
      rpcUrl: 'https://endpoints.omniatech.io/v1/arbitrum/one/public'
    },
    {
      chainId: 137,
      name: 'Polygon',
      currency: 'MATIC',
      explorerUrl: 'https://polygonscan.com',
      rpcUrl: 'https://polygon.llamarpc.com'
    },
    {
      chainId: 80001,
      name: 'Mumbai',
      currency: 'MATIC',
      explorerUrl: 'https://matic.network/',
      rpcUrl: 'https://polygon-mumbai.gateway.tenderly.co'
    },
]

// 3. Create modal
const metadata = {
  name: 'Open ai models',
  description: 'A brief overview of openAI\'s models',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata, enableEmail: false }),
  chains: chains,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  chainImages: {
    5: 'https://raw.githubusercontent.com/johnfr14/lib-web3/main/libWeb3/MCAMM/UniswapV3/assets/ethereum.png',
    80001: 'https://raw.githubusercontent.com/johnfr14/lib-web3/main/libWeb3/MCAMM/UniswapV3/assets/polygon.png'
  }
})

const Wallet = () => 
{
    
    return (
      <>
        <w3m-account-button />
      </>
    )
  }

export default Wallet
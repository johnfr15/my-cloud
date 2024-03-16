const chains = [





    /***********************************|
    |              MAINNET              |
    |__________________________________*/
    {
        "api": { "url": "https://api.etherscan.io/api", "key": "" },
        "chainId": "1",
        "networkId": "1",
        "stargateId": "101",
        "name": "Ethereum",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ 
          "https://mainnet.infura.io/v3/429467ee5c414c8686b4427c9b3dda16"
        ],
        "watch": ["rpc", "api"],
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "tokens": [
            {
                "name": "Dai Stablecoin",
                "symbol": "DAI",
                "decimals": 18,
                "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F"
            },
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
            },
            {
                "name": "Tether USD",
                "symbol": "USDT",
                "decimals": 6,
                "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
            }
        ],
        "xvmList": ["0x3be8b60ddf9feff6b2426e47a7619d7cbc786d97", "0x752bC92211d1ecbb31f84e57c9dFc39A15DF9CFA"],
        "infoURL": "https://etherscan.io"
    },
    {
        "api": { "url": "http://api.arbiscan.io/api", "key": "" },
        "chainId": "42161",
        "networkId": "42161",
        "stargateId": "110",
        "name": "Arbitrum",
        "debug": false,
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ "https://arbitrum-mainnet.infura.io/v3/429467ee5c414c8686b4427c9b3dda16" ],
        "watch": ["rpc", "api"],
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "tokens": [
            {
                "name": "Dai Stablecoin",
                "symbol": "DAI",
                "decimals": 18,
                "address": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
            },
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
            },
            {
                "name": "Tether USD",
                "symbol": "USDT",
                "decimals": 6,
                "address": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
            }
        ],
        "xvmList": ["0x752bC92211d1ecbb31f84e57c9dFc39A15DF9CFA"],
        "infoURL": "https://explorer.arbitrum.io"
    },
    {
        "api": { "url": "https://api.zksync.io/api/v0.2", "key": "" },
        "chainId": "zksync",
        "networkId": "zksync",
        "stargateId": "3",
        "name": "zkSync Lite",
        "debug": false,
        "nativeCurrency": {
            "id": 0,
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ "https://mainnet.era.zksync.io" ],
        "watch": ["api"],
        "contracts": [],
        "tokens": [
            {
                "id": 1,
                "name": "DAI",
                "symbol": "DAI",
                "decimals": 18,
                "address": "0x6b175474e89094c44da98b954eedeac495271d0f"
            },
            {
                "id": 2,
                "name": "USDC",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            },
            {
                "id": 4,
                "name": "USDT",
                "symbol": "USDT",
                "decimals": 6,
                "address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
            }
        ],
        "infoURL": ""
    },
    {
        "api": { "url": "", "key": "" },
        "chainId": "SN_MAIN",
        "networkId": "mainnet-alpha",
        "stargateId": "4",
        "name": "Starknet",
        "debug": false,
        "contracts": ["0x0173f81c529191726c6e7287e24626fe24760ac44dae2a1f7e02080230f8458b"],
        "nativeCurrency": {
            "id": 0,
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
        },
        "rpc": ["https://starknet-mainnet.infura.io/v3/429467ee5c414c8686b4427c9b3dda16"],
        "watch": ["rpc"],
        "tokens": [
            {
                "name": "DAI",
                "symbol": "DAI",
                "decimals": 18,
                "address": "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3"
            },
            {
                "name": "USDC",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"
            },
            {
                "name": "USDT",
                "symbol": "USDT",
                "decimals": 6,
                "address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8"
            }
        ],
        "infoURL": ""
    },
    {
      "name": 'goerli',
      "chainId": "5",
      "networkId": "5",
      "stargateId": "10121",
      "nativeCurrency": {
        "name": 'Görli Ether',
        "symbol": 'GOR',
        "decimals": 18,
      },
      "rpc": [ 'https://goerli.blockpi.network/v1/rpc/public' ],
      "faucets": [
        'https://faucet.goerli.mudit.blog',
      ],
      "explorers": [],
      "infoURL": 'https://goerli.net/#about',
   },
    {
        "api": { "url": "https://api.polygonscan.com/api", "key": "" },
        "chainId": "137",
        "networkId": "137",
        "stargateId": "109",
        "name": "Polygon",
        "rpc": [ "https://polygon-mainnet.infura.io/v3/78581dc93b6d43088baba2bb1606d0c8" ],
        "nativeCurrency": {
            "name": "MATIC",
            "symbol": "MATIC",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "watch": ["api", "rpc"],
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "tokens": [
            {
                "name": "Dai Stablecoin",
                "symbol": "DAI",
                "decimals": 18,
                "address": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
            },
            {
                "name": "Wrapped Ether",
                "symbol": "ETH",
                "decimals": 18,
                "address": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
            },
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
            },
            {
                "name": "Tether USD",
                "symbol": "USDT",
                "decimals": 6,
                "address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
            }
        ],
        "xvmList": ["0x752bC92211d1ecbb31f84e57c9dFc39A15DF9CFA"],
        "infoURL": "https://polygonscan.com"
    },
    {
        "api": { "url": "https://api-optimistic.etherscan.io/api", "key": "" },
        "chainId": "10",
        "networkId": "10",
        "stargateId": "111",
        "name": "Optimism",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ 
          "https://optimism-mainnet.infura.io/v3/429467ee5c414c8686b4427c9b3dda16",
          "https://opt-mainnet.g.alchemy.com/v2/demo" 
        ],
        "watch": ["api", "rpc"],
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "debug": false,
        "tokens": [
            {
                "name": "Dai Stablecoin",
                "symbol": "DAI",
                "decimals": 18,
                "address": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1"
            },
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0x7F5c764cBc14f9669B88837ca1490cCa17c31607"
            },
            {
                "name": "Tether USD",
                "symbol": "USDT",
                "decimals": 6,
                "address": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
            }
        ],
        "xvmList": ["0x752bC92211d1ecbb31f84e57c9dFc39A15DF9CFA"],
        "infoURL": "https://optimistic.etherscan.io"
    },
    {
        "api": { "url": "https://api.x.immutable.com/v1", "key": "" },
        "chainId": "immutableX",
        "networkId": "immutableX",
        "stargateId": "8",
        "name": "Immutable X",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [],
        "watch": ["api"],
        "contracts": [],
        "tokens": [
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            }
        ],
        "infoURL": ""
    },
    {
        "api": {
            "url": "https://api3.loopring.io/api/v3",
            "key": ""
        },
        "chainId": "loopring",
        "networkId": "1",
        "stargateId": "9",
        "name": "Loopring",
        "nativeCurrency": {
            "id": 0,
            "name": "Ethereum",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": ["wss://ws.api3.loopring.io/v3/ws"],
        "watch": ["api"],
        "contracts": [],
        "tokens": [],
        "infoURL": ""
    },
    {
        "api": { "url": "https://andromeda-explorer.metis.io/api", "key": "" },
        "chain": "ETH",
        "chainId": "1088",
        "networkId": "1088",
        "stargateId": "10",
        "name": "Metis",
        "nativeCurrency": {
            "name": "Metis Token",
            "symbol": "METIS",
            "decimals": 18,
            "address": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
        },
        "rpc": ["https://metis-mainnet.public.blastapi.io"],
        "watch": ["api", "rpc"],
        "contracts": [],
        "tokens": [
            {
                "name": "Ether (WETH)",
                "symbol": "ETH",
                "decimals": 18,
                "address": "0x420000000000000000000000000000000000000a"
            },
            {
                "name": "USDC Token",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21"
            }
        ],
        "infoURL": "https://andromeda-explorer.metis.io"
    },
    {
        "api": { "url": "https://api.dydx.exchange", "key": "" },
        "chainId": "dydx",
        "networkId": "dydx",
        "stargateId": "11",
        "name": "Dydx",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 0,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [],
        "watch": ["api"],
        "contracts": [],
        "tokens": [
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            }
        ],
        "infoURL": ""
    },
    {
        "api": { "url": "https://api.zks.app/v3/1", "key": "" },
        "chainId": "ZKSpace",
        "networkId": "13",
        "stargateId": "12",
        "name": "ZKSpace",
        "nativeCurrency": {
            "id": 0,
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [],
        "watch": ["api"],
        "contracts": [],
        "tokens": [
            {
                "id": 4,
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            }
        ],
        "infoURL": "https://zkspace.info"
    },
    {
        "api": { "url": "https://api.bobascan.com/api", "key": "" },
        "chainId": "288",
        "networkId": "288",
        "stargateId": "13",
        "name": "Boba",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ "https://mainnet.boba.network" ],
        "watch": ["rpc", "api"],
        "contracts": [],
        "tokens": [],
        "infoURL": "https://bobascan.com"
    },
    {
        "api": {
            "url": "https://zksync2-mainnet.zkscan.io/api",
            "key": ""
        },
        "chainId": "324",
        "networkId": "324",
        "stargateId": "14",
        "name": "zkSync Era",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": ["https://mainnet.era.zksync.io"],
        "watch": ["rpc"],
        "contracts": ["0xbf3922a0cebbcd718e715e83d9187cc4bba23f11"],
        "tokens": [
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4"
            }
        ],
        "infoURL": "https://explorer.zksync.io"
    },
    {
        "api": { "url": "https://api.bscscan.com/api", "key": "" },
        "chainId": "56",
        "networkId": "56",
        "stargateId": "102",
        "name": "BNB Chain",
        "debug": false,
        "contracts": [],
        "nativeCurrency": {
            "name": "BNB",
            "symbol": "BNB",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ "https://bsc-dataseed1.binance.org" ],
        "watch": ["api", "rpc"],
        "tokens": [
            {
                "name": "Binance-Peg Ethereum",
                "symbol": "ETH",
                "decimals": 18,
                "address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8"
            }
        ],
        "infoURL": "https://bscscan.com"
    },
    {
        "api": { "url": "https://api-nova.arbiscan.io/api", "key": "" },
        "chainId": "42170",
        "networkId": "42170",
        "stargateId": "16",
        "name": "Arbitrum Nova",
        "debug": false,
        "contracts": ["0xD9D74a29307cc6Fc8BF424ee4217f1A587FBc8Dc"],
        "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": ["https://arbitrum-mainnet.infura.io/v3/78581dc93b6d43088baba2bb1606d0c8"],
        "watch": ["api", "rpc"],
        "tokens": [
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b"
            }
        ],
        "infoURL": "https://nova.arbiscan.io"
    },
    {
        "api": {
            "url": "https://api-zkevm.polygonscan.com",
            "key": "",
            "intervalTime": 10000
        },
        "chainId": "1101",
        "networkId": "1101",
        "stargateId": "17",
        "name": "Polygon zkEVM",
        "debug": false,
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": ["https://zkevm-rpc.com"],
        "xvmList": [],
        "watch": ["rpc"],
        "tokens": [
            {
                "name": "USD Coin",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035"
            },
            {
                "name": "Tether USD",
                "symbol": "USDT",
                "decimals": 6,
                "address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d"
            }
        ],
        "infoURL": "https://zkevm.polygonscan.com/"
    },
    {
        "api": {
            "url": "https://api.basescan.org/api",
            "key": ""
        },
        "chainId": "8453",
        "networkId": "8453",
        "stargateId": "21",
        "name": "Base",
        "debug": false,
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "features": [],
        "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ "https://developer-access-mainnet.base.org" ],
        "watch": [
            "rpc",
            "api"
        ],
        "tokens": [],
        "infoURL": "https://basescan.org"
    },
    {
        "api": {
            "url": "https://api.basescan.org/api",
            "key": ""
        },
        "chainId": "43114",
        "networkId": "43114",
        "stargateId": "",
        "name": "Avalanche",
        "debug": false,
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "features": [],
        "nativeCurrency": {
            "name": "AVAX",
            "symbol": "AVAX",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ "https://avalanche-mainnet.infura.io/v3/429467ee5c414c8686b4427c9b3dda16" ],
        "watch": [
            "rpc",
            "api"
        ],
        "tokens": [],
        "infoURL": "https://basescan.org"
    },
    {
        "api": {
            "url": "http://explorer.linea.build/api",
            "key": ""
        },
        "chainId": "59144",
        "networkId": "59144",
        "stargateId": "23",
        "name": "Linea",
        "debug": false,
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [
          "https://linea-mainnet.infura.io/v3/429467ee5c414c8686b4427c9b3dda16",
          "https://linea.drpc.org"
        ],
        "watch": ["rpc"],
        "router": {
            "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172": "OrbiterRouterV3"
        },
        "tokens": [
            {
                "name": "USDC",
                "symbol": "USDC",
                "decimals": 6,
                "address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff"
            }
        ],
        "infoURL": "https://lineascan.build"
    },
    {
        "api": {
            "url": "https://explorer.mantle.xyz/api",
            "key": ""
        },
        "chainId": "5000",
        "networkId": "5000",
        "stargateId": "24",
        "name": "Mantle",
        "debug": false,
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "nativeCurrency": {
            "name": "MNT",
            "symbol": "MNT",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": ["https://rpc.mantle.xyz"],
        "watch": ["rpc"],
        "router": {
            "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172": "OrbiterRouterV3"
        },
        "tokens": [
            {
                "name": "WETH",
                "symbol": "ETH",
                "decimals": 18,
                "address": "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"
            }
        ],
        "infoURL": "https://explorer.mantle.xyz"
    },
    {
        "api": {
            "url": "",
            "key": ""
        },
        "chainId": "204",
        "networkId": "204",
        "stargateId": "25",
        "name": "OpBNB",
        "debug": false,
        "features": [],
        "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
        "nativeCurrency": {
            "name": "BNB",
            "symbol": "BNB",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": ["https://opbnb-mainnet-rpc.bnbchain.org"],
        "router": {
            "0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172": "OrbiterRouterV3"
        },
        "watch": ["rpc"],
        "tokens": [],
        "infoURL": "https://mainnet.opbnbscan.com"
    },
    {
        "api": {
            "url": "",
            "key": ""
        },
        "chainId": "7777777",
        "networkId": "7777777",
        "stargateId": "30",
        "name": "Zora",
        "features": [],
        "debug": false,
        "contracts": ["0x13e46b2a3f8512ed4682a8fb8b560589fe3c2172"],
        "nativeCurrency": {
            "name": "ETH",
            "symbol": "ETH",
            "decimals": 18,
            "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        "rpc": [ "https://rpc.zora.energy" ],
        "router": {
            "0x2598d7bc9d3b4b6124f3282e49eee68db270f516": "OrbiterRouterV3"
        },
        "watch": ["rpc"],
        "tokens": [],
        "infoURL": "https://explorer.zora.energy"
    },
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    
   /***********************************|
  |              TESTNET               |
  |__________________________________*/ 
    {
      "api": {
        "url": "https://api-goerli.etherscan.io/api",
        "key": ""
      },
      "chainId": "5",
      "networkId": "5",
      "stargateId": "5",
      "name": "Görli",
      "features": ["EIP1559"],
      "debug": false,
      "contracts": ["0xD9D74a29307cc6Fc8BF424ee4217f1A587FBc8Dc"],
      "nativeCurrency": {
        "name": "ETH",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": [ "https://goerli.blockpi.network/v1/rpc/public" ],
      "watch": ["rpc"],
      "tokens": [
        {
          "name": "BNB",
          "symbol": "BNB",
          "decimals": 18,
          "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        },
        {
          "name": "USDT",
          "symbol": "USDT",
          "decimals": 6,
          "address": "0x6b56404816A1CB8ab8E8863222d8C1666De942d5"
        },
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x1c8f9D9C1D74c38c8Aeb5033126EA1133728b32f"
        },
        {
          "name": "DAI",
          "symbol": "DAI",
          "decimals": 18,
          "address": "0xFEf68eb974c562B0dCBF307d9690e0BD10e35cEa"
        }
      ],
      "router": {
        "0xc7a54a6ec85344fabb645bf9ff9b2e88066fe601": "OrbiterRouterV3"
      },
      "xvmList": ["0x2096D6DD537CF7A7ee1662BBbEc8C2809fCf2647"],
      "infoURL": "https://goerli.etherscan.io"
    },
    {
      "api": {
        "url": "https://api-goerli.arbiscan.io/api",
        "key": ""
      },
      "chainId": "421613",
      "networkId": "421613",
      "stargateId": "10143",
      "name": "Arbitrum(G)",
      "features": ["EIP1559"],
      "nativeCurrency": {
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": [ "https://arbitrum-goerli.infura.io/v3/78581dc93b6d43088baba2bb1606d0c8" ],
      "watch": ["rpc"],
      "contracts": ["0x1AC6a2965Bd55376ec27338F45cfBa55d8Ba380a"],
      "tokens": [
        {
          "name": "USDT",
          "symbol": "USDT",
          "decimals": 6,
          "address": "0x6b56404816A1CB8ab8E8863222d8C1666De942d5"
        },
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x1c8f9D9C1D74c38c8Aeb5033126EA1133728b32f"
        },
        {
          "name": "DAI",
          "symbol": "DAI",
          "decimals": 18,
          "address": "0xFEf68eb974c562B0dCBF307d9690e0BD10e35cEa"
        }
      ],
      "xvmList": ["0x8D6363511418F5871107b6C2Dac78Cfb1174f3EB"],
      "faucets": [],
      "explorers": [
        {
          "name": "Arbitrum Nova Chain Explorer",
          "url": "https://goerli-rollup.arbitrum.io/",
          "icon": "blockscout",
          "standard": "EIP3091"
        }
      ],
      "infoURL": "https://testnet.arbiscan.io",
      "parent": {}
    },
    {
      "api": {
        "url": "",
        "key": "",
        "intervalTime": 60000
      },
      "chainId": "SN_GOERLI",
      "networkId": "goerli-alpha",
      "stargateId": "44",
      "name": "Starknet(G)",
      "debug": false,
      "contracts": ["0x0457bf9a97e854007039c43a6cc1a81464bd2a4b907594dabc9132c162563eb3"],
      "nativeCurrency": {
        "id": 0,
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
      },
      "rpc": [],
      "watch": ["rpc"],
      "tokens": [
        {
          "name": "DAI",
          "symbol": "DAI",
          "decimals": 18,
          "address": "0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9"
        },
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426"
        },
        {
          "name": "USDT",
          "symbol": "USDT",
          "decimals": 6,
          "address": "0x0386e8d061177f19b3b485c20e31137e6f6bc497cc635ccdfcab96fadf5add6a"
        }
      ]
    },
    {
      "api": {
        "url": "https://api-testnet.polygonscan.com/api",
        "key": ""
      },
      "chainId": "80001",
      "networkId": "80001",
      "stargateId": "10109",
      "name": "Polygon Mumbai",
      "nativeCurrency": {},
      "rpc": [ "https://polygon-mumbai.infura.io/v3/78581dc93b6d43088baba2bb1606d0c8" ],
      "watch": ["rpc"],
      "contracts": [],
      "tokens": [
        {
          "name": "ETH",
          "symbol": "ETH",
          "decimals": 18,
          "address": "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa"
        },
        {
          "name": "USDT",
          "symbol": "USDT",
          "decimals": 6,
          "address": "0x6b56404816A1CB8ab8E8863222d8C1666De942d5"
        },
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x1c8f9D9C1D74c38c8Aeb5033126EA1133728b32f"
        },
        {
          "name": "DAI",
          "symbol": "DAI",
          "decimals": 18,
          "address": "0xFEf68eb974c562B0dCBF307d9690e0BD10e35cEa"
        }
      ],
      "xvmList": ["0x2096D6DD537CF7A7ee1662BBbEc8C2809fCf2647"],
      "faucets": ["https://faucet.matic.network/"],
      "infoURL": "https://matic.network/"
    },
    {
      "api": {
        "url": "https://api-goerli-optimism.etherscan.io/api",
        "key": ""
      },
      "chainId": "420",
      "networkId": "420",
      "stargateId": "77",
      "name": "Optimism(G)",
      "nativeCurrency": {
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://goerli.optimism.io"],
      "watch": ["rpc"],
      "contracts": ["0x89EBCf7253f5E27b45E82cd228c977Fd03E47f54"],
      "tokens": [
        {
          "name": "USDT",
          "symbol": "USDT",
          "decimals": 6,
          "address": "0x6b56404816A1CB8ab8E8863222d8C1666De942d5"
        },
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x1c8f9D9C1D74c38c8Aeb5033126EA1133728b32f"
        },
        {
          "name": "DAI",
          "symbol": "DAI",
          "decimals": 18,
          "address": "0xFEf68eb974c562B0dCBF307d9690e0BD10e35cEa"
        }
      ],
      "xvmList": ["0x2096d6dd537cf7a7ee1662bbbec8c2809fcf2647"],
      "faucets": [],
      "infoURL": "https://blockscout.com/optimism/goerli/"
    },
    {
      "api": {
        "url": "https://zksync2-testnet.zkscan.io/api",
        "key": ""
      },
      "chainId": "280",
      "networkId": "280",
      "stargateId": "514",
      "debug": false,
      "name": "zkSync Era(G)",
      "nativeCurrency": {
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://zksync2-testnet.zksync.dev"],
      "watch": ["rpc", "api"],
      "contracts": ["0x9147eE8678C27a2E677A84aB14F7303E451E99Fb"],
      "tokens": [
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x0faF6df7054946141266420b43783387A78d82A9"
        }
      ],
      "faucets": [],
      "infoURL": "https://goerli.explorer.zksync.io/"
    },
    {
      "api": {
        "url": "https://api-testnet.bscscan.com/api",
        "key": ""
      },
      "chainId": "97",
      "networkId": "97",
      "stargateId": "515",
      "name": "BSC(G)",
      "debug": false,
      "contracts": [],
      "nativeCurrency": {
        "name": "BNB",
        "symbol": "BNB",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://data-seed-prebsc-1-s1.binance.org:8545"],
      "watch": ["rpc"],
      "tokens": [
        {
          "name": "ETH",
          "symbol": "ETH",
          "decimals": 18,
          "address": "0x2ceEA9FeAD4584aBA77eCdE697E9fc80C9BD4c56"
        },
        {
          "name": "USDT",
          "symbol": "USDT",
          "decimals": 6,
          "address": "0x6b56404816A1CB8ab8E8863222d8C1666De942d5"
        },
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x1c8f9D9C1D74c38c8Aeb5033126EA1133728b32f"
        },
        {
          "name": "DAI",
          "symbol": "DAI",
          "decimals": 18,
          "address": "0xFEf68eb974c562B0dCBF307d9690e0BD10e35cEa"
        }
      ],
      "xvmList": ["0x2096D6DD537CF7A7ee1662BBbEc8C2809fCf2647"],
      "faucets": ["https://testnet.binance.org/faucet-smart"],
      "infoURL": "https://testnet.binance.org/"
    },
    {
      "api": {
        "url": "https://explorer.public.zkevm-test.net/api",
        "key": "",
        "intervalTime": 10000
      },
      "chainId": "1442",
      "networkId": "1442",
      "stargateId": "517",
      "name": "zkEVM(G)",
      "debug": false,
      "contracts": ["0x99c0b2B824D7291E832DC9018B24CaA6B68673E2"],
      "nativeCurrency": {
        "name": "ETH",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://rpc.public.zkevm-test.net"],
      "xvmList": [],
      "watch": ["rpc", "api"],
      "tokens": [
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x6aB2235c5F8FbEf7834c051C029B8F2af02DEF55"
        },
        {
          "name": "USDT",
          "symbol": "USDT",
          "decimals": 6,
          "address": "0xB3E5fd0FC4e7854f9c22250F2d8a9B135c9a476b"
        }
      ],
      "infoURL": "https://testnet-zkevm.polygonscan.com"
    },
    {
      "api": {
        "url": "https://l2scan.scroll.io/api",
        "key": ""
      },
      "chainId": "534353",
      "networkId": "534353",
      "stargateId": "519",
      "name": "Scroll Alpha(G)",
      "debug": false,
      "contracts": [],
      "nativeCurrency": {
        "name": "ETH",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://alpha-rpc.scroll.io/l2"],
      "watch": ["rpc"],
      "tokens": [],
      "faucets": [],
      "infoURL": "https://blockscout.scroll.io/"
    },
    {
      "api": {
        "url": "https://l2explorer.a2.taiko.xyz/api",
        "key": "",
        "intervalTime": 60000
      },
      "chainId": "167005",
      "networkId": "167005",
      "stargateId": "520",
      "name": "Taiko(G)",
      "debug": false,
      "contracts": [],
      "nativeCurrency": {
        "name": "ETH",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://rpc.test.taiko.xyz"],
      "watch": ["rpc"],
      "tokens": [],
      "infoURL": "https://explorer.test.taiko.xyz"
    },
    {
      "api": {
        "url": "",
        "key": ""
      },
      "chainId": "84531",
      "networkId": "84531",
      "stargateId": "521",
      "name": "Base(G)",
      "debug": false,
      "contracts": [],
      "features": ["Etherscan"],
      "nativeCurrency": {
        "name": "ETH",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://goerli.base.org"],
      "watch": ["rpc"],
      "tokens": [],
      "infoURL": "https://goerli.basescan.org"
    },
    {
      "api": {
        "url": "",
        "key": ""
      },
      "chainId": "59140",
      "networkId": "59140",
      "stargateId": "523",
      "name": "Linea(G)",
      "debug": false,
      "features": ["EIP1559", "Etherscan"],
      "contracts": [],
      "nativeCurrency": {
        "name": "ETH",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "tokens": [
        {
          "name": "USDT",
          "symbol": "USDT",
          "decimals": 6,
          "address": "0x81a8cD37af3F5570E79E75Ccd17A877159cF226E"
        }
      ],
      "router": {
        "0xa14113c142e1b3f33f1da3ee43eccb9e0471ff2d": "OrbiterRouterV3"
      },
      "rpc": ["https://rpc.goerli.linea.build"],
      "watch": ["rpc"],
      "infoURL": "https://goerli.lineascan.build"
    },
    {
      "api": {
        "url": "",
        "key": ""
      },
      "chainId": "5001",
      "networkId": "5001",
      "stargateId": "524",
      "name": "mantle(G)",
      "debug": false,
      "contracts": ["0xf1e276a6518dff455fdabfdc582591fda35797ea"],
      "features": ["Etherscan"],
      "nativeCurrency": {
        "name": "MNT",
        "symbol": "MNT",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://rpc.testnet.mantle.xyz"],
      "watch": ["rpc"],
      "tokens": [
        {
          "name": "Ether (WETH)",
          "symbol": "ETH",
          "decimals": 18,
          "address": "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"
        }
      ],
      "router": {
        "0xf06a54463c6dbc6d64547760891167aff9de76c5": "OrbiterRouterV3"
      },
      "infoURL": "https://explorer.testnet.mantle.xyz"
    },
    {
      "api": {
        "url": "",
        "key": ""
      },
      "chainId": "5611",
      "networkId": "5611",
      "stargateId": "525",
      "name": "opBSC(G)",
      "debug": false,
      "features": ["Etherscan"],
      "contracts": [],
      "nativeCurrency": {
        "name": "tBNB",
        "symbol": "BNB",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://opbnb-testnet-rpc.bnbchain.org"],
      "watch": ["rpc"],
      "tokens": [],
      "infoURL": "https://opbnbscan.com"
    },
    {
      "api": {
        "url": "",
        "key": ""
      },
      "chainId": "11155111",
      "networkId": "11155111",
      "stargateId": "526",
      "name": "Sepolia(G)",
      "features": ["Etherscan"],
      "debug": false,
      "contracts": [],
      "nativeCurrency": {
        "name": "ETH",
        "symbol": "ETH",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://rpc.sepolia.org"],
      "watch": ["rpc"],
      "tokens": [],
      "infoURL": "https://sepolia.etherscan.io"
    },
    {
      "api": {
        "url": "https://okbrpc.okbchain.org/v1",
        "key": ""
      },
      "chainId": "195",
      "networkId": "195",
      "stargateId": "527",
      "name": "OKB(G)",
      "debug": false,
      "contracts": [],
      "features": ["Etherscan"],
      "nativeCurrency": {
        "name": "OKB",
        "symbol": "OKB",
        "decimals": 18,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "rpc": ["https://okbtestrpc.okbchain.org"],
      "watch": ["rpc"],
      "tokens": [
        {
          "name": "Ether (WETH)",
          "symbol": "ETH",
          "decimals": 18,
          "address": "0xaf99998DCFaB1A506213B73Fe50E3f31166B7EB1"
        },
        {
          "name": "USDC",
          "symbol": "USDC",
          "decimals": 6,
          "address": "0x01a22c7aB5dc856884eB61be019044C8f844A005"
        }
      ],
      "infoURL": "https://www.okx.com/explorer/okbc-test"
    }
]

export default chains 
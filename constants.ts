import { TokenAddressMap } from 'game7-bridge-sdk'
import { NetworkInterface, HighNetworkInterface, NetworkType } from '@/contexts/BlockchainContext'

export const L1_NETWORK: NetworkInterface = {
  chainId: 11155111,
  name: 'sepolia',
  displayName: 'Sepolia',
  rpcs: [],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  g7TokenAddress: '0xe2ef69e4af84dbefb0a75f8491f27a52bf047b01',
  routerSpender: '0x902b3e5f8f19571859f4ab1003b960a5df693aff',
  retryableCreationTimeout: 15 * 60,
  challengePeriod: 60 * 60
}

export const L2_NETWORK: HighNetworkInterface = {
  chainId: 421614,
  name: 'arbitrumSepolia',
  displayName: 'Arbitrum Sepolia',
  rpcs: [],
  blockExplorerUrls: ['https://sepolia.arbiscan.io'],
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  inbox: '0xaAe29B0366299461418F5324a79Afc425BE5ae21',
  g7TokenAddress: '0x10adbf84548f923577be12146eac104c899d1e75',
  l1GatewayRouter: '0xcE18836b233C83325Cc8848CA4487e94C6288264',
  routerSpender: '0xE6470bb72291c39073AEd67a30ff93B69c1f47De',
  retryableCreationTimeout: 60,
  challengePeriod: 60 * 60
}

export const L3_NETWORK: HighNetworkInterface = {
  chainId: 13746,
  name: 'game7Testnet',
  displayName: 'G7 Sepolia',
  rpcs: ['https://testnet-rpc.game7.io'],
  blockExplorerUrls: ['https://testnet.game7.io'],
  nativeCurrency: {
    decimals: 18,
    name: 'Testnet Game7 Token',
    symbol: 'TG7T'
  },
  inbox: '0xE6470bb72291c39073AEd67a30ff93B69c1f47De',
  g7TokenAddress: '0x0000000000000000000000000000000000000000',
  challengePeriod: 60 * 60,
  staker: '0xa6B0461b7E54Fa342Be6320D4938295A81f82Cd3'
}

export const L1_MAIN_NETWORK: NetworkInterface = {
  chainId: 1,
  name: 'ethereum',
  displayName: 'Ethereum',
  rpcs: [],
  blockExplorerUrls: ['https://etherscan.io'],
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  g7TokenAddress: '0x12c88a3C30A7AaBC1dd7f2c08a97145F5DCcD830',
  routerSpender: '0x902b3e5f8f19571859f4ab1003b960a5df693aff',
  retryableCreationTimeout: 15 * 60,
  challengePeriod: 60 * 60
}

export const L3_MAIN_NETWORK: NetworkInterface = {
  chainId: 2187,
  name: 'game7',
  displayName: 'G7 Network',
  rpcs: ['https://mainnet-rpc.game7.io'],
  blockExplorerUrls: ['https://mainnet.game7.io'],
  nativeCurrency: {
    decimals: 18,
    name: 'Game7 Token',
    symbol: 'G7'
  },
  g7TokenAddress: '0x0000000000000000000000000000000000000000',
  retryableCreationTimeout: 15 * 60,
  wrappedG7TokenAddress: '0xfa3ed70386b9255fC04aA008A8ad1B0CDa816Fac',
  challengePeriod: 60 * 60
}

export const ALL_HIGH_TESTNET_NETWORKS = [L2_NETWORK, L3_NETWORK]
export const ALL_LOW_TESTNET_NETWORKS = [L1_NETWORK, L2_NETWORK]
export const ALL_HIGH_MAINNET_NETWORKS = []
export const ALL_LOW_MAINNET_NETWORKS = []

export const L3_NATIVE_TOKEN_SYMBOL = 'TG7T'
export const DEFAULT_LOW_NETWORK = L1_NETWORK
export const DEFAULT_HIGH_NETWORK = L2_NETWORK
export const DEFAULT_LOW_MAINNET_NETWORK = L1_MAIN_NETWORK
export const DEFAULT_HIGH_MAINNET_NETWORK = L1_MAIN_NETWORK

export const LOW_NETWORKS = [L1_NETWORK, L2_NETWORK]
export const HIGH_NETWORKS = [L2_NETWORK, L3_NETWORK]

export const FIVE_MINUTES = 1000 * 60 * 5

export const TG7T: TokenAddressMap = {
  13746: '0x0000000000000000000000000000000000000000',
  421614: '0x10adbf84548f923577be12146eac104c899d1e75',
  11155111: '0xe2ef69e4af84dbefb0a75f8491f27a52bf047b01'
}

export const ETH: TokenAddressMap = {
  421614: '0x0000000000000000000000000000000000000000',
  11155111: '0x0000000000000000000000000000000000000000'
}

export const USDC: TokenAddressMap = {
  13746: '0xf2B58E3519C5b977a254993A4A6EaD581A8989A0',
  421614: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
  11155111: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
}


export const getHighNetworks = (selectedNetworkType: NetworkType) => {
  switch (selectedNetworkType) {
    case 'Mainnet':
      return ALL_HIGH_MAINNET_NETWORKS
    case 'Testnet':
      return ALL_HIGH_TESTNET_NETWORKS
  }
}

export const getLowNetworks = (selectedNetworkType: NetworkType) => {
  switch (selectedNetworkType) {
    case 'Mainnet':
      return ALL_LOW_MAINNET_NETWORKS
    case 'Testnet':
      return ALL_LOW_TESTNET_NETWORKS
  }
}

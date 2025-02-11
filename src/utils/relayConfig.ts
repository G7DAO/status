
import { convertViemChainToRelayChain } from '@reservoir0x/relay-sdk'
import { defineChain } from 'viem'
import {
    ancient8, apeChain, arbitrumNova, avalanche, b3, bsc, mainnet, arbitrum, base, optimism, polygon, zksync, xai, mantle, zora, superposition, bob, boba, cyber, degen, forma, funkiMainnet, gnosis, gravity, ham, hychain, ink, linea, lisk, mint, mode, polygonZkEvm, redstone, sanko, scroll, sei, shape, worldchain
} from 'viem/chains'

const g7Mainnet = defineChain({
    id: 2187,
    caipNetworkId: 'eip155:13746',
    chainNamespace: 'eip155',
    name: 'G7',
    nativeCurrency: {
      decimals: 18,
      name: 'Game7 Token',
      symbol: 'G7T',
    },
    rpcUrls: {
      default: {
        http: ['https://mainnet-rpc.game7.io'],
        webSocket: ['wss://rpc.game7.io'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Explorer',
        url: 'https://mainnet.game7.io.game7.io'
      },
    },
    contracts: {
    },
  });

export const chains = [
    convertViemChainToRelayChain(mainnet),
    convertViemChainToRelayChain(arbitrum),
    convertViemChainToRelayChain(base),
    convertViemChainToRelayChain(optimism),
    convertViemChainToRelayChain(polygon),
    convertViemChainToRelayChain(zksync),
    convertViemChainToRelayChain(xai),
    convertViemChainToRelayChain(mantle),
    convertViemChainToRelayChain(ancient8),
    convertViemChainToRelayChain(apeChain),
    convertViemChainToRelayChain(arbitrumNova),
    convertViemChainToRelayChain(avalanche),
    convertViemChainToRelayChain(b3),
    convertViemChainToRelayChain(bsc),
    convertViemChainToRelayChain(zora),
    convertViemChainToRelayChain(superposition),
    convertViemChainToRelayChain(bob),
    convertViemChainToRelayChain(boba),
    convertViemChainToRelayChain(cyber),
    convertViemChainToRelayChain(degen),
    convertViemChainToRelayChain(forma),
    convertViemChainToRelayChain(funkiMainnet),
    convertViemChainToRelayChain(gnosis),
    convertViemChainToRelayChain(gravity),
    convertViemChainToRelayChain(ham),
    convertViemChainToRelayChain(hychain),
    convertViemChainToRelayChain(ink),
    convertViemChainToRelayChain(linea),
    convertViemChainToRelayChain(lisk),
    convertViemChainToRelayChain(mint),
    convertViemChainToRelayChain(mode),
    convertViemChainToRelayChain(polygonZkEvm),
    convertViemChainToRelayChain(redstone),
    convertViemChainToRelayChain(sanko),
    convertViemChainToRelayChain(scroll),
    convertViemChainToRelayChain(sei),
    convertViemChainToRelayChain(shape),
    convertViemChainToRelayChain(worldchain),
    convertViemChainToRelayChain(g7Mainnet)
]


import { init } from '@web3-onboard/vue'
// import { useOnboard } from "@web3-onboard/vue";
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();
const modules = [injected, walletConnect, coinbaseWalletSdk]

const infuraKey = process.env.INFURA_KEY
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`
const EtherScanURL = 'https://etherscan.io/'

const MVMRPCURL = "https://geth.mvm.dev/";
const MVMSCANURL = "https://scan.mvm.dev/";

export const web3Onboard = init({
  wallets: modules,
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      namespace: 'evm',
      label: 'Ethereum Mainnet',
      rpcUrl,
      blockExplorerUrl: EtherScanURL,
    },
    {
      id: '0x120C7',
      namespace: 'evm',
      token: 'XIN',
      label: 'MVM Mainnet',
      rpcUrl: MVMRPCURL,
      blockExplorerUrl: MVMSCANURL,
    }
  ],
  appMetadata: {
    name: 'MVM Bridge',
    description: 'Mixin Virtual Machine Bridge',
    icon: "https://mvm.dev/logo.svg",
    logo: "https://mvm.dev/logo.svg",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" }
    ]
  }
})

// const {
//   wallets,
//   connectWallet,
//   disconnectConnectedWallet,
//   connectedChain,
//   connectedWallet,
// } = useOnboard();

// const provider = new ethers.providers.Web3Provider(
//   connectedWallet.value.provider,
//   "any"
// );
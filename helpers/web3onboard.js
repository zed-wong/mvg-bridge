import { init } from '@web3-onboard/vue'
import logo from "../static/favicon.svg"
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
      token: 'ETH',
      label: 'MVM Mainnet',
      rpcUrl: MVMRPCURL,
      blockExplorerUrl: MVMSCANURL,
    }
  ],
  appMetadata: {
    name: 'MVG Bridge',
    description: 'Bridge your asset to MVM',
    icon: logo,
    logo: logo,
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" }
    ]
  },
  i18n: {
    zh: {
      connect: {
        selectingWallet: {
          header: "已支持的錢包",
          sidebar: {
            heading: "歡迎",
            subheading: "連接錢包",
            paragraph: "通過連接您的錢包，以完成在MVM主網的充值與提現。"
          }
        },
        connectingWallet: {
          sidebar: {
            subheading: "授權連接",
            paragraph: "請在您的錢包中授權連接，以繼續操作。"
          },
          mainText: "連接中...",
          paragraph: "請確保勾選中您想要授權的錢包地址。",
          rejectedText: "連接已被取消!",
          rejectedCTA: "點我重試",
          primaryButton: "回到錢包列表"
        },
        connectedWallet: {
          header: "連接成功",
          sidebar: {
            subheading: "連接成功!",
            paragraph: "您的錢包已連接至 {app}"
          },
          mainText: "已連接"
        }
      },
      modals: {
        actionRequired: {
          heading: "操作需要在 {wallet} 完成",
          paragraph: "請切換到您錢包中的活躍賬戶.",
          linkText: "瞭解更多.",
          buttonText: "Okay"
        },
        switchChain: {
          heading: "切換網絡",
          paragraph1: "{app} 需要您在您的錢包中切換到 {nextNetworkName} 網絡以繼續。",
          paragraph2: "*某些錢包可能不支持切換網絡. 如您不能切換網絡，您可能需要考慮更換一個能夠切換網絡的錢包。"
        },
        confirmDisconnectAll: {
          heading: "斷開所有連接",
          description: "您確定要斷開所有錢包的連接嗎？",
          confirm: "確定",
          cancel: "取消"
        }
      },
      accountCenter: {
        connectAnotherWallet: "連接另一個錢包",
        disconnectAllWallets: "斷開所有連接",
        currentNetwork: "當前網絡",
        appInfo: "App 信息",
        learnMore: "瞭解更多",
        gettingStartedGuide: "快速開始教程",
        smartContracts: "智能合約",
        explore: "探索",
        backToApp: "回到 dapp",
        poweredBy: "Powered by",
        addAccount: "添加賬戶",
        setPrimaryAccount: "設置主要賬戶",
        disconnectWallet: "斷開當前連接",
        copyAddress: "複製錢包地址"
      },
    }
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    }
  },
})

export const HideOnboardLogo = () => {
  // hide logo
  const onboardDom = document.querySelector('onboard-v2');
  if (onboardDom) {
    const styleDom = document.createElement('style');
    styleDom.innerHTML = 'div.sidebar > div:nth-child(2) > svg { display: none; }';
    onboardDom.shadowRoot?.appendChild(styleDom);
  }
}
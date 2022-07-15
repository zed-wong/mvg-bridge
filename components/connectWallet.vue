<template>
  <v-dialog
    max-width="500px"
    overlay-opacity="0.5"
    v-model="connectWalletDialog"
    
    close-delay="0"
  >
    <v-sheet class="align-start pa-9">
      <v-row class="d-flex flex-column pb-6" no-gutters>
        <v-col class="align-center d-flex justify-center pa-0">
          <span class="connect-text">Connect your wallet</span>
        </v-col>

        <v-col>
          <v-list-item-group class="group-border">
            <v-list-item
              :key="i"
              class="px-5 py-2 item"
              @click="connect(item.action)"
              v-for="(item, i) in connectMethods"
            >
              <v-list-item-avatar class="mr-0">
                <v-img :src="item.icon" max-height="44px" max-width="44px" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="item-title">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-col>
      </v-row>
    </v-sheet>
  </v-dialog>
</template>

<script lang="">
import { ethers } from "ethers";
import chainIds from "../helpers/chainids";
import metamask from "@/static/metamask.png";
import walletconnect from "@/static/walletconnect.png";
import coinbase from "@/static/coinbase.png";

export default {
  computed: {
    connectWalletDialog: {
      get() {
        return this.$store.state.connectWalletDialog;
      },
      set(value) {
        this.$store.commit("toggleConnectWallet", value);
      },
    },

    connectMethods: {
      get() {
        return [
          { name: "Metamask", icon: metamask, action: "metamask" },
          { name: "WalletConnect", icon: walletconnect, action: "walletconnect" },
          { name: "Coinbase Wallet", icon: coinbase, action: "coinbase" },
        ];
      },
    },

    selectedNetwork: {
      get() {
        return this.$store.state.fromNetwork;
      },
    },
  },

  methods: {
    async connect(action){
      if (action === "metamask") {
        await this.connectMetamask()
        return
      }
      if (action === "walletconnect") {
        // await this.connectMetamask()
        return
      }
      if (action === "coinbase") {
        // await this.connectMetamask()
        return
      }
    },
    async connectMetamask() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let account = ethers.utils.getAddress(accounts[0]);
      this.register(account);

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const chainid = parseInt(chainId, 16);
      const chainName = chainid in chainIds ? chainIds[chainid].name : "Unspported Network";
      this.$store.commit("connect", { address: account, name: chainName, id: chainid });
      this.$store.commit("toggleConnectWallet", false);
    },
    async register(Address) {
      const checked = ethers.utils.getAddress(Address);
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: checked,
      });
      localStorage.setItem("user", JSON.stringify(result.data.user.key));
    },
    checkNetwork(chainId){
      // If current network not in supported networks
      if (parseInt(chainId, 16) in chainIds) return;
      // If selected network is not
      // if (!this.selectedNetwork.asset_id in this.$store.state.supportMetamaskNetworks) return;

    }
  },
};
function getObjKey(obj, value) {
  return Object.keys(obj).find(key => obj[key].symbolId === value);
}
</script>

<style>
.connect-text {
  color: var(--input-text-color);
  font-size: 24px;
  font-style: italic;
  font-weight: 700;
  margin: 0 0 32px;
  text-align: center;
}
.item {
  min-height: 64px;
  max-height: 600px;
}
.item:not(:last-child) {
  border-bottom: 1px solid #cbd5e0;
}
.item-title {
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
}
.group-border {
  border: 1px solid #cbd5e0;
  border-radius: 12px;
}
</style>
<template>
  <div>
    <v-btn
      height="40px"
      elevation="0"
      color="#5959d8"
      v-if="small"
      class="ml-3 connect-wallet"
      @click="connect"
    >
      <span style="color: white"> {{ $t("connect_wallet") }}</span>
    </v-btn>
    <v-btn
      block
      x-large
      depressed
      elevation="0"
      color="#5959d8"
      v-if="huge"
      @click="connect"
      class="border-rounded main-btn white--text"
    >
      <span> {{ $t("connect_wallet") }} </span>
    </v-btn>
    <v-btn
      block
      depressed
      elevation="0"
      color="#5959d8"
      v-if="mobile"
      @click="connect"
      class="border-rounded main-btn white--text"
    >
      <span> {{ $t("connect_wallet") }} </span>
    </v-btn>
  </div>
</template>

<script >
import { web3Onboard } from "../helpers/web3onboard";
import { ethers } from "ethers";

function fmt(wallet) {
  var seen = [];
  let value = JSON.stringify(wallet, function (key, val) {
    if (val != null && typeof val == "object") {
      if (seen.indexOf(val) >= 0) {
        return;
      }
      seen.push(val);
    }
    return val;
  });
  return value;
}

export default {
  props: ["small", "huge", "mobile"],
  methods: {
    async connect() {
      try {
        const c = await web3Onboard.connectWallet();
        if (c.length > 0) {
          localStorage.setItem("connectedWallet", fmt(c[0]));
          const userAddress = c[0].accounts[0].address;
          const userChain = c[0].chains[0].id;
          console.log(userAddress, userChain);

          this.$store.commit("connect", {
            address: ethers.utils.getAddress(userAddress),
            name: c[0].label,
            id: userChain,
          });
          await this.register(userAddress);

          c[0].provider.on("accountsChanged", () => {
            this.$store.commit("disconnect");
            console.log("accountsChanged");
          });
          c[0].provider.on("chainChanged", (chainid) => {
            this.$store.commit("updateChainId", chainid);
            console.log("chainChanged");
          });
        }
      } catch (error) {
        console.log(error);
      }
      return;
    },

    async register(Address) {
      const checked = ethers.utils.getAddress(Address);
      const result = await this.$axios.post("https://bridge.mvm.dev/users", {
        public_key: checked,
      });
      localStorage.setItem("user", JSON.stringify(result.data.user.key));
    },
  },
};
</script>

<style scoped>
.connect-wallet {
  align-items: center;
  border-radius: 100px !important;
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  margin: 0 6px;
  padding: 0 12px;
}
.connect-wallet:hover {
  background-color: #1976d2 !important;
}
/* .connect-text {
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
} */
</style>
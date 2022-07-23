<template></template>

<script>
import { useOnboard } from "@web3-onboard/vue";
export default {
  props: ["supposedNetwork"],
  computed: {
    methods: {
      async switchNetwork() {
        let chainID;
        const { setChain } = useOnboard();
        if (this.type == "deposit") {
          chainID = this.supposedNetwork.chainId.toString(16);
        }
        if (this.type == "withdraw") {
          chainID = "0x120C7";
        }
        try {
          console.log(chainID);
          await setChain({ chainNamespace: "evm", chainId: chainID });
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
};
</script>
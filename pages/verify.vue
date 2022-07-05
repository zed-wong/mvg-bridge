<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <span class="text-center text-h4 d-flex justify-center pa-5">
        Verify User
      </span>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <span
        class="
          text-center
          font-weight-light
          text-subtitle-2
          d-flex
          justify-center
          pa-5
          pb-2
          pt-2
        "
      >
        Enter user metamask address to verify if the user is eligible to claim faucet. <br/> A sample for building faucet. (max tx limit:10)
      </span>
      <v-text-field
        filled
        class="mt-3"
        v-model="userAddress"
        clearable
        :placeholder="placeHolder"
      />
      <div class="d-flex justify-center">
        <v-btn
          @click="verify(userAddress)"
          large
          rounded
          :loading="verifyLoading"
        >
          Verify
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" v-if="searched" class="mt-10 text-center">
      <span> Balance: {{ balance }} ETH</span><br/>
      <span> Created At: {{ createdat }} </span> <br/>
      <span> Age: {{ between }} days </span> <br/><br/>
      <span> Normal Tx: {{ normaltx }} </span><br/>
      <span> Internal Tx: {{ internaltx }} </span><br/>
      <span> Erc20 events: {{ erc20events }} </span><br/>
      <span> Erc721 events: {{ erc721events }} </span><br/>
      <span> Erc1155 events: {{ erc1155events }} </span><br/><br/>
      <span> Eligable: {{ eligible }} </span>
    </v-col>
  </v-row>
</template>

<script>
import {getEthBalance, getETHCounts, getETHAddressExistTime} from '../helpers/etherscan';

export default {
  layout: 'links',
  data(){
    return{
      searched: false,
      eligible: false,
      balance: '',
      between: '',
      normaltx:'',
      createdat: '',
      internaltx:'',
      erc20events:'',
      erc721events:'',
      erc1155events:'',

      placeHolder: 'Enter',
      userAddress: '',
      verifyLoading: false,
    }
  },
  methods: {
    async verify(address){
      this.verifyLoading=true
      // 0x2910543af39aba0cd09dbb2d50200b3e800a63d2
      // console.log(await getEthBalance(address), 'ETH')
      // console.log(await getETHCounts(address, 'normalTx'))
      // console.log(await getETHCounts(address, 'internalTx'))
      // console.log(await getETHCounts(address, 'erc20'))
      // console.log(await getETHCounts(address, 'erc721'))
      // console.log(await getETHCounts(address, 'erc1155'))
      this.balance = await getEthBalance(address), 'ETH'
      this.normaltx = await getETHCounts(address, 'normalTx')
      this.internaltx = await getETHCounts(address, 'internalTx')
      this.erc20events = await getETHCounts(address, 'erc20')
      this.erc721events = await getETHCounts(address, 'erc721')
      this.erc1155events = await getETHCounts(address, 'erc1155')

      let txarray = await getETHAddressExistTime(address);
      if (txarray.length != 0){
        let date = new Date(txarray[0].timeStamp * 1000)
      // console.log(txarray[0].timeStamp)
      // console.log(date.toLocaleString())
        this.createdat = date.toLocaleString()
        this.between = Math.ceil((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24));
      } else {
        this.createdat = 'Not created'
        this.between = '0'
      }

      this.eligible = this.iseligible(this.balance, this.normaltx);
      this.searched = true
      this.verifyLoading = false
    },
    iseligible(balance, normaltx){
      if( balance>0 && normaltx > 0) {
        return true
      }
      return false
    }
  },
}
</script>
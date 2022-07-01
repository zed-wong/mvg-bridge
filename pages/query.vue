<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <span class="text-center text-h4 d-flex justify-center pa-5 pb-0">
        Query
      </span>
    </v-col>
    <v-col cols="12" sm="8" md="6" class="">
      <span
        class="
          text-center
          font-weight-light
          text-subtitle-2
          d-flex
          justify-center
          text-no-wrap
          pa-5
          pb-2
          pt-2
        "
      >
        Enter Mixin Network Asset ID To Query Asset Contract Address
      </span>
      <v-text-field
        filled
        class="mt-3"
        v-model="searchAsset"
        clearable
        :placeholder="placeHolder"
      />
      <div class="d-flex justify-center">
        <v-btn large rounded @click="search('asset')"> Search </v-btn>
      </div>
    </v-col>
    <v-col cols="12" sm="8" md="6" class="">
      <span
        class="
          text-center
          font-weight-light
          text-subtitle-2
          d-flex
          justify-center
          text-no-wrap
          pa-5
          pb-2
          pt-2
        "
      >
        Enter Mixin User ID To Query User Contract Address
      </span>
      <v-text-field
        filled
        class="mt-3"
        v-model="searchUser"
        clearable
        :placeholder="placeHolder"
      />
      <div class="d-flex justify-center">
        <v-btn rounded large @click="search('user')"> Search </v-btn>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="d-flex justify-center flex-column text-center mt-5">
        <v-col  v-if="assetResult">
          <span> Asset: {{ assetResult }} </span>
        </v-col>
        <v-col v-if="assetResult">
          <span> Scan: <a :href="assetScan"> {{ assetScan }}</a> </span>
        </v-col>
        <v-col  v-if="userResult">
          <span> User: {{ userResult }} </span>
        </v-col>
        <v-col v-if="userResult">
          <span> Scan: <a :href="userScan"> {{ userScan }}</a> </span>
        </v-col>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { fetchAssetContract, fetchUserContract } from "../helpers/registry";

export default {
  layout: "links",
  data() {
    return {
      userScan:'',
      assetScan:'',
      userResult: "",
      assetResult: "",
      
      placeHolder: "Enter",
      searchAsset: "",
      searchUser: "",
    };
  },
  methods: {
    async search(type) {
      let homeurl = "https://scan.mvm.dev/"
      let baseurl = "https://scan.mvm.dev/address/"
      if (type === "asset") {
        let result = await fetchAssetContract(this.searchAsset);
        if (result === "0x0000000000000000000000000000000000000000") {
          this.assetResult = "Asset Not Registered";
          this.assetScan = homeurl
          return;
        }
        this.assetResult = result;
        this.assetScan = baseurl + result
        console.log(await fetchAssetContract(this.searchAsset));
      }
      if (type === "user") {
        let result = await fetchUserContract(this.searchUser);
        if (result === "0x0000000000000000000000000000000000000000") {
          this.userResult = "User Not Registered";
          this.userScan = homeurl
          return;
        }
        this.userResult = result;
        this.userScan = baseurl + result
        console.log(await fetchUserContract(this.searchUser));
      }
    },
  },
};
</script>
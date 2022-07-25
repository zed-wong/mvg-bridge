<template>
  <newbridge v-if="mode == 0" />
  <newwithdraw v-else />
</template>

<script>
import newbridge from "~/components/newbridge.vue"
import newwithdraw from "~/components/newwithdraw.vue"

export default {
  components: { newbridge,newwithdraw },
  computed:{
    mode: {
      get(){
        return this.$store.state.mode
      },
      set(value){
        this.$store.commit('setMode', value)
      }
    }
  },
  // validate(){
  //   if (navigator.language.includes('zh')) this.$router.push('/zh')
  // },
  layout: 'index'
}
</script>
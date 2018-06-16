<template>
    <div class="alert alert-warning" role="alert" v-if="wallet != 'local'">
      This page will only work if you have metamask installed and you are logged in.
      <a href="https://metamask.io" target="_blank"><img src="static/icons/metamask.png"></a>
    </div>
</template>

<script>

export default {
  name: 'xCheckMetamask',
  data () {
    return {
      wallet: undefined
    }
  },
  mounted () {
    this.wallet = window.wallet
  }
}
</script>

<style>

</style>
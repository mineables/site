<template>
    <div class="alert alert-warning" role="alert" v-if="typeof web3 === 'undefined' || web3.eth.defaultAccount === undefined">
      This page will only work if you have metamask installed and you are logged in.
      <a href="https://metamask.io" target="_blank"><img src="static/icons/metamask.png"></a>
    </div>
</template>

<script>

export default {
  name: 'xCheckMetamask',
  data () {
    return {
      web3: undefined
    }
  },
  mounted () {
    this.web3 = window.web3
  }
}
</script>

<style>

</style>
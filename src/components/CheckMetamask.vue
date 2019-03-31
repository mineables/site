<template>
  <div>
    <div class="alert alert-danger" role="alert" v-if="typeof web3 === 'undefined' || web3.eth.defaultAccount === undefined">
      <a class="metamask" href="https://metamask.io" target="_blank"><img src="static/icons/metamask.png"></a>
      This Dapp will only work if you have metamask installed are logged in.
    </div>
    <div class="alert alert-danger" role="alert" v-else-if="netId !== 100">
      <a class="metamask" href="https://metamask.io" target="_blank"><img src="static/icons/metamask.png"></a>
         Mineables uses the xDai Network to keep all token mining transactions ultra-cheap! To configure Metamask to point to the xDai Chain network. ( Under 'Networks > Custom RPC', create a new network definition called <strong>'xDai Chain'</strong> using RPC <strong>https://dai.poa.network</strong> ).<br/><br/>
         In order to fund your account with xDai, please do the following:<br>
         <strong>Option A</strong> <br/>
         <ol>
          <li>On Mainnet, swap ETH with DAI. A great place to do this is at <a target="_blank" href="https://uniswap.exchange/swap">https://uniswap.exchange/swap</a></li>
          <li>Bridge DAI tokens to xDAI tokens at <a target="_blank" href="https://dai-bridge.poa.network">https://dai-bridge.poa.network</a></li>
         </ol>

         <strong>Option B</strong> <br/>
         Hit up @lodge on the <a target="_blank" href="https://discord.gg/yckdJdw">mineables discord</a> <strong>#xdai-microdonations</strong> channel for some xDai and start mining!
    </div>
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
    this.netId = window.netId
  }
}
</script>

<style>
.metamask {
  float: left;
  padding-right: 1em;
}
</style>
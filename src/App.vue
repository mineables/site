<template>
  <div id="app">
    <x-header></x-header>  
    <div id="content">
      <router-view></router-view>
    </div>  
    <x-footer></x-footer>
  </div>
</template>

<script>
// import RwvHeader from '@/components/TheHeader'
import xHeader from '@/components/Header'
import xFooter from '@/components/Footer'
import Web3 from 'web3'
// import $ from 'jquery'
var TruffleContract = require('truffle-contract')

export default {
  name: 'App',
  components: {
    xHeader,
    xFooter
  },
  mounted () {
    const provider = 'https://ropsten.infura.io/oUCR2SmM4wLiHVimgqSS'

    if (TruffleContract != null) {
      console.log('Success!')
      window.TruffleContract = TruffleContract
    } else {
      console.error('Failed to load Truffle Contract')
    }

    if (typeof window.web3 !== 'undefined') {
      console.log('Local Wallet Detected')
      window.web3 = new Web3(window.web3.currentProvider)
      window.wallet = 'local'
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      window.web3 = new Web3(new Web3.providers.HttpProvider(provider))
      window.wallet = 'infura'
    }
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
  }
}
</script>

<style>
:root {
  --main-bg-color: rgb(235, 235, 235);
  --primary-color: rgb(53, 89, 131);
  --accent-color: rgb(91, 230, 177);
}
html, body {
  height: 100%;
  margin: 0;
}
.header-text {
    font-family: Raleway;
    font-weight: 300;
    text-transform: capitalize;
    font-size: 35px;
    color: #B5B1AE;
    letter-spacing: 2px;
    margin-bottom: 30px;
    margin-left: 5px;
}
section {
  padding: 50px 0;
  overflow: hidden;
}
</style>

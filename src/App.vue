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
  async mounted () {
    if (TruffleContract != null) {
      console.log('Loaded TruffleContract')
      window.TruffleContract = TruffleContract
    } else {
      console.error('Failed to load Truffle Contract')
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        // Request account access if needed
        await window.ethereum.enable()
        console.log('Loaded window.ethereum')
      } catch (error) {
        // User denied account access
        console.log(error)
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      console.log('loaded legacy web3')
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
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

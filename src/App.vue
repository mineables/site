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

export default {
  name: 'App',
  components: {
    xHeader,
    xFooter
  },
  methods: {
    handleScroll: function (e) {
      console.log('test')
    }
  },
  mounted () {
    const provider = 'HTTP://127.0.0.1:7545'
    if (typeof Web3 !== 'undefined') {
      console.log('Local Wallet Detected')
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      window.web3 = new Web3(new Web3.providers.HttpProvider(provider))
    }
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
    // this.$root.$on('redraw', function (height) {
    //   let footer = $('footer')
    //   let header = $('header')
    //   let newHeight = height + footer.outerHeight() + header.outerHeight()
    //   document.querySelector('.page-content').setAttribute('style', 'height:' + newHeight + 'px')
    // })
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
#content {
  margin-top: 68px;
}
</style>

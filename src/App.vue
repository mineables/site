<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <x-header></x-header>    
    <main id="content" class="mdl-layout__content">
      <div class="page-content">
        <div class="mdl-grid">
          <div class="mdl-layout-spacer"></div>
          <div class="mdl-cell mdl-cell--8-col">
            <router-view></router-view>
          </div>
          <div class="mdl-layout-spacer"></div>
        </div>
      </div>
      <x-footer></x-footer>
    </main>
  </div>
</template>

<script>
// import RwvHeader from '@/components/TheHeader'
import xHeader from '@/components/Header'
import xNav from '@/components/Navigation'
import xFooter from '@/components/Footer'
import Web3 from 'web3'
import $ from 'jquery'

export default {
  name: 'App',
  components: {
    xHeader,
    xNav,
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
    this.$root.$on('redraw', function (height) {
      let footer = $('footer')
      let header = $('header')
      let newHeight = height + footer.outerHeight() + header.outerHeight()
      document.querySelector('.page-content').setAttribute('style', 'height:' + newHeight + 'px')
    })
  }
}
</script>

<style>
</style>

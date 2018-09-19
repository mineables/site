// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import BootstrapVue from 'bootstrap-vue'

router.afterEach(() => {
  window.scrollTo(0, 0)
})

Vue.use(BootstrapVue)
Vue.use(router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

import { ADDRESS } from '../static/scripts/addr.js'
import { CHILD_ARTIFACT_ABI } from '../static/scripts/child_artifact_abi.js'
import { VIRTUAL_MINING_BOARD_ABI } from '../static/scripts/virtual_mining_board_abi.js'
import { MINEABLE_ABI } from '../static/scripts/mineable_abi.js'
import { QUARRY_ABI } from '../static/scripts/quarry_abi.js'
import { FACTORY_ABI } from '../static/scripts/factory_abi.js'
import { VGPU_MARKET_ABI } from '../static/scripts/vgpu_market_abi.js'
import { VRIG_MARKET_ABI } from '../static/scripts/vrig_market_abi.js'
// This is a global mixin, it is applied to every vue instance
Vue.mixin({
  data: function () {
    return {
      get vrigContract () {
        var VirtualMiningBoard = window.TruffleContract({abi: VIRTUAL_MINING_BOARD_ABI})
        VirtualMiningBoard.setProvider(window.web3.currentProvider)
        return VirtualMiningBoard.at(ADDRESS.VRIG)
      },
      get vgpuContract () {
        var ChildArtifact = window.TruffleContract({abi: CHILD_ARTIFACT_ABI})
        ChildArtifact.setProvider(window.web3.currentProvider)
        return ChildArtifact.at(ADDRESS.VGPU)
      },
      get mithrilContract () {
        var MineableContract = window.TruffleContract({abi: MINEABLE_ABI})
        MineableContract.setProvider(window.web3.currentProvider)
        return MineableContract.at(ADDRESS.MITHRIL)
      },
      get MineableContract () {
        var MineableContract = window.TruffleContract({abi: MINEABLE_ABI})
        MineableContract.setProvider(window.web3.currentProvider)
        return MineableContract
      },
      get quarryContract () {
        var Quarry = window.TruffleContract({abi: QUARRY_ABI})
        Quarry.setProvider(window.web3.currentProvider)
        return Quarry.at(ADDRESS.QUARRY)
      },
      get factoryContract () {
        var Factory = window.TruffleContract({abi: FACTORY_ABI})
        Factory.setProvider(window.web3.currentProvider)
        return Factory.at(ADDRESS.FACTORY)
      },
      get vgpuMarketContract () {
        var VgpuMarket = window.TruffleContract({abi: VGPU_MARKET_ABI})
        VgpuMarket.setProvider(window.web3.currentProvider)
        return VgpuMarket.at(ADDRESS.VGPU_MARKET)
      },
      get vrigMarketContract () {
        var VrigMarket = window.TruffleContract({abi: VRIG_MARKET_ABI})
        VrigMarket.setProvider(window.web3.currentProvider)
        return VrigMarket.at(ADDRESS.VRIG_MARKET)
      }
    }
  }
})

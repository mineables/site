<template>
  <section>
    <table id="quarryTable" ref="quarryTable" class="table">
      <thead class="thead-dark">
          <tr>
              <th>Symbol</th>
              <th>Minted</th>
              <th>Total Supply</th>
              <th>Remaining</th>
              <th>Difficulty</th>
              <th>vRig</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          <tr :key='idx' v-for="(token, idx) in quarry">
              <td class="mdl-data-table__cell--non-numeric" >
                <router-link :to="{ name: 'token', params: { addr: token.addr }}" v-text="token.symbol"></router-link>
              </td>
              <td v-text="token.tokensMinted"></td>
              <td v-text="token.supply"></td>
              <td v-text="token.remainingSupply"></td>
              <td v-text="token.diff"></td>
              <td v-if="token.installed=='none'" v-text="token.installed"></td>
              <td v-if="token.installed!='none'">
                <h5> 
                  <b-badge variant="light">{{vrigMap.get(token.installed)}}</b-badge> 
                </h5>
              </td>
              <td>

                <button v-if="token.installed!='none'" v-b-modal.uninstallVRig v-b-tooltip.hover title="Remove vRig" type="button" class="btn btn-outline-danger btn-sm" @click="removeVrig(token.addr)">
                  <span aria-hidden="true">&times;</span>
                </button>

                <button v-b-modal.installVRig v-b-tooltip.hover title="Install vRig" type="button" class="btn btn-outline-success btn-sm" @click="setTokenAddr(token.addr)">
                  update
                </button>
              </td>
          </tr>
          <tr v-if="loading">
              <td id="loading" colspan="3">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
              </td>
          </tr>
          <tr v-if="!loading && quarry.length == 0">
              <td id="loading" colspan="3">No Tokens found in Quarry</td>
          </tr>
      </tbody>
    </table> 

    <!-- Modal Component -->
    <b-modal id="installVRig"
             ref="modal"
             title="Install vRig onto Mineable Contract"
             @ok="installRig"
             @shown="clearSelected"
             no-close-on-esc
             no-close-on-backdrop
             hide-header-close
             hide-footer>
      <form @submit.stop.prevent="handleSubmit" v-if="!loading">
        <b-form-select v-model="selected" :options="options" class="mb-3"/>
      </form>
      <b-alert show variant="warning" v-if="loading">
        Please don't refresh this page until the transaction is completed.
        <b-progress :value="100" :max="100" :striped="loading" :animated="loading"></b-progress><br/>
      </b-alert>
      <b-alert show variant="warning" v-if="completedTxn">
        <a v-bind:href="txUrl + approvalTx" target="_blank">Transaction complete.</a>
      </b-alert>

      <b-btn v-if="!loading" class="mt-2" variant="outline-info" block @click="installRig">Install</b-btn>

    </b-modal>

    <b-modal id="uninstallVRig"
             ref="uninstallModal"
             title="Uninstall vRig from Mineable Contract"
             @ok="installRig"
             @shown="clearSelected"
             no-close-on-esc
             no-close-on-backdrop
             ok-disabled
             cancel-disabled
             hide-header-close
             hide-footer>
      <b-alert show variant="warning">
        Please don't refresh this page until the transaction is completed.
        <b-progress :value="100" :max="100" :striped="true" :animated="true"></b-progress><br/>
      </b-alert>
    </b-modal>

  </section>
</template>

<script>
import { QUARRY_ABI } from '../../static/scripts/quarry_abi.js'
import { MINEABLE_ABI } from '../../static/scripts/mineable_abi.js'
import { VIRTUAL_MINING_BOARD_ABI } from '../../static/scripts/virtual_mining_board_abi.js'
import { ADDRESS } from '../../static/scripts/addr.js'

export default {
  name: 'xQuarryTable',
  data () {
    return {
      quarry: [],
      loading: true,
      completedTxn: false,
      txUrl: 'https://rinkeby.etherscan.io/tx/',
      approvalTx: 'Pending...',
      selected: null,
      currentTokenAddress: null,
      options: [
        { value: null, text: 'Please select a vRig' }
      ],
      vrigMap: new Map()
    }
  },
  methods: {
    clearSelected () {
      this.selected = null
      this.loading = false
      this.completedTxn = false
    },
    setTokenAddr (addr) {
      console.log(addr)
      this.currentTokenAddress = addr
    },
    async removeVrig (addr) {
      this.loading = true
      let MineableContract = window.TruffleContract({abi: MINEABLE_ABI})
      MineableContract.setProvider(window.web3.currentProvider)
      let mineable = await MineableContract.at(addr)

      await mineable.uninstallBooster()
      this.loading = false
      this.quarry = []
      this.loadQuarry()
      this.$refs.uninstallModal.hide()
      this.completedTxn = true
    },
    async installRig (evt) {
      // Prevent modal from closing
      this.loading = true
      evt.preventDefault()
      console.log(this.selected)
      if (this.selected === null) {
        this.$refs.modal.hide()
        return
      }

      let MineableContract = window.TruffleContract({abi: MINEABLE_ABI})
      MineableContract.setProvider(window.web3.currentProvider)
      let mineable = await MineableContract.at(this.currentTokenAddress)
      await mineable.installBooster(this.selected)
      this.loading = false
      this.quarry = []
      this.loadQuarry()
      this.$refs.modal.hide()
      this.completedTxn = true
    },
    async initContracts () {
      var VirtualMiningBoard = window.TruffleContract({abi: VIRTUAL_MINING_BOARD_ABI})
      VirtualMiningBoard.setProvider(window.web3.currentProvider)
      this.vrigContract = await VirtualMiningBoard.at(ADDRESS.VRIG)
      let balance = await this.vrigContract.balanceOf(window.web3.eth.coinbase)
      for (var i = 0; i < balance; i++) {
        let artifactId = await this.vrigContract.tokenOfOwnerByIndex(window.web3.eth.coinbase, i)
        let stats = await this.vrigContract.mergedStats(artifactId)
        let option = {}
        option.value = artifactId.toNumber()
        option.text = stats[0]
        this.options.push(option)
        this.vrigMap.set(option.value, option.text)
      }
    },
    async loadQuarry () {
      let QuarryContract = window.TruffleContract({abi: QUARRY_ABI})
      QuarryContract.setProvider(window.web3.currentProvider)
      let MineableContract = window.TruffleContract({abi: MINEABLE_ABI})
      MineableContract.setProvider(window.web3.currentProvider)
      // load 0xMithril first
      let addr = ADDRESS.MITHRIL
      let mineable = await MineableContract.at(addr)
      let symbol = await mineable.symbol()
      let supply = await mineable.totalSupply()
      let decimal = await mineable.decimals()
      let diff = await mineable.getMiningDifficulty()
      let installed = await mineable.getInstalledBooster()
      let tokensMinted = await mineable.tokensMinted()
      this.quarry.push({
        tokensMinted: tokensMinted / (10 ** decimal),
        addr,
        symbol,
        supply: supply / (10 ** decimal),
        remainingSupply: supply / (10 ** decimal) - tokensMinted / (10 ** decimal),
        diff: diff.toNumber(),
        installed: installed.toNumber() === 0 ? 'none' : installed.toNumber()
      })

      let token = await QuarryContract.at(ADDRESS.QUARRY)
      let size = await token.mineableSize()
      for (let i = 0; i < size; i++) {
        let addr = await token.getMineableAt(i)
        let mineable = await MineableContract.at(addr)
        let symbol = await mineable.symbol()
        let supply = await mineable.totalSupply()
        let decimal = await mineable.decimals()
        let diff = await mineable.getMiningDifficulty()
        let installed = await mineable.getInstalledBooster()
        let tokensMinted = await mineable.tokensMinted()
        this.quarry.push({
          tokensMinted: tokensMinted / (10 ** decimal),
          addr,
          symbol,
          supply: supply / (10 ** decimal),
          remainingSupply: supply / (10 ** decimal) - tokensMinted / (10 ** decimal),
          diff: diff.toNumber(),
          installed: installed.toNumber() === 0 ? 'none' : installed.toNumber()
        })
        if (i === size - 1) this.loading = false
        if (size === 0) this.loading = false
      }
    }
  },
  async mounted () {
    await this.initContracts()
    await this.loadQuarry()
  }
}
</script>

<style>
#loading {
  text-align:center; 
  vertical-align:middle;
}
#quarryTable .mdl-progress {
  width: 100%;
}
#quarryTable .mdl-data-table {
  table-layout:fixed;
  width:100%; 
}
#quarryTable td, th {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
</style>
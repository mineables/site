<template>
  <section>
    <table id="quarryTable" ref="quarryTable" class="table">
      <thead class="thead-dark">
          <tr>
              <th v-if="loading">
                  <span class="loading">    (Loading...)</span> Symbol   
              </th>
              <th v-if="!loading">
                 Symbol
              </th>
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
              <td>
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
      let mineable = await this.MineableContract.at(addr)

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

      let mineable = await this.MineableContract.at(this.currentTokenAddress)
      await mineable.installBooster(this.selected)
      this.loading = false
      this.quarry = []
      this.loadQuarry()
      this.$refs.modal.hide()
      this.completedTxn = true
    },
    async initContracts () {
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
      // load 0xMithril first
      let addr = this.mithrilContract.address
      let mineable = this.mithrilContract
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

      let quarry = this.quarryContract
      let size = await quarry.mineableSize()
      for (let i = 0; i < size; i++) {
        let addr = await quarry.getMineableAt(i)
        let mineable = await this.MineableContract.at(addr)
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
.loading {
  color: #3ee9b5;
}
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
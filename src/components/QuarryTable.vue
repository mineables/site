<template>
    <table id="quarryTable" ref="quarryTable" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
          <tr>
              <th class="mdl-data-table__cell--non-numeric fullwidth">Symbols</th>
              <th>Supply</th>
              <th>Difficulty</th>
          </tr>
      </thead>
      <tbody>
          <tr :key='idx' v-for="(token, idx) in quarry">
              <td class="mdl-data-table__cell--non-numeric" >
                <router-link :to="{ name: 'token', params: { addr: token.addr }}" v-text="token.symbol"></router-link>
              </td>
              <td v-text="token.supply"></td>
              <td v-text="token.diff"></td>
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
</template>

<script>
import { QUARRY_ABI } from '../../static/scripts/quarry_abi.js'
import { MINEABLE_ABI } from '../../static/scripts/mineable_abi.js'

export default {
  name: 'xQuarryTable',
  data () {
    return {
      quarry: [],
      loading: true
    }
  },
  methods: {
    loadQuarry: function () {
      const quarryAddr = '0x26494cfe750d27c3f3acf34eff45bd9416d8bf9f'
      let token = window.web3.eth.contract(QUARRY_ABI).at(quarryAddr)
      token.mineableSize.call((err, size) => {
        if (err) console.log(err)
        for (let i = 0; i < size.toNumber(); i++) {
          token.getMineableAt(i, (err, addr) => {
            if (err) console.log(err)
            this.addTokenToQuarry(addr)
          })
        }
      })
      this.loading = false
    },
    addTokenToQuarry: function (addr) {
      let mineable = window.web3.eth.contract(MINEABLE_ABI).at(addr)
      mineable.symbol.call((err, symbol) => {
        if (err) console.log(err)
        mineable.decimals.call((err, decimal) => {
          if (err) console.log(err)
          mineable.totalSupply.call((err, supply) => {
            if (err) console.log(err)
            mineable.getMiningDifficulty.call((err, diff) => {
              if (err) console.log(err)
              for (let i = 0; i < 25; i++) {
                this.quarry.push({
                  addr,
                  symbol,
                  supply: supply.toNumber(),
                  diff: diff.toNumber()
                })
              }
            })
          })
        })
      })
    }
  },
  mounted () {
    this.loadQuarry()
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
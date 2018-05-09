<template>
  <div>
    <h2>{{ token.name }}</h2>
    <span>Symbol: {{ token.symbol }}</span><br/>
    <span>Supply: {{ token.supply }}</span><br/>
    <span>Difficulty: {{ token.diff }}</span>
  </div>
</template>

<script>
import { MINEABLE_ABI } from '../../static/scripts/mineable_abi.js'

export default {
  name: 'Token',
  data () {
    return {
      addr: this.$route.params.addr,
      token: {}
    }
  },
  methods: {
    loadToken: function (addr) {
      let mineable = window.web3.eth.contract(MINEABLE_ABI).at(addr)
      mineable.name.call((err, name) => {
        if (err) console.log(err)
        mineable.symbol.call((err, symbol) => {
          if (err) console.log(err)
          mineable.decimals.call((err, decimal) => {
            if (err) console.log(err)
            mineable.totalSupply.call((err, supply) => {
              if (err) console.log(err)
              mineable.getMiningDifficulty.call((err, diff) => {
                if (err) console.log(err)
                this.token = {
                  name,
                  symbol,
                  supply: supply.toNumber(),
                  diff: diff.toNumber()
                }
              })
            })
          })
        })
      })
    }
  },
  mounted () {
    this.loadToken(this.addr)
  }
}
</script>

<style>

</style>

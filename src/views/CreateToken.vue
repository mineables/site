<template>
  <div id="createTokenForm">
    <h3>Create Your Own Mineable Token</h3>
    <p>
      Fill out the following fields to create your own mineable token.
    </p>

    <form action="#">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="form.symbol" type="text" id="symbol">
        <label class="mdl-textfield__label" for="symbol">Symbol</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="form.name" type="text" id="name">
        <label class="mdl-textfield__label" for="name">Name</label>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="form.decimal" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="decimal">
        <label class="mdl-textfield__label" for="decimal">Decimal</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="form.supply" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="supply">
        <label class="mdl-textfield__label" for="supply">Supply</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="form.initReward" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="initReward">
        <label class="mdl-textfield__label" for="initReward">Initial Reward</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" v-model="form.blockAdjustment" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="diffAdjustment">
        <label class="mdl-textfield__label" for="diffAdjustment">Blocks per Difficulty Adjustment</label>
        <span class="mdl-textfield__error">Input is not a number!</span>
      </div>
    </form>
    <div>
      <button type="button" class="mdl-button" v-on:click="createToken()">Submit</button>
    </div>
  </div>
</template>

<script>
import { FACTORY_ABI } from '../../static/scripts/factory_abi.js'
export default {
  name: 'CreateToken',
  data () {
    return {
      form: {}
    }
  },
  methods: {
    createToken: function () {
      let factoryAddr = '0x496cee05c8a05520340708ff17286224700f0136'
      let token = window.web3.eth.contract(FACTORY_ABI).at(factoryAddr)
      token.createMineable(this.form.symbol,
                            this.form.name,
                            this.form.decimal,
                            this.form.supply,
                            this.form.initReward,
                            this.form.blockAdjustment,
      err => {
        if (err) console.log(err)
        token.pop.call((err, addr) => {
          if (err) console.log(err)
          // emit token to be added
          this.$router.push({ name: 'home' })
        })
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$root.$emit('redraw', 600)
    })
  }
}
</script>

<style>
</style>

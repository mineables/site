<template>
  <section id="createToken">
    <div class="container">
      <div class="row d-flex">
        <div class="col-lg-10">
          <h3>Create Your Own Mineable Token</h3>
          <p>
            Fill out the following fields to create your own mineable token.
          </p>
          <form>
            <div class="form-group">
              <label for="symbol">Symbol:</label>
              <input type="text" v-model="form.symbol" class="form-control" id="symbol" aria-describedby="symbolHelp" required>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" v-model="form.name" class="form-control" id="name" aria-describedby="namelHelp" required>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="decimal">Decimal:</label>
              <input type="number" v-model="form.decimal" class="form-control" id="decimal" aria-describedby="decimallHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="supply">Supply:</label>
              <input type="number" v-model="form.supply" class="form-control" id="supply" aria-describedby="supplylHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="initReward">Initial Reward:</label>
              <input type="number" v-model="form.initReward" class="form-control" id="initReward" aria-describedby="initRewardHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="blockAdjustment">Blocks per Difficulty Adjustment:</label>
              <input type="number" v-model="form.blockAdjustment" class="form-control" id="blockAdjustment" aria-describedby="blockAdjustmentHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div>
              <input class="btn btn-primary" type="submit" value="Submit" v-on:click="createToken()">
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
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
          this.$router.push({ name: 'token', params: { addr } })
        })
      })
    }
  }
}
</script>

<style>
.container {
  padding-top: 20px;
}
</style>

<template>
  <section id="createToken">
    <div class="container">
      <div class="row d-flex">
        <div class="col-lg-10">
          <h3>Create Your Own Mineable Token</h3>
          <p>
            Fill out the following fields to create your own mineable token.
          </p>
          <form class="container" novalidate>
            <div class="alert alert-danger" role="alert">
              This will only work against the Ropsten Network. Please make sure your metamask is not pointing to the Mainnet.
            </div>
            <div class="alert alert-warning" role="alert" v-if="wallet != 'local'">
              Token creating will only work if you have metamask installed and you are logged in.
            </div>
            <div class="form-group">
              <label for="symbol">Symbol:</label>
              <input type="text" v-model="form.symbol" class="form-control" id="symbol" aria-describedby="symbolHelp" required>
              <div class="invalid-feedback"></div>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" v-model="form.name" class="form-control" id="name" aria-describedby="namelHelp" required>
              <div class="invalid-feedback"></div>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="decimal">Decimal:</label>
              <input type="number" v-model="form.decimal" class="form-control" id="decimal" aria-describedby="decimallHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="supply">Supply:</label>
              <input type="number" v-model="form.supply" class="form-control" id="supply" aria-describedby="supplylHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="initReward">Initial Reward:</label>
              <input type="number" v-model="form.initReward" class="form-control" id="initReward" aria-describedby="initRewardHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="blockAdjustment">Blocks per Difficulty Adjustment:</label>
              <input type="number" v-model="form.blockAdjustment" class="form-control" id="blockAdjustment" aria-describedby="blockAdjustmentHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
            <div class="form-group">
              <label for="initDiff">Initial Difficulty:</label>
              <input type="number" v-model="form.initDiff" class="form-control" id="initDiff" aria-describedby="initDiffHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
          </form>
          <div>
            <input class="btn btn-primary" type="submit" value="Submit" v-on:click="createToken()" :disabled="wallet != 'local'">
          </div>
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
      form: {},
      wallet: undefined
    }
  },
  methods: {
    createToken: function () {
      window.web3.version.getNetwork((err, netId) => {
        if (err) console.log(err)
        switch (netId) {
          case '1':
            console.log('This is mainnet')
            break
          case '2':
            console.log('This is the deprecated Morden test network.')
            break
          case '3':
            console.log('This is the ropsten test network.')
            break
          default:
            console.log('This is an unknown network.')
        }
      })

      let factoryAddr = '0x5cf65887bad83bfa2e74100af7310d5e2336fa3c'
      let token = window.web3.eth.contract(FACTORY_ABI).at(factoryAddr)
      token.createMineable(this.form.symbol,
                            this.form.name,
                            this.form.decimal,
                            this.form.supply,
                            this.form.initReward,
                            this.form.blockAdjustment,
                            this.form.initDiff,
      (err, txAddr) => {
        if (err) console.log(err)
        console.log(txAddr)
        // this.$router.push({ name: 'token', params: { addr } })
      })
    }
  },
  mounted () {
    this.wallet = window.wallet
  }
}
</script>

<style>
.container {
  padding-top: 20px;
}
</style>

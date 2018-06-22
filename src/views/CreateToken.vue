<template>
  <section id="createToken">
    <div class="container">
      <x-check-metamask></x-check-metamask>
      <div class="alert alert-danger" role="alert">
        This will only work against the Ropsten Network. Please make sure your metamask is not pointing to the Mainnet.
      </div>
      <div class="row d-flex">
        <div class="col-lg-10">
          <h2 class="header-text">Create Your Own Mineable Token</h2>
          <p>
            Fill out the following fields to create your own mineable token.
          </p>
          <form class="container" novalidate>
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
            <div class="form-group">
              <label for="blockTimeInMinutes">Block Time in Minutes:</label>
              <input type="number" v-model="form.blockTimeInMinutes" class="form-control" id="blockTimeInMinutes" aria-describedby="blockTimeInMinutesHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <!-- <small id="symbolHelp" class="form-text text-muted">Token Symbol</small> -->
            </div>
          </form>
          <div>
            <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" type="submit" v-on:click="createToken()" :disabled="wallet != 'local'">Submit</button>
          </div>
          <!-- the modal -->
          <b-modal ref="modal" id="modal-center" size="lg" centered title="Processing..." hide-footer >
            <div class="form-group">
              <label for="blockTimeInMinutes">Transaction #</label><br/>
              <a v-bind:href="txUrl" target="_blank">{{ txId }}</a>
            </div>
            <div class="form-group">
              <label for="blockTimeInMinutes">Token Address</label><br/>
              {{ addr }}
            </div>
            <b-progress :value="100" :max="100" :striped="loading" :animated="loading"></b-progress><br/>
            <b-alert show variant="warning" v-if="loading">Please don't change page until the transaction is completed.</b-alert>
            <b-alert show variant="success" v-if="!loading">
              Congratulations on your new mineable token. Your token is now part of the Mithril Network Quarry. 
              <router-link :to="{ name:'token', params: { addr } }" exact>Click this link to see your token page.</router-link>
            </b-alert>
          </b-modal>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FACTORY_ABI } from '../../static/scripts/factory_abi.js'
import { ADDRESS } from '../../static/scripts/addr.js'

import xCheckMetamask from '@/components/CheckMetamask'

export default {
  name: 'CreateToken',
  components: {
    xCheckMetamask
  },
  data () {
    return {
      form: {},
      wallet: undefined,
      txId: 'Processing...',
      addr: 'Processing...',
      loading: true,
      txUrl: 'https://ropsten.etherscan.io/tx/'
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
      this.$refs.modal.show()
      let token = window.web3.eth.contract(FACTORY_ABI).at(ADDRESS.FACTORY)
      console.log(token)
      let event = token.MineableTokenCreated()
      event.watch((err, evt) => {
        if (err) console.log(err)
        console.log(evt)
        this.addr = evt.args.tokenAddress
        this.loading = false
      })
      token.createMineable(this.form.symbol,
                            this.form.name,
                            this.form.decimal,
                            this.form.supply,
                            this.form.initReward,
                            this.form.blockAdjustment,
                            this.form.initDiff,
                            this.form.blockTimeInMinutes,
      (err, txAddr) => {
        if (err) console.log(err)
        console.log(txAddr)
        this.txId = txAddr
        this.txUrl += this.txId
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

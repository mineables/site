<template>
  <section id="createToken">
    <div class="container">
      <x-check-metamask></x-check-metamask>
      <div class="row d-flex">
        <div class="col-lg-10">
          <h2 class="header-text">Create Your Own Mineable Token</h2>
          <p>
            Fill out the following fields to create your own mineable token.
          </p>
          <form class="container" novalidate>
            <div class="form-group">
              <label for="symbol">Symbol</label>
              <input type="text" v-model="form.symbol" class="form-control" id="symbol" aria-describedby="symbolHelp" required>
              <div class="invalid-feedback"></div>
              <small id="symbolHelp" class="form-text text-muted">The symbol that will be used to represent your token. ie. 0xBTC</small>
            </div>
            <div class="form-group" >
              <label for="name">Name</label>
              <input type="text" v-model="form.name" class="form-control" id="name" aria-describedby="namelHelp" required>
              <div class="invalid-feedback"></div>
              <small id="symbolHelp" class="form-text text-muted">Long name of the Mineable Token.</small>
            </div>
            <div class="form-group">
              <label for="decimal">Decimals</label>
              <input type="number" max="100" placeholder="ie. 10" v-model="form.decimal" class="form-control" id="decimal" aria-describedby="decimallHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <small id="symbolHelp" class="form-text text-muted">Number of decimal places that the token has. (Maximum 18)</small>
            </div>
            <div class="form-group">
              <label for="supply">Supply:</label>
              <input type="number" placeholder="ie. 1000000000"  v-model="form.supply" class="form-control" id="supply" aria-describedby="supplylHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <small id="symbolHelp" class="form-text text-muted">The maximum quantity of tokens available for mining.</small>
            </div>
            <div class="form-group">
              <label for="initReward">Initial Reward</label>
              <input type="number" placeholder="ie. 50" v-model="form.initReward" class="form-control" id="initReward" aria-describedby="initRewardHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
              <div class="invalid-feedback"></div>
              <small id="symbolHelp" class="form-text text-muted">The initial quantity of tokens received per successful mine submission.</small>
            </div>
            <!-- Metadata -->
            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" id="description" v-model="form.description" rows="3"></textarea>
              <small id="symbolHelp" class="form-text text-muted">Long form description of this Mineable Token.</small>
            </div>
            <div class="form-group">
              <label for="website">Website</label>
              <input type="url" placeholder="ie. https://0xbitcoin.org" v-model="form.website" class="form-control" id="website" aria-describedby="symbolHelp" required>
              <div class="invalid-feedback"></div>
              <small id="symbolHelp" class="form-text text-muted">Token's associated website</small>
            </div>
            <div class="form-group">
              <label for="iconFile">Icon</label>
              <div class="custom-file">
               <input type="file" class="form-control-file" id="iconFile" @change="previewImage" accept="image/*">
               <small id="symbolHelp" class="form-text text-muted">Upload token image icon (recommend 100 x 100 pixel size).</small>
              </div>
              <div v-if="previewImageData.length > 0">
                <img class="token-icon-preview" :src="previewImageData">
              </div>
            </div>

           <div>
            <b-btn v-b-toggle.collapse1 variant="link">+Advanced</b-btn>
              <b-collapse id="collapse1" class="mt-2">
                <b-alert show variant="danger">Warning: These are advanced features that can drastically change the overall behavior of your mined token, proceed with caution</b-alert>
                <div class="form-group">
                  <label for="blockAdjustment">Blocks per Difficulty Adjustment</label>
                  <input type="number" placeholder="ie. 1024" v-model="form.blockAdjustment" class="form-control" id="blockAdjustment" aria-describedby="blockAdjustmentHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>

                  <div class="invalid-feedback"></div>
                  <small id="symbolHelp" class="form-text text-muted">The number of successful mintings before the target difficulty is adjusted.</small>
                </div>
                <div class="form-group">
                  <label for="initDiff">Initial Difficulty</label>
                  <input type="number" v-model="form.initDiff" placeholder="ie. 0" class="form-control" id="initDiff" aria-describedby="initDiffHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
                  <div class="invalid-feedback"></div>
                  <small id="symbolHelp" class="form-text text-muted">The hashing difficulty seed when the contract is launched. (ie. 0, 1000000, etc)</small>
                </div>
                <div class="form-group">
                  <label for="blockTimeInMinutes">Block Time in Minutes</label>
                  <input type="number" v-model="form.blockTimeInMinutes" placeholder="ie. 10" class="form-control" id="blockTimeInMinutes" aria-describedby="blockTimeInMinutesHelp"  pattern="-?[0-9]*(\.[0-9]+)?" required>
                  <div class="invalid-feedback"></div>
                  <small id="symbolHelp" class="form-text text-muted">The target amount of time between mintings.</small>
                </div>

              </b-collapse>
          </div>
          <br>       
            
          </form>

          <div>
              <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" type="submit" v-on:click="createToken()">Create Token</button>
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
              Congratulations, your token is now part of the Mithril Network. 
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
      form: {
        blockAdjustment: 1024,
        initDiff: 0,
        blockTimeInMinutes: 10
      },
      wallet: undefined,
      txId: 'Processing...',
      addr: 'Processing...',
      loading: true,
      txUrl: 'https://ropsten.etherscan.io/tx/',
      ipfsImageLink: '',
      previewImageData: '',
      previewImageFile: ''
    }
  },
  methods: {
    previewImage: function (event) {
      // Reference to the DOM input element
      var input = event.target
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.previewImageData = e.target.result
          this.previewImageFile = input.files[0]
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0])
      }
    },
    async createMetadata () {
      console.log('upload Image success!')
      let config = {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (this.previewImageFile) {
        let data = new FormData()
        let file = this.previewImageFile
        data.append('file', file)
        let response = await this.$http.post('https://ipfs.infura.io:5001/api/v0/add?pin=true', data, config)
        console.log(response)
        console.log(response.body.Hash)
        console.log('https://ipfs.io/ipfs/' + response.body.Hash)
        this.ipfsImageLink = 'https://ipfs.io/ipfs/' + response.body.Hash
      }
      var metadata = {}
      metadata.symbol = this.form.symbol || ''
      metadata.name = this.form.name || ''
      metadata.description = this.form.description || ''
      metadata.website = this.form.website || ''
      metadata.image = this.ipfsImageLink
      metadata.type = 'solidity-sha3'
      console.log(metadata)
      // send the metadata
      let data = new FormData()
      let metadataJson = JSON.stringify(metadata, null, '    ')
      console.log(metadataJson)
      data.append('file', metadataJson)
      let response = await this.$http.post('https://ipfs.infura.io:5001/api/v0/add?pin=true', data, config)
      console.log('metadata uri: https://ipfs.io/ipfs/' + response.body.Hash)
      return 'https://ipfs.io/ipfs/' + response.body.Hash
    },
    async createToken () {
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
      let metadataURI = await this.createMetadata()
      token.createMineable(this.form.symbol,
                            this.form.name,
                            this.form.decimal,
                            this.form.supply,
                            this.form.initReward,
                            this.form.blockAdjustment,
                            this.form.initDiff,
                            this.form.blockTimeInMinutes,
                            metadataURI,
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

.token-icon-preview {
  position: relative;
  border-radius: 50%;
  width: 7em;
  height: 7em;
  padding: 1em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

input:invalid {
    box-shadow: 0 0 20px 0px #ff9800;
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
}

/*
input:valid {
    box-shadow: 0 0 20px 0px green;
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
}
*/

</style>

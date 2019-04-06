<template>
<div class="container wrapped">

  <br><br>
  <x-check-metamask></x-check-metamask>
  
  <h4 class="balance"> <b-badge variant="light">Balance:  {{ mithrilBalance }} <span class="tengwar">5Ì#</span></b-badge> </h4>

  <h2 class="header-text">Virtual Artifact Market</h2>
  <p>Purchase ERC721 Virtual Rigs and GPUs with 0xMithril. vRigs and vGPUs can be attached to your mining account to vastly improve mining performance. Virtualizing hash power saves overall mining hardware, maintenance and electricity costs and can additionally be combined with traditional hardware-based mining operations.</p>

  <b-tabs>
    <b-tab title="VRIG Market" active>
      <section id="vrig-market">
        <div class="row">
            <div v-for="result in vrigResults" class="col-sm-4">

              <b-alert class="overlay" v-if="result.childArtifacts.length > 0" variant="secondary" show>
                <strong>Warning:</strong> Owner must remove all components from Rig in order to list artifact.
              </b-alert>
              
              <div class="card market-card">
                <h3 class="card-title price-wrap"> 
                  <h4 class="float-left">{{ result.name }} </h4>
                  <span class="price">{{ result.price }}</span> <span class="tengwar">5Ì#</span> 
                </h3>
                <div class="card-body">

                  <div class="float-left" style="width: 10em; height: 10em;">
                    <x-vrig-component :rigComponents='result.metadata.component'></x-vrig-component>
                  </div>

                  <p class="card-text">
                    <ul class="statistics">
                      <li>Experience: {{ result.experience }}</li>
                      <li>Life Decrement: {{ result.lifeDecrement }}</li>
                      <li>Execution Cost: {{ result.executionCost }}</li>
                      <li>Available Sockets: {{ result.sockets }}</li>
                      <li>Virtual Hash Rate: {{ result.vhash }} H/s</li>
                      <li>Accuracy: {{ result.accuracy }}</li>
                      <li>Level: {{ result.level }}</li>
                    </ul>
                  </p>
                  <b-button v-if="result.childArtifacts.length < 1 && !result.ownedByCoinbase" class="btn btn-lg btn-outline-info" data-toggle="modal" data-target="#myModal" @click="purchasevRig(result.id,result.mithrilPrice)">
                    Purchase for {{ result.price }} <span class="tengwar">5Ì#</span> 
                  </b-button>

                  <br>
                  <span class="uid">uid: {{ result.id }} </span>
                </div>
              </div>
            </div>
        </div>
      </section>
    </b-tab>

    <b-tab title="VGPU Market">
      <section id="vgpu-market">
        <div class="row">
            <div v-for="result in vgpuResults" class="col-sm-4">
              <b-alert class="overlay" v-if="result.parent > 0" variant="secondary" show>
                <strong>Warning:</strong> Owner must remove all vGPUs from vRig in order to list artifact.
              </b-alert>

              <div class="card market-card">
                
                <h3 class="card-title price-wrap"> 
                  <h4 class="float-left">{{ result.name }} </h4>
                  <span class="price">{{ result.price }}</span> <span class="tengwar">5Ì#</span> 
                </h3>
                
                <div class="card-body">
                  <img class="card-img-top float-left" :src="result.metadata.image" alt="Card image cap">
                  <p class="card-text">Remaining cycles: {{ result.life }}</p>
                  <p class="card-text modifier" v-for="modifier in result.modifiers" >{{ modifier }}</p>
                  <b-button v-if="!result.ownedByCoinbase && result.parent === 0" class="btn btn-lg btn-outline-info" data-toggle="modal" data-target="#myModal" @click="purchasevGPU(result.id,result.mithrilPrice)">
                    Purchase for {{ result.price }} <span class="tengwar">5Ì#</span> 
                  </b-button>
                  <br>
                  <span class="uid">uid: {{ result.id }} </span>
                </div>
              </div>
            </div>
        </div>
      </section>
    </b-tab>

  </b-tabs>
  <b-modal ref="modal" id="modal-center" size="lg" centered title="Processing..." hide-footer >
    <div class="form-group">
      <label for="blockTimeInMinutes">Purchase Transaction</label><br/>
      <a v-bind:href="txUrl + purchaseTx" target="_blank">{{ purchaseTx }}</a>
    </div>
    <b-progress :value="100" :max="100" :striped="loading" :animated="loading"></b-progress><br/>
    <b-alert show variant="warning" v-if="loading">Please don't refresh this page until the transaction is completed.</b-alert>
    <b-alert show variant="success" v-if="!loading">
      Purchase complete.
      <router-link class="nav-link" :to="{ name:'configure' }">Configure your Virtual Rig</router-link>        
    </b-alert>
  </b-modal>
  </div>
</template>

<script>
const BLOCK_EXPLORER_URL = require('../../static/scripts/config.js').explorer_url
const ADDRESS = require('../../static/scripts/config.js').addresses

import util from '../common/util.js'
import xCheckMetamask from '@/components/CheckMetamask'
import xVrigComponent from '@/components/VrigComponent'
import parts from '../../static/scripts/parts.js'

export default {
  name: 'Marketplace',
  components: {
    xCheckMetamask,
    xVrigComponent
  },
  data () {
    return {
      currentVrigId: 0,
      vgpuResults: [],
      vrigResults: [],
      marketContract: {},
      vgpuContract: {},
      vrigContract: {},
      mithrilContract: {},
      vgpuMarketContract: {},
      vrigMarketContract: {},
      purchaseTx: 'Pending...',
      txUrl: BLOCK_EXPLORER_URL,
      loading: true,
      showDismissibleAlert: false,
      mithrilBalance: 0,
      vrigKey: 0
    }
  },
  methods: {
    async purchasevGPU (id, price) {
      this.approvalTx = 'Pending...'
      this.purchaseTx = 'Pending...'
      let owner = await this.vgpuContract.ownerOf(id)
      if (owner !== window.web3.eth.coinbase) {
        this.$refs.modal.show()
        await this.mithrilContract.approveAndCall(ADDRESS.VGPU_MARKET, price, this.toHex(id)).then(response => {
          console.log(response)
          this.purchaseTx = response.tx
          this.loading = false
          this.vgpuResults = []
          this.loadVGPUMarket()
        })
        /*
        await this.mithrilContract.approve(ADDRESS.VGPU_MARKET, price).then(response => {
          console.log(response)
          this.approvalTx = response.tx
        })
        await this.vgpuMarketContract.buy(id).then(response => {
          console.log(response)
          this.purchaseTx = response.tx
          this.loading = false
          this.vgpuResults = []
          this.loadVGPUMarket()
        })
        */
      }
    },
    toHex: function (n) {
      return '0x' + n.toString(16).padStart(8, '0')
    },
    async purchasevRig (id, price) {
      this.approvalTx = 'Pending...'
      this.purchaseTx = 'Pending...'
      let owner = await this.vrigContract.ownerOf(id)
      if (owner !== window.web3.eth.coinbase) {
        this.$refs.modal.show()
        await this.mithrilContract.approveAndCall(ADDRESS.VRIG_MARKET, price, this.toHex(id)).then(response => {
          console.log(response)
          this.purchaseTx = response.tx
          this.loading = false
          this.vrigResults = []
          this.loadVRIGMarket()
        })
        /*
        await this.mithrilContract.approve(ADDRESS.VRIG_MARKET, price).then(response => {
          console.log(response)
          this.approvalTx = response.tx
        })
        await this.vrigMarketContract.buy(id).then(response => {
          console.log(response)
          this.purchaseTx = response.tx
          this.loading = false
          this.vrigResults = []
          this.loadVRIGMarket()
        })
        */
      }
    },
    async loadVGPUMarket () {
      let len = await this.vgpuMarketContract.size()
      for (var i = 0; i < len; i++) {
        let art = await this.vgpuMarketContract.getAt(i)
        let a = await this.vgpuContract.artifactAt(art[0])
        let artifact = {}
        artifact.id = parseInt(art[0])
        artifact.parent = a[1].toNumber()
        let owner = await this.vgpuContract.ownerOf(artifact.id)
        if (owner === window.web3.eth.coinbase) {
          artifact.ownedByCoinbase = true
        } else {
          artifact.ownedByCoinbase = false
        }
        artifact.name = a[0]
        artifact.life = parseInt(a[2])
        let mods = a[3]
        artifact.modifiers = []
        for (var j = 0; j < mods.length; j++) {
          artifact.modifiers.push(util.parseModifier(mods[j]))
        }
        artifact.mithrilPrice = art[1].toNumber()
        artifact.price = util.readable(artifact.mithrilPrice)
        // load metadata
        artifact.tokenURI = await this.vgpuContract.tokenURI(artifact.id)
        // hack
        if (artifact.tokenURI === 'https://ipfs.io/ipfs/QmPi1hMtExAxk4pFrUncmbYcskrax2K4nDH7bKG5m8MWYC') {
          artifact.metadata = { 'image': '/static/images/gpu/market/baseGPU.png' }
        } else {
          let tok = await fetch(artifact.tokenURI)
          if (tok) {
            artifact.metadata = await tok.json()
          }
        }
        artifact.metadata.image = util.findPartImage(parts, artifact.metadata.component)
        console.log(artifact)
        this.vgpuResults.push(artifact)
      }
    },
    async loadVRIGMarket () {
      let len = await this.vrigMarketContract.size()
      for (var i = 0; i < len; i++) {
        let art = await this.vrigMarketContract.getAt(i)
        console.log(art)
        let stats = await this.vrigContract.baseStats(art[0])
        let artifact = {}
        artifact.mithrilPrice = art[1].toNumber()
        artifact.price = util.readable(artifact.mithrilPrice)
        artifact.id = parseInt(art[0])
        let owner = await this.vrigContract.ownerOf(artifact.id)
        if (owner === window.web3.eth.coinbase) {
          artifact.ownedByCoinbase = true
        } else {
          artifact.ownedByCoinbase = false
        }
        artifact.name = stats[0]
        let basicStats = stats[1]
        artifact.experience = basicStats[0].toNumber()
        artifact.lifeDecrement = basicStats[1].toNumber()
        artifact.executionCost = basicStats[2].toNumber()
        artifact.sockets = basicStats[3].toNumber()
        artifact.vhash = basicStats[4].toNumber()
        artifact.accuracy = basicStats[5].toNumber()
        artifact.level = basicStats[6].toNumber()
        artifact.childArtifacts = stats[2]
        // load metadata
        artifact.tokenURI = await this.vrigContract.tokenURI(art[0])
        artifact.metadata = await (await fetch(artifact.tokenURI)).json()
        console.log(artifact.metadata)
        artifact.metadata.image = util.findPartImage(parts, artifact.metadata.component[0])
        console.log(artifact)
        this.vrigResults.push(artifact)
      }
    },
    async loadMithrilBalance () {
      this.mithrilBalance = util.readable(await this.mithrilContract.balanceOf(window.web3.eth.coinbase))
    }
  },
  async mounted () {
    this.loadMithrilBalance()
    this.loadVGPUMarket()
    this.loadVRIGMarket()
  }
}
</script>

<style>

@font-face {
    font-family: "TengwarAnnatarGlaemscrafu";
    src: url("/static/font/tnganb.eot");
}
@font-face {
    font-family: "TengwarAnnatarGlaemscrafu";
    src: local("FreeMonoTengwar"),
    local("FreeMonoTengwar-embedding"),
    url("/static/font/tnganb.ttf") format("TrueType");
}

.market-card {
  margin-bottom: 2em;
}

.card-img-top {
  max-width: 160px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.float-left {
  float: left;
}

.uid {
  color: lightgray;
  float: right;
}

.uid:hover {
  color: black;
}

.tengwar {
  font-family: TengwarAnnatarGlaemscrafu;
  font-size: 110%;
  line-height: 1.5;
  text-decoration: none;
  font-weight: 400!important;
}

.price {
  color: #827d7d;
  font-weight: bold;
  font-size: 120%;
}

.price-wrap {
  text-align: right;
  padding: 15px;
  background-color: #ececec;
}

.modifier {
  font-style: italic;
  color: #827d7d;
}

.wrapped {
  padding-top: 2em;
}

.header-text {
  clear: both;
}

.balance {
  float:right;
}

.statistics {
  list-style: none;
}

.overlay {
  margin: auto;
  position: absolute;
  top: 35%;
  left: 30px;
  right: 30px;
  z-index: 9999;
}

</style>

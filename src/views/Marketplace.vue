<template>
<div class="container wrapped">

  <br><br>
  <x-check-metamask></x-check-metamask>
  
  <h4 class="balance"> <b-badge variant="light">Balance:  {{ mithrilBalance }} <span class="tengwar">5Ì#</span></b-badge> </h4>

  <h2 class="header-text">Virtual Artifact Market</h2>
  <p>Purchase ERC721 Virtual Rigs and GPUs with 0xMithril. vRigs and vGPUs can be attached to your mining account to vastly improve mining performance. Virtualizing hash power saves overall mining hardware, maintenance and electricity costs and can additionally be combined with traditional hardware-based mining operations.</p>
  <b-alert variant="warning"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
      Artifact is owned by current wallet
  </b-alert>

  

  <b-tabs>
    <br>
    <br>

    <b-tab title="VRIG Market" active>
      <section id="vrig-market">
        <div class="row">
            <div v-for="result in vrigResults" class="col-sm-4">
              <div class="card market-card">
                <h3 class="card-title price-wrap"> <span class="price">{{ result.price }}</span> <span class="tengwar">5Ì#</span> </h3>
                <img class="card-img-top" :src="result.metadata.image" alt="Card image cap">
                <div class="card-body">
                  <h4 class="card-title">{{ result.name }} </h4>
                  <p class="card-text">
                    <ul>
                      <li>Experience: {{ result.experience }}</li>
                      <li>Life Decrement: {{ result.lifeDecrement }}</li>
                      <li>Execution Cost: {{ result.executionCost }}</li>
                      <li>Available Sockets: {{ result.sockets }}</li>
                      <li>Virtual Hash Rate: {{ result.vhash }} H/s</li>
                      <li>Accuracy: {{ result.accuracy }}</li>
                      <li>Level: {{ result.level }}</li>
                    </ul>
                  </p>
                  <b-button v-if="result.childArtifacts.length < 1" class="btn btn-lg btn-outline-info" data-toggle="modal" data-target="#myModal" @click="purchasevRig(result.id,result.mithrilPrice)">
                    Purchase for {{ result.price }} <span class="tengwar">5Ì#</span> 
                  </b-button>
                  <b-alert v-if="result.childArtifacts.length > 0" variant="warning" show>
                  	  <h5 class="alert-heading">Warning</h5>
                  	  <p>Owner must remove all vGPUs from vRig in order to sell</p>
                  </b-alert>

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
              <div class="card market-card">
                
                <h3 class="card-title price-wrap"> <span class="price">{{ result.price }}</span> <span class="tengwar">5Ì#</span> </h3>
                <img class="card-img-top" :src="result.metadata.image" alt="Card image cap">
                <div class="card-body">
                  <h4 class="card-title">{{ result.name }} </h4>
                  <p class="card-text">Remaining cycles: {{ result.life }}</p>
                  <p class="card-text modifier" v-for="modifier in result.modifiers" >{{ modifier }}</p>
                  <b-button class="btn btn-lg btn-outline-info" data-toggle="modal" data-target="#myModal" @click="purchasevGPU(result.id,result.mithrilPrice)">
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
      <label for="blockTimeInMinutes">Approval Transaction</label><br/>
      <a v-bind:href="txUrl + approvalTx" target="_blank">{{ approvalTx }}</a>
    </div>
    <div class="form-group">
      <label for="blockTimeInMinutes">Purchase Transaction</label><br/>
      <a v-bind:href="txUrl + purchaseTx" target="_blank">{{ purchaseTx }}</a>
    </div>
    <b-progress :value="100" :max="100" :striped="loading" :animated="loading"></b-progress><br/>
    <b-alert show variant="warning" v-if="loading">Please don't refresh this page until the transactions are completed.</b-alert>
    <b-alert show variant="success" v-if="!loading">
      Purchase complete.
      <router-link class="nav-link" :to="{ name:'configure' }">Configure your Virtual Rig</router-link>        
    </b-alert>
  </b-modal>
  </div>
</template>

<script>
import { ADDRESS } from '../../static/scripts/addr.js'
import { MINEABLE_ABI } from '../../static/scripts/mineable_abi.js'
import { CHILD_ARTIFACT_ABI } from '../../static/scripts/child_artifact_abi.js'
import { VGPU_MARKET_ABI } from '../../static/scripts/vgpu_market_abi.js'
import { VIRTUAL_MINING_BOARD_ABI } from '../../static/scripts/virtual_mining_board_abi.js'
import { VRIG_MARKET_ABI } from '../../static/scripts/vrig_market_abi.js'

import xCheckMetamask from '@/components/CheckMetamask'

export default {
  name: 'Marketplace',
  components: {
    xCheckMetamask
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
      approvalTx: 'Pending...',
      purchaseTx: 'Pending...',
      txUrl: 'https://rinkeby.etherscan.io/tx/',
      loading: true,
      showDismissibleAlert: false,
      mithrilBalance: 0
    }
  },
  methods: {
    async purchasevGPU (id, price) {
      this.approvalTx = 'Pending...'
      this.purchaseTx = 'Pending...'
      let owner = await this.vgpuContract.ownerOf(id)
      if (owner === window.web3.eth.coinbase) {
        this.showDismissibleAlert = true
      } else {
        this.$refs.modal.show()
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
      }
    },
    async purchasevRig (id, price) {
      this.approvalTx = 'Pending...'
      this.purchaseTx = 'Pending...'
      let owner = await this.vrigContract.ownerOf(id)
      if (owner === window.web3.eth.coinbase) {
        this.showDismissibleAlert = true
      } else {
        this.$refs.modal.show()
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
      }
    },
    async initContracts () {
      var Market = window.TruffleContract({abi: VGPU_MARKET_ABI})
      var ChildArtifact = window.TruffleContract({abi: CHILD_ARTIFACT_ABI})
      var Mithril = window.TruffleContract({abi: MINEABLE_ABI})
      var VirtualMiningBoard = window.TruffleContract({abi: VIRTUAL_MINING_BOARD_ABI})
      var vrigMarket = window.TruffleContract({abi: VRIG_MARKET_ABI})

      Market.setProvider(window.web3.currentProvider)
      ChildArtifact.setProvider(window.web3.currentProvider)
      Mithril.setProvider(window.web3.currentProvider)
      VirtualMiningBoard.setProvider(window.web3.currentProvider)
      vrigMarket.setProvider(window.web3.currentProvider)

      this.vgpuMarketContract = await Market.at(ADDRESS.VGPU_MARKET)
      this.vgpuContract = await ChildArtifact.at(ADDRESS.VGPU)
      this.mithrilContract = await Mithril.at(ADDRESS.MITHRIL)
      this.vrigContract = await VirtualMiningBoard.at(ADDRESS.VRIG)
      this.vrigMarketContract = await vrigMarket.at(ADDRESS.VRIG_MARKET)
    },
    async loadVGPUMarket () {
      let len = await this.vgpuMarketContract.size()
      for (var i = 0; i < len; i++) {
        let art = await this.vgpuMarketContract.getAt(i)
        let a = await this.vgpuContract.artifactAt(art[0])
        let artifact = {}
        artifact.id = parseInt(art[0])
        artifact.name = a[0]
        artifact.life = parseInt(a[2])
        let mods = a[3]
        artifact.modifiers = []
        for (var j = 0; j < mods.length; j++) {
          artifact.modifiers.push(this.parseModifier(mods[j]))
        }
        artifact.mithrilPrice = parseInt(art[1])
        artifact.price = this.readable(artifact.mithrilPrice)
        // load metadata
        artifact.tokenURI = await this.vgpuContract.tokenURI(art[0])
        artifact.metadata = await (await fetch(artifact.tokenURI)).json()
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
        artifact.mithrilPrice = parseInt(art[1])
        artifact.price = this.readable(artifact.mithrilPrice)
        artifact.id = parseInt(art[0])
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
        console.log(artifact)
        this.vrigResults.push(artifact)
      }
    },
    readable: function (num) {
      return num / Math.pow(10, 18)
    },
    parseModifier: function (modifier) {
      var tuple = this.parseCommand(modifier)
      var position = tuple[0]
      // var value = tuple[1]
      var op = tuple[2]
      var mod = tuple[3]

      if (op === 1) return '[+] Adds ' + mod + ' to ' + this.getPositionName(position)
      if (op === 2) return '[-] Subtracts ' + mod + ' from ' + this.getPositionName(position)
      if (op === 3) return '[*] Multiplies ' + this.getPositionName(position) + ' by ' + mod
      if (op === 4) return '[/] Divides ' + this.getPositionName(position) + ' by ' + mod
      if (op === 5) return '[+%] Adds ' + mod + '% to ' + this.getPositionName(position)
      if (op === 6) return '[-%] Subtracts ' + mod + '% from ' + this.getPositionName(position)
      if (op === 7) return 'Requires ' + this.getPositionName(position) + ' > ' + mod
      if (op === 8) return 'Requires ' + this.getPositionName(position) + ' < ' + mod
      if (op === 9) return 'Adds ' + this.parseExponent(mod) + ' to ' + this.getPositionName(position)
    },
    parseCommand: function (command) {
      var s = String(command)
      var position = s.substring(1, 3)
      var value = s.substring(3)
      var op = value.substring(0, 1)
      var modValue = value.substring(1, 4)
      return [Number(position), Number(value), Number(op), Number(modValue)]
    },
    getPositionName: function (position) {
      if (position === 0) {
        return 'Experience'
      } else if (position === 1) {
        return 'Life Decrement'
      } else if (position === 2) {
        return 'Execution Cost'
      } else if (position === 3) {
        return 'Socket Count'
      } else if (position === 4) {
        return 'Virtual Hash Rate'
      } else if (position === 5) {
        return 'Accuracy'
      } else if (position === 6) {
        return 'Level'
      } else {
        return '[' + position + ']'
      }
    },
    parseExponent: function (op) {
      var s = String(op)
      var multiplier = s.substring(0, 1)
      var exp = s.substring(1, 3)
      return Number(multiplier) * Math.pow(10, Number(exp))
    },
    async loadMithrilBalance () {
      this.mithrilBalance = this.readable(await this.mithrilContract.balanceOf(window.web3.eth.coinbase))
    }
  },
  async mounted () {
    await this.initContracts()
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
  color: #f36236;
  font-weight: bold;
  font-size: 120%;
}

.price-wrap {
  text-align: right;
  padding: 15px;
  background-color: #edffff;
}

.modifier {
  font-style: italic;
  color: #f36236;
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
</style>

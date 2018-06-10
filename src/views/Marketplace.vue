<template>
  <section class="container" id="marketPlace">
    <br>
    <br>
    <h2 class="header-text">Virtual Artifact Market</h2>
    <h5>Purchase ERC721 Virtual Rigs and GPUs with 0xMithril. vRigs and vGPUs can be attached to your mining account to vastly improve mining performance. Virtualizing hash power saves overall mining hardware, maintenance and electricity costs and can additionally be combined with traditional hardware-based mining operations.</h5>
    <br>
    <br>
    <div class="row">
        <div v-for="result in results" class="col-sm-4">
          <div class="card market-card">
            <span class="uid">uid: {{ result.id }} </span>
            <img class="card-img-top" src="static/icons/vgpu.png" alt="Card image cap">
            <div class="card-body">
              <h4 class="card-title">{{ result.name }} </h4>
              <h3 class="card-title"> <span class="price">{{ result.price }}</span> <span class="tengwar">5Ì#</span> </h3>
              <p class="card-text">Remaining cycles: {{ result.life }}</p>
              <p class="card-text modifier" v-for="modifier in result.modifiers" >{{ modifier }}</p>
              
              <b-button class="btn btn-lg btn-outline-info" @click="purchasevGPU(result.id,result.mithrilPrice)">
                Purchase for {{ result.price }} <span class="tengwar">5Ì#</span> 
              </b-button>
              
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import { ADDRESS } from '../../static/scripts/addr.js'
import { MINEABLE_ABI } from '../../static/scripts/mineable_abi.js'
import { CHILD_ARTIFACT_ABI } from '../../static/scripts/child_artifact_abi.js'
import { ARTIFACT_MARKET_ABI } from '../../static/scripts/artifact_market_abi.js'
// import { VIRTUAL_MINING_BOARD_ABI } from '../../static/scripts/virtual_mining_board_abi.js'

export default {
  name: 'Marketplace',
  data () {
    return {
      // addr: this.$route.params.addr,
      token: {},
      results: []
    }
  },
  methods: {
    async purchasevGPU (id, price) {
      console.log('Purchasing vGPU : ' + id)
      var Mithril = window.TruffleContract({abi: MINEABLE_ABI})
      Mithril.setProvider(window.web3.currentProvider)
      let mithril = Mithril.at(ADDRESS.MITHRIL)
      var Market = window.TruffleContract({abi: ARTIFACT_MARKET_ABI})
      Market.setProvider(window.web3.currentProvider)
      let market = await Market.at(ADDRESS.MARKET)
      await mithril.approve(ADDRESS.MARKET, price)
      await market.buy(id, {from: window.web3.eth.coinbase})
    },
    async loadMarkets () {
      var Market = window.TruffleContract({abi: ARTIFACT_MARKET_ABI})
      var ChildArtifact = window.TruffleContract({abi: CHILD_ARTIFACT_ABI})
      Market.setProvider(window.web3.currentProvider)
      ChildArtifact.setProvider(window.web3.currentProvider)
      let market = await Market.at(ADDRESS.MARKET)
      let artifactContract = await ChildArtifact.at(ADDRESS.VGPU)
      let len = await market.size()
      for (var i = 0; i < len; i++) {
        let art = await market.getAt(i)
        console.log('market artifact[0]: ' + art[0])
        console.log('market artifact[1]: ' + art[1])
        let a = await artifactContract.artifactAt(art[0])
        console.log(a)
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
        this.results.push(artifact)
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
        return 'Virtual Hash Power'
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
    }
  },
  mounted () {
    this.loadMarkets()
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
  background-color: #edffff;
  margin-bottom: 2em;
}

.card-img-top {
  max-width: 300px;
}

.uid {
  padding: 1em;
  color: lightgray;
  text-align: right;
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
}

.modifier {
  font-style: italic;
  color: #f36236;
}

</style>

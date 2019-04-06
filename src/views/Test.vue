<template>
  <section id="createToken">
    <div class="container">
      <div class="float-left" style="width: 20em;">
        <h5>[36, 30, 26]</h5>
        <x-vrig-component :rigComponents='[36, 30, 26]'></x-vrig-component>
      </div>

      <div class="float-left" style="width: 20em;">
        <h5>[19, 18, 27]</h5>
        <x-vrig-component :rigComponents='[19, 18, 27]'></x-vrig-component>
      </div>
            
      <div class="float-left" style="width: 20em;">
        <h5>[10, 18, 25]</h5>
        <x-vrig-component :rigComponents='[10, 18, 25]'></x-vrig-component>
      </div>

      <div class="float-left" style="width: 20em;">
        <h5>[1, 18, 37]</h5>
        <x-vrig-component :rigComponents='[1, 18, 37]'></x-vrig-component>
      </div>

      <div class="float-left" style="width: 20em;">
        <h5>[35, 29, 3]</h5>
        <x-vrig-component :rigComponents='[35, 29, 3]'></x-vrig-component>
      </div>

      <div class="float-left" style="width: 20em;">
        <h5>[19, 2, 28]</h5>
        <x-vrig-component :rigComponents='[19, 2, 28]'></x-vrig-component>
      </div>

    </div>
  </section>
</template>

<script>
import util from '../common/util.js'
import parts from '../../static/scripts/parts.js'
import xCheckMetamask from '@/components/CheckMetamask'
import xVrigComponent from '@/components/VrigComponent'

export default {
  name: 'CreateToken',
  components: {
    xCheckMetamask,
    xVrigComponent
  },
  data () {
    return {
      form: {},
      wallet: undefined,
      txId: 'Processing...',
      vrigId: 1,
      vrigs: [],
      vgpus: [],
      txUrl: 'https://rinkeby.etherscan.io/tx/'
    }
  },
  methods: {
    async populateRigs (target, contract) {
      let balance = await contract.balanceOf(window.web3.eth.coinbase)
      for (var i = 0; i < balance; i++) {
        let artifactId = await contract.tokenOfOwnerByIndex(window.web3.eth.coinbase, i)
        let artifact = {}
        let stats = await this.vrigContract.mergedStats(artifactId)
        artifact.id = artifactId
        artifact.name = stats[0]
        let basicStats = stats[1]
        artifact.experience = basicStats[0].toNumber()
        artifact.lifeDecrement = basicStats[1].toNumber()
        artifact.executionCost = basicStats[2].toNumber()
        artifact.sockets = basicStats[3].toNumber()
        artifact.vhash = util.toReadableHashrate(basicStats[4].toNumber())
        artifact.accuracy = basicStats[5].toNumber()
        artifact.level = basicStats[6].toNumber()
        artifact.childArtifacts = stats[2]

        // load metadata
        artifact.tokenURI = await contract.tokenURI(artifact.id)
        let tok = await fetch(artifact.tokenURI)
        if (tok) {
          artifact.metadata = await tok.json()
          artifact.metadata.image = util.findPartImage(parts, artifact.metadata.component[0])
        }
        target.push(artifact)
      }
    },
    async populateGPUs (target, contract) {
      let balance = await contract.balanceOf(window.web3.eth.coinbase)
      for (var i = 0; i < balance; i++) {
        let artifactId = await contract.tokenOfOwnerByIndex(window.web3.eth.coinbase, i)
        let artifact = {}
        artifact.id = artifactId
        artifact.artifactId = artifactId
        let a = await contract.artifactAt(artifactId)
        artifact.name = a[0]
        artifact.life = parseInt(a[2])
        // modifiers
        let mods = a[3]
        artifact.modifiers = []
        for (var j = 0; j < mods.length; j++) {
          artifact.modifiers.push(util.parseModifier(mods[j]))
        }
        // load metadata
        artifact.tokenURI = await contract.tokenURI(artifact.artifactId)
        let tok = await fetch(artifact.tokenURI)
        if (tok) {
          artifact.metadata = await tok.json()
          artifact.metadata.image = util.findPartImage(parts, artifact.metadata.component)
        }
        target.push(artifact)
      }
    }
  },
  async mounted () {
    await this.populateRigs(this.vrigs, this.vrigContract)
    await this.populateGPUs(this.vgpus, this.vgpuContract)
  }
}
</script>

<style>
.container {
  padding-top: 20px;
}

.no-bullets {
  list-style-type: none;
}
</style>

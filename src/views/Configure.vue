<template>
  <section id="createToken">
    <div class="container">
      <x-check-metamask></x-check-metamask>
      <h3 class="header-text">My Rigs</h3>
      <ul class="no-bullets">
        <li v-for="element in vrigs">
          <div class="row">
            <div class="col-lg-1" ></div>
            <div class="col-lg-5" >
              
              <h4>{{ element.name }}
                <small>
                <router-link class="btn btn-link" tag="button" :to="{ name: 'vrig', params: { id: element.id }}"> configure </router-link> 
                </small>
              </h4>
              <div class="float-left" style="width: 80%;">
                <x-vrig-full-component :rigId='element.id'></x-vrig-full-component>
              </div>
            </div>
            <div class="col-lg-5">
              <h4>Statistics</h4>
              <table class="table token-table">
                <tr>
                  <td>Total Hash Rate</td>
                  <td><b>{{ element.vhash }}</b></td>
                </tr>
                <tr>
                  <td>Experience</td>
                  <td><b>{{ element.experience }}</b></td>
                </tr>
                <tr>
                  <td>Life Decrement</td>
                  <td><b>{{ element.lifeDecrement }}</b></td>
                </tr>
                <tr>
                  <td>Execution Cost (in 0xMithril)</td>
                  <td><b>{{ element.executionCost }}</b></td>
                </tr>
                <tr>
                  <td>Socket Slots</td>
                  <td><b>{{ element.sockets }}</b></td>
                </tr>
                <tr>
                  <td>Accuracy</td>
                  <td><b>{{ element.accuracy }}%</b></td>
                </tr>
                <tr>
                  <td>Level</td>
                  <td><b>{{ element.level }}</b></td>
                </tr>
              </table>
            </div>
            <div class="col-lg-1" ></div>
          </div>

          <br><br>
        </li>
      </ul>
      <br>

      <h3 class="header-text">My GPUs</h3>
      <br>
      <div class="row available">
          <div class="floatleft socket-artifact" v-for="element in vgpus">
            <b-popover :target="'artifact'+element.artifactId" placement="top" triggers="hover focus">
               <template slot="title">{{ element.name }}</template>
                <li>Life: {{ element.life }}</li>
                <li class="modifier" v-for="modifier in element.modifiers">
                  {{modifier}}
                </li>
            </b-popover>                  
            <img v-if="element.metadata" :id="'artifact'+element.artifactId" :src="element.metadata.image" width="100" height="100"> 
          </div>
      </div>

      <!--
      <ul class="no-bullets">
        <li v-for="element in vgpus">
          <router-link class="btn btn-link btn-lg" tag="button" :to="{ name: 'vgpu', params: { id: element.id }}" > 
            {{ element.name }}
          </router-link>
        </li>
      </ul>
      -->

    </div>
  </section>
</template>

<script>
import util from '../common/util.js'
import parts from '../../static/scripts/parts.js'
import xCheckMetamask from '@/components/CheckMetamask'
import xVrigFullComponent from '@/components/VrigFullComponent'

export default {
  name: 'CreateToken',
  components: {
    xCheckMetamask,
    xVrigFullComponent
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
          if (artifact.metadata.component) {
            artifact.metadata.image = util.findPartImage(parts, artifact.metadata.component[0])
          } else {
            artifact.metadata.image = ''
          }
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

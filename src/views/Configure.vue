<template>
  <section id="createToken">
    <div class="container">
      <x-check-metamask></x-check-metamask>
      <h3 class="header-text">My Rigs</h3>
      <ul class="no-bullets">
        <li v-for="element in vrigIds">
          
          <div style="width: 20em; height: 20em;">
            <x-vrig-full-component :rigId='11'></x-vrig-full-component>
            <h5>{{ element.name }}
              <small>
              <router-link class="btn btn-link" tag="button" :to="{ name: 'vrig', params: { id: element.id }}"> configure </router-link> 
              </small>
            </h5>
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
      vrigIds: [],
      vgpus: [],
      txUrl: 'https://rinkeby.etherscan.io/tx/'
    }
  },
  methods: {
    async populateERC721 (target, contract) {
      let balance = await contract.balanceOf(window.web3.eth.coinbase)
      for (var i = 0; i < balance; i++) {
        let artifactId = await contract.tokenOfOwnerByIndex(window.web3.eth.coinbase, i)
        let artifact = {}
        artifact.id = artifactId
        artifact.name = await contract.name(artifactId)

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
    await this.populateERC721(this.vrigIds, this.vrigContract)
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

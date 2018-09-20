<template>
  <section id="createToken">
    <div class="container">
      <x-check-metamask></x-check-metamask>
      <h3 class="header-text">My Virtual Rigs</h3>
      <ul class="no-bullets">
        <li v-for="element in vrigIds">
          <router-link class="btn btn-link btn-lg" tag="button" :to="{ name: 'vrig', params: { id: element.id }}" > {{ element.name }} </router-link>
        </li>
      </ul>
      <br>
      <h3 class="header-text">My Virtual GPUs</h3>
      <ul class="no-bullets">
        <li v-for="element in vgpuIds">
          {{ element.name }}
        </li>
      </ul>

    </div>
  </section>
</template>

<script>
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
      vrigId: 1,
      vrigIds: [],
      vgpuIds: [],
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
        target.push(artifact)
      }
    }
  },
  async mounted () {
    await this.populateERC721(this.vrigIds, this.vrigContract)
    await this.populateERC721(this.vgpuIds, this.vgpuContract)
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

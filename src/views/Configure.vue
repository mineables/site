<template>
  <section id="createToken">
    <div class="container">
      <h2 class="header-text">My Virtual Rigs</h2>
      <ul class="no-bullets">
        <li v-for="element in vrigIds">
          <router-link class="btn btn-link btn-lg" tag="button" :to="{ name: 'vrig', params: { id: element.id }}" > {{ element.name }} </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { ADDRESS } from '../../static/scripts/addr.js'
import { VIRTUAL_MINING_BOARD_ABI } from '../../static/scripts/virtual_mining_board_abi.js'

export default {
  name: 'CreateToken',
  data () {
    return {
      form: {},
      wallet: undefined,
      txId: 'Processing...',
      vrigId: 1,
      vrigIds: [],
      txUrl: 'https://rinkeby.etherscan.io/tx/'
    }
  },
  methods: {
    async initContracts () {
      var VirtualMiningBoard = window.TruffleContract({abi: VIRTUAL_MINING_BOARD_ABI})
      VirtualMiningBoard.setProvider(window.web3.currentProvider)
      this.vrigContract = await VirtualMiningBoard.at(ADDRESS.VRIG)
      let balance = await this.vrigContract.balanceOf(window.web3.eth.coinbase)
      for (var i = 0; i < balance; i++) {
        let artifactId = await this.vrigContract.tokenOfOwnerByIndex(window.web3.eth.coinbase, i)
        let stats = await this.vrigContract.mergedStats(artifactId)
        let artifact = {}
        artifact.id = artifactId
        artifact.name = stats[0]
        this.vrigIds.push(artifact)
      }
    }
  },
  async mounted () {
    await this.initContracts()
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

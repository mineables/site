<template>
  <section id="createToken">
    <div class="container">
      <img class="token-icon" :src="token.metadata.image"/>
      
      <div class="row d-flex">
        <div class="col-lg-10">
          <h2>{{ token.name }} </h2>
          <h3 class="address"><small>{{ token.addr }}</small></h3>    
          <p>{{token.metadata.description}}</p>
          <p>Homepage: <a :href="token.metadata.website" target="_blank">{{token.metadata.website}}</a></p>
          <table class="table token-table">
            <tr>
              <td><b>Symbol</b></td>
              <td>{{ token.symbol }}</td>
            </tr>
            <tr>
              <td><b>Decimal</b></td>
              <td>{{ token.decimal }}</td>
            </tr>
            <tr>
              <td><b>Supply</b></td>
              <td>{{ token.supply }}</td>
            </tr>
            <tr>
              <td><b>Remaining</b></td>
              <td>{{ token.remainingSupply }}</td>
            </tr>
            <tr>
              <td><b>Minted</b></td>
              <td>{{ token.tokensMinted }}</td>
            </tr>
            <tr>
              <td><b>Difficulty</b></td>
              <td>{{ token.diff }}</td>
            </tr>
            <tr>
              <td><b>Hash Algorithm</b></td>
              <td>{{ token.metadata.type }}</td>
            </tr>
          </table>

        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Token',
  data () {
    return {
      addr: this.$route.params.addr,
      token: {}
    }
  },
  methods: {
    async loadToken (addr) {
      let mineable = await this.MineableContract.at(addr)
      let name = await mineable.name()
      let symbol = await mineable.symbol()
      let supply = await mineable.totalSupply()
      let decimal = await mineable.decimals()
      let diff = await mineable.getMiningDifficulty()
      let installedBoosterId = await mineable.getInstalledBooster()
      let tokensMinted = await mineable.tokensMinted()
      // metadata
      let metadataURI = await mineable.metadataURI()
      console.log(metadataURI)
      let response = await this.$http.get(metadataURI)
      console.log(response.body)
      let metadata = response.body
      this.token = {
        addr,
        name,
        symbol,
        decimal: decimal.toNumber(),
        installedBoosterId,
        supply: supply / (10 ** decimal),
        remainingSupply: supply / (10 ** decimal) - tokensMinted / (10 ** decimal),
        diff: diff.toNumber(),
        tokensMinted: tokensMinted / (10 ** decimal),
        metadata: metadata
      }
    }
  },
  async mounted () {
    await this.loadToken(this.addr)
  }
}
</script>

<style>

.token-table{
  max-width: 25em;
}
.address{
  margin-top: -16px;
}

.token-icon {
  position: relative;
  top: -30px;
  border-radius: 50%;
  width: 7em;
  height: 7em;
  float: left;
  margin: 1em;
  padding: 1em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>

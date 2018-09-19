<template>
  <section id="createToken">
    <div class="container">
      <div class="row d-flex">
        <div class="col-lg-10">
          <h2>{{ token.name }} </h2>
          <h3><small>{{ token.addr }}</small></h3>
          <span>Symbol: {{ token.symbol }}</span><br/>
          <span>Decimal: {{ token.decimal }}</span><br/>
          <span>Supply: {{ token.supply }}</span><br/>
          <span>Remaining Supply: {{ token.remainingSupply }}</span><br/>
          <span>Minted: {{ token.tokensMinted }}</span><br/>
          <span>Difficulty: {{ token.diff }}</span>
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
      this.token = {
        addr,
        name,
        symbol,
        decimal: decimal.toNumber(),
        installedBoosterId,
        supply: supply / (10 ** decimal),
        remainingSupply: supply / (10 ** decimal) - tokensMinted / (10 ** decimal),
        diff: diff.toNumber(),
        tokensMinted: tokensMinted / (10 ** decimal)
      }
    }
  },
  async mounted () {
    this.loadToken(this.addr)
  }
}
</script>

<style>

</style>

<template>
    <header id="header">
    
        <b-navbar toggleable="md" type="dark" variant="dark">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-navbar-brand href="#">
              <img src="/static/icons/mithril-icon.png" class="d-inline-block" alt="Mineables">
              Mineables
          </b-navbar-brand>

          <h5><b-badge variant="light">{{network}}</b-badge></h5>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav class="ml-auto">
              <b-nav-item right href="#"><router-link class="nav-link" :to="{ name:'home' }" exact>Home</router-link></b-nav-item>
              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'create' }">Create</router-link></b-nav-item>
              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'tokens' }">Tokens</router-link></b-nav-item>
              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'market' }">Market</router-link></b-nav-item>
              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'configure' }">Configure</router-link></b-nav-item>
              <b-nav-item class="nav-link miner" target="_blank" href="https://github.com/0xMithril/COSMiC-v3-0xMTH/releases/tag/v1.0">
                  Miner
              </b-nav-item>

              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'vrig', params: { id: 1 } }">
                TEST
              </router-link></b-nav-item>

             
            </b-navbar-nav>

          </b-collapse>
           

        </b-navbar>

    </header> 
</template>

<script>

export default {
  name: 'xHeader',
  data () {
    return {
      bigLogo: true,
      network: ''
    }
  },
  mounted () {
    window.web3.version.getNetwork((err, netId) => {
      if (err) {
        console.log(err)
      }
      console.log('netId: ', netId)
      window.netId = parseInt(netId)
      switch (netId) {
        case '1':
          this.network = 'Mainnet'
          break
        case '2':
          this.network = 'Morden'
          break
        case '3':
          this.network = 'Ropsten'
          break
        case '4':
          this.network = 'Rinkeby'
          break
        case '42':
          this.network = 'Kovan'
          break
        case '77':
          this.network = 'Sokol'
          break
        case '99':
          this.network = 'POA Mainnet'
          break
        case '918':
          this.network = '0xBitchain'
          break
        case '100':
          this.network = 'xDai Chain'
          break
        default:
          this.network = 'Unknown'
      }
    })
  }
}

</script>

<style>

.miner {
  color: rgb(60, 181, 166);
}

.logo {
    position: absolute;
    width: 70px;
    left: 35px;
    top: -1px;
    z-index: 999;
}
.navbar-brand {
    margin-left: 90px;
}

nav.navbar {
    padding-top: 15px;
    padding-bottom: 15px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background: #fff;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
}

.nav-link {
    color: #B5B1AE;
    font-weight: 300;
    font-size: 15px;
    text-transform: uppercase;
}

.nav-link:hover,
.router-link-active,
.router-link-exact-active {
    color: #3DD7B3;
    cursor: pointer;
}

.navbar-brand {
  color: #37427A;
  font-family: "Trebuchet MS";
  letter-spacing: 0.15em;
  font-size: 1.3em;
  line-height: 2;
  font-weight: 500;
  text-rendering: optimizeLegibility;
  text-align: center;
}

</style>
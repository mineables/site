<template>
    <header id="header">

    <!--
        <nav class="navbar navbar-expand-lg fixed-top">
            <img class="logo" src="static/icons/mithril-proto.png" /><span class="navbar-brand">Mineables</span>
            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right"><span></span><span></span><span></span></button>
            <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto align-items-start align-items-lg-center">
                    <li class="nav-item"><router-link class="nav-link" :to="{ name:'home' }" exact>Home</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name:'create' }">Token</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name:'quarry' }">Quarry</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name:'market' }">Market</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name:'configure' }">Configure</router-link></li>          
                </ul>
            </div>
        </nav>

      -->

        <b-navbar toggleable="md" type="dark" variant="dark">

          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <b-navbar-brand href="#">
              <img src="static/icons/mithril-icon.png" class="d-inline-block" alt="BV">
              Mineables
            </b-navbar-brand>

          <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav class="ml-auto">
              <b-nav-item right href="#"><router-link class="nav-link" :to="{ name:'home' }" exact>Home</router-link></b-nav-item>
              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'create' }">Token</router-link></b-nav-item>
              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'quarry' }">Quarry</router-link></b-nav-item>
              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'market' }">Market</router-link></b-nav-item>
              <b-nav-item href="#"><router-link class="nav-link" :to="{ name:'configure' }">Configure</router-link></b-nav-item>
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
      bigLogo: true
    }
  }
}

</script>

<style>

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
  font-family: "Arial";
  letter-spacing: 0.15em;
  font-size: 1.3em;
  line-height: 2;
  font-weight: 500;
  text-rendering: optimizeLegibility;
  text-align: center;
}

</style>
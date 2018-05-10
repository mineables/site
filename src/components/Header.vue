<template>
    <header id="header">
        <nav class="navbar navbar-expand-lg fixed-top"><img class="logo" src="static/icons/mithril-small.png" /><!--<a class="navbar-brand">0xMithril</a>-->
            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right"><span></span><span></span><span></span></button>
            <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto align-items-start align-items-lg-center">
                    <li class="nav-item"><router-link class="nav-link" :to="{ name:'home' }" exact>Home</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name:'create' }">Token</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" :to="{ name:'quarry' }">Quarry</router-link></li>
                    <li class="nav-item"><a href="#about-us" class="nav-link">Market</a></li>
                </ul>
            </div>
        </nav>
    </header> 
</template>
<script>

import $ from 'jquery'

export default {
  name: 'xHeader',
  data () {
    return {
      bigLogo: true
    }
  },
  methods: {
    handleScroll: function (event) {
      let offset = window.pageYOffset
      if (offset > 10 && this.bigLogo) {
        this.bigLogo = false
        $('.logo').animate({
          width: 65,
          height: 65,
          top: 0,
          left: 55
        }, 300)
      } else if (offset < 10 && !this.bigLogo) {
        this.bigLogo = true
        $('.logo').animate({
          width: 128,
          height: 128,
          top: -1,
          left: 35
        }, 300)
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}

</script>

<style>

.logo {
    position: absolute;
    left: 35px;
    top: -1px;
    z-index: 999;
}
.navbar-brand {
    margin-left: 140px;
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
    color: #78cbe0;
    cursor: pointer;
}


</style>
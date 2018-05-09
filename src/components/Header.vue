<template>
    <header id="header" class="mdl-layout__header">
        <router-link class="links" :to="{ name: 'home'}"><img class="logo" src="static/icons/mithril-small.png" /></router-link>
        <div class="mdl-layout__header-row">
            <div class="mdl-layout-spacer"></div>
            <div class="mdl-cell mdl-cell--9-col">
                <ul>
                    <li><router-link id="add" class="links" :to="{ name: 'create'}"><i class="fas fa-plus-square material-icons"></i></router-link></li>
                    <li><a href="https://twitter.com/0xMithril" target="_blank"><i class="fab fa-twitter-square material-icons"></i></a></li>
                    <!-- <li><a href="" target="_blank"><i class="fab fa-reddit-square material-icons"></i></a></li> -->
                    <li><a href="https://discord.gg/NNxKz6" target="_blank"><i class="fab fa-discord material-icons"></i></a></li>
                </ul>
                <div class="mdl-tooltip" data-mdl-for="add">Create Token</div>
                <div class="mdl-layout-spacer"></div>
            </div>
            <div class="mdl-layout-spacer"></div>
        </div>
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
      if (event.target.scrollTop > 40 && this.bigLogo) {
        this.bigLogo = false
        $('img').animate({
          width: 65,
          height: 65,
          top: 0,
          right: '18%'
        }, 300)
      } else if (event.target.scrollTop < 40 && !this.bigLogo) {
        this.bigLogo = true
        $('img').animate({
          width: 128,
          height: 128,
          top: -1,
          right: '15%'
        }, 300)
      }
    }
  },
  mounted () {
    document.getElementById('content').addEventListener('scroll', this.handleScroll)
  },
  destroyed: function () {
    document.getElementById('content').removeEventListener('scroll', this.handleScroll)
  }
}

</script>

<style>
i {
    color: white;
}
.mdl-layout__header {
    min-height: 56px;
}
.logo {
    position: absolute;
    right: 15%;
    top: -1px;
    z-index: 999;
}
.material-icons {
    margin: 10px;
    font-size: 40px;
}
.fa-discord {
    padding-top: 2px;
}
header ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
header li {
    float: left;
    position: relative;
}
i:hover {
    color: rgb(24,255,255);
}

</style>
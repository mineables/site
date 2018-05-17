<template>
<div>
  <section id="home">
    <div class="container">
      <div class="row d-flex">
        <div class="col-lg-8 text order-2 order-lg-1">
          <h1 class="home-title">Mineable ERC20 Tokens</h1>
          <p class="home-text ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div class="col-lg-4 order-1 order-lg-2 uk-scrollspy-inview">
          <img src="static/icons/text-mining-icon-2793702_640.png" width="200" alt="..." class="img-fluid-home">
          <!-- <img class="logo" src="static/icons/mithril-small.png" /> -->
        </div>
      </div>
    </div>
  </section>
  
  <section id="services" class="services">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-8 text-center">
                <h2 class="header-text">How it works</h2>
                <div class="services-mockup">
                    <div id="nav-tabContent" class="tab-content">
                        <div id="nav-first" role="tabpanel" aria-labelledby="nav-first-tab" class="tab-pane fade show active"><!--<img src="../../../assets/services/3.png" alt="..." class="img-fluid">--></div>
                        <div id="nav-second" role="tabpanel" aria-labelledby="nav-second-tab" class="tab-pane fade"><!--<img src="../../../assets/services/2.png" alt="..." class="img-fluid">--></div>
                        <div id="nav-third" role="tabpanel" aria-labelledby="nav-third-tab" class="tab-pane fade"><!--<img src="../../../assets/services/1.png" alt="..." class="img-fluid">--></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-deck">
          <div class="card">
            <div class="card-img-top"><a href="https://github.com/0xMithril/COSMiC-v3-0xMTH" target="_blank"><img width="125" src="static/icons/downloads-icon.png" alt="Card image cap"/></a></div>
            <div class="card-body">
              <h5 class="card-title">Download Client</h5>
              <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
          </div>
          <div class="card">
            <div class="card-img-top"><router-link class="nav-link" :to="{ name:'create' }"><img width="125" src="static/icons/mithril-large-white.png" alt="Card image cap"/></router-link></div>
            <div class="card-body">
              <h5 class="card-title">Create Tokens</h5>
              <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
          </div>
          <div class="card">
            <div class="card-img-top"><router-link class="nav-link" :to="{ name:'quarry' }"><img width="125" src="static/icons/storyblocks-pickaxe-icon-on-white-background_HrZu9565Z_SB_PM.jpg" alt="Card image cap"/></router-link></div>
            <div class="card-body">
              <h5 class="card-title">Mine Tokens</h5>
              <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
          </div>
        </div>
      </div>
  </section>

  <section id="contact" class="contact bg-gray">
    <div class="container">
       <header class="text-center no-margin-bottom">
          <h2 class="header-text">Get in touch!</h2>
        </header>
        <div class="row">
          <div class="col-sm-6 social">
            <a href="https://twitter.com/0xMithril" target="_blank"><img src="static/icons/twitter.png" class="img-responsive" alt=""></a>
          </div>
          <div class="col-sm-6 social">
            <a href="https://discord.gg/NNxKz6" target="_blank"><img src="static/icons/discord.png" class="img-responsive" alt=""></a>
          </div>
        </div>
    </div>
</section>
</div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style>
#home {
  color: #fff;
  background-color: #5989e5;
  background-image: -webkit-gradient(linear, left top, right top, from(#5989e5), to(#37cfdc));
  background-image: linear-gradient(to right, #5989e5, #37cfdc);
}
.home-title {
    font-family: Raleway;
    font-size: 2.9rem;
    font-weight: 400;
    color: #fff;
    line-height: 1.1;
}
section.home p {
    margin: 20px 0;
}
.home-text {
    font-size: 1.1rem;
    font-weight: 400;
    color: #fff;
}
.header-text {
    font-family: Raleway;
    font-weight: 300;
    text-transform: capitalize;
    font-size: 35px;
    color: #B5B1AE;
    letter-spacing: 2px;
    margin-bottom: 30px;
    margin-left: 5px;
}
p {
    line-height: 1.7rem;
}
.bg-primary {
  background-color: #5989e5 !important;
}
.bg-primary {
  background-color: #007bff!important;
}
section {
  padding: 50px 0;
  overflow: hidden;
}
article, aside, details, figcaption, figure, footer, header, main, nav, section, summary {
  display: block;
}
.card-img-top img {
  margin-left: 30%;
}
.social img {
    margin: auto;    
    display: block;
}

a img:hover {
  transform: scale(1.05); 
}
</style>

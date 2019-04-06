<template>
<div>
  <section id="home">
    <div class="container">
      <div class="row d-flex">
        <div class="col-lg-8 text order-2 order-lg-1">
          <h1 class="home-title">Welcome to the Mineables Network</h1>
          <p class="home-text ">
            Create your own ERC20, <a href="https://eips.ethereum.org/EIPS/eip-918" target="_blank">ERC918</a>-compliant Mineable Token with variable parameters such as name, token supply, and various mining options, without ever having to write a line of code. Buy, trade and configure Synthetic Rigs and GPUs to increase mining performance with any token on the Mineables network.
          </p>
        </div>
        <div class="col-lg-4 order-1 order-lg-2 uk-scrollspy-inview icon">
          <img src="static/icons/mining-contract.png" width="200" alt="...">
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
            <div class="card-img-top"><a href="https://github.com/0xMithril/COSMiC-v3-0xMTH/releases/tag/v1.1" target="_blank"><img width="125" src="static/icons/payment-method.png" alt="Card image cap"/></a></div>
            <div class="card-body">
              <h5 class="card-title">Download Miner</h5>
              <p class="card-text"><a href="https://github.com/0xMithril/COSMiC-v3-0xMTH" target="_blank">Download</a> the Mineables Mining client to mine 0xMithril and other tokens in the network. Based on the open source COSMiC community-developed miner, the mining client includes features to list and configure mineable token targets, applicable mining pools, virtual artifact( vRig and vGPU ) configuration, and general wallet management </p>
            </div>
          </div>
          <div class="card">
            <div class="card-img-top"><router-link class="nav-link" :to="{ name:'create' }"><img width="125" src="static/icons/bitcoin.png" alt="Card image cap"/></router-link></div>
            <div class="card-body">
              <h5 class="card-title">Create and Discover</h5>
              <p class="card-text"><router-link :to="{ name:'create' }">Create</router-link> a Mineable 0xToken with the click of a button on the Mineable create token page. You can create your own custom mineable token without ever having to write a line of solidity code. As part of the Mineables network, your token will automatically reward miners 0xMithril anti-gas rebates along with every token issuance. Join the exciting new world of mineable tokens now!</p>
              <p class="card-text">Determine what 0xTokens on the Mineables Network that you want to mine with a comprehensive <router-link :to="{ name:'tokens' }"> Quarry listing</router-link>.</p>

            </div>
          </div>
          <div class="card">
            <div class="card-img-top"><router-link class="nav-link" :to="{ name:'market' }"><img width="125" src="static/icons/proof-of-work.png" alt="Card image cap"/></router-link></div>
            <div class="card-body">
              <h5 class="card-title">Market</h5>
              <p class="card-text"><router-link :to="{ name:'market' }">Buy</router-link>, sell, trade and <router-link :to="{ name:'configure' }">configure</router-link> Synthetic Rigs and GPUs in the marketplace. These virtual components exist on the Ethereum blockchain and each have their own attributes that effect mining statistics such as difficulty and reward efficiency among others. </p>
            </div>
          </div>
        </div>
      </div>
  </section>

  <section id="contact" class="contact bg-gray">

    <div class="container">
      <header class="text-center no-margin-bottom">
          <h2 class="header-text">0xMithril Token</h2>
      </header>
      <div class="row">
        <p>The Mineables Network runs on 0xMithril. Fully compliant with the Ethereum Mineable Token Specification <a href="https://eips.ethereum.org/EIPS/eip-918" target="_blank">ERC918</a>, 0xMithril is rewarded back as 'anti-gas' rebate with every mint operation within the network. This means that when you mine any token on the network, you receive a rebate in 0xMithril to offset the Ethereum transaction gas cost. Of course, 0xMithril can also be mined with <a href="https://eips.ethereum.org/EIPS/eip-918" target="_blank">ERC918</a>-compliant mining software, providing miners an option to more aggressively accumulate it with Hash power.</p>
      </div>
    </div>
    <br><br>
    <div class="container">
       <header class="text-center no-margin-bottom">
          <h2 class="header-text">Introducing Synthetic Hash Power</h2>
        </header>
         <div class="row">
            <p class="card-text">The Mineables Network team has been working hard developing a true hashpower virtualization layer that exists on the Ethereum blockchain. Realized with <a href="https://eips.ethereum.org/EIPS/eip-721" target="_blank">ERC721</a> compliant Synthetic Rigs and Virtual GPUs, miners can purchase and deploy a full or hybrid virtual mining operation saving substantial time and money over traditional mining operations.</p>
            <h6>How it works</h6>
            <p class="card-text">If you, as a miner, want to increase your hash power, currently you have to invest capital in specialized hardware, electricity and additional maintenance that comes alone with keeping it all together. The Mineables Network offers an alternative to acquiring physical components to increase hashing power, with the introduction of Virtual Rigs (vRigs) that can be slotted with multiple Virtual GPUs (vGPUs). These virtual components exist on the Ethereum blockchain and each have their own attributes that effect mining statistics like difficulty and reward efficiency among others.</p>
            <img src="/static/icons/overview.png" alt="Overview" />
            <p class="card-text">
            Instead of investing several hundreds or thousands of dollars on physical GPUs, a miner can now purchase virtual Rigs and GPUs at a fraction of the price, with 0xMithril or 0xBitcoin. The Virtual components are then configured and attached by a miner to a Mineable Network Token thereby decreasing the overall difficulty via the virtualized hash device.
            Miners can mix and match virtual GPU configurations on their Virtual Rigs to maximize mining performance and tailor make rigs for specific categories of tokens. Additionally, virtual and physical topologies are supported, so miners can leverage existing GPU hardware alongside their virtual counterparts. In other words, vRigs and vGPUs can be combined with physical GPUs to produce hybrid mining topologies, addressing mining target scenarios in the most flexible way possible.</p>
           
        </div>
        <div class="row">
          <div class="col-sm-3">
            <img src="static/icons/vgpu.png" class="img-responsive" alt="" width="170">
          </div>
          <div class="col-sm-8" style="margin-top:35px;">
            <h4>vGPUs</h4>
            <p class="card-text"> A vGPU or Virtual GPU, is a <a href="https://eips.ethereum.org/EIPS/eip-721" target="_blank">ERC721</a> compliant virtual artifact that can be acquired on the Ethereum network via peer to peer trade or purchase through an integrated marketplace. The vGPU has a list of modifiers that update the base rig's statistics, making mining more profitable and fun. A vGPU must be attached to a vRig in order to work.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-9" style="margin-top:35px;">
            <h4>vRIGs</h4>
            <p class="card-text"> A vRig or Virtual Rig is an <a href="https://eips.ethereum.org/EIPS/eip-721" target="_blank">ERC721</a> compliant artifact that is primarily responsible for housing child virtual artifacts such as vGPUs. vRigs come with a finite number of slots, and facilitate mixing and matching child components to produce millions of possible virtual hashing combinations. </p>
          </div>
          <div class="col-sm-3">
            <img src="static/icons/vrig.png" class="img-responsive" alt="" width="200">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
          <h4>Rig Configuration</h4>
            Mix and match your synthetic components, in the same way you would thier real-life counterparts to maximize hashpower on the Minables network.
            <img class="center" src="/static/icons/rig-config.png" alt="Overview" />
          </div>
        </div>
    </div>
    <br><br>

    <div class="container">
      <header class="text-center no-margin-bottom">
          <h2 class="header-text">Frequently Asked Questions</h2>
      </header>

      <h4>What is 0xMithril "anti-gas"?</h4>
      <p>"Anti-gas" is a 0xMithril rebate made to miners to account for for the cost of gas used during the token minting transaction.</p>

      <h4>What is Virtualized/Sythetic Hashing?</h4>
      Virtualized hashing is a way to boost your mining operation with the use of ERC721 block chain components called Virtual Rigs and Virtual GPUs. Once these components are installed onto a wallet account and target token, they have the capability to adjust mining difficulty, rewards and other key mining statistics.</p>

      <h4>What is a Virtual Rig and Virtual GPU?</h4>
      A Virtual Rig is a vHashing base unit. It contains a finite number of slots that can hold Virtual GPUs. Virtual Rigs and GPUs can be configured and optimized through the command line miner or in the configure section of this site. (Metamask required)</p>

      <h4>Can I use vHashing alongside traditional GPU mining?</h4>
      Yes, absolutely. Virtual Rigs and GPUs can be used in conjunction with traditional GPU hardware to provide an effective hybrid mining operation.</p>

      <h4>If I use only Virtualized Hashing, do I have to mine? Is this the same as "lazy mining"?</h4>
      Yes and no. Virtualized hashing simply adjusts a token's mining statistics - however you still have to use hardware (CPU or GPU) to mine the tokens. For example, if you have configured a Virtual Rig that reduces the mining difficulty of a target 0xToken from 500000000 to 1, you still have to physically mine that token with mining software. It is important to note that virtual mining artifacts supplement a mining operation - they never completely replace Proof of Work.</p>

      <h4>Where can I get vRigs, vGPUs and other virtual mining artifacts?</h4>
      vRigs and vGPUs are available for purchase in the Market. Since they are ERC721 compliant tokens, vRigs and vGPUs can also be traded between accounts directly if desired.</p>

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
            <a href="https://discord.gg/yckdJdw" target="_blank"><img src="static/icons/discord.png" class="img-responsive" alt=""></a>
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
  background-color: #37427A;
  background-image: -webkit-gradient(linear, left top, right top, from(#37427A), to(#3DD7B3));
  background-image: linear-gradient(to right, #37427A, #3DD7B3);
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

.icon {
  display: block;
  margin: 0 auto;
}

.faq{
  width: 100%;  
}

.card-header > a {
  text-align: left;
}

.home-text > a {
  color: white;
  text-decoration: underline;
}

/* override navbar */
.navbar-brand {
    color: #3b9198;
    font-family: "Futura";
    font-size: 2em;
    font-weight: 500;
    text-rendering: optimizeLegibility;
    text-align: center;
    padding: 0px;
    letter-spacing: 0;
    line-height: 0;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>

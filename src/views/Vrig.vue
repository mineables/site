<template>
  <section id="createToken">
   
   <div class="container" id="main">

   <x-check-metamask></x-check-metamask>

    <h2 class="header-text">Virtual Rig Configuration
    </h2>
    <b-button v-b-toggle.collapse-1 variant="primary btn-link">Instructions</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-alert show variant="info">
            <h4 class="alert-heading">Configuration Instructions</h4>
            <p>
              Drag Virtual GPUs and other components from 'Available Components' up into 'Installed Components' to configure 
              the Virtual Rig.
              The statistics of the vRig will automatically update as vGPU components are 
              attached and detached, so you test multiple configurations before attaching rigs to Mineable Tokens.
            </p>
            <hr>
            <p class="mb-0">
              When complete press the <b>Commit Confuguration</b> button to save your vRig configuration.
            </p>
          </b-alert>
        </b-collapse>
      
      <h4>{{ vrig.name }}</h4>

      <div class="row d-flex">
        <div class="col-lg-6">

         <x-vrig-component :key="vrigKey" :rigComponents='rigComponents'></x-vrig-component>
         <!--
          <img class='vrigImage' :src='vrig.metadata.image'/>
         -->
        </div>

        <div class="col-lg-6">
          <h4>Statistics</h4>
          <table class="table token-table">
            <tr>
              <td>Experience</td>
              <td><b>{{ vrig.experience }}</b></td>
            </tr>
            <tr>
              <td>Life Decrement</td>
              <td><b>{{ vrig.lifeDecrement }}</b></td>
            </tr>
            <tr>
              <td>Execution Cost (in 0xMithril)</td>
              <td><b>{{ vrig.executionCost }}</b></td>
            </tr>
            <tr>
              <td>Total Socket Slots</td>
              <td><b>{{ vrig.sockets }}</b></td>
            </tr>
            <tr>
              <td>vHash Rate (in MH/s)</td>
              <td><b>{{ vrig.vhash }}</b></td>
            </tr>
            <tr>
              <td>Accuracy</td>
              <td><b>{{ vrig.accuracy }}%</b></td>
            </tr>
            <tr>
              <td>Level</td>
              <td><b>{{ vrig.level }}</b></td>
            </tr>
          </table>
          
          <b-button class="btn btn-lg btn-success" :disabled="buttonDisabled" data-toggle="modal" data-target="#myModal" @click="saveConfig()">
            Commit Configuration
          </b-button>

        </div>

        

      </div>

      <br>
        
        <div class="drag">
            <h4>Installed Components <small>Note the maximum number of allowed socketed items is {{ vrig.sockets }}</small></h4>
            <div class="row vrig">
              <draggable v-model="vrigComponents" class="dragArea" @end="doneDragging" :options="{group:'people',animation: 250}">
                <div class="floatleft socket-artifact" v-for="element in vrigComponents">
                  <b-popover :target="'artifact'+element.artifactId" placement="top" triggers="hover focus">
                     <template slot="title">{{ element.artifactId }} - {{ element.name }}</template>
                     <ul class="no-bullets">
                      <li>Life: {{ element.life }}</li>
                      <li>Parent: {{ element.parent }}</li>
                      <li class="modifier" v-for="modifier in element.modifiers">
                        {{modifier}}
                      </li>
                    </ul>
                  </b-popover>                  
                  <img v-if="element.metadata" :id="'artifact'+element.artifactId" :src="element.metadata.image" width="100" height="100">
                </div>
              </draggable>
            </div>

            <br>
            <h4>Available Components</h4>
            <div class="row available">
              <draggable v-model="availableComponents" class="dragArea" @end="doneDragging" :options="{group:'people',animation: 250}">
                <div class="floatleft socket-artifact" v-for="element in availableComponents">
                  <b-popover :target="'artifact'+element.artifactId" placement="bottom" triggers="hover focus">
                     <template slot="title">{{ element.artifactId }} - {{ element.name }}</template>
                     <ul class="no-bullets">
                      <li>Life: {{ element.life }}</li>
                      <li>Parent: {{ element.parent }}</li>
                      <li class="modifier" v-for="modifier in element.modifiers">
                        {{modifier}}
                      </li>
                    </ul>
                  </b-popover>                  
                  <img v-if="element.metadata" :id="'artifact'+element.artifactId" :src="element.metadata.image" width="100" height="100"> 
                </div>
              </draggable>
            </div>
        </div>

        <br>
        

        <b-modal ref="modal" id="modal-center" size="lg" centered title="Processing..." hide-footer >
          <div class="form-group">
            <label for="blockTimeInMinutes">Save Configuration Transaction</label><br/>
            <a v-bind:href="txUrl + approvalTx" target="_blank">{{ approvalTx }}</a>
          </div>
          
          <b-progress :value="100" :max="100" :striped="loading" :animated="loading"></b-progress><br/>
          <b-alert show variant="warning" v-if="loading">Please don't refresh this page until the transaction is completed.</b-alert>
          <b-alert show variant="success" v-if="!loading">
            Virtual Rig configuration saved
          </b-alert>
        </b-modal>
      </div>

  </section>
</template>

<script>
import draggable from 'vuedraggable'
import xCheckMetamask from '@/components/CheckMetamask'
import xVrigComponent from '@/components/VrigComponent'

const BLOCK_EXPLORER_URL = require('../../static/scripts/config.js').explorer_url

import parts from '../../static/scripts/parts.js'

export default {
  name: 'Vrig',
  components: {
    draggable,
    xCheckMetamask,
    xVrigComponent
  },
  data () {
    return {
      id: this.$route.params.id,
      vrig: {},
      vrigComponents: [],
      availableComponents: [],
      buttonDisabled: true,
      approvalTx: 'Pending...',
      txUrl: BLOCK_EXPLORER_URL,
      loading: true,
      vrigKey: 0,
      rigComponents: []
    }
  },
  methods: {
    async saveConfig () {
      this.approvalTx = 'Pending...'
      var idArray = []
      this.loading = true
      this.vrigComponents.forEach(function (element) {
        idArray.push(element.artifactId.toNumber())
      })
      this.$refs.modal.show()
      await this.vrigContract.configureChildren(this.id, idArray).then(response => {
        console.log(response)
        this.approvalTx = response.tx
        this.loading = false
        this.vrigComponents = []
        this.availableComponents = []
        this.loadVrig(this.id)
      })
    },
    async doneDragging (evt) {
      if (this.vrigComponents.length > this.vrig.sockets) {
        return
      }
      var idArray = []
      var uiGPUComponents = []
      this.vrigComponents.forEach(function (element) {
        idArray.push(element.artifactId.toNumber())
        uiGPUComponents.push(element.metadata.component)
      })
      this.buttonDisabled = false
      let basicStats = await this.vrigContract.checkMerged(this.id, idArray)
      this.vrig.experience = basicStats[0].toNumber()
      this.vrig.lifeDecrement = basicStats[1].toNumber()
      this.vrig.executionCost = basicStats[2].toNumber()
      this.vrig.sockets = basicStats[3].toNumber()
      this.vrig.vhash = basicStats[4].toNumber() / 1000000
      this.vrig.accuracy = basicStats[5].toNumber()
      this.vrig.level = basicStats[6].toNumber()
      // ui components
      let uiComponents = this.vrig.metadata.component.slice(0, 3).concat(uiGPUComponents)
      while (uiComponents.length < 11) {
        uiComponents.push(0)
      }
      this.rigComponents = uiComponents
      this.vrigKey++
      console.log('RIG COMPONENTS: ', this.rigComponents)
    },
    async loadVrig (id) {
      let stats = await this.vrigContract.mergedStats(id)
      let artifact = {}
      artifact.id = id
      artifact.name = stats[0]
      let basicStats = stats[1]
      artifact.experience = basicStats[0].toNumber()
      artifact.lifeDecrement = basicStats[1].toNumber()
      artifact.executionCost = basicStats[2].toNumber()
      artifact.sockets = basicStats[3].toNumber()
      artifact.vhash = basicStats[4].toNumber() / 1000000
      artifact.accuracy = basicStats[5].toNumber()
      artifact.level = basicStats[6].toNumber()
      artifact.childArtifacts = stats[2]
      artifact.tokenURI = await this.vrigContract.tokenURI(id)
      try {
        artifact.metadata = await (await fetch(artifact.tokenURI)).json()
        /*
        artifact.metadata = {
          'name': 'Hellfire Virtual Mining Rig',
          'description': 'Legendary Item - 6 slot Virtual Mining Rig',
          'image': 'https://mineables.io/static/metadata/vrigs/legendary-diablo/image.png',
          'component': [35, 18, 28]
        }
        */
      } catch (e) {
        console.log(e)
      }
      this.vrig = artifact
      // load the ui component
      let uiComponents = artifact.metadata.component
      // load the attached components
      for (var i = 0; i < artifact.childArtifacts.length; i++) {
        let artifactId = artifact.childArtifacts[i]
        let a = await this.vgpuContract.artifactAt(artifactId)
        let vgpu = {}
        vgpu.artifactId = artifactId
        vgpu.name = a[0]
        // load metadata
        vgpu.tokenURI = await this.vgpuContract.tokenURI(vgpu.artifactId)
        try {
          vgpu.metadata = await (await fetch(vgpu.tokenURI)).json()
          /*
          vgpu.metadata = {
            'name': 'Hellfire 1 GH/s Virtual GPU',
            'description': 'Legendary Item - 1 GH/s Virtual GPU',
            'image': '/static/images/gpu/market/baseGPU.png',
            'component': 14
          }
          */
        } catch (e) {
          console.log(e)
        }
        vgpu.metadata.image = this.findPartImage(vgpu.metadata.component)
        vgpu.parent = a[1].toNumber()
        vgpu.life = parseInt(a[2])
        let mods = a[3]
        vgpu.modifiers = []
        for (var j = 0; j < mods.length; j++) {
          vgpu.modifiers.push(this.parseModifier(mods[j]))
        }
        console.log('parent: ' + vgpu.parent)
        if (vgpu.parent === Number(this.id)) {
          console.log('Adding to Vrig: ' + vgpu.artifactId)
          this.vrigComponents.push(vgpu)
          uiComponents.push(vgpu.metadata.component)
        }
      }
      // ui component
      while (uiComponents.length < 11) {
        uiComponents.push(0)
      }
      this.rigComponents = uiComponents
      this.vrigKey++
      console.log('RIG COMPONENTS: ', this.rigComponents)
      this.availableComponents = []
      let balance = await this.vgpuContract.balanceOf(window.web3.eth.coinbase)
      for (var k = 0; k < balance; k++) {
        let artifactId = await this.vgpuContract.tokenOfOwnerByIndex(window.web3.eth.coinbase, k)
        let a = await this.vgpuContract.artifactAt(artifactId)
        let vgpu = {}
        vgpu.artifactId = artifactId
        vgpu.name = a[0]
        // load metadata
        vgpu.tokenURI = await this.vgpuContract.tokenURI(vgpu.artifactId)
        try {
          vgpu.metadata = await (await fetch(vgpu.tokenURI)).json()
          /*
          vgpu.metadata = {
            'name': 'Hellfire 1 GH/s Virtual GPU',
            'description': 'Legendary Item - 1 GH/s Virtual GPU',
            'image': '/static/images/gpu/market/baseGPU.png',
            'component': 14
          }
          */
        } catch (e) {
          console.log(e)
        }
        vgpu.metadata.image = this.findPartImage(vgpu.metadata.component)
        vgpu.parent = a[1].toNumber()
        vgpu.life = parseInt(a[2])
        let mods = a[3]
        vgpu.modifiers = []
        for (var m = 0; m < mods.length; m++) {
          vgpu.modifiers.push(this.parseModifier(mods[m]))
        }
        console.log('parent: ' + vgpu.parent)
        if (vgpu.parent === 0) {
          console.log('Adding to Available: ' + vgpu.artifactId)
          this.availableComponents.push(vgpu)
        }
      }
    },
    findPartImage (id) {
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].id === id) {
          if (parts[i].market) {
            return parts[i].market
          } else {
            return parts[i].img0
          }
        }
      }
    },
    parseModifier: function (modifier) {
      var tuple = this.parseCommand(modifier)
      var position = tuple[0]
      // var value = tuple[1]
      var op = tuple[2]
      var mod = tuple[3]

      if (op === 1) return '[+] Adds ' + mod + ' to ' + this.getPositionName(position)
      if (op === 2) return '[-] Subtracts ' + mod + ' from ' + this.getPositionName(position)
      if (op === 3) return '[*] Multiplies ' + this.getPositionName(position) + ' by ' + mod
      if (op === 4) return '[/] Divides ' + this.getPositionName(position) + ' by ' + mod
      if (op === 5) return '[+%] Adds ' + mod + '% to ' + this.getPositionName(position)
      if (op === 6) return '[-%] Subtracts ' + mod + '% from ' + this.getPositionName(position)
      if (op === 7) return 'Requires ' + this.getPositionName(position) + ' > ' + mod
      if (op === 8) return 'Requires ' + this.getPositionName(position) + ' < ' + mod
      if (op === 9) return 'Adds ' + this.parseExponent(mod) + ' to ' + this.getPositionName(position)
    },
    parseCommand: function (command) {
      var s = String(command)
      var position = s.substring(1, 3)
      var value = s.substring(3)
      var op = value.substring(0, 1)
      var modValue = value.substring(1, 4)
      return [Number(position), Number(value), Number(op), Number(modValue)]
    },
    getPositionName: function (position) {
      if (position === 0) {
        return 'Experience'
      } else if (position === 1) {
        return 'Life Decrement'
      } else if (position === 2) {
        return 'Execution Cost'
      } else if (position === 3) {
        return 'Socket Count'
      } else if (position === 4) {
        return 'Virtual Hash Rate'
      } else if (position === 5) {
        return 'Accuracy'
      } else if (position === 6) {
        return 'Level'
      } else {
        return '[' + position + ']'
      }
    },
    parseExponent: function (op) {
      var s = String(op)
      var multiplier = s.substring(0, 1)
      var exp = s.substring(1, 3)
      return Number(multiplier) * Math.pow(10, Number(exp))
    }
  },
  async mounted () {
    this.loadVrig(this.id)
  }
}
</script>

<style>

.vrigImage {
  width: 30em;
}

.vrig {
  padding: 20px;
  background-color: #d0f0e9;
  border: 2px dashed black;
}

.available {
  padding: 20px;
  // border: 2px dashed black;
}

.socket-artifact {
  border: none;
}

.socket-artifact:hover {
   -webkit-filter: drop-shadow(0px 5px 15px rgb(0, 0, 0, 0.7));
     filter: drop-shadow(0px 5px 15px rgb(0, 0, 0, 0.7));
}

.drop-zone {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
}

/* table styling */
table {
    font-family: arial, sans-serif;
    font-size: small;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

/* tool top */
.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    font-size: small;
    width: 320px;
    background-color: #ffeace;
    color: black;
    text-align: left;
    border-radius: 3px;
    padding: 5px 0;
    
    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
}

.tooltip li {
  list-style-type: none;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}

.floatleft {
  float: left;
}

.drag-handle {
  cursor: grab;
  cursor: -webkit-grab;
}

.drag-handle:hover {
  cursor: grab;
  cursor: -webkit-grab;
}

.dragArea {
  height: 100px;
  width: 100%;
  // border: 5px dashed black;
}

.no-bullets {
  list-style-type: none;
}

.modifier {
  font-style: italic;
}


</style>

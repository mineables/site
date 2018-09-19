<template>
  <section id="createToken">
   
   <div class="container" id="main">

   <x-check-metamask></x-check-metamask>

    <h2 class="header-text">Virtual Rig Configuration</h2>

    <b-alert show variant="info">
          <h4 class="alert-heading">Instructions</h4>
          <p>
            Drag Virtual GPUs and other components into top 'Virtual Rig' section to configure Virtual Rig.
            The statistics of the vRig will automatically update as vGPU components are 
            attached and detached, so you test multiple configurations before attaching rigs to Mineable Tokens.
          </p>
          <hr>
          <p class="mb-0">
            When complete press the <b>Commit Confuguration</b> button to save your vRig configuration.
          </p>
        </b-alert>
      
      <br>
      <h4>Statistics</h4>
      <section>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th>Name</th>
                <th>Experience</th>
                <th>Life Decrement</th>
                <th>Execution Cost (in 0xMithril)</th>
                <th>Total Socket Slots</th>
                <th>vHash Rate (in MH/s)</th>
                <th>Accuracy</th>
                <th>Level</th>
                <th>Children</th>
              </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{{ vrig.name }}</td>
                  <td>{{ vrig.experience }}</td>
                  <td>{{ vrig.lifeDecrement }}</td>
                  <td>{{ vrig.executionCost }}</td>
                  <td>{{ vrig.sockets }}</td>
                  <td><b>{{ vrig.vhash }}</b></td>
                  <td><b>{{ vrig.accuracy }}%</b></td>
                  <td>{{ vrig.level }}</td>
                  <td>{{ vrig.childArtifacts }}</td>
                </tr>
            </tbody>
          </table>
        </section>

      <br>
        
        <div class="drag">
            <h4>Virtual Rig - '{{ vrig.name }}'</h4>
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
                  <img :id="'artifact'+element.artifactId" :src="element.metadata.image" width="100" height="100">
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
                  <img :id="'artifact'+element.artifactId" :src="element.metadata.image" width="100" height="100"> 
                </div>
              </draggable>
            </div>
        </div>

        <br>
        <b-button class="btn btn-lg btn-success" :disabled="buttonDisabled" data-toggle="modal" data-target="#myModal" @click="saveConfig()">
          Commit Configuration
        </b-button>

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

export default {
  name: 'Vrig',
  components: {
    draggable,
    xCheckMetamask
  },
  data () {
    return {
      id: this.$route.params.id,
      vrig: {},
      vrigComponents: [],
      availableComponents: [],
      buttonDisabled: true,
      approvalTx: 'Pending...',
      txUrl: 'https://rinkeby.etherscan.io/tx/',
      loading: true
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
      var idArray = []
      this.vrigComponents.forEach(function (element) {
        idArray.push(element.artifactId.toNumber())
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
      this.vrig = artifact
      this.availableComponents = []
      let balance = await this.vgpuContract.balanceOf(window.web3.eth.coinbase)
      for (var i = 0; i < balance; i++) {
        let artifactId = await this.vgpuContract.tokenOfOwnerByIndex(window.web3.eth.coinbase, i)
        let a = await this.vgpuContract.artifactAt(artifactId)
        let vgpu = {}
        vgpu.artifactId = artifactId
        vgpu.name = a[0]
        // load metadata
        vgpu.tokenURI = await this.vgpuContract.tokenURI(vgpu.artifactId)
        vgpu.metadata = await (await fetch(vgpu.tokenURI)).json()
        vgpu.parent = a[1].toNumber()
        vgpu.life = parseInt(a[2])
        let mods = a[3]
        vgpu.modifiers = []
        for (var j = 0; j < mods.length; j++) {
          vgpu.modifiers.push(this.parseModifier(mods[j]))
        }
        if (vgpu.parent === Number(this.id)) {
          this.vrigComponents.push(vgpu)
        } else if (vgpu.parent === 0) {
          this.availableComponents.push(vgpu)
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
.vrig {
  padding: 20px;
  background-color: #d0f0e9;
  border: 2px dashed black;
}

.available {
  padding: 20px;
  background-color: lightgray;
  // border: 5px dashed black;
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

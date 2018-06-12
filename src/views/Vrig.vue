<template>
  <section id="createToken">
   
   <div class="container" id="main">

    <h2 class="header-text">Virtual Rig Configuration</h2>
      <p>Drag Virtual GPUs and other components into top section to configure Virtual Rig.</p>

      <br>
 
        <div class="drag">
            <h4>Virtual Rig</h4>
            <div class="row vrig">
              <draggable v-model="list" class="dragArea" :options="{group:'people',animation: 250}">
                <div class="floatleft" v-for="element in list">
                  <img id="drag1" src="static/icons/vgpu.png" width="100" height="100"> 
                  
                </div>
              </draggable>
            </div>

            <br>
            <h4>Available Components</h4>
            <div class="row available">
              <draggable v-model="list2" class="dragArea" :options="{group:'people',animation: 250}">
                <div class="floatleft" v-for="element in list2">
                  <img id="drag1" src="static/icons/vgpu.png" width="100" height="100"> 
                  
                </div>
              </draggable>
            </div>
        </div>

        <br>
        <section>
          <table>
            <tr>
              <th>Name</th>
              <th>Experience</th>
              <th>Life Decrement</th>
              <th>Execution Cost (in 0xMithril)</th>
              <th>Total Socket Slots</th>
              <th>vHash Rate (in MH/s)</th>
              <th>Accuracy</th>
              <th>Level</th>
              <th>Attached Artifacts</th>
            </tr>
           <tr>
              <td>{{ vrig.name }}</td>
              <td>{{ vrig.experience }}</td>
              <td>{{ vrig.lifeDecrement }}</td>
              <td>{{ vrig.executionCost }}</td>
              <td>{{ vrig.sockets }}</td>
              <td>{{ vrig.vhash }}</td>
              <td>{{ vrig.accuracy }}%</td>
              <td>{{ vrig.level }}</td>
              <td>{{ vrig.childArtifacts }}</td>
            </tr>
          </table>
        </section>

        <br>
        <b-button class="btn btn-lg btn-success" data-toggle="modal" data-target="#myModal" @click="purchasevRig(result.id,result.mithrilPrice)">
          Update Configuration
        </b-button>
      </div>

  </section>
</template>

<script>
import draggable from 'vuedraggable'

import { ADDRESS } from '../../static/scripts/addr.js'
// import { MINEABLE_ABI } from '../../static/scripts/mineable_abi.js'
// import { CHILD_ARTIFACT_ABI } from '../../static/scripts/child_artifact_abi.js'
import { VIRTUAL_MINING_BOARD_ABI } from '../../static/scripts/virtual_mining_board_abi.js'

export default {
  name: 'Vrig',
  components: {
    draggable
  },
  data () {
    return {
      id: this.$route.params.id,
      vrig: {},
      list: [{
        name: 'John'
      }, {
        name: 'Joao'
      }, {
        name: 'Jean'
      }],
      list2: [{
        name: 'Juan'
      }, {
        name: 'Edgard'
      }, {
        name: 'Johnson'
      }]
    }
  },
  methods: {
    async initContracts () {
      var VirtualMiningBoard = window.TruffleContract({abi: VIRTUAL_MINING_BOARD_ABI})
      VirtualMiningBoard.setProvider(window.web3.currentProvider)
      this.vrigContract = await VirtualMiningBoard.at(ADDRESS.VRIG)
    },
    async loadVrig (id) {
      let stats = await this.vrigContract.baseStats(id)
      let artifact = {}
      artifact.id = id
      artifact.name = stats[0]
      let basicStats = stats[1]
      artifact.experience = basicStats[0].toNumber()
      artifact.lifeDecrement = basicStats[1].toNumber()
      artifact.executionCost = basicStats[2].toNumber()
      artifact.sockets = basicStats[3].toNumber()
      artifact.vhash = basicStats[4].toNumber()
      artifact.accuracy = basicStats[5].toNumber()
      artifact.level = basicStats[6].toNumber()
      artifact.childArtifacts = stats[2]
      console.log(artifact)
      this.vrig = artifact
    },
    add: function () {
      this.list.push({
        name: 'Juan'
      })
    },
    replace: function () {
      this.list = [{
        name: 'Edgard'
      }]
    }
  },
  async mounted () {
    await this.initContracts()
    this.loadVrig(this.id)
  }
}
</script>

<style>
.vrig {
  padding: 20px;
  background-color: #d0f0e9;
  border: 5px dashed black;
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


</style>

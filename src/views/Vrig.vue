<template>
  <section id="createToken">
   
   <div class="container" id="main">

    <h2>Virtual Rig Configuration</h2>
      <p>Drag Virtual GPUs into top section to configure Virtual Rig.</p>

      <button class="transferFunds">Update Configuration!</button>

      <h2>Virtual Rig</h2>
      <div id="vrig" ondrop="drop(event)" ondragover="allowDrop(event)">
      </div>

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
              <td>{{ vrig.executionCost }}</td>
              <td>{{ vrig.sockets }}</td>
              <td>{{ vrig.vhash }} H/s</td>
              <td>{{ vrig.accuracy }}</td>
              <td>{{ vrig.level }}</td>
              <td>4, 5, 6</td>
            </tr>
            
          </table>

      </section>

      <br>
 

      
        <h1>Vue Draggable</h1>           
        <div class="drag">
            <h2>vRig Configuration</h2>
            <div class="row vrig">
              <draggable v-model="list" class="dragArea" :options="{group:'people',animation: 250}">
                <div class="floatleft" v-for="element in list">
                  <img id="drag1" src="static/icons/vgpu.png" width="100" height="100"> 
                  
                </div>
              </draggable>
            </div>

            <br>
            <h2>Available Components</h2>
            <div class="row available">
              <draggable v-model="list2" class="dragArea" :options="{group:'people',animation: 250}">
                <div class="floatleft" v-for="element in list2">
                  <img id="drag1" src="static/icons/vgpu.png" width="100" height="100"> 
                  
                </div>
              </draggable>
            </div>
        </div>
        
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
      this.vrig = await this.vrigContract.baseStats(id)
      console.log(this.vrig)
    },
    async mounted () {
      await this.initContracts()
      this.loadVrig(this.id)
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
  }
}
</script>

<style>
.vrig {
    border: 5px dashed black;
}

.available {
    background-color: lightgray;
    border: 5px dashed black;
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

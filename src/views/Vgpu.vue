<template>
  <section class="container">
   
   <x-check-metamask></x-check-metamask>

    <h2 class="header-text">Virtual GPU Statistics</h2>

    <div class="card market-card">
                
        <h3 class="card-title price-wrap"> 
          <h4 class="float-left">{{ result.name }} </h4>
        </h3>
        
        <div class="card-body">
          <img class="card-img-top float-left" :src="result.metadata.image" alt="Card image cap">
          <p class="card-text">Remaining cycles: {{ result.life }}</p>
          <p class="card-text modifier" v-for="modifier in result.modifiers" >{{ modifier }}</p>
          <br>
          <span class="uid">uid: {{ result.id }} </span>
        </div>  
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
      result: ''
    }
  },
  methods: {
    async loadVgpu (id) {
      let a = await this.vgpuContract.artifactAt(id)
      let vgpu = {}
      vgpu.id = id.toNumber()
      vgpu.name = a[0]
      // load metadata
      vgpu.tokenURI = await this.vgpuContract.tokenURI(vgpu.id)
      vgpu.metadata = await (await fetch(vgpu.tokenURI)).json()
      vgpu.parent = a[1].toNumber()
      vgpu.life = parseInt(a[2])
      let mods = a[3]
      vgpu.modifiers = []
      for (var j = 0; j < mods.length; j++) {
        vgpu.modifiers.push(this.parseModifier(mods[j]))
      }
      this.result = vgpu
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
    await this.loadVgpu(this.id)
  }
}
</script>

<style>
.vrig {
  padding: 20px;
  background-color: #d0f0e9;
  border: 2px dashed black;
}

.uid {
  color: lightgray;
  float: right;
}

.uid:hover {
  color: black;
}

.tengwar {
  font-family: TengwarAnnatarGlaemscrafu;
  font-size: 110%;
  line-height: 1.5;
  text-decoration: none;
  font-weight: 400!important;
}

.price {
  color: #f36236;
  font-weight: bold;
  font-size: 120%;
}

.price-wrap {
  text-align: right;
  padding: 15px;
  background-color: #edffff;
}

.card-img-top {
  max-width: 160px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.float-left {
  float: left;
}


.no-bullets {
  list-style-type: none;
}


</style>

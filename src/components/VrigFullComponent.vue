<template>
  <div>
    <div id="rig_container">
      <img id="random_rig" :src='dataURL' class="img-responsive">
    </div>
  </div>
</template>

<script>

import util from '../common/util.js'
import parts from '../../static/scripts/parts.js'

export default {
  name: 'x-vrig-full-component',
  props: ['rigId'],
  data () {
    return {
      web3: undefined,
      dataURL: undefined,
      canvas: {},
      rigdrawCanvas: undefined
    }
  },
  methods: {
    animationFrame () {
      let res = null
      const promise = new Promise((resolve, reject) => { res = resolve })
      window.requestAnimationFrame(res)
      return promise
    },
    generateImage () {
      this.dataURL = this.canvas.toDataURL('image/png', 0.5)
    },
    async drawImg (canvas, src, x, y, render = 0) {
      await this.animationFrame()
      if (typeof window.loadedImages[src] !== 'undefined') {
        canvas.drawImage(window.loadedImages[src], x, y)
      }
      if (render === 1) {
        this.generateImage()
      }
    },
    drawRig (partsArray) {
      this.rigdrawCanvas.fillStyle = 'white'
      this.rigdrawCanvas.fillRect(0, 0, this.canvas.width, this.canvas.height)

      let renderStep = 22
      for (let index = 0; index < 23; index++) {
        if (index === 0 || index === 4 || index === 14) {
          for (let i = 0; i < parts.length; i++) {
            if (parts[i]['id'] === partsArray[0]) {
              if (index === 0) {
                this.addPart(index, parts[i]['img0'])
              } else if (index === 4) {
                this.addPart(index, parts[i]['img1'])
              } else if (index === 14) {
                this.addPart(index, parts[i]['img2'])
              }
            }
          }
        }
        if (index === 1) {
          for (let i = 0; i < parts.length; i++) {
            if (parts[i]['id'] === partsArray[1]) {
              this.addPart(index, parts[i]['img0'])
            }
          }
        }
        if (index === 2) {
          for (let i = 0; i < parts.length; i++) {
            if (parts[i]['id'] === partsArray[2]) {
              this.addPart(index, parts[i]['img0'])
            }
          }
        }
        if (index >= 5 && index <= 13) {
          for (let i = 0; i < parts.length; i++) {
            if (parts[i]['id'] === partsArray[index - 2]) {
              this.addPart(index, parts[i]['img0'])
            }
          }
        }
        if (index >= 15) {
          for (let i = 0; i < parts.length; i++) {
            if (parts[i]['id'] === partsArray[index - 12]) {
              if (renderStep === index) {
                this.addPart(index, parts[i]['img1'], 1)
              } else {
                this.addPart(index, parts[i]['img1'])
              }
            }
          }
        }
        if (index === renderStep) {
          this.addPart(0, 0, 1)
        }
      }
    },
    async addPart (step, src, render = 0) {
      await this.animationFrame()
      let x = 0
      let y = 50
      if (step === 23) {
        y = 0
      }
      if (step >= 5 && step <= 13) {
        let count = 12 - step
        x += -72 * count
        y += -42 * count
      } else if (step >= 15 && step <= 22) {
        let count = 22 - step
        x += -72 * count
        y += -42 * count
      }
      if (render === 1) {
        this.drawImg(this.rigdrawCanvas, src, x, y, 1)
      } else {
        this.drawImg(this.rigdrawCanvas, src, x, y)
      }
    },
    loadImages (callback) {
      var images = []
      for (var i = 0; i < parts.length; i++) {
        for (var k = 0; k < 3; k++) {
          let field = 'img' + k
          if (typeof parts[i][field] !== 'undefined') {
            images.push(parts[i][field])
          } else {
            console.log('Error:', parts[i][field])
          }
        }
      }
      return callback(images)
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
      artifact.vhash = util.toReadableHashrate(basicStats[4].toNumber())
      artifact.accuracy = basicStats[5].toNumber()
      artifact.level = basicStats[6].toNumber()
      artifact.childArtifacts = stats[2]
      artifact.tokenURI = await this.vrigContract.tokenURI(id)
      try {
        artifact.metadata = await (await fetch(artifact.tokenURI)).json()
      } catch (e) {
        console.log(e)
      }
      this.vrig = artifact
      // load the ui component
      let uiComponents = artifact.metadata.component || []
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
        } catch (e) {
          console.log(e)
        }
        vgpu.metadata.image = util.findPartImage(parts, vgpu.metadata.component)
        vgpu.parent = a[1].toNumber()
        vgpu.life = parseInt(a[2])
        let mods = a[3]
        vgpu.modifiers = []
        for (var j = 0; j < mods.length; j++) {
          vgpu.modifiers.push(util.parseModifier(mods[j]))
        }
        console.log('parent: ' + vgpu.parent)
        console.log('Adding to Vrig: ' + vgpu.artifactId)
        uiComponents.push(vgpu.metadata.component)
      }
      // ui component
      while (uiComponents.length < 11) {
        uiComponents.push(0)
      }
      console.log('RIG COMPONENTS: ', uiComponents)
      return uiComponents
    }
  },
  async mounted () {
    this.web3 = window.web3
    this.netId = window.netId

    // let rigId = this.rigId
    let uiComponents = await this.loadVrig(this.rigId)

    console.log('rigComponents', uiComponents)

    this.canvas = document.createElement('canvas', { 'id': 'rig_draw' + this.rigId })
    this.canvas.width = 1180
    this.canvas.height = 1180
    this.rigdrawCanvas = this.canvas.getContext('2d')
    window.loadedImages = {}
    let parent = this
    let promise = new Promise((resolve, reject) => { })
    await this.loadImages(function (images) {
      window.promiseArray = images.map(function (imgurl) {
        var prom = new Promise(function (resolve, reject) {
          var img = new Image()
          img.onload = function () {
            window.loadedImages[imgurl] = img
            resolve()
          }
          img.src = imgurl
        })
        return prom
      })
      Promise.all(window.promiseArray).then(function () {
        parent.drawRig(uiComponents)
        return promise
      })
    })
    this.drawRig(uiComponents)
  }
}
</script>

<style>

.img-responsive {
    display: block;
    height: auto;
    max-width: 100%;
}
</style>
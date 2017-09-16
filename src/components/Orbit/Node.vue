<template>
  <div>
  <div class="node" v-bind:style="[style, orbSpeed + 'reverse']" :class="{complete: node.complete}" @click="goto()">
    <div class="insideNode" v-if="showNode">
      {{node.name}}
    </div>
  </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'
  import { axios } from 'axios'
  // import router from '../../router/index.js'
  export default {
    name: 'node', // name of component
    props: {
      /*
      orbrad: {type: Number, required: true},
      orbspeed: {type: String, required: true},
      type: {type: String},
      payload: {type: Object, required: true}, // expects an Object type Node to be passed
      selnode: {type: Object},
      test: {type: String}
      */
      orbidx: {type: Number},
      node: {type: Object},
      orbRad: {type: Number},
      showNode: {type: Boolean}
    },
    data () {
      return {
        orbSpeed: null,
        orbTag: null
        /*
        metadata: this.payload.metadata || {
          created: new Date()
        },
        pos: this.payload.pos,
        lvl: this.payload.lvl,
        name: this.payload.name,
        complete: this.payload.complete || true,
        style: this.payload.style || {}
        */
      }
    },
    created: function () {
      this.load()
    },
    watch: {
      'key': 'load'
    },
    computed: {
      style: function () {
        let angle = ((this.node.pos % 24) * (-6.28 / 12)) + (3.14 / 2)
        let nodeRadint = 10 // px
        switch (this.lvl) {
          case '3': {
            nodeRadint = 30 // px
            break
          }
          case '2': {
            nodeRadint = 20 // px
            break
          }
            // default to low priority
        }
        let relativeSize = this.node.time / 60 || 0 // get time spent on node in minutes
        let relativeRad = (nodeRadint + relativeSize) % 90
        let size = 2 * relativeRad + 'px'
        let posx = (this.orbRad - relativeRad + Math.cos(angle) * this.orbRad) + 'px'
        let posy = (this.orbRad - relativeRad - Math.sin(angle) * this.orbRad) + 'px'
        return {
          'height': size,
          'width': size,
          'top': posy,
          'left': posx,
          'transform-origin': relativeRad + 'px ' + relativeRad + 'px '
        }
      }
    },
    methods: {
      ...mapMutations(['create_orbit', 'create_node']),
      ...mapActions(['getStorage', 'createNode', 'setOrbit', 'createOrbit']),
      goto () {
        if (this.node.point_to) {
          this.$router.push({name: 'home', params: {orbitTag: this.node.point_to, from: this.$store.state.tag}})
        } else {
          // this.showNode = !this.showNode
        }
      },
      load () {
        this.orbSpeed = this.$store.state.orbits[this.orbidx].speed
        this.orbTag = this.$store.state.orbits[this.orbidx].tag
      },
      getPointedOrbit (tag) {
        axios.get('/api/persistorbit', {
          params: {
            usr: this.$store.usr, tag: tag
          }
        })
      }
    }
}
</script>

<style scoped>
.node{
  border-radius: 50%;
  background: black;
  position: absolute;
  transition: fadeinnode 4s ;
  /*animation: glow 3s ease-in-out infinite alternate;*/
  -webkit-transition-timing-function: ease; /* Safari and Chrome */
  transition-timing-function: ease;
  /*background:#F7F788;*/
  box-shadow:inset 0 0 6px white, 0px 0px 500px grey;
  transition:1s;
    
}
.insideNode{
  position: static
}
.node:hover{
  background: white;
}

.node.complete {
  background: #00adb5;
}

.node.complete:hover {
  background: white;
}

@keyframes fadeinnode {
    from {background: #efefef;opacity: 0;}
    to {opacity: 1}
}

@keyframes glow {
  from {box-shadow:inset 0 0 6px white, 0 0 36px grey;}
  to {box-shadow:inset 0 0 15px white, 0 0 100px white;}
}
</style>

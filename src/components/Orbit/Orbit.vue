<template>
<div class="wrapper">
  <div class="container" v-if="ready" v-bind:style="{height: $store.state.orbits[0].size, width: $store.state.orbits[0].size}" >
   
    <!--
    <app-threejs class="threejs" [ngStyle]="{'height': todoservice.orbit[todoservice.orbit.length-1].size,'width': todoservice.orbit[todoservice.orbit.length-1].size}"></app-threejs>
    -->


    <transition-group name="bounce" mode="out-in">
    <div class="path" v-for="(orbit, index) in $store.state.orbits" :key="orbit_tag" v-bind:style="{height: $store.state.orbits[0].size, width: $store.state.orbits[0].size}" @mouseenter="showNodes = !showNodes">
        <div class="node_container" style="height:100%; width: 100%;">
          <node v-for= "node in orbit.nodes" @click="active = !active" :node="node" :orbidx="index" :orbRad="orbit.radius" :key="node.id" :showNode="showNodes">
          </node>
        </div>      
    </div>
    </transition-group>
    <div v-show="showInsideOrbit" class="inside-orbit">
          <img src="../../assets/fire.gif" style="height:20%;width:auto">
          <h2>{{orbit_tag}}</h2>
          {{from}}
          <timer></timer>
    </div>
    
    
    <!--<app-threejs class="threejs"></app-threejs>-->
  </div>

  <tasklist class="tasklist"></tasklist>
</div>
</template>

<script>

import { mapMutations, mapActions } from 'vuex'
import timer from '../Timer/Timer.vue'
import tasklist from '../Todo/Tasklist.vue'
import node from './Node.vue'
export default {
  name: 'orbit', // name of component
  props: {
    orbit_tag: {type: String, required: true, default: 'home'},
    from: {type: String}
  },
  data () {
    return {
      orbitlen: this.$store.state.orbits.length,
      active: false,
      showInsideOrbit: true,
      ready: false,
      show: false,
      showNodes: false
    }
  },
  watch: {
    'orbit_tag': 'init'
  },
  computed: {
    /*
    tag: {
      get: function () {
        return this.$store.state.tag
      },
      set: function (newval) {
        this.update_tag({tag: newval})
      }
    } */
  },
  created: function () {
    // create a default orbit
    this.init() // needs to be syncronous
  },
  methods: {
    ...mapMutations(['create_orbit', 'create_node', 'update_tag']),
    ...mapActions(['getStorage', 'createNode', 'setOrbit', 'createOrbit', 'getPersist']),
    showName (node) {
      this.nodeName = node.name
      this.timer.data.show_form = true // bad practice?
    },
    init () {
      this.getPersist({fallback: [{radius: 300, speed: 300, from: this.from}], tag: this.orbit_tag})
      .then(() => {
        this.ready = true // only render orbit after state has been updated
      })
    },
    beforeRouteEnter (to, from, next) {
      this.init()
      next()
    },
    beforeRouteUpdate (to, from, next) {
      console.log('route update')
      this.init()
      next()
    }
  },
  components: {
    timer,
    tasklist,
    node
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[v-cloak] { display: none }
.path{
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: absolute;
  display: flex;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  color:white;
  background-color: none;
  z-index: 5
  }
.inside-orbit{
  position: absolute;
  margin: auto auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80%;
  width: 80%;
  z-index:6;
}


.node_container{
  height: 100%;
  width: 100%;
  position:absolute;
}

.threejs{
  width: 90%;
  height: 90%;
  margin: auto;
  position: absolute;
  left:0;
  right:0;
  top: 0;
  bottom: 0;
}


.container{
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
}
.tasklist {
  z-index: -1
}
@keyframes spin {  
from {  
  transform: rotate(0deg);  
}  
to {  
  transform: rotate(360deg);  
   }  
}

@-webkit-keyframes myOrbit {
    from { -webkit-transform: rotate(0deg) translateX(300px) rotate(0deg); }
    to   { -webkit-transform: rotate(360deg) translateX(300px) rotate(-360deg); }
}

@-moz-keyframes myOrbit {
    from { -moz-transform: rotate(0deg) translateX(300px) rotate(0deg); }
    to   { -moz-transform: rotate(360deg) translateX(300px) rotate(-360deg); }
}

@-o-keyframes myOrbit {
    from { -o-transform: rotate(0deg) translateX(300px) rotate(0deg); }
    to   { -o-transform: rotate(360deg) translateX(300px) rotate(-360deg); }
}

@keyframes myOrbit {
    from { transform: rotate(0deg) translateX(300px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(300px) rotate(-360deg); }
}
.node{
  border-radius: 50%;
  background: #00adb5;
  position: absolute;
  animation-name: fadeinnode;
  animation-duration: 4s;
  -webkit-transition-timing-function: ease; /* Safari and Chrome */
  transition-timing-function: ease;
  /*background:#F7F788;*/
  box-shadow:inset 0 0 6px white, 0 0 36px grey;
  transition:1s;
    
}
.insideNode{
  position: static
}
.node:hover{
  background: black;
}

.node.complete {
  background: black;
}

.node.complete:hover {
  background: #00adb5;
}

@keyframes fadeinnode {
    from {background: #efefef;opacity: 0;}
    to {opacity: 1}
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3
  }
  100% {
    transform: scale(1);
    opacity: 1
  }
}
@keyframes bounce-out {
  50% {
    transform: scale(1.2);
    opacity: 0.4
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
</style>

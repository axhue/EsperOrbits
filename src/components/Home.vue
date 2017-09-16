<template>
  <div class="hello">
  <h2 style="float:left;font-family: 'Roboto', serif;">{{$store.state.usr}}</h2>
  <div style="float:left;font-family: 'Roboto', serif;position: absolute">
    <img src="../assets/syncstone.png" style="height:16px;width: auto;padding-right:3px;display:inline-block">
    <p style="display:inline">{{$store.state.sync}}</p>
  </div>
  <!--
    <div class="add-button">
      <div class="sub-button tl"></div>
      <div class="sub-button tr"></div>
      <div class="sub-button bl"></div>
      <div class="sub-button br"></div>
    </div>
    -->
    <!--
    <div v-for="tag in tags">
      <button @click="getOrbit(tag)">{{tag}}</button>
    </div>

    <button @click="init({val: [{radius: 300, speed: 300}]})"> check it</button>
    -->
    <orbit :orbit_tag="orbitTag" :from="from"></orbit>
    <button @click="logout()">Logout</button><br>

  </div>
</template>

<script>
import orbit from './Orbit/Orbit.vue'
import router from '../router/index.js'
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'home',
  props: {
    orbitTag: {type: String, required: true},
    from: {type: String}
  },
  data () {
    return {
      tags: null
    }
  },

  methods: {
    logout () {
      localStorage.removeItem('esper-login')
      router.push('/')
    },
    getOrbit (tag) {
      router.push('/orbit/' + tag)
    },
    newTag () {
    },
    editTag () {
    },
    beforeRouteEnter (to, from, next) {
      console.log('route entered')
      next()
    },
    beforeRouteUpdate (to, from, next) {
      console.log('route updated home')
      // called when the route that renders this component has changed,
      // but this component is reused in the new route.
      // For example, for a route with dynamic params /foo/:id, when we
      // navigate between /foo/1 and /foo/2, the same Foo component instance
      // will be reused, and this hook will be called when that happens.
      // has access to `this` component instance.
    },
    ...mapActions(['init']),
    ...mapMutations(['update_tag'])

  },
  components: {
    orbit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


.navigation {
  }
.add-button {
  position: absolute;
  right: 100px;
  bottom: -28px;
  width: 56px;
  height: 56px;
  overflow: visible;
  -webkit-transition: transform .4s cubic-bezier(.58,-0.37,.45,1.46),
    color 0s ease .4s,font-size .2s;
  -moz-transition: transform .4s cubic-bezier(.58,-0.37,.45,1.46),
    color 0s ease .4s,font-size .2s;
  transition: transform .4s cubic-bezier(.58,-0.37,.45,1.46),
    color 0s ease .4s,font-size .2s;
  text-align: center;
  line-height: 56px;
  font-size: 28px;
  color: rgba(255,255,255,1);
}

.add-button:before {
  position: relative;
  z-index: 100;
  content:"+";
  
}



.add-button:hover {
 
  color: rgba(255,255,255,0);
  transform: rotate(45deg);
}

.sub-button {
  position: absolute;
  display: inline-block;
  background-color:#ff4081;
  color: rgba(255,255,255,0);
  width: 28px;
  height: 28px;
  line-height:48px;
  font-family: "Helvetica";
  font-size: 12px;
  -webkit-transition: top .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    left .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    bottom .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    right .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    width .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    height .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    transform .1s ease 0s,
    border-radius .2s  ease .2s;
   -moz-transition: top .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    left .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    bottom .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    right .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    width .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    height .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    transform .1s ease 0s,
    border-radius .2s  ease .2s;
   transition: top .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    left .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    bottom .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    right .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    width .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    height .2s cubic-bezier(.58,-0.37,.45,1.46) .2s,
    transform .1s ease 0s,
    border-radius .2s  ease .2s;
}

.tl {
  top: 0;
  left: 0;
  border-radius: 28px 0 0 0;
}

.tr {  
  top: 0;
  right: 0;
  border-radius: 0 28px 0 0;
}

.bl {
  bottom: 0;
  left: 0; 
  border-radius: 0 0 0 28px;
}

.br { 
  bottom: 0;
  right: 0;
  border-radius: 0 0 28px 0;
}


.tl:before {
  content:"";
}

.tr:before {
  content:"";
}

.bl:before {
  content:"";
}

.br:before {
  content:"";
}


.add-button:hover .sub-button {
  width: 48px;
  height: 48px;
  transform: rotate(-45deg);
  
  color: rgba(255,255,255,1);
  -webkit-transition: top .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    left .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    bottom .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    right .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    width .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    height .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    color .3s ease .8s,
    transform .3s ease .8s,
    border-radius .4s  ease .6s;
   -moz-transition: top .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    left .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    bottom .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    right .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    width .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    height .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    color .3s ease .8s,
    transform .3s ease .8s,
    border-radius .4s  ease .6s;
   transition: top .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    left .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    bottom .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    right .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    width .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    height .4s cubic-bezier(.58,-0.37,.45,1.46) .4s,
    color .3s ease .8s,
    transform .3s ease .8s,
    border-radius .4s  ease .6s;
}

.add-button:hover .tl {
  top: -25px;
  left: -25px;
  border-radius: 28px;
}

.add-button:hover .tr {  
  top: -25px;
  right: -25px;
  border-radius: 28px;
}

.add-button:hover .bl {
  bottom: -25px;
  left: -25px; 
  border-radius: 28px;
}

.add-button:hover .br { 
  bottom: -25px;
  right: -25px;
  border-radius: 28px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>

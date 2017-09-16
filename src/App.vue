<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import Store from './vuex/Store.js'
let store = Store
export default {
  name: 'app',
  store,
  destroyed: function () {
    console.log('destroyed')
  },
  methods: {
    leaving () {
      console.log('HEY TEST')
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);
html{
 background-color: black;
 color:white;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 30px;
  background-color: black;
}
</style>

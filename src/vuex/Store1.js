import Vue from 'vue'
import Vuex from 'vuex'
import Orbit from './Orbit.js'
import * as actions from './actions.js'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  usr: null,
  orbits: [],
  tag: null,
  score: 0
}

const mutations = {
  init (state, payload) {
    let {usr = null, orbits = [], tag = null} = payload
    state.usr = usr
    state.orbits = orbits
    state.tag = tag
  },
  create_orbit (state, payload) {
    state.orbits.push(new Orbit(payload))
  },
  set_orbit (state, payload) {
    let tmp = new Orbit(0, 0)
    tmp.setOrbit(payload)
    state.orbits.push(tmp)
  },
  add_node (state, node, orbIdx = 0) {
    state.orbits[orbIdx].push(node)
  },
  update_node (state, payload) {
    // get node from store
    let {orbIdx, obj} = payload
    for (var i = 0; i < state.orbits[orbIdx].nodes.length; i++) {
      if (state.orbits[orbIdx].nodes[i].id === obj.id) {
        // update the properties that are different from payload
        Object.assign(state.orbits[orbIdx].nodes[i], obj)
      }
    }
  },
  create_node (state, payload) {
    let {data, metadata} = payload
    let orbIdx = 0
    let i = state.orbits[orbIdx].nodes.length // will organize the orbits
    data.pos = i
    state.orbits[orbIdx].createNode(data, metadata)
  },
  delete_node (state, payload) {
    let {node} = payload
    let orbIdx = 0
    for (var i = 0; i < state.orbits[orbIdx].nodes.length; i++) {
      if (state.orbits[orbIdx].nodes[i] === node) {
        if (state.orbits[orbIdx].nodes[i].point_to) { // delete the orbit it points to by tagging the orbit to delete
          var tmp = state.orbits[orbIdx].nodes[i].point_to
          axios.delete('/api/delpersistdata', {
            body: { tag: tmp, username: state.username }})
          .catch(e => {
            console.log(e)
          }).then(res => {
            if (res.err) {
              console.log('failed to get storage ' + res.err)
            } else {

            }
          })
        }
        state.orbits[orbIdx].nodes.splice(i, 1) // removes the node in array
      }
    }
  },
  update_tag (state, payload) {
    let {tag} = payload
    state.tag = tag
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

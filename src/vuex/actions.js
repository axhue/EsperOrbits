import axios from 'axios'

// the actions will update the local store as well as the database
// later on this will be optimized to be a batch process.
export const addNode = ({dispatch}, node) => {
  dispatch('add_node')
}

export const createNode = ({commit, dispatch}, payload) => {
  commit('create_node', payload)
  dispatch('updatePersist')
}

export const deleteNode = ({commit, state, dispatch}, payload) => {
  let {node} = payload
  commit('delete_node', payload)
  let newsync = state.sync - (node.time || 0) / 60
  dispatch('updateSync', {sync: newsync})
  dispatch('updatePersist')
}
export const createOrbit = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit('create_orbit', payload)
    resolve()
  })
}

export const setOrbit = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit('set_orbit', payload)
    resolve()
  })
}

export const updateSync = ({dispatch, state, commit}, payload) => {
  let {sync} = payload
  // updated vuex store
  let modSync = Number(sync.toFixed(2))
  commit('update_sync', {sync: modSync})
  // update database
  axios.put('/api/user_sync', {
    username: state.usr,
    sync: modSync
  })
  .catch(e => { console.log(e) })
  .then(res => { if (res.status === 400) { console.log('updateSync api error') } })
}

export const readSync = ({dispatch, commit}, payload) => {
  let {usr} = payload
  axios.get('/api/user_sync', {
    params: {
      username: usr
    }
  })
  .catch((e) => { console.log(e) })
  .then(res => {
    if (res.status === 200 && res.data.sync) {
      commit('update_sync', {sync: res.data.sync})
    } else { commit('update_sync', {sync: 0}) }
  })
}

export const init = ({dispatch, state, commit}, payload) => {
  let {val, ...init} = payload
  commit('init', init)
  let len = Object.keys(val).length
  for (let i = 0; i < len; i++) {
    dispatch('createOrbit', val[i])
  }
}

export const updatePersist = ({dispatch, state}) => {
  let creds = JSON.parse(localStorage.getItem('esper-login'))
  axios.put('/api/persistorbit', {
    username: creds.usr, time: new Date(), tag: state.tag, data: state.orbits})
    .catch(e => {
      console.log(e)
    }).then(res => {
      if (res.data.err) {
        console.log('failed to get storage ' + res.data.err)
      } else {
      }
    })
}

export const getPersist = ({dispatch, commit}, payload) => {
  // look for an orbit tag that corresponds to user else provide a default
  let {tag, fallback} = payload
  return new Promise((resolve, reject) => {
    let creds = JSON.parse(localStorage.getItem('esper-login'))
    dispatch('readSync', {usr: creds.usr})
    axios.get('/api/persistorbit', {
      params: {
        username: creds.usr, time: new Date(), tag: tag
      }
    })
      .catch(e => {
        console.log(e)
      }).then(doc => {
        if (doc.data.err) {
          console.log('failed to get storage')
        } else {
          let tmp = doc.data.res
          if (tmp != null) {
            dispatch('init', {val: tmp.data,
              tag: tmp.tag,
              usr: creds.usr})
            // dispatch('createOrbit', )
          } else {
            // no storage found, create a
            dispatch('init', {val: fallback,
              tag: tag,
              usr: creds.usr})
          }
        }
        resolve()
      })
  })
}

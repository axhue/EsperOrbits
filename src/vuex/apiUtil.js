import { axios } from 'axios'

// should validation be in this file because this file seem to be a bit too 
// redundent

function readSync (username) {
  return axios.get('/api/user_sync', {
    params: {
      username: username
    }
  })
	.catch((e) => {console.log(e)})
}

function updateSync (username, sync) {
  return axios.put('/api/user_sync', {
    username: username,
    sync: sync
  })
  .catch( e => {console.log(e)})
}

module.exports = {readSync}

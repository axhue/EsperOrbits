<template>
  <div class="login">
    <h1>Enter your login</h1>
    <form v-on:submit.prevent="login()">
      <input type="text" name="login" placeholder="Username" v-model.lazy="usr" autofocus>
      <input type="password" name="pswd" placeholder="Password" v-model.lazy="pswd">
      <button type="submit">Submit</button>
    </form>
    <p v-if="invalid_usr">INVALID USERNAME</p>
    <p> or </p>
    <h1>Signup</h1>
    <form v-on:submit.prevent="signup()">
      <input type="text" name="login" placeholder="Username" v-model.lazy="usr_signup">
      <input type="password" name="pswd" placeholder="Password" v-model.lazy="pswd_signup">
      <button type="submit">Submit</button>
    </form>
    <p v-if="invalid_usr_signup">INVALID USERNAME</p>
  </div>
</template>

<script>

import orbit from './Orbit/Orbit.vue'
import tasklist from './Todo/Tasklist.vue'
import router from '../router/index.js'
import axios from 'axios'
let API = '/api'
export default {
  name: 'login',
  data () {
    return {
      usr: '',
      pswd: '',
      usr_signup: null,
      pswd_signup: null,
      invalid_usr: false,
      invalid_usr_signup: false
    }
  },
  components: {
    orbit,
    tasklist
  },
  mounted: function () {
  },
  methods: {
    storeCreds (usr, pswd) {
      return new Promise((resolve, reject) => {
        let creds = JSON.stringify({usr: usr, pswd: pswd})
        localStorage.setItem('esper-login', creds)
        resolve()
      })
    },
    login () {
      this.invalid_usr = false
      axios.get(API + '/usercred', {
        params: {username: this.usr, pswd: this.pswd}
      })
      .then(res => {
        if (res.status === 400) {
          this.invalid_usr = true
        } else {
          this.storeCreds(this.usr, this.pswd)
          .then(router.push('/orbit/home'))
        }
      })
    },
    signup () {
      this.invalid_usr_signup = false
      axios.post(API + '/usercred', {
        body: {username: this.usr_signup, pswd: this.pswd_signup}
      })
      .then(res => {
        if (res.status === 400) {
          this.invalid_usr_signup = true
        } else {
          this.storeCreds(this.usr_signup,
                          this.pswd_signup)
          .then(router.push('/orbit/home'))
        }
      })
    },
    postPost (url, postBody, res) {
      // returns a promise
      return axios.put(API + url, {
        body: postBody
      })
      .catch(e => {
        console.log(e)
      })
      // async / await version (postPost() becomes async postPost())
      //
      // try {
      //   await axios.post(`http://jsonplaceholder.typicode.com/posts`, {
      //     body: this.postBody
      //   })
      // } catch (e) {
      //   this.errors.push(e)
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin: auto;

}
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


</style>

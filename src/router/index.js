import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Error from '@/components/Error'
import axios from 'axios'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        let creds = JSON.parse(localStorage.getItem('esper-login'))
        if (creds) {
          let {usr, pswd} = creds
          axios.get('/api/usercred', {
            params: {username: usr, pswd: pswd}
          })
          .catch(e => {
            console.log(e)
            next('error')
          }).then(res => {
            if (res.data.err) {
              next()
            } else {
              next('/orbit/home')
            }
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/orbit/:orbitTag',
      name: 'home',
      component: Home,
      props: true
      /*
      beforeEnter: (to, from, next) => {
        let creds = JSON.parse(localStorage.getItem('esper-login'))
        if (creds) {
          let {usr, pswd} = creds
          axios.post('/api/login', {
            body: {usr: usr, pswd: pswd}
          })
          .catch(e => {
            console.log(e)
            next('/error')
          }).then(res => {
            if (res.data.err) {
              next('/')
            } else {
              next()
            }
          })
        } else {
          next('/')
        }
      } */
    },
    {
      path: '/error',
      name: 'error',
      component: Error
    },
    {
      path: '*',
      redirect: Error
    }
  ]
})

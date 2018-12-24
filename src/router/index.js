import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Deliveries from '../components/Deliveries'
import Dashboard from '../components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        var token = sessionStorage.getItem('token')
        if (token) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/deliveries',
      name: 'deliveries',
      component: Deliveries,
      beforeEnter: (to, from, next) => {
        var token = sessionStorage.getItem('token')
        if (token) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

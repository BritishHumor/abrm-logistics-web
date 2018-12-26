import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Deliveries from '../components/Deliveries'
import Delivery from '../components/Delivery'
import Drivers from '../components/Drivers'
import Dashboard from '../components/Dashboard'
import Cargos from '../components/Cargos'
import Companies from '../components/Companies'
import Countries from '../components/Countries'
import Cities from '../components/Cities'
import Settings from '../components/Settings'

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
        var loggedIn = sessionStorage.getItem('loggedIn')
        if (loggedIn) {
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
        var loggedIn = sessionStorage.getItem('loggedIn')
        if (loggedIn) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: Drivers,
      beforeEnter: (to, from, next) => {
        var loggedIn = sessionStorage.getItem('loggedIn')
        if (loggedIn) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery,
      beforeEnter: (to, from, next) => {
        var loggedIn = sessionStorage.getItem('loggedIn')
        if (loggedIn) {
          next()
        } else {
          next({ name: 'login' })
        }
      }
    },
    {
      path: '/cargos',
      name: 'cargos',
      component: Cargos,
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
      path: '/companies',
      name: 'companies',
      component: Companies,
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
      path: '/countries',
      name: 'countries',
      component: Countries,
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
      path: '/cities',
      name: 'cities',
      component: Cities,
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
      path: '/settings',
      name: 'settings',
      component: Settings,
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

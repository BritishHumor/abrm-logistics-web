import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Toasted from 'vue-toasted'

import 'bootstrap'

window.serverUrl = 'http://abrm-mc.liamholmes.co.uk/api-abrm-logistics/public/api/'

Vue.use(Toasted, {
  theme: 'primary',
  position: 'bottom-center',
  duration: 12000,
  action: {
    text: 'Close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  },
  iconPack: 'material'
})

window.$ = window.jQuery = require('jquery')

require('./assets/fontawesome/css/all.css')
require('./assets/fontawesome/js/all.js')

require('./assets/css/bootstrapSuperhero.min.css')

window.$toasted = Vue.toasted

window.$router = router

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

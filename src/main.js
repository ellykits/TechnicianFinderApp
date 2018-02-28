// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================
// Require w3 css
require('w3css/w3.css')
require('w3css/w3-theme-khaki.css')
require ('font-awesome/css/font-awesome.css')
import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import VueFire from "vue-fire"

Vue.use(Quasar, VueAxios, Axios,VueFire) // Add plugins to Vue Framework

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})

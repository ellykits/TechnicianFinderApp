import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [{
      path: '/',
      component: load('Index')
    }, // Default
    {
      path: '/register/',
      component: load('Register')
    },
    {
      path: '/dashboard/:id',
      component: load('Dashboard')
    },
    {
      path: '/dashboard/:id/profile',
      component: load('Profile')
    },
    {
      path: '/dashboard/:id/logout',
      component: load('Logout')
    },
    {
      path: '/dashboard/:id/technician/:tid',
      component: load('TechnicianDetails')
    },
    {
      path: '/dashboard/:id/technicians',
      component: load('Technicians')
    },
     {
      path: '/dashboard/:id/favorites',
      component: load('Favorites')
    },
     {
      path: '/dashboard/:id/about',
      component: load('About')
    },
    {
      path: '/dashboard/:id/enquiries/:rqid',
      component: load('RequestDetails')
    },
     {
      path: '/dashboard/:id/enquiries',
      component: load('Enquiries')
    },
    {
      path: '*',
      component: load('Error404')
    } // Not found
  ]
})

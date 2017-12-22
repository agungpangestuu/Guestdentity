// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import '../node_modules/bulma/css/bulma.css'
// import '../node_modules/bulma-extensions/bulma-carousel/bulma-carousel.min.css'
// import '../node_modules/bulma-extensions/bulma-carousel/carousel.min.js'
// import '../node_modules/bulma-extensions/bulma-carousel/carousel.js'
// import '../node_modules/bulma-extensions/bulma-badge/bulma-badge.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

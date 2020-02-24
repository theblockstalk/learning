import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

// Using Bootstrap Vue
// https://bootstrap-vue.js.org/docs/components
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  store, // Vuex - Fulfils same purpose as Redux
  render: h => h(App),
}).$mount('#app')

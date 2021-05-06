import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store/store'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './url/api'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api

Vue.use(elementUI)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')

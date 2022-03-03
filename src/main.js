import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Components from '@/components/index.js'
import Api from '@/api/index.js'
import '@/assets/style/index.css'
import Mocks from '@/mock/index.js'
import utils from '@/utils/index.js'

Vue.use(ElementUI)
Vue.use(Components)
Vue.use(Api)
Vue.use(Mocks)
Vue.use(utils)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

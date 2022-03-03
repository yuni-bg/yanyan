import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let modules = {}
const requireModules = require.context('./moudle', false, /[A-Za-z]\w+\.(vue|js)$/)
requireModules.keys().forEach(fileName => {
  const moudle = requireModules(fileName)
  const moudleName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  modules[moudleName] = moudle.default || moudle
})
export default new Vuex.Store({
  modules,
  state: {
    token: 'defaultToken',
    userInfo: {}
  },
  mutations: {
    setToken(store, preload) {
      store.state.token = preload.token
    },
    setUserInfo(store, proload) {
      store.state.userInfo = proload.userInfo
    }
  },
  actions: {}
})

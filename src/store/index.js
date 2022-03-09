import Vue from 'vue'
import Vuex from 'vuex'
// import Vuex from '@/plugins/fvuex.js'
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
    userInfo: {},
    fart: 0// myvuex
  },
  getters: {
    squareFart(state) {
      return state.fart * state.fart
    }
  },
  mutations: {
    setToken(state, preload) {
      state.token = preload.token
    },
    setUserInfo(state, proload) {
      state.userInfo = proload.userInfo
    },
    addFart(state, proload) {
      state.fart = proload
    }
  },
  actions: {
    addAsyncFart({ commit }, preload) {
      setTimeout(() => {
        commit('addFart', preload)
      })
    }
  },
})

let Vue
class Store {
  constructor(options) {
    this.key = 'fff'
    this.state = new Vue({
      data: {
        ...options.state
      }
    })
    this.mutations = options.mutations
    this.actions = options.actions
    options.getters && this.handleGetters(options.getters)
  }
  handleGetters(getters) {
    this.getters = {}
    Object.keys(getters).forEach(item => {
      Object.defineProperty(this.getters, item, {
        get: () => {
          return getters[item](this.state)
        }
      })
    })
  }
  commit(key, value) {
    this.mutations[key](this.state, value)
  }
  dispatch(key, value) {
    this.actions[key](this.commit.bind(this), value)
  }
}
function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default {
  Store,
  install
}
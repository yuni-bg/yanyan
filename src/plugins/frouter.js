import Vue from 'vue'
/**路由功能
 * 插件
 * 路由配置解析
 * 监听url变化
 * router-view router-link
 */
class VueRouter {
  constructor(options) {
    this.key = 'fff'
    this.$options = options
    this.routeMap = {}
    this.routeNameMap = {}
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  init() {
    this.bindEvent()
    this.createRouteMap()
    this.initComponent()
  }
  bindEvent() {
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  createRouteMap() {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
      this.routeNameMap[item.name] = item.path
    })
  }
  initComponent() {
    // <router-link :to="/">fff</router-link>
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        //tag data children
        return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default])
      }
    })
    // <router-view/>
    Vue.component('router-view', {
      render: (h) => {
        return h(this.routeMap[this.app.current])
      }
    })
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  push(param) {
    // push是path还是对象
    // this.$router.push('/')  this.$router.push({ name: 'myForm' }) this.$router.push({ path: '/myForm' })
    let path = '/'
    if (typeof param === 'string') {
      path = param
    } else if (param.name) {
      path = this.routeNameMap[param.name]
    } else if (param.path) {
      path = param.path
    }
    this.app.current = path
    window.location.hash = '#' + path
  }
}
VueRouter.install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}
export default VueRouter

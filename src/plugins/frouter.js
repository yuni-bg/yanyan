import Vue from 'vue'
/**
 * 路由实现思路：
 * 1.插件
 * 2.全局可访问
 * 3.路由map
 * 4.监听url
 * 5.router-view router-link实现插件
 **/
class VueRouter {
  constructor({ routes }) {
    this.routes = routes
    this.fff = true
    this.current = new Vue({
      data: {
        path: '/'
      }
    })
    this.routerMap = {}
  }
  init() {
    this.initRouteMap()
    this.listenUrl()
    this.initComponent()
  }
  initRouteMap() {
    this.routes.forEach(item => {
      const redirectCom = item.redirect && this.routes.find(route => route.name === item.redirect)
      this.routerMap[item.path] = {
        component: item.component || redirectCom.component,
        name: item.name || redirectCom.name,
      }
    })
  }
  listenUrl() {
    window.addEventListener('load', this.dealHashChange.bind(this))
    window.addEventListener('hashchange', this.dealHashChange.bind(this))
  }
  dealHashChange() {
    const hash = window.location.hash.slice(1)
    this.current.path = hash || '/'
  }
  initComponent() {
    // <router-link to="/home">去home</router-link>
    Vue.component('router-link', {
      props: { to: String },
      render(h) {
        // tag data children
        return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default])
      }
    })
    // < router-view />
    Vue.component('router-view', {
      render: (h) => {
        return h(this.routerMap[this.current.path].component)
      }
    })
  }
  push(newRoute) {
    let path = '/'
    if (newRoute.name) {
      const curItem = this.routes.find(item => item.name === newRoute.name)
      path = curItem.path
    } else if (newRoute.path) {
      path = newRoute.path
    } else {
      path = newRoute
    }
    window.location.hash = '#' + path || '/'
    this.current.path = path || '/'
  }
  afterEach(fn) {
    console.log('afterEach')
    if (fn && typeof fn === 'function') fn(arguments)
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

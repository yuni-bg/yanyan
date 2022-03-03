import Vue from 'vue'
// import VueRouter from '@/plugins/frouter'

import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// import { MessageBox } from 'element-ui'
Vue.use(VueRouter)
//获取原型对象上的push函数
const routes = [
  {
    path: '/',
    redirect: 'Home',
    // name: 'Home',
    // meta: { name: '首页' },
    // component: () => import('@/views/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: { name: '首页' },
    component: () => import('@/views/index.vue')
  },
  {
    path: '/myForm',
    name: 'myForm',
    meta: { name: 'Form组件封装' },
    component: () => import('@/views/myForm/index.vue')
  },
  {
    path: '/myNotice',
    name: 'myNotice',
    meta: { name: 'myNotice组件封装' },
    component: () => import('@/views/myNotice.vue')
  },
  {
    path: '/myTree',
    name: 'myTree',
    meta: { name: 'myTree组件封装' },
    component: () => import('@/views/myTree')
  }, {
    path: '/routerGuard',
    name: 'routerGuard',
    meta: { name: '路由', auth: true },
    component: () => import('@/views/routerGuard')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes,
  base: process.env.BASE_URL,
})
// 异步
// router.addRoutes(routes)
// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth) {
//     MessageBox.confirm('是否登录?', '验证鉴权', {
//       type: 'info'
//     }).then(() => {
//       next()
//     }).catch(() => {
//       next('Home')
//     })
//   } else next()
// })

export default router
export {
  routes
}

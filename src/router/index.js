import MyVueRouter from '@/plugins/frouter'
import routes from './routes'
import VueRouter from 'vue-router'
// import { MessageBox } from 'element-ui'
import Vue from 'vue'
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  //获取原型对象上的push函数
  return originalPush.call(this, location).catch(err => err)
}

const defaultRouter = !!localStorage.getItem('paojiao_router')
const VueRouterFinally = defaultRouter ? VueRouter : MyVueRouter
Vue.use(VueRouterFinally)
const router = new VueRouterFinally({
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

const routes = [
  {
    path: '/',
    redirect: 'Home',
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
    path: '/myRouter',
    name: 'myRouter',
    meta: { name: '路由', auth: true },
    component: () => import('@/views/myRouter')
  }, {
    path: '/myVuex',
    name: 'myVuex',
    meta: { name: 'Vuex', auth: true },
    component: () => import('@/views/myVuex')
  }
]
export default routes
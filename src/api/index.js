import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store'
import router from '@/router'

let loading = null
let requestCount = 0
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (!config.noLoading) {
      requestCount++
      // 增加loading特效
      loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.token = token)
    config.headers = {
      ...config.headers,
      token: store.state.token,
      userInfo: store.state.userInfo
    }
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (!response.config.noLoading && loading) {
      requestCount--
      requestCount < 1 && loading.close()
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({
            message: '登录过期，请重新登录',
            duration: 1000
          })
          // 清除token
          store.commit('token', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break

        // 404请求不存在
        case 404:
          Message({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          })
      }
      return Promise.reject(error.response)
    }
  }
)

const base = {
  user: '/userservice'
}

const http = {
  axios,
  get: (url, params, config) => axios.get(url, Object.assign({ params }, config)),
  post: (url, params, config) => axios.post(url, Object.assign({ params }, config))
}
let api = {}
const serviceFile = require.context('./service', false, /[A-Za-z]\w+\.js$/)
serviceFile.keys().forEach(fileName => {
  const apiConfig = serviceFile(fileName)
  const apiName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  api[apiName] = apiConfig.default(base, http)
})
export default {
  install(Vue) {
    Vue.prototype.$http = http
    Vue.prototype.$api = api
  }
}

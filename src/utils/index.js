import dayjs from 'dayjs'
const plugins = { day: dayjs }
const requireUtils = require.context('./', false, /[a-zA-Z]\w+\.js/)

requireUtils.keys().forEach(fileName => {
  if (fileName !== 'index.js') {
    const utilsName = fileName.split('./').pop().replace(/\.\w+$/, '')
    plugins[utilsName] = requireUtils(fileName).default || requireUtils(fileName)
  }
})
const utils = {}
export default {
  install(Vue) {
    // 挂载插件
    Object.keys(plugins).forEach(key => {
      Vue.prototype['$' + key] = plugins[key]
    })
    // 挂载utils
    Object.keys(utils).forEach(key => {
      Vue.prototype.$utils[key] = utils[key]
    })
  }
}
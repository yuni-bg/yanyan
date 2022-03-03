// 自动注册common下的组件
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './common',
  false,
  /[A-Za-z]\w+\.(vue|js)$/
)
// 直接引用插件注册可以引入，在components里面写好，实现自动注册
let components = {}
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  components[componentName] = componentConfig.default || componentConfig
})

export default {
  install(Vue) {
    Object.keys(components).forEach((componentName) => {
      Vue.component(componentName, components[componentName])
    })
  }
}

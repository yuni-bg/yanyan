import Vue from 'vue'
const create = function (Components, props) {
  // 先创建
  const vm = new Vue({
    render(h) {
      return h(Components, { props })
    }
  }).$mount()
  // 手动挂载
  // 真实dom vm.$el 
  document.body.appendChild(vm.$el)
  const comp = vm.$children[0]
  comp.remove = function () {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}
export default create
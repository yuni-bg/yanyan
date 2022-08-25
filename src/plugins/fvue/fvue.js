class fVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.observe(options.data)
    // 测试 
    new Watcher(this, 'msg')
    this.msg
  }
  observe(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.proxyData(key)
        this.dealReactive(data, key, data[key])
      })
    }
  }
  dealReactive(data, key, value) {
    this.observe(value)
    const dep = new Dep()
    Object.defineProperty(data, key, {
      get() {
        Dep.target && dep.addDep(Dep.target)
        return value
      },
      set(newVal) {
        if (newVal !== value) {
          value = newVal
          dep.notify()
        }
      }
    })
  }
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}
// 同一个key的依赖收集，一个key，一个dep
class Dep {
  constructor() {
    this.deps = []
  }
  addDep(watcher) {
    this.deps.push(watcher)
  }
  notify() {
    this.deps.forEach(watcher => { watcher.update() })
  }
}
class Watcher {
  constructor(vm, key) {
    this.vm = vm
    this.key = key
    Dep.target = this
  }
  update() {
    console.log(this.key + '更新了')
  }
}

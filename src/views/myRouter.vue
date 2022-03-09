<template>
  <div>
    路由页面:{{message}}
    <h3>路由实现原理</h3>
    <ul>
      <li>插件</li>
      <li>监听url变化</li>
      <li>路由配置解析：</li>
      <li>实现全局组件 router-link router-view</li>
    </ul>
    <h4>实现代码在：@/plugins/frouter.js</h4>
    <div v-if="$router.key==='fff'">
      <h3>router替换为自己的router后可见</h3>
      <el-button type="primary" @click="toHomeByPath">点击使用path跳转到首页</el-button>
      <el-button type="primary" @click="toHomeByName">点击使用{name}跳转到首页</el-button>
      <el-button type="primary" @click="toHomeByPath2">点击使用{path}跳转到首页</el-button>
      <router-link to="/">一个跳转到home的routerlink</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouterGuard',
  components: {},
  props: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$message.warning(vm.message)
    })
  },
  data() {
    return {
      message: '路由守卫页面组件data'
    }
  },
  computed: {},

  created() {},
  mounted() {},
  methods: {
    toHomeByPath() {
      this.$router.push('/home')
    },
    toHomeByName() {
      this.$router.push({ name: 'Home' })
    },
    toHomeByPath2() {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style scoped lang="less">
</style>

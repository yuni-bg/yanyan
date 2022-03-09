<template>
  <div>
    <h3>自定义Vuex需要做的事情</h3>
    <ul>
      <li>插件</li>
      <li>Store：new Vuex.Store({})</li>
      <li>Store的state、getter、mutations、</li>
      <li>响应式：在state变化后通知页面修改;(同vue-router一样，强依赖了vue原理，所以只能用在vue中)</li>
    </ul>
    <div>
      <h4 v-if="$store.key==='fff'">只有用自己的vuex才展示</h4>
      <h4 v-else>用的不是自己的vuex</h4>
      <div>$store.state.fart: 放了{{$store.state.fart}}个屁</div>
      <div>$store.getters.squareFart: 放了{{$store.getters.squareFart }}个屁</div>
      <el-button type="primary" @click="addFart">点此放屁</el-button>
      <el-button type="primary" @click="addAsyncFart">点此放异步屁</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyVuex',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    addFart() {
      const count = this.$store.state.fart + 1
      this.$store.commit('addFart', count)
    },
    addAsyncFart() {
      const count = this.$store.state.fart + 1
      this.$store.dispatch('addAsyncFart', count)
    }
  }
}
</script>

<style scoped lang="less">
</style>

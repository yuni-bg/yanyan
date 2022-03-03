<template>
  <div id="app">
    <Menu />
    <div id="right-content">
      <bread-crumb class="bread-crumb" />
      <router-view />
    </div>
  </div>
</template>
<script>
import Menu from '@/views/common/menu'
export default {
  name: 'APP',
  components: { Menu },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less">
#app {
  display: flex;
  height: 100vh;
  width: 100%;
  #right-content {
    height: 100vh;
    width: 100%;
    padding: 20px;
    > div {
      height: calc(100% - 50px);
    }
    .bread-crumb {
      width: 100%;
      height: 50px;
    }
  }
}
</style>

<template>
  <el-menu
    default-active="Home"
    class="menu"
    @select="handleSel">
    <el-menu-item v-for="menu in menus" :index="menu.name" :key="menu.name">
      <i class="el-icon-document"></i>
      <span slot="title">{{menu.meta.name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { routes } from '@/router/index'
export default {
  name: 'Menu',
  components: {},
  props: {},

  computed: {
    menus() {
      return routes.filter(item => item.path !== '/')
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleSel(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style scoped lang="less">
.menu {
  width: 300px;
}
</style>

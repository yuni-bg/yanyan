<template>
  <el-breadcrumb separator="/" class="bread-crumb">
    <el-breadcrumb-item>泡泡</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in crumbData" :key="item.name" :to="{ path: item.path }">{{item.menuName}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return { crumbData: [] }
  },
  computed: {},
  watch: {
    $route() {
      const crumbData = this.$route.matched
      this.crumbData = crumbData.map(item => {
        return { path: item.path, name: item.name, menuName: item.meta.name }
      })
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
</style>

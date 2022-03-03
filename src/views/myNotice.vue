<template>
  <div>
    <el-input v-model="msg" placeholder="输入msg"></el-input>
    <el-button type="primary" @click="handleClick">点击提示</el-button>
  </div>
</template>

<script>
export default {
  name: 'MyNotice',
  components: {},
  props: {},
  data() {
    return { msg: '' }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      this.$notice({ message: this.msg, duration: 3000 })
    }
  }
}
</script>

<style scoped lang="less">
</style>

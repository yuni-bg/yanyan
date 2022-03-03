<template>
  <ul>
    <li v-for="(item,index) in data" :key="index" @click.stop="toggle(item)">
      {{item.name}}
      <span v-if="item.children&&item.children.length" class="tree-folder">{{item.show?'-':'+'}}</span>
      <tree-item v-if="item.children&&item.children.length" :data="item.children" v-show="item.show" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TreeItem',
  components: {},
  props: { data: Array },
  data() {
    return { show: false }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toggle(item) {
      this.$set(item, 'show', !item.show)
    }
  }
}
</script>

<style scoped lang="less">
.tree-folder {
  cursor: pointer;
}
</style>

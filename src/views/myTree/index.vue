<template>
  <tree-item :data="treeData" />
</template>

<script>
import treeItem from './tree-item.vue'
export default {
  name: 'MyTree',
  components: { treeItem },
  props: {},
  data() {
    return {
      treeData: [
        {
          name: '前端学习之路，加油',
          children: [
            {
              name: 'HTML&&CSS',
              children: [{ name: '初级HTML和初级CSS' }, { name: 'HTML5&&CSS3' }]
            },
            {
              name: 'JavaScript',
              children: [
                { name: '初级JavaScript' },
                {
                  name: '高级JavaScript',
                  children: [
                    { name: 'ES6' },
                    { name: 'BOM' },
                    { name: 'DOM' },
                    { name: '浏览器知识' },
                    { name: 'TypeScript' }
                  ]
                }
              ]
            },
            {
              name: '框架',
              children: [
                { name: 'Vue' },
                { name: 'React' },
                { name: 'Uni-app' }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
</style>

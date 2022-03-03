<template>
  <div :style="{height}">
    <slot />
    <div v-if="isPage" class="pagination" :style="{'text-align':align}">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :total="total"
        :page-size="pageSize"
        :layout="layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
/* 使用tips
 * PagedTable组件是一个将el-table和el-pagination结合到一起的组件
 * 1.props
 * 1.1 pageSize
 * 1.2 currentPage
 * 1.3 total
 * 1.4 height,整体table+pagination的高度，默认100%
 * 1.5 layout,分页布局参数，可传可不传，有默认值
 * 1.6 pageSizes,分页页数，可传可不传，有默认值
 * 1.7 isPage,是否分页，可传可不传，有默认值true
 * 1.8 align,分页对齐方式，左中右，默认中
 * 2.slot el-table作为插槽传进来
 * 3.emit
 * 3.1 size-change
 * 3.2 current-change
 * 使用示例：
  <paged-Table :current-page="currentPage" :page-size="pageSize" :total="total" :height="height" :layout="layout" :align="align" :isPage="false" :page-Sizes="pageSizes" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    <el-table></el-table>
  </paged-Table>
 */
export default {
  name: 'PagedTable',
  components: {},
  props: {
    align: {
      type: String,
      default: 'center'
    },
    isPage: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '100%'
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 50, 100, 200]
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('size-change', size)
    },
    handleCurrentChange(cur) {
      this.$emit('current-change', cur)
    }
  }
}
</script>

<style scoped lang="less">
.pagination {
  padding-top: 8px;
}
</style>

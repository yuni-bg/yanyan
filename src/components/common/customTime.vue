<template>
  <el-row>
    <el-col :span="11">
      <el-date-picker v-model="start" :type="type" :size="size" placeholder="请选择" :value-format="format" :picker-options="startPicker" @change="changeDate()" />
    </el-col>
    <el-col :span="2" style="text-align:center">{{ separator }}</el-col>
    <el-col :span="11">
      <el-date-picker v-model="end" :type="type" :size="size" placeholder="请选择" :value-format="format" :picker-options="endPicker" @change="changeDate(true)" />
    </el-col>

  </el-row>
</template>

<script>
// 自定义时间组件
// 实现通过props配置
// props
// startDate: 开始时间
// endDate: 结束时间
// type: 显示类型，同elementui,
// format: 时间格式，同elementui(这里有个bug，因为day和elementui的数据格式不同，目前只有yyyy-MM-dd的时候可以用，其他格式待优化)
// dayRange：可选时间范围（xx天）
// monthRange：可选月份范围（xx天）
// offset：默认日期的偏移
// separator：起始和结束时间分隔符
// size
// 使用示例
// <custom-time :start-date.sync="dailyForm.date[0]" :end-date.sync="dailyForm.date[1]" offset="-1" month-range="6" />
export default {
  name: 'CustomTime',
  props: {
    type: {
      type: String,
      default: 'date'
    },
    dayRange: {
      type: [Number, String],
      default: '0'
    },
    monthRange: {
      type: [Number, String],
      default: '12'
    },
    offset: {
      type: [Number, String],
      default: '1,d'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    separator: {
      type: String,
      default: '至'
    },
    startDate: { type: [Number, String], default: null },
    endDate: { type: [Number, String], default: null },
    size: { type: String, default: 'mini' }
  },
  data() {
    return {
      start: this.default(),
      end: this.default(true),
      startPicker: {
        disabledDate: time => {
          let disabled = false
          const offset = this.offset.split(',')[0]
          if (offset && offset > 0) {
            disabled = time.getTime() < this.toTimestamp(this.default())
          } else {
            disabled = time.getTime() > this.toTimestamp(this.default())
          }
          return disabled
        }
      },
      endPicker: {
        disabledDate: time => {
          const end = this.toTimestamp(
            this.$day(this.start)
              .add(this.dayRange, 'd')
              .add(this.monthRange, 'M')
          )
          let disabled = false
          const offset = this.offset.split(',')[0]
          if (offset && offset > 0) {
            // 结束时间小于于默认结束日期
            // 超出基于起始日期的可选范围
            // 时间小于开始日期
            disabled =
              time.getTime() < this.toTimestamp(this.default(true)) ||
              time.getTime() > end ||
              time.getTime() < this.toTimestamp(this.start)
          } else {
            // 结束时间大于默认结束日期
            // 超出基于起始日期的可选范围
            // 时间小于开始日期
            disabled =
              time.getTime() > this.toTimestamp(this.default(true)) ||
              time.getTime() > end ||
              time.getTime() < this.toTimestamp(this.start)
          }
          return disabled
        }
      }
    }
  },
  methods: {
    default(isEnd) {
      let time = this.$day()
      const offset = this.offset.split(',')[0]
      const offsetUnit = this.offset.split(',')[1] || 'd'
      // 先计算其实日期
      // 如果偏移量大于零是向后前偏移，小于零是向前
      time = time.add(offset, offsetUnit)
      // 如果需要结束日期则继续计算
      if (isEnd) {
        const end = this.$day(time)
          .add(this.dayRange, 'd')
          .add(this.monthRange, 'M')

        // 如果计算后结束时间大于当前，则取当前
        time = end.unix() > time.unix() ? time : end
      }
      time = time.format(this.format.toUpperCase())
      return time
    },
    changeDate(isEnd) {
      this.$emit(
        `update:${isEnd ? 'endDate' : 'startDate'}`,
        isEnd ? this.end : this.start
      )
      if (!isEnd) {
        // 开始时间改变，如果结束时间超出了range范围，则修改为range边界值
        const end = this.toTimestamp(
          this.$day(this.start)
            .add(this.dayRange, 'd')
            .add(this.monthRange, 'M')
        )
        if (this.toTimestamp(this.end) > end) {
          this.end = this.$day(end).format(this.format.toUpperCase())
        }
      }
    },
    toTimestamp(time) {
      return this.$day(time).unix() * 1000
    }
  }
}
</script>

<style scoped lang="less">
</style>

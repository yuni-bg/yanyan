<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot />
    <div v-if="errorMsg" class="error-msg">{{errorMsg}}</div>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  name: 'FwFormItem',
  inject: ['form'],
  components: {},
  props: { label: String, prop: String },
  data() {
    return { errorMsg: '' }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate() {
      // 做校验
      const value = this.form.model[this.prop]
      const rule = this.form.rules[this.prop]
      const desc = { [this.prop]: rule }
      const schema = new Schema(desc)
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errorMsg = errors[0].message
        } else {
          this.errorMsg = ''
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.error-msg {
  font-size: 12px;
  color: red;
}
</style>

<template>
  <div>
    fwForm
    <slot />
  </div>
</template>

<script>
// Form
export default {
  name: 'FwForm',
  components: {},
  provide() {
    return { form: this }
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelWidth: {
      type: String,
      default: '60px'
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    validate(cb) {
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      Promise.all(tasks)
        .then(() => {
          cb(true)
        })
        .catch(() => {
          cb(false)
        })
    }
  }
}
</script>

<style scoped lang="less">
</style>

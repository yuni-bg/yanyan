<template>
  <input :value="value" v-bind="$attrs" @input="handleInput">
</template>

<script>
export default {
  name: 'FwInput',
  inject: ['form'],
  components: {},
  props: { inheritAttrs: false, value: { type: String, default: '' } },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleInput($event) {
      this.$emit('input', $event.target.value)
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style scoped lang="less">
</style>

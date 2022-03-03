<template>
  <fw-form ref="fwForm" :model="fwForm" label-width="80px" :rules="rules">
    <fw-form-item prop="name" label="姓名">
      <fw-input v-model="fwForm.name" type="text" autocomplete="false" placeholder="请输入姓名"></fw-input>
    </fw-form-item>
    <fw-form-item prop="password" label="密码">
      <fw-input v-model="fwForm.password" type="password" autocomplete="false" placeholder="请输入密码"></fw-input>
    </fw-form-item>
    <fw-form-item>
      <button @click="submit">提交</button>
    </fw-form-item>
  </fw-form>
</template>

<script>
import FwForm from './fwForm'
import FwFormItem from './fwFormItem.vue'
import FwInput from './fwInput'
export default {
  name: 'MyForm',
  components: { FwForm, FwFormItem, FwInput },
  props: {},
  data() {
    return {
      fwForm: { name: '', password: '' },
      rules: {
        name: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submit() {
      this.$refs.fwForm.validate(valid => {
        if (valid) {
          alert('校验成功')
        } else {
          alert('校验失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>

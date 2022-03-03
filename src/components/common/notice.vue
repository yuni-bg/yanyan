<template>
  <div class="notice-div" v-show="visible">
    <div class="title">{{title}}</div>
    <div class="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  components: {},
  props: {
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return { visible: false }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.show()
  },
  methods: {
    show() {
      this.visible = true
      setTimeout(this.hide, this.duration)
    },
    hide() {
      this.visible = false
      this.remove()
    }
  }
}
</script>

<style scoped lang="less">
.notice-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #faa;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  .title {
    width: 40px;
    font-weight: bold;
  }
  .message {
    min-width: 100px;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

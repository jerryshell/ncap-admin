<template>
  <div class="d2-container-ghost">
    <div class="d2-container-ghost__header" ref="header" v-if="$slots.header">
      <slot name="header"/>
    </div>
    <div class="d2-container-ghost__body" ref="body">
      <slot/>
    </div>
    <div class="d2-container-ghost__footer" ref="footer" v-if="$slots.footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'

export default {
  name: 'd2-container-ghost',
  mixins: [
    scroll,
  ],
  mounted () {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy () {
    // 移除滚动事件监听
    this.removeScrollListener()
  },
}
</script>

<template>
  <div class="d2-container-ghost-bs">
    <div class="d2-container-ghost-bs__header" ref="header" v-if="$slots.header">
      <slot name="header"/>
    </div>
    <div class="d2-container-ghost-bs__body" ref="wrapper">
      <!-- https://github.com/d2-projects/d2-admin/issues/181 -->
      <div>
        <slot/>
      </div>
    </div>
    <div class="d2-container-ghost-bs__footer" ref="footer" v-if="$slots.footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs'

export default {
  name: 'd2-container-card-bs',
  mixins: [
    bs,
  ],
}
</script>

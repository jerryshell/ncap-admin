<template>
  <el-button @click="handleClick" class="d2-mr btn-text can-hover" type="text">
    <d2-icon name="search" style="font-size: 18px;"/>
  </el-button>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    },
  },
}
</script>

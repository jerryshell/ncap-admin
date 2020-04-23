<template>
  <el-tooltip :content="active ? '退出全屏' : '全屏'" effect="dark" placement="bottom">
    <el-button @click="toggle" class="d2-mr btn-text can-hover" type="text">
      <d2-icon name="compress" v-if="active"/>
      <d2-icon name="arrows-alt" style="font-size: 16px" v-else/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('d2admin/fullscreen', [
      'active',
    ]),
  },
  methods: {
    ...mapActions('d2admin/fullscreen', [
      'toggle',
    ]),
  },
}
</script>

<template>
  <el-dropdown class="d2-mr" size="small">
    <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon class="d2-mr-5" name="power-off"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('d2admin/user', [
      'info',
    ]),
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout',
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true,
      })
    },
  },
}
</script>

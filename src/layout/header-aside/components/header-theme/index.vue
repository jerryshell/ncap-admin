<template>
  <div>
    <el-tooltip
      content="主题"
      effect="dark"
      placement="bottom">
      <el-button
        @click="dialogVisible = true"
        class="d2-ml-0 d2-mr btn-text can-hover"
        type="text">
        <d2-icon
          name="diamond"
          style="font-size: 16px"/>
      </el-button>
    </el-tooltip>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      title="主题"
      width="600px">
      <d2-theme-list style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
import themeList from './components/d2-theme-list'

export default {
  components: {
    'd2-theme-list': themeList,
  },
  data () {
    return {
      dialogVisible: false,
    }
  },
}
</script>

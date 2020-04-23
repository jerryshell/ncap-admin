<template>
  <el-dropdown @command="handleChange" placement="bottom" size="small">
    <el-button class="d2-mr btn-text can-hover" type="text">
      <d2-icon name="font" style="font-size: 16px;"/>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :command="item.value" :key="item.value" v-for="item in options">
        <d2-icon :name="iconName(item.value)" class="d2-mr-5"/>
        {{item.label}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'd2-header-size',
  data () {
    return {
      options: [
        { label: '默认', value: 'default' },
        { label: '中', value: 'medium' },
        { label: '小', value: 'small' },
        { label: '最小', value: 'mini' },
      ],
    }
  },
  computed: {
    ...mapState('d2admin/size', [
      'value',
    ]),
  },
  methods: {
    ...mapMutations({
      pageKeepAliveClean: 'd2admin/page/keepAliveClean',
    }),
    ...mapActions({
      sizeSet: 'd2admin/size/set',
    }),
    handleChange (value) {
      this.sizeSet(value)
      this.$notify({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: '已更新页面内 <b>组件</b> 的 <b>默认尺寸</b><br/>例如按钮大小，<b>非字号</b>',
        type: 'success',
      })
    },
    iconName (name) {
      return name === this.value ? 'dot-circle-o' : 'circle-o'
    },
  },
}
</script>

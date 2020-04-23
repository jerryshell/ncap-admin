<template>
  <d2-container>
    <el-table
      :data="log"
      empty-text="暂无日志信息"
      size="mini"
      stripe
      style="width: 100%">
      <!-- 时间 -->
      <el-table-column
        label="Time"
        prop="time"
        width="140">
      </el-table-column>
      <!-- 信息 -->
      <el-table-column
        label="Message"
        prop="message">
      </el-table-column>
      <!-- 触发页面 -->
      <el-table-column
        align="center"
        label="Url"
        min-width="200">
        <template slot-scope="scope">
          {{get(scope.row, 'meta.url')}}
        </template>
      </el-table-column>
      <!-- 触发组件 -->
      <el-table-column
        align="center"
        label="Tag"
        min-width="120">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            type="info"
            v-if="get(scope.row, 'meta.instance.$vnode.componentOptions.tag')">
            &#60;{{get(scope.row, 'meta.instance.$vnode.componentOptions.tag')}}&gt;
          </el-tag>
        </template>
      </el-table-column>
      <!-- 查看详情 -->
      <el-table-column
        align="center"
        fixed="right"
        label="More"
        width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleShowMore(scope.row)"
            size="mini"
            type="primary">
            <d2-icon name="eye"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      :loading="uploading"
      @click="handleUpload"
      size="mini"
      slot="footer"
      type="primary">
      <d2-icon name="cloud-upload"/>
      Upload {{log.length}} log data
    </el-button>
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'

export default {
  data () {
    return {
      uploading: false,
    }
  },
  computed: {
    ...mapState('d2admin/log', [
      'log',
    ]),
  },
  methods: {
    get,
    handleShowMore (log) {
      // 打印一条日志的所有信息到控制台
      this.$notify({
        type: 'info',
        title: '日志详情',
        message: '完整的日志内容已经打印到控制台',
      })
      this.$log.capsule('D2Admin', 'handleShowMore', 'primary')
      console.group(log.message)
      console.log('time: ', log.time)
      console.log('type: ', log.type)
      console.log(log.meta)
      console.groupEnd()
    },
    // 日志上传
    handleUpload () {
      this.uploading = true
      this.$notify({
        type: 'info',
        title: '日志上传',
        message: `开始上传${this.log.length}条日志`,
      })
      setTimeout(() => {
        this.uploading = false
        this.$notify({
          type: 'success',
          title: '日志上传',
          message: '上传成功',
        })
      }, 3000)
    },
  },
}
</script>

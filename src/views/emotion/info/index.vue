<template>
  <d2-container>
    <template slot="header">
      <el-switch
        @change="handleAutoFetchDataFlagChange"
        active-text="开启自动刷新"
        inactive-text="关闭自动刷新"
        v-model="autoFetchDataFlag">
      </el-switch>
    </template>

    <el-row :gutter="20" style="text-align: center">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="clearfix" slot="header">
            <span>情感分析系统</span>
          </div>
          <span>状态：</span>
          <el-tag type="success" v-if="info.analyseServer.ok">上线</el-tag>
          <el-tag type="danger" v-if="!info.analyseServer.ok">离线</el-tag>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="clearfix" slot="header">
            <span>评论采集系统</span>
          </div>
          <span>状态：</span>
          <el-tag type="success" v-if="info.spiderServer.ok">上线</el-tag>
          <el-tag type="danger" v-if="!info.spiderServer.ok">离线</el-tag>
        </el-card>
      </el-col>
    </el-row>

  </d2-container>
</template>

<script>
import infoApi from '../../../api/emotion.info'

export default {
  data () {
    return {
      info: {
        analyseServer: {
          ok: false,
        },
        spiderServer: {
          ok: false,
        },
      },
      autoFetchDataInterval: undefined,
      autoFetchDataFlag: false,
    }
  },
  created () {
    this.fetchData()
  },
  beforeDestroy () {
    // 取消自动刷新
    clearInterval(this.autoFetchDataInterval)
  },
  methods: {
    fetchData () {
      this.getInfo()
    },
    getInfo () {
      infoApi.getInfo().then(response => {
        console.log('getInfo()', response)
        this.info = response
      })
    },
    handleAutoFetchDataFlagChange (newFlag) {
      if (newFlag) {
        // 刷新页面数据
        this.fetchData()
        // 自动刷新数据
        this.autoFetchDataInterval = setInterval(this.fetchData, 2000)
        console.log('autoFetchDataInterval', this.autoFetchDataInterval)
        return
      }
      // 取消自动刷新
      clearInterval(this.autoFetchDataInterval)
    },
  },
}
</script>

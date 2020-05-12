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
          <p>
            状态：
            <el-tag type="success" v-if="info.analyseServer.ok">上线</el-tag>
            <el-tag type="danger" v-if="!info.analyseServer.ok">离线</el-tag>
          </p>
          <div v-if="info.analyseServer.ok">
            <p>
              1 分钟系统负载：
              <el-tag>{{info.analyseServer.loadavg.loadavg_1}}</el-tag>
            </p>
            <p>
              5 分钟系统负载：
              <el-tag>{{info.analyseServer.loadavg.loadavg_5}}</el-tag>
            </p>
            <p>
              15 分钟系统负载：
              <el-tag>{{info.analyseServer.loadavg.loadavg_15}}</el-tag>
            </p>
            <p>
              内存：
              <el-tag>{{info.analyseServer.meminfo.MemTotal}}</el-tag>
            </p>
            <p>
              剩余内存：
              <el-tag>{{info.analyseServer.meminfo.MemFree}}</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="clearfix" slot="header">
            <span>评论采集系统</span>
          </div>
          <p>
            状态：
            <el-tag type="success" v-if="info.spiderServer.ok">上线</el-tag>
            <el-tag type="danger" v-if="!info.spiderServer.ok">离线</el-tag>
          </p>
          <div v-if="info.spiderServer.ok">
            <p>
              1 分钟系统负载：
              <el-tag>{{info.spiderServer.loadavg.loadavg_1}}</el-tag>
            </p>
            <p>
              5 分钟系统负载：
              <el-tag>{{info.spiderServer.loadavg.loadavg_5}}</el-tag>
            </p>
            <p>
              15 分钟系统负载：
              <el-tag>{{info.spiderServer.loadavg.loadavg_15}}</el-tag>
            </p>
            <p>
              内存：
              <el-tag>{{info.spiderServer.meminfo.MemTotal}}</el-tag>
            </p>
            <p>
              剩余内存：
              <el-tag>{{info.spiderServer.meminfo.MemFree}}</el-tag>
            </p>
          </div>
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
          loadavg: {
            loadavg_1: '',
            loadavg_5: '',
            loadavg_15: '',
          },
          meminfo: {
            MemTotal: '',
            MemFree: '',
          },
        },
        spiderServer: {
          ok: false,
          loadavg: {
            loadavg_1: '',
            loadavg_5: '',
            loadavg_15: '',
          },
          meminfo: {
            MemTotal: '',
            MemFree: '',
          },
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

<template>
  <d2-container>
    <template slot="header">
      <el-button @click="gotoNewsPage" type="primary">查看新闻页面</el-button>
    </template>

    <el-row :gutter="20">
      <el-col :span="12">

        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="box-card" shadow="always">
              <div class="clearfix" slot="header">
                <span>新闻标题</span>
              </div>
              <div style="text-align: center">
                <h3>{{task.newsTitle}}</h3>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="24">
            <el-card class="box-card" shadow="always">
              <div class="clearfix" slot="header">
                <span>任务状态</span>
              </div>
              <div style="text-align: center">
                <el-progress :center="true" :percentage="task.progress" type="dashboard"></el-progress>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="12">
            <el-card class="box-card" shadow="always">
              <div class="clearfix" slot="header">
                <span>任务状态</span>
              </div>
              <div style="text-align: center">
                <el-tag v-if="task.status === 0">正在采集新闻数据</el-tag>
                <el-tag v-if="task.status === 1">正在分析评论</el-tag>
                <el-tag type="success" v-if="task.status === 2">已完成</el-tag>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="always">
              <div class="clearfix" slot="header">
                <span>疑似为负面新闻</span>
              </div>
              <div style="text-align: center">
                <el-tag type="danger" v-if="task.n >= 50">
                  是
                </el-tag>
                <el-tag type="info" v-if="task.n < 50">
                  否
                </el-tag>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow="always">
          <div class="clearfix" slot="header">
            <span>评论统计</span>
          </div>
          <div style="text-align: center">
            <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="box-card" shadow="always" style="margin-top: 20px">
      <div class="clearfix" slot="header">
        <span>评论列表</span>
      </div>
      <div style="text-align: center">
        <el-table
          :data="task.commentList"
          style="width: 100%">
          <el-table-column
            label="评论编号"
            prop="commentId">
          </el-table-column>
          <el-table-column
            label="评论内容"
            prop="content">
          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </d2-container>
</template>

<script>
import taskApi from '../../../api/emotion.task'

export default {
  data () {
    return {
      task: {
        id: '',
        commentList: [],
        progress: 0,
      },
      chartSettings: {
        roseType: 'radius',
      },
      chartData: {
        columns: ['label', 'count'],
        rows: [],
      },
    }
  },
  mounted () {
    this.task.id = this.$route.params.id
    this.getTaskById()
    this.autoGetTaskByIdInterval = setInterval(this.getTaskById, 2000)
  },
  methods: {
    getTaskById () {
      taskApi.getById(this.task.id).then(data => {
        console.log('getTaskById()', data)
        this.task = data

        this.task.n = this.task.ncount / (this.task.pcount + this.task.ncount) * 100

        this.task.commentList = JSON.parse(data.dataJson)
        console.log('getTaskById()', this.task)
        this.chartData.rows = [
          { 'label': '正面评论计数', 'count': this.task.pcount },
          { 'label': '负面评论计数', 'count': this.task.ncount },
        ]
      })
    },
    gotoNewsPage () {
      window.open(this.task.newsUrl, '_blank')
    },
  },
}
</script>

<style scoped>

</style>

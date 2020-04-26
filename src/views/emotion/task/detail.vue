<template>
  <d2-container>
    <template slot="header">
      <el-switch
        @change="handleAutoFetchDataFlagChange"
        active-text="开启自动刷新"
        inactive-text="关闭自动刷新"
        v-model="autoFetchDataFlag">
      </el-switch>
      <span style="margin: 20px"></span>
      <el-button @click="gotoNewsPage" type="primary">
        查看新闻页面
      </el-button>
      <el-button :disabled="task.status !== 2" @click="createAnalyseTask" type="success">
        重新分析评论情感
      </el-button>
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
                <span>分析进度</span>
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
          :data="commentList"
          style="width: 100%">
          <el-table-column
            label="评论编号"
            prop="id">
          </el-table-column>
          <el-table-column
            label="评论内容"
            prop="content">
          </el-table-column>
          <el-table-column
            label="正面概率"
            prop="p">
          </el-table-column>
          <el-table-column
            label="负面概率"
            prop="n">
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="commentPage.pageNum"
          :page-size="commentPage.pageSize"
          :total="commentPage.total"
          @current-change="handlePageNumChange"
          @next-click="handleNextPage"
          @prev-click="handlePrevPage"
          layout="prev, pager, next">
        </el-pagination>
      </div>
    </el-card>

  </d2-container>
</template>

<script>
import taskApi from '../../../api/emotion.task'
import commentApi from '../../../api/emotion.comment'

export default {
  data () {
    return {
      task: {
        id: '',
        newsId: '',
        newsTitle: '',
        progress: 0,
        pcount: 0,
        ncount: 0,
        status: 0,
      },
      commentPage: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      commentList: [],
      chartSettings: {
        roseType: 'radius',
      },
      chartData: {
        columns: ['label', 'count'],
        rows: [],
      },
      autoFetchDataInterval: undefined,
      autoFetchDataFlag: false,
    }
  },
  watch: {
    '$route': 'fetchData',
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
      this.task.id = this.$route.params.id
      this.getTaskById().then(() => {
        this.listCommentByNewsId()
      })
    },
    getTaskById () {
      return taskApi.getById(this.task.id).then(data => {
        console.log('getTaskById()', data)
        this.task = data

        // 计算负面新闻概率
        this.task.n = this.task.ncount / (this.task.pcount + this.task.ncount) * 100

        // 更新图表信息
        this.chartData.rows = [
          { 'label': '正面评论计数', 'count': this.task.pcount },
          { 'label': '负面评论计数', 'count': this.task.ncount },
        ]
      })
    },
    listCommentByNewsId () {
      return commentApi.listByNewsId(
        this.task.newsId,
        this.commentPage.pageNum,
        this.commentPage.pageSize,
      ).then(data => {
        console.log('listCommentByNewsId()', data)
        this.commentList = data.records
        this.commentPage.total = data.total
        this.commentPage.pageNum = data.current
      })
    },
    gotoNewsPage () {
      window.open(this.task.newsUrl, '_blank')
    },
    handleNextPage () {
      this.commentPage.pageNum += 1
      this.listCommentByNewsId()
    },
    handlePrevPage () {
      this.commentPage.pageNum -= 1
      this.listCommentByNewsId()
    },
    handlePageNumChange (newPageNum) {
      this.commentPage.pageNum = newPageNum
      this.listCommentByNewsId()
    },
    handleAutoFetchDataFlagChange (newFlag) {
      if (newFlag) {
        // 自动刷新数据
        this.autoFetchDataInterval = setInterval(this.fetchData, 2000)
        console.log('autoFetchDataInterval', this.autoFetchDataInterval)
        return
      }
      // 取消自动刷新
      clearInterval(this.autoFetchDataInterval)
    },
    createAnalyseTask () {
      taskApi.createAnalyseTask({ taskId: this.task.id }).then(data => {
        console.log('createAnalyseTask()', data)
      })
    },
  },
}
</script>

<style scoped>

</style>

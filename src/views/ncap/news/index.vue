<template>
  <d2-container>
    <el-table
      :data="rankNews"
      height="100%"
      v-loading="loading"
      width="100%">
      <el-table-column
        label="新闻编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="新闻标题"
        prop="title">
      </el-table-column>
      <el-table-column label="新闻链接" prop="href">
        <template slot-scope="scope">
          <el-link :href="scope.row.href" target="_blank" type="primary">
            {{scope.row.href}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleCreateTask(scope.$index, scope.row)">
            创建分析任务
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import newsApi from '../../../api/ncap.news'
import taskApi from '../../../api/ncap.task'

export default {
  data () {
    return {
      loading: true,
      rankNews: [
        {
          id: 'FCFJL4BH0001899O',
          title: '深夜打虎！首艘国产航母研制总指挥落马',
          href: 'https://news.163.com/20/0513/01/FCFJL4BH0001899O.html',
        },
      ],
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
      this.loading = true
      this.getRankNews().then(() => {
          this.loading = false
        },
      )
    },
    getRankNews () {
      return newsApi.getRankNews().then(response => {
        console.log('getRankNews()', response)
        this.rankNews = response
      })
    },
    handleCreateTask (index, row) {
      console.log('handleCreateTask', row)
      const postData = {
        newsUrl: row.href,
      }
      taskApi.create(postData).then(data => {
        console.log('handleCreateTask()', data)
        this.$message({
          message: '创建任务成功',
          type: 'success',
        })
      })
    },
  },
}
</script>

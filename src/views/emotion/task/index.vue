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
      <el-button @click="dialogVisible = true" type="primary">创建任务</el-button>
    </template>

    <el-table
      :data="taskList"
      height="100%"
      width="100%">
      <el-table-column
        label="任务编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="新闻编号"
        prop="newsId">
      </el-table-column>
      <el-table-column
        label="新闻标题"
        prop="newsTitle">
      </el-table-column>
      <el-table-column
        label="任务状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">正在采集新闻数据</el-tag>
          <el-tag v-if="scope.row.status === 1">正在分析评论</el-tag>
          <el-tag type="success" v-if="scope.row.status === 2">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="任务进度">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.progress" :width="80" type="dashboard"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        label="正面评论计数">
        <template slot-scope="scope">
          <el-tag>{{scope.row.pcount}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="负面评论计数">
        <template slot-scope="scope">
          <el-tag type="warning">{{scope.row.ncount}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="疑似负面新闻">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.n >= 50">
            是
          </el-tag>
          <el-tag type="info" v-if="scope.row.n < 50">
            否
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createDateTime">
      </el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateDateTime">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleDetail(scope.$index, scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      @close="dialogVisible = false"
      title="新建任务">
      <el-form
        :model="newTaskFormData"
        :rules="rules"
        label-position="top" label-width="100px"
        ref="elForm"
        size="medium">
        <el-form-item label="新闻网址，如：http://dy.163.com/v2/article/detail/FB2G0G4N0512B07B.html" prop="newsUrl">
          <el-input
            clearable
            placeholder="请输入新闻网址，如：http://dy.163.com/v2/article/detail/FB2G0G4N0512B07B.html"
            prefix-icon='el-icon-link'
            show-word-limit
            v-model="newTaskFormData.newsUrl"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="handleCreateTask" type="primary">确定</el-button>
      </div>
    </el-dialog>

  </d2-container>
</template>

<script>
import taskApi from '../../../api/emotion.task'

export default {
  data () {
    return {
      taskPage: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      taskList: [],
      dialogVisible: false,
      newTaskFormData: {
        newsUrl: '',
      },
      rules: {
        newsUrl: [
          {
            required: true,
            message: '请输入新闻网址',
            trigger: 'blur',
          },
        ],
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
      this.getTaskList()
    },
    getTaskList () {
      return taskApi.list(this.taskPage.pageNum, this.taskPage.pageSize).then(data => {
        console.log('getTaskList()', data)
        data.records.forEach((v, i, array) => {
          array[i].n = v.ncount / (v.pcount + v.ncount) * 100
        })
        this.taskList = data.records
      })
    },
    handleDetail (index, row) {
      const id = row.id
      this.$router.push({ path: '/task/' + id })
    },
    handleCreateTask () {
      this.$refs['elForm'].validate(valid => {
        if (!valid) {
          return
        }
        taskApi.create(this.newTaskFormData).then(data => {
          console.log('handleCreateTask()', data)
          this.getTaskList()
          this.dialogVisible = false
          this.newTaskFormData.newsUrl = ''
        })
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

<template>
  <el-card shadow="hover">
    <div class="clearfix" slot="header">
      <span>模型测试</span>
    </div>

    <el-row>
      <el-col :span="12">
        <el-form ref="modelTestForm" :model="modelTestFormData" :rules="modelTestFormRules" size="medium"
                 label-width="100px" label-position="top">
          <el-form-item label="测试句子" prop="sentence">
            <el-input v-model="modelTestFormData.sentence" placeholder="请输入测试句子" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12">
        <div style="text-align: center">
          <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
        </div>
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
import modelApi from '@/api/emotion.model'

export default {
  components: {},
  props: [],
  data () {
    return {
      modelTestFormData: {
        sentence: undefined,
      },
      modelTestFormRules: {
        sentence: [
          {
            required: true,
            message: '请输入测试句子',
            trigger: 'blur',
          },
        ],
      },
      modelTestResult: {
        p: 50.0,
        n: 50.0,
      },
      chartSettings: {
        roseType: 'radius',
      },
      chartData: {
        columns: ['label', 'value'],
        rows: [
          { 'label': '正面情绪概率', 'value': 0.0 },
          { 'label': '负面情绪概率', 'value': 0.0 },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submitForm () {
      this.$refs['modelTestForm'].validate(valid => {
        if (!valid) {
          return
        }
        // 提交表单
        console.log('ok')
        modelApi.testModel(this.modelTestFormData).then(response => {
          console.log('testModel()', response)
          this.chartData.rows[0].value = response.p
          this.chartData.rows[1].value = response.n
        })
      })
    },
    resetForm () {
      this.$refs['modelTestForm'].resetFields()
    },
  },
}
</script>

<style scoped>

</style>

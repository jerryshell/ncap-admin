<template>
  <d2-container>

    <el-row :gutter="20">

      <el-col :span="12">
        <el-card shadow="hover">
          <div class="clearfix" slot="header">
            <span>更新模型</span>
          </div>
          <el-form :model="modelUpdateFormData" :rules="rules" label-position="top" label-width="100px"
                   ref="modelUpdateForm"
                   size="medium">
            <el-form-item label="下拉选择模型" prop="modelFilename">
              <el-select :style="{width: '100%'}" clearable filterable placeholder="请选择下拉选择模型"
                         v-model="modelUpdateFormData.modelFilename">
                <el-option :disabled="item.disabled" :key="index" :label="item.label"
                           :value="item.value" v-for="(item, index) in modelFilenameOptions"></el-option>
              </el-select>
            </el-form-item>
<!--            <el-form-item label="实时调参特性" prop="realTimeTuning" required>-->
            <!--              <el-switch active-text="开启" inactive-text="关闭" v-model="modelUpdateFormData.realTimeTuning"></el-switch>-->
            <!--            </el-form-item>-->
            <el-form-item size="large">
              <el-button
                @click="submitForm"
                type="primary"
                v-loading.fullscreen.lock="fullscreenLoading">
                提交
              </el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>

        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover">
          <div class="clearfix" slot="header">
            <span>模型信息</span>
          </div>
          <p>
            <span>模型名称：</span>
            <el-tag>{{modelInfo.name}}</el-tag>
          </p>
<!--          <p>-->
<!--            <span>实时调参特性：</span>-->
<!--            <el-tag type="success" v-if="modelInfo.realTimeTuning">开启</el-tag>-->
<!--            <el-tag type="danger" v-if="!modelInfo.realTimeTuning">关闭</el-tag>-->
<!--          </p>-->
          <p>
            <span>自启动以来的使用次数：</span>
            <el-tag>{{modelInfo.useCountSinceLaunch}}</el-tag>
          </p>
        </el-card>
      </el-col>

    </el-row>

    <div style="margin: 20px"></div>

    <el-row>
      <el-col>
        <model-test></model-test>
      </el-col>
    </el-row>

  </d2-container>
</template>

<script>
import modelApi from '../../../api/emotion.model'
import infoApi from '../../../api/emotion.info'
import ModelTest from '@/components/emotion/model-test'

export default {
  components: { ModelTest },
  props: [],
  data () {
    return {
      // 表单
      modelUpdateFormData: {
        modelFilename: '',
        realTimeTuning: false,
      },
      rules: {
        modelFilename: [
          {
            required: true,
            message: '请选择下拉选择模型',
            trigger: 'change',
          },
        ],
      },
      modelFilenameOptions: [
        {
          'label': 'text_cnn.2.80.h5',
          'value': 'text_cnn.2.80.h5',
        },
        {
          'label': 'text_cnn.2.85.h5',
          'value': 'text_cnn.2.85.h5',
        },
      ],
      // 模型信息
      modelInfo: {
        name: '未知',
        realTimeTuning: false,
        useCountSinceLaunch: 100,
      },
      modelFilenameList: [],
      fullscreenLoading: false,
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listModelFilename().then(() => {
        return this.getModelInfo()
      })
    },
    listModelFilename () {
      return modelApi.listModelFilename().then(response => {
        console.log('listModelFilename', response)
        this.modelFilenameList = response
        this.modelFilenameOptions = []
        this.modelFilenameList.forEach(value => {
          this.modelFilenameOptions.push({
            value,
            label: value,
          })
        })
      })
    },
    getModelInfo () {
      return infoApi.getInfo().then(response => {
        console.log('getModelInfo()', response)
        this.modelInfo.name = response.analyseServer.model_filename
        this.modelInfo.realTimeTuning = response.analyseServer.train_status.real_time_tuning
        this.modelInfo.useCountSinceLaunch = response.analyseServer.use_count
        this.modelUpdateFormData.realTimeTuning = this.modelInfo.realTimeTuning
      })
    },
    submitForm () {
      this.$refs['modelUpdateForm'].validate(valid => {
        if (!valid) return
        // 提交表单
        console.log(this.modelUpdateFormData)
        this.fullscreenLoading = true
        modelApi.updateModel(this.modelUpdateFormData).then(response => {
          console.log('updateModel()', response)
          this.fetchData()
          this.fullscreenLoading = false
        })
      })
    },
    resetForm () {
      this.$refs['modelUpdateForm'].resetFields()
    },
  },
}
</script>

<style scoped>

</style>

import request from '@/plugin/axios'

export default {
  listModelFilename () {
    return request({
      url: `/model/list/modelFilename`,
      method: 'get',
    })
  },

  updateModel (data) {
    return request({
      url: `/model/update`,
      method: 'post',
      data,
    })
  },
}

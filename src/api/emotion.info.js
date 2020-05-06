import request from '@/plugin/axios'

export default {
  getInfo () {
    return request({
      url: `/info`,
      method: 'get',
    })
  },
}

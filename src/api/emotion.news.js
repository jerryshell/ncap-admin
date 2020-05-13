import request from '@/plugin/axios'

export default {
  getRankNews () {
    return request({
      url: `/rankNews`,
      method: 'get',
    })
  },
}

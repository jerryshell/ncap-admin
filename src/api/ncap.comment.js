import request from '@/plugin/axios'

export default {
  listByNewsId (newsId, pageNum, pageSize) {
    return request({
      url: `/comment/listByNewsId/${newsId}/${pageNum}/${pageSize}`,
      method: 'get',
    })
  },

  getById (id) {
    return request({
      url: `/comment/getById/${id}`,
      method: 'get',
    })
  },
}

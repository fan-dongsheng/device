import request from '@/utils/request.js'
// 获取列表
export const getTable = params => {
  return request({
    method: 'GET',
    url: '/findreinspection',
    params
  })
}
// 删除图片
export const delImg = params => {
  return request({
    method: 'GET',
    url: '/upload/pic/delUserId',
    params
  })
}

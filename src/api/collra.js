import request from '@/utils/request'
// 获取图片
export const getImg = params => {
  return request({
    method: 'GET',
    url: '/upload/pic/findPicById',
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

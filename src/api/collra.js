import request from '@/utils/request.js'
// 获取复验筛选列表
export const getTable = params => {
  return request({
    method: 'GET',
    url: '/findreinspection',
    params
  })
}
//获取DPA查询
export const getDpa = params => {
  return request({
    method: 'GET',
    url: '/querydpa',
    params
  })
}
//获取复验产品推荐
export const getRecommended = () => {
  return request({
    method: 'GET',
    url: '/querycomponentsname'
  })
}
//获取dpa产品推荐
export const getDpaRecommended = () => {
  return request({
    method: 'GET',
    url: 'dpa/querycomponentsname'
  })
}
//复验关键字搜索
export const getFind = params => {
  return request({
    method: 'GET',
    url: 'findkeyword',
    params
  })
}
//DPA关键字搜索
export const getDpaFind = params => {
  return request({
    method: 'GET',
    url: 'dpa/findkeyword',
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

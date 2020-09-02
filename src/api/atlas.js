import request from '@/utils/request'
// 实体检索
export const nodeSearch = params => {
  return request({
    method: 'GET',
    url: '/MapDisplay/subGraph',
    params
  })
}
// 知识检索
export const getSearchNeoEntity = (value, params) => {
  return request({
    method: 'GET',
    url: `/api/searchNeoEntity/${value}`,
    params
  })
}
export const knowSearch = (label, value) => {
  return request({
    method: 'GET',
    url: `/neo/neoGetEntity/${label}/${value}`
  })
}
// 截图功能
export const sendUrl = data => {
  return request({
    method: 'POST',
    url: '/upload/pic/addImage',
    data
  })
}
// 获取条件拓展关系
export const getRelation = params => {
  return request({
    method: 'GET',
    url: '/MapDisplay/getShipByNode',
    params
  })
}
// 条件拓展
export const reExtendNode = params => {
  return request({
    method: 'GET',
    url: '/MapDisplay/extensionNodes',
    params
  })
}

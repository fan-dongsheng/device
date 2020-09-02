import request from '@/utils/request'
// 获取搜索列表的数据
export const getKwos = params => {
  return request({
    method: 'GET',
    url: '/api/rank',
    params
  })
}
// 初始化列表
export const getKeywords = () => {
  return request({
    method: 'GET',
    url: '/api/rank'
  })
}
// 输入框型号，产品展示
export const getSearchrank = value => {
  return request({
    method: 'GET',
    url: `/api/searchclf/${value}`
  })
}
// 检索跳转tabs
export const getSearch = value => {
  return request({
    method: 'GET',
    url: `/api/search/${value}`
  })
}
// 型号，产品搜索
export const searchCategory = (title, value, params) => {
  return request({
    method: 'GET',
    url: `/api/searchCategory/${title}/${value}`,
    params
  })
}
// 质量展示
export const getReport = (modelid, value) => {
  return request({
    method: 'GET',
    url: `/api/filenumWT/${modelid}/${value}`
  })
}
// preview展示
export const getReportByid = id => {
  return request({
    method: 'GET',
    url: `/api/fileid/${id}`
  })
}
export const getReportPer = (modelid, productid, params) => {
  return request({
    method: 'GET',
    url: `/api/filenum/${modelid}/${productid}`,
    params
  })
}

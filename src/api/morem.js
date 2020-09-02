import request from '@/utils/request'
// 全息实体检索
export const qxGetEntity = (value, label) => {
  return request({
    method: 'GET',
    url: `/api/neo/qxGetEntity/${label}/${value}`

  })
}
export const knowSearch = (label, value) => {
  return request({
    method: 'GET',
    url: `/neo/neoGetEntity/${label}/${value}`
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
export const knowSearchOne = value => {
  return request({
    method: 'GET',
    // url: `/neo/neoGetEntity/${value}`
    url: `/MapDisplay/subGraph?nodeName=${value}`
  })
}

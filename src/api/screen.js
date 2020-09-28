import request from '@/utils/request.js'

//复验筛选按类别统计分布
export const getCountclassification = params => {
  return request({
    method: 'GET',
    url: '/countclassification',
    params
  })
}
//复验筛选质量等级分布
export const getCountqualitygrade = params => {
  return request({
    method: 'GET',
    url: '/countqualitygrade',
    params
  })
}
//DPA不合格按元器件类型分类
export const getDpaCountcomponentstype = params => {
  return request({
    method: 'GET',
    url: '/dpa/countcomponentstype',
    params
  })
}
//复验筛选不合格器件按国产进口比例统计
export const getCountcountriesorimports = params => {
  return request({
    method: 'GET',
    url: '/countcountriesorimports',
    params
  })
}
//复验筛选不合格器件按器件类别统计
export const getCountprimaryclassification = params => {
  return request({
    method: 'GET',
    url: '/countprimaryclassification',
    params
  })
}
//复验筛选不合格器件按器件类型统计
export const getCountcomponentstype = params => {
  return request({
    method: 'GET',
    url: '/countcomponentstype',
    params
  })
}
//复验筛选不合格按生产厂家出现次数排序
export const getOrdermanufacturer = params => {
  return request({
    method: 'GET',
    url: '/ordermanufacturer',
    params
  })
}
//复验筛选不合格器件按生产厂家占比排序
export const getCountmanufacturer = params => {
  return request({
    method: 'GET',
    url: '/countmanufacturer',
    params
  })
}

//dpa试验量按器件类型进行统计
export const getDpaComponentstype = params => {
  return request({
    method: 'GET',
    url: '/dpa/componentstype',
    params
  })
}
//Dpa不合格器件按国产进口比例统计
export const getDpaCountcountriesorimports = params => {
  return request({
    method: 'GET',
    url: '/dpa/countcountriesorimports',
    params
  })
}
//Dpa不合格器件按器件类别统计
export const getDpaCountprimaryclassification = params => {
  return request({
    method: 'GET',
    url: '/dpa/countprimaryclassification',
    params
  })
}
//DPA根据质量等级统计数据结果
export const getDpaCountqualitygrade = params => {
  return request({
    method: 'GET',
    url: '/dpa/countqualitygrade',
    params
  })
}
//按厂家排序点击钻取查询
export const getQuerynowmanufacturer = params => {
  return request({
    method: 'GET',
    url: '/querynowmanufacturer',
    params
  })
}



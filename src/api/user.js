import request from '@/utils/request'
// 封装user的请求接口;
// 登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}

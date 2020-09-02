// // axios请求统一处理请求令牌,请求拦截;
import axios from 'axios'
// import router from '../router'
// import { Message } from 'element-ui' // 提示消息
// import JsonBig from 'json-bigint'
// // interceptors 拦截 ,这里有两个回调函数,正确执行,错误执行
// axios.interceptors.request.use(function (config) {
//   // config是axios的配置信息;发送请求时使用;
//   let token = window.localStorage.getItem('user_token')
//   // 获取token,注入到cofig中;
//   config.headers.Authorization = `Bearer ${token}`
//   // 需要返回config,作为新的请求对象
//   return config
// }, function () {
//   // 这里执行失败请求
// })
const request = axios.create({
  baseURL: 'http://localhost:8023' // 基础路径
})
export default request
// // 在响应数据到达响应拦截之前需要执行的函数,改变 json-bigint;
// axios.defaults.transformResponse = [function (data) {
//   // 先引入三防包,再调用,parse方法,得到对象;再将获取的数据转成字符串
//   return data ? JsonBig.parse(data) : data
// }]

// // axios统一处理响应数据,数据返回来之后先走这里,再去接口的then,
// axios.interceptors.response.use(function (response) {
//   // response中是返回的数据;在到达then之前获取到res.data
// // 返回response,用三元是避免报错,如果没有数据就会报错,所以返回一个空对象;
//   return response.data ? response.data : {}
// }, function (error) {
//   // 处理错误状态码;
//   // 先获取status码,
//   let status = error.response.status
//   let message = ''
//   switch (status) {
//     case 400:
//       message = '手请求参数错误'

//       break
//     case 403:
//       //   message = 'refresh_token未携带或已过期'
//       // 需要删除token,跳转到login
//       window.localStorage.removeItem('user_token')
//       router.push('/login')

//       break
//     case 401:
//     //   message = 'token过期或未出'
//       window.localStorage.removeItem('user_token')
//       router.push('/login')
//       break
//     case 404:
//       message = '手机号不正确'

//       break

//     default:
//       break
//   }
//   Message({ message: message, type: 'warning' })
//   // 这里需要终止操作;
//   return Promise.reject(error)
// })

// // 直接将axios导出去,再引入到main.js中,供全局使用
// export default axios

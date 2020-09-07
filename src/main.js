import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/iconfont.css'
import './styles/index.less' // 引入less

import * as d3 from 'd3'
Vue.prototype.$d3 = d3
window.d3 = d3
Vue.config.productionTip = false

Vue.use(ElementUi)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

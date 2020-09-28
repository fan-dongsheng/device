import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    hidden: false, // 控制全息的屏幕收缩
    user: '1', // 设置初始化状态,要在这里获取本地存储的token
    val: false, // 条件拓展需要的diago弹窗改变
    name: 'tuijin', // 条件拓展需要的name
    relation: '', // 条件拓展需要的关系
    dataset: [], // 前进后退数组
    TimeScreen: '', //大屏的时间
    echartsVisble: false,//echarts下钻数据显示
    FactorName: '' //排序 下钻厂家名字
  },

  mutations: { // 对state进行修改
    dataset (state, val) {
      state.dataset = val
    },
    hidden (state, val) {
      state.hidden = val
    },
    name (state, name) {
      state.name = name
    },
    val (state, val) {
      state.val = val
    },
    relation (state, val) {
      state.relation = val
    },
    changeT (state, val) {
      state.TimeScreen = val
    },
    echartsVisble (state, val) {

      state.echartsVisble = val.bool
      state.FactorName = val.name
    }

  },
  getters: {

  }
})
export default store

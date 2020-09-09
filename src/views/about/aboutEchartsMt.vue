<template>
  <div class="aboutEchartsMt">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { LeiBie } from './ea.js'
export default {
  data () {
    return {
      datas: [
        {
          NAME: '半导体',
          VALUE: 318,
          TIME: '202001',
          SECRET: null
        }
      ]
    }
  },

  mounted () {
    LeiBie('main', this.datas, null)
  }
}
</script>

<style lang="less" scoped>
</style>
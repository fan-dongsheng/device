<template>
  <div class="aboutEchartsMb">
    <div id="eCharts5" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
import { eCharts5 } from './eb.js'
export default {
  data () {
    return {
      datas: [
        {
          name: '半导体',
          gc: 36,
          jk: 24,
          time: '202001',
          secret: null
        },
        {
          name: '体',
          gc: 70,
          jk: 40,
          time: '202001',
          secret: null
        }
      ]
    }
  },

  mounted () {
    eCharts5('eCharts5', this.datas, null)
  }
}
</script>

<style lang="less" scoped>
.aboutEchartsMb {
  height: 100%;
}
</style>
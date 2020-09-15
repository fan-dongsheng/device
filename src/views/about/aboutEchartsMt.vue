<template>
  <div class="aboutEchartsMt">
    <div id="main" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
import { LeiBie } from './ea.js'
import { getCountclassification } from '@/api/screen'
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
  methods: {
    //复验筛选按类别统计分布
    async getCountclassification () {
      const { data } = await getCountclassification()
      this.datas = data.data.countClassificationList
      LeiBie('main', this.datas, null)
    }
  },
  mounted () {
    // LeiBie('main', this.datas, null)
    this.getCountclassification()
  }
}
</script>

<style lang="less" scoped>
.aboutEchartsMt {
  height: 100%;
}
</style>
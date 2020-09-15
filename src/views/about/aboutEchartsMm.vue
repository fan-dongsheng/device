<template>
  <div class="aboutEchartsMm">
    <div id="EacHFn2" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
import { EacHFn2 } from './ea'
import { getCountqualitygrade } from '@/api/screen'
export default {
  data () {
    return {
      datas: [
        {
          NAME: '3++',
          VALUE: 31,
          TIME: '202001',
          SECRET: null
        },
        {
          NAME: 'c',
          VALUE: 20,
          TIME: '202001',
          SECRET: null
        }
      ]
    }
  },
  methods: {
    //复验筛选质量等级分布
    async getCountqualitygrade () {
      const { data } = await getCountqualitygrade()
      this.datas = data.data.countcountriesorimportsList
      EacHFn2('EacHFn2', this.datas, null)
    }
  },
  mounted () {
    // EacHFn2('EacHFn2', this.datas, null)
    this.getCountqualitygrade()
  }
}
</script>

<style lang="less" scoped>
.aboutEchartsMm {
  height: 100%;
}
</style>
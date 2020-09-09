<template>
  <div class="aboutEchartsMm">
    <div id="EacHFn2" style="width: 500px;height:220px;"></div>
  </div>
</template>

<script>
import { EacHFn2 } from './ea'
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
  mounted () {
    EacHFn2('EacHFn2', this.datas, null)
  }
}
</script>

<style>
</style>
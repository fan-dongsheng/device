<template>
  <div class="aboutEchartsRb">
    <div class="left">
      <div class="title" @click="activeTle(0)" :class="{'common':active==0}">
        <div class="box">
          <span>DPA试验量按器件类型进行统计</span>
        </div>
      </div>
      <div class="title" @click="activeTle(1)" :class="{'common':active==1}">
        <div class="box">
          <span>DPA不合格按国产进口比例统计</span>
        </div>
      </div>
      <div class="title" @click="activeTle(2)" :class="{'common':active==2}">
        <div class="box">
          <span>DPA不合格按元器件类别分布</span>
        </div>
      </div>
      <div class="title" @click="activeTle(3)" :class="{'common':active==3}">
        <div class="box">
          <span>DPA按质量等级分布</span>
        </div>
      </div>
    </div>
    <div class="right">
      <div id="eCharts1" style="width: 100%;height:100%;" v-show="active==0"></div>
      <div id="eCharts2" style="width: 100%;height:100%;" v-show="active==1"></div>
      <div id="eCharts3" style="width: 100%;height:100%;" v-show="active==2"></div>
      <div id="eCharts4" style="width: 100%;height:100%;" v-show="active==3"></div>
    </div>
  </div>
</template>

<script>
import { eCharts1, eCharts2, eCharts3, eCharts4 } from './eb'
export default {
  data () {
    return {
      active: 0,
      //DPA试验量按器件类型进行统计
      datas: [
        {
          name: '半导体',
          value: 31,
          time: '202001',
          secret: null
        },
        {
          name: '二极管',
          value: 20,
          time: '202001',
          secret: null
        }
      ],
      //DPA不合格按国产进口比例统计
      datasOne: [
        {
          name: '国产',
          value: 31,
          time: '202001',
          secret: null
        },
        {
          name: '进口',
          value: 20,
          time: '202001',
          secret: null
        }
      ],
      //DPA不合格按元器件类别分布
      datasTwo: [
        {
          name: '半导体',
          value: 31,
          time: '202001',
          secret: null
        },
        {
          name: 'gl',
          value: 20,
          time: '202001',
          secret: null
        }
      ],
      //DPA按质量等级分布
      datasThree: [
        {
          name: '3++',
          value: 31,
          time: '202001',
          secret: null
        },
        {
          name: 'c',
          value: 20,
          time: '202001',
          secret: null
        }
      ],
    }
  },
  methods: {
    activeTle (index) {
      this.active = index
      if (index == 1) {
        this.$nextTick(function () {
          //用来解决数据不更新问题
          eCharts2('eCharts2', this.datasOne, null)
        });

      } else if (index == 2) {
        this.$nextTick(function () {
          //用来解决数据不更新问题
          eCharts3('eCharts3', this.datasTwo, null)
        });
      }
      else if (index == 3) {
        this.$nextTick(function () {
          //用来解决数据不更新问题
          eCharts4('eCharts4', this.datasThree, null)
        });
      }
    }
  },
  mounted () {
    eCharts1('eCharts1', this.datas, null)
  }
}
</script>

<style lang="less" scoped>
@border: #8dcef6;
.aboutEchartsRb {
  display: flex;
  height: 100%;
  .common {
    background-image: linear-gradient(270deg, #99faff 0%, #99cfff 100%);
  }
  .left {
    width: 17%;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-right: 2px solid @border;
    .title {
      flex: 1;
      font-size: 14px;
      padding-right: 5px;
      padding-left: 20px;
      .box {
        box-sizing: border-box;
        border-bottom: 2px solid @border;
        height: 100%;
        display: flex;
        align-items: center;
      }

      &:hover {
        cursor: pointer;
        .common();
      }
      &:last-child .box {
        border: none;
      }
    }
  }
  .right {
    flex: 1;
  }
}
</style>
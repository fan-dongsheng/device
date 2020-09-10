<template>
  <div class="aboutEchartsRt">
    <div class="left">
      <div class="title" @click="activeTle(0)" :class="{'common':active==0}">
        <div class="box">
          <span>复验筛选不合格器件按国产进口比例统计</span>
        </div>
      </div>
      <div class="title" @click="activeTle(1)" :class="{'common':active==1}">
        <div class="box">
          <span>复验筛选不合格器件按器件类别统计</span>
        </div>
      </div>
      <div class="title" @click="activeTle(2)" :class="{'common':active==2}">
        <div class="box">
          <span>复验筛选不合格器件按元器件类型类别统计</span>
        </div>
      </div>
      <div class="title" @click="activeTle(3)" :class="{'common':active==3}">
        <div class="box">
          <span>复验筛选不合格按生产厂家出现次数排序</span>
        </div>
      </div>
      <div class="title" @click="activeTle(4)" :class="{'common':active==4}">
        <div class="box">
          <span>复验筛选不合格占比(%)按生产 厂家排序</span>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- 复验筛选不合格器件按国产进口比例统计 -->
      <div id="PaiXu" style="width: 100%;height:100%;" v-show="active==0"></div>
      <div id="EacHFn1" style="width: 100%;height:100%;" v-show="active==1"></div>
    </div>
  </div>
</template>

<script>
import { PaiXu, EacHFn1 } from './ea'

export default {
  data () {
    return {
      active: 0,
      //复验筛选不合格器件按国产进口比例统计
      datas: [
        {
          NAME: '国产',
          VALUE: 31,
          TIME: '202001',
          SECRET: null
        },
        {
          NAME: '进口',
          VALUE: 20,
          TIME: '202001',
          SECRET: null
        }
      ],
      //复验筛选不合格器件按器件类别统计
      datasTwo: [
        {
          NAME: '集成电路',
          VALUE: 31,
          TIME: '202001',
          SECRET: null
        },
        {
          NAME: '半导体分立器件',
          VALUE: 20,
          TIME: '202001',
          SECRET: null
        },
      ]
    }
  },
  methods: {
    activeTle (index) {
      this.active = index
      if (index == 1) {
        EacHFn1('EacHFn1', this.datasTwo, null)
      }
    }
  },
  mounted () {
    PaiXu('PaiXu', this.datas, null)

  }
}
</script>

<style lang="less" scoped>
@border: #8dcef6;
.aboutEchartsRt {
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
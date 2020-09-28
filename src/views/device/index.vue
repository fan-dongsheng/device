<template>
  <div class="device">
    <!-- 检索 -->

    <div class="div-flx">
      <el-input
        placeholder="输入关键字搜索"
        v-model="inputV"
        class="input-with-select"
      ></el-input>
      <el-button type="primary" @click="changeAllStatus">
        <span class="iconImg"></span>
      </el-button>
    </div>

    <el-collapse-transition>
      <div v-show="show">
        <!-- 产品推荐 -->
        <div class="recommended">
          <span style="border-right: 1px #396fff solid">产品推荐</span>
          <span v-for="(item, index) in componentsnameList" :key="index">{{
            item
          }}</span>
          <i
            v-if="show"
            class="el-icon-d-arrow-left"
            title="折叠"
            @click="show = !show"
          ></i>
        </div>
      </div>
    </el-collapse-transition>
    <div class="recommended" v-show="!show">
      <i class="el-icon-d-arrow-right" title="展开" @click="show = !show"></i>
    </div>
    <!-- 元器件表格 -->
    <tableCont @getDpaRecommended="getDpaRecommended" />
  </div>
</template>

<script>
import tableCont from './tableCont'
import { getRecommended, getDpaRecommended } from '@/api/collra.js'
import eventBus from '@/eventBus'
export default {
  components: {
    tableCont
  },
  data () {
    return {
      show: true,
      // 搜索
      inputV: '',
      //传给tableCount的值
      inputNew: '',
      //复验产品推荐
      componentsnameList: []

    }
  },
  methods: {
    //关键字搜索
    async changeAllStatus () {
      // const {data}=await getFind()
      this.inputNew = this.inputV
      eventBus.$emit('keyWord', this.inputV)
    },
    //获取复验产品推荐
    async getRecommended () {
      const { data } = await getRecommended()
      this.componentsnameList = data.data.componentsnameList

    },
    //获取dpa产品推荐
    async getDpaRecommended (val) {
      if (val == 'second') {
        const { data } = await getDpaRecommended()
        this.componentsnameList = data.data.componentsnameList
      } else if (val == 'first') {
        this.getRecommended()
      }
    }
  },
  created () {
    this.getRecommended()
  }
}
</script>

<style lang="less" scoped>
.device {
  .div-flx {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    /deep/ .el-input {
      width: 640px;
      .el-input__inner {
        border-radius: 1px;
        height: 52px;
        line-height: 52px;
        border: #b9d6ff 1px solid;
      }
    }
    .el-button {
      border-radius: 1px;
      width: 90px;
      height: 52px;
    }
    .iconImg {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-image: url(../../assets/sou.png);
      background-size: cover;
    }
  }
  .recommended {
    display: flex;
    flex-wrap: wrap;
    background: #e5f0ff;
    padding: 20px 10px;
    padding-bottom: 10px;
    border-top: 1px solid #b9d6ff;
    border-bottom: 1px solid #b9d6ff;
    text-align: center;
    position: relative;
    span {
      display: inline-block;
      width: 7%;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        color: #396fff;
      }
    }
    .el-icon-d-arrow-right {
      position: absolute;
      bottom: -13px;
      left: 50%;
      transform: rotate(90deg);
      cursor: pointer;
    }
    .el-icon-d-arrow-left {
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: rotate(90deg);
      cursor: pointer;
    }
  }
}
</style>

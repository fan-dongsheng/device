<template>
  <div class="device">
    <!-- 检索 -->

    <div class="div-flx">
      <el-input placeholder="输入关键字搜索" v-model="inputV" class="input-with-select"></el-input>
      <el-button type="primary" @click="changeAllStatus">
        <span class="iconImg"></span>
      </el-button>
    </div>
    <!-- 产品推荐 -->
    <div class="recommended">
      <span style="border-right:1px #396fff solid">产品推荐</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
      <span>电容器</span>
    </div>
    <!-- 元器件表格 -->
    <tableCont />
  </div>
</template>

<script>
import tableCont from './tableCont'
export default {
  components: {
    tableCont
  },
  data () {
    return {
      // 搜索
      inputV: ''
    }
  },
  methods: {
    changeAllStatus () {

    }
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
    span {
      display: inline-block;
      width: 7%;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        color: #396fff;
      }
    }
  }
}
</style>

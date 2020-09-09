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
    <div class="right">2</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 99
    }
  },
  methods: {
    activeTle (index) {
      this.active = index
    }
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
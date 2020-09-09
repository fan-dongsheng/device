<template>
  <div class="about">
    <div class="title1">
      <router-link to="/home/device">元器件优选</router-link>
    </div>
    <div class="title2">
      <router-link to="/home/atlasAnalysis">图谱分析</router-link>
    </div>
    <div class="title3">
      <img src="@/assets/home/date.png" alt />
      <span>选择年度</span>
    </div>
    <div class="left">
      <div class="l-top">
        元器件概况
        <div class="img-l1"></div>
        <div class="img-l2"></div>
        <div class="img-l3"></div>
        <div class="img-l4"></div>
      </div>
      <div class="l-bottom">
        元器件概况元器件概况元器件概况元器件概况元器件概况元器件概况元器件概况元器件概况元器件概况元器件概况元器件概况元器件概况
        <div class="img-l1"></div>
        <div class="img-l2"></div>
        <div class="img-l3"></div>
        <div class="img-l4"></div>
      </div>
    </div>
    <div class="middle">
      <div class="m-top">
        <div class="title">复验筛选按类别统计分布</div>
        <div class="charts"></div>
        <div class="img-b1"></div>
        <div class="img-b2"></div>
        <div class="img-b3"></div>
        <div class="img-b4"></div>
        <!--  -->
        <aboutEchartsMt />
      </div>
      <div class="m-middle">
        <div class="title">复验筛选质量等级分布</div>
        <div class="charts"></div>
        <div class="img-b1"></div>
        <div class="img-b2"></div>
        <div class="img-b3"></div>
        <div class="img-b4"></div>
        <aboutEchartsMm />
      </div>
      <div class="m-bottom">
        <div class="title">DPA不合格按元器件类型分类</div>
        <div class="charts"></div>
        <div class="img-b1"></div>
        <div class="img-b2"></div>
        <div class="img-b3"></div>
        <div class="img-b4"></div>
        <aboutEchartsMb />
      </div>
    </div>
    <div class="right">
      <div class="r-top">
        <div class="img-b1"></div>
        <div class="img-b2"></div>
        <div class="img-b3"></div>
        <div class="img-b4"></div>
        <aboutEchartsRt />
      </div>
      <div class="r-bottom">
        <div class="img-b1"></div>
        <div class="img-b2"></div>
        <div class="img-b3"></div>
        <div class="img-b4"></div>
        <aboutEchartsRb />
      </div>
    </div>
    <!-- <router-link to="/home/device">跳转元器件数据</router-link> -->
  </div>
</template>

<script>
import aboutEchartsRt from './about/aboutEchartsRt'
import aboutEchartsRb from './about/aboutEchartsRb'
import aboutEchartsMt from './about/aboutEchartsMt'
import aboutEchartsMm from './about/aboutEchartsMm'
import aboutEchartsMb from './about/aboutEchartsMb'
export default {
  components: {
    aboutEchartsRt,
    aboutEchartsRb,
    aboutEchartsMt,
    aboutEchartsMm,
    aboutEchartsMb

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
@border: 2px solid #4e80b7;
@padding:10px 6px;
@mi-padding: 20px;
.img-com1 {
  position: absolute;
  top: -3px;
  left: -3px;
}
.img-com2 {
  position: absolute;
  top: -3px;
  right: -3px;
}
.img-com3 {
  position: absolute;
  bottom: -3px;
  right: -3px;
}
.img-com4 {
  position: absolute;
  bottom: -3px;
  left: -3px;
}
.img-b1 {
  background: url(../assets/home/bigtop.png);
  background-size: cover;
  width: 100px;
  height: 20px;
  .img-com1();
  top: -5px;
}
.img-b2 {
  background: url(../assets/home/l2.png);
  background-size: cover;
  width: 30px;
  height: 30px;
  .img-com2();
}
.img-b3 {
  background: url(../assets/home/bigbot.png);
  background-size: cover;
  width: 100px;
  height: 24px;
  position: absolute;
  bottom: -5px;
  right: -3px;
}
.img-b4 {
  background: url(../assets/home/l4.png);
  background-size: cover;
  width: 30px;
  height: 30px;
  .img-com4();
}
.about {
  background: url(../assets/home/screen.jpg);
  background-size: cover;
  height: calc(100vh - 115px);
  display: flex;
  color: white;
  padding: 95px 20px 20px 20px;
  position: relative;
  .title1 {
    position: absolute;
    top: 5%;
    left: 26%;
    cursor: pointer;
  }
  .title2 {
    position: absolute;
    top: 5%;
    right: 26%;
    cursor: pointer;
  }
  .title3 {
    position: absolute;
    top: 7%;
    right: 18%;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }
  .left {
    text-align: center;
    width: 10%;
    height: 100%;
    .l-top {
      height: 40px;
      line-height: 40px;
      border: @border;
      margin-bottom: 10px;
      position: relative;
      .img-l1 {
        background: url(../assets/home/left1.png);
        background-size: cover;
        width: 14px;
        height: 14px;
        .img-com1();
      }
      .img-l2 {
        background: url(../assets/home/left2.png);
        background-size: cover;
        width: 14px;
        height: 14px;
        .img-com2();
      }
      .img-l3 {
        background: url(../assets/home/left3.png);
        background-size: cover;
        width: 14px;
        height: 14px;
        .img-com3();
      }
      .img-l4 {
        background: url(../assets/home/left4.png);
        background-size: cover;
        width: 14px;
        height: 14px;
        .img-com4();
      }
    }
    .l-bottom {
      border: @border;
      padding: @padding;
      height: calc(100% - 75px);
      position: relative;
      line-height: 40px;
      .img-l1 {
        background: url(../assets/home/l1.png);
        background-size: cover;
        width: 30px;
        height: 30px;
        .img-com1();
      }
      .img-l2 {
        background: url(../assets/home/l2.png);
        background-size: cover;
        width: 30px;
        height: 30px;
        .img-com2();
      }
      .img-l3 {
        background: url(../assets/home/l3.png);
        background-size: cover;
        width: 30px;
        height: 30px;
        .img-com3();
      }
      .img-l4 {
        background: url(../assets/home/l4.png);
        background-size: cover;
        width: 30px;
        height: 30px;
        .img-com4();
      }
    }
  }
  .middle {
    width: 40%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    .title {
      margin-bottom: 10px;
    }
    .m-top {
      flex: 1;
      border: @border;
      padding: @mi-padding;
      margin-bottom: 10px;
      position: relative;
    }
    .m-middle {
      flex: 1;
      border: @border;
      padding: @mi-padding;
      margin-bottom: 10px;
      position: relative;
    }
    .m-bottom {
      flex: 1;
      border: @border;
      padding: @mi-padding;
      position: relative;
    }
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    .r-top {
      flex: 1;
      margin-bottom: 15px;
      border: @border;
      position: relative;
    }
    .r-bottom {
      flex: 1;
      border: @border;
      position: relative;
    }
  }
}
</style>

<template>
  <div class="home">
    <el-container class="home-container">
      <el-header height="auto">
        <div>
          <div class="img-home-logo"></div>
          <!-- <img src="../assets/u230.png" class="img-home-logo" alt /> -->
          <!-- <span>航天知识图谱</span> -->
          <div class="topMrn">
            <el-menu
              class="menu"
              mode="horizontal"
              :default-active="actvMen"
              :collapse-transition="false"
              background-color="#1280fe"
              text-color="#fff"
              router
            >
              <el-menu-item :index="item.index" v-for="item in aside_list" :key="item.index">
                <template slot="title">
                  <span>{{item.title}}</span>
                </template>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      aside_list: [
        {
          index: '/home/device',
          title: '元器件优选',
          name: 'Device',
          icon: 'icon1',
          component: '@/components/device',
          path: '/search',
          menuorigin: 'local'
        },
        {
          index: '/home/atlasAnalysis',
          title: '元器件知识图谱',
          name: 'AtlasAnalysis',
          icon: 'icon2',
          component: '@/components/AtlasAnalysis.vue',
          path: '/atlasAnalysis',
          menuorigin: 'local'
        }

      ]
    }
  },
  computed: {
    actvMen () {
      const url = this.$route.path
      let ua = ''
      if (url.indexOf('device') > 0) {
        ua = '/home/device'
      } else if (url.indexOf('atlasAnalysis') > 0) {
        ua = '/home/atlasAnalysis'
      }

      return ua
    }
  },
  components: {

  }
}
</script>
<style lang="less" scoped>
.el-menu-item.is-active {
  background-color: #c1defc !important;
  border-right: 4px solid #2a82fe;
  color: #2a82fe;
  .el-icon-arrow-right {
    display: inline;
  }
}
.menu {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #868686;

  .el-icon-arrow-right {
    display: none;
    margin-left: 40px;
  }
}
.overflow_h {
  overflow-y: hidden;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #1280fe;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 14px;
  > div {
    display: flex;
    align-items: center;
  }
}
.asid {
  width: 0 !important;
  transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}
.el-icon-s-fold {
  position: absolute;
  left: 200px;
  font-size: 16px;
  cursor: pointer;
}
.el-aside {
  transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
  .el-menu {
    border-right: none;
    .el-menu-item {
      color: rgba(109, 135, 167, 1);
      height: 46px;
      line-height: 46px;
    }
  }
  border: 1px !important;
  border-style: solid !important;
  border-color: #b1d2ff !important;
}
.img-home-logo {
  width: 170px;
  height: 30px;
  margin-left: 20px;
  background-image: url("../assets/logo.png");
  background-size: cover;
}
.icom {
  margin-right: 10px;
  left: 0px;
  top: 0px;
  width: 20px;
  height: 20px;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #b1d2ff;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 10px;

  overflow-x: hidden;

  bottom: 0px;
}
#innerTab .el-tabs__content {
  box-sizing: border-box;
}
.localTabDiv {
  height: 98%;
  width: 100%;
}
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px !important;
}
.el-tab-pane {
  width: 100%;
  top: 0px;
  bottom: 0px;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: 1px solid #b1d2ff;
  margin: 0;
}
</style>
<style lang="less" scoped>
.topMrn {
  margin-left: 60px;
  .el-menu-item.is-active {
    background-color: rgb(14, 102, 203) !important;
    border-bottom: 4px solid #ff9a00 !important;
    border-right: 0px;
    color: #fff !important;
  }
  /deep/ .el-menu--horizontal {
    border: none;
  }
  .menu {
    font-family: "Arial Normal", "Arial";
    font-weight: 400;
    font-style: normal;
    // font-size: 14px;
    color: #868686;
  }
}
</style>

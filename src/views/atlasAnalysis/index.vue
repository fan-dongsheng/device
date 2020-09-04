<template>
  <div class="tran">
    <div class="a-left" :class="{'b-left':hidden}">
      <div class="row-sr a-left-tab" :class="{'b-left-tab':hidden}">
        <el-tabs v-model="activeName" class="tabs-scrool" @tab-click="handleClick" stretch>
          <el-tab-pane label="知识检索" name="first">
            <div class="middel">
              <el-row class="row-sr">
                <el-col>
                  <el-input
                    placeholder="输入关键字搜索"
                    size="small"
                    suffix-icon="el-icon-search"
                    v-model="state"
                    @change="changeValue"
                  ></el-input>
                </el-col>
              </el-row>
              <div class="result">搜索结果</div>
              <!-- 初始化搜索 -->
              <div class="seachM" v-if="listData.length==0">暂无搜索内容</div>
              <div class="seaShow">
                <div class="row-sr" v-for="item of listData" :key="item.name">
                  <div @click="nodeSearch(item.entityvalue,item.entitylabel)" class="knowlage">
                    <div>
                      <img :src="item.entitylabel | imgage" class="img_size1" />
                    </div>
                    <div class="knowlage-right">
                      <div class="knowlage-r-t">{{item.entityvalue}}</div>
                      <div class="knowlage-r-m">
                        <span class="txt">
                          <span class="spn">主键：</span>
                          {{item.entitykey}}
                        </span>
                      </div>
                      <div class="knowlage-r-b">
                        <span class="txt">
                          <span class="spn">本体：</span>
                          {{item.entitylabel}}
                        </span>
                      </div>
                    </div>
                  </div>
                  <el-divider></el-divider>
                </div>
              </div>
            </div>

            <div class="paget" v-if="!hidden">
              <!-- 分页区域 -->
              <el-pagination
                background
                small
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :pager-count="5"
                :page-size="page.pageSize"
                layout="prev, pager, next"
                :total="total"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="tran-le" @click="hidden = !hidden">
      <div class="trangle" :class="{'trangle1':hidden}"></div>
    </div>
    <div id="container" ref="tuImage"></div>
  </div>
</template>

<script>
import { update } from '@/views/atlasAnalysis/update.js'
// import { pltKg } from '@/views/atlasAnalysis/pltkg'
import { qxGetEntity, getSearchNeoEntity } from '@/api/morem.js'
export default {

  props: ['val'],
  data () {
    return {

      result: {},
      wnode: null,
      hidden: false,
      hiddenRight: false,
      // 实体检索input
      ent: {
        input: '推进系统'
      },
      // 关系检索input
      relation: {
        inputScor: '中北大学',
        inputTage: '北京航空航天大学'
      },
      restaurants: [],
      state: '', // 多选选中值
      activeName: 'first', // 左侧检索实体
      total: 10, // 总数分页
      page: {
        current: 1,
        pageSize: 5
      },
      tk: 'slkdflksadflasdjf',
      resultlist: [{ username: '发射车故障' }, { username: '系统_型号组成关系' }, { username: '产品_型号组成关系' }],
      searchVisible: false,
      historyVisible: false,
      themeVisible: false,
      historylist: [
        { datatime: '2019-06-28 16:32:50', number: 3 },
        { datatime: '2019-06-26 16:32:50', number: 1 },
        { datatime: '2019-06-27 16:32:50', number: 2 }
      ],
      searchForm: {
        search: []
      },
      searchFormRules: {
        search: [{ required: true, message: '请输入查询的内容', trigger: 'blur' }]
      },
      listData: [],
      nodeData: Object,
      searchNode: '',
      backCount: 1,
      bf: false,
      resNode: null,
      magShow: false
    }
  },
  filters: {
    // 列表抽取，标记，入库状态
    imgage (value) {

    },
    nodeSplice (val) {
      return val.substring(1, val.length - 1)
    }
  },
  methods: {
    // svg启动程序
    initSvg (data) {
      // pltKg(data)
      // this.hidden=false
    },
    handleClick () { },
    // 输入input值
    changeValue (value) {
      this.getSearchNeoEntity(value)
    },
    async nodeSearch (entityvalue, entitylabel) {
      try {
        this.backCount = 1
        const res = await qxGetEntity(entityvalue, entitylabel)
        console.log(res)
        this.result = res
        this.$emit('result', this.result.data)
      } catch (error) {
        console.log(error)
      }
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.page.current = newPage
      this.getSearchNeoEntity(this.state)
    },
    async getShortestPath () {
      this.backCount = 1
      const { data } = await this.$ajax({
        url: `${this.config.host}/MapDisplay/getShortestPath`,
        params: {
          node1Name: this.relation.inputScor,
          node2Name: this.relation.inputTage
        }
      })

      this.resNode = data.nodes
      this.wnode = data
      update()

      this.initSvg(data)
    },
    // 模糊搜索接口

    async getSearchNeoEntity () {
      try {
        const { data } = await getSearchNeoEntity(this.state, { page: this.page.current, size: this.page.pageSize })

        //   this.$ajax({
        //   url: `${this.config.host}/${this.config.Searchquery}/${this.state}?page=${this.page.current}&size=${this.page.pageSize}`
        // });
        console.log(data, 'sousuo===============')
        this.total = data.count
        this.listData = data.datas
      } catch (error) {
        console.log(error)
      }
    }
  },

  watch: {
    val (value) {
      this.state = value
      this.getSearchNeoEntity()
    },

    hidden (value) {
      this.$emit('hidden', value)
      this.$store.commit('hidden', value)
    }
  },

  created () {
    this.state = this.val
  }
}
</script>

<style scoped lang="less">
.paget {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tran {
  display: flex;
  .tran-le {
    z-index: 1;
    cursor: pointer;
    width: 26px;

    background-color: #eff7ff;
    opacity: 1;
    border-left: 1px solid #afdcfa;
    display: flex;
    align-items: center;
    justify-content: center;
    .trangle {
      width: 18px;
      height: 30px;
      background: url(../../assets/tranleft.png);
      background-size: cover;
      transform: translate(0, -50%);
    }
    .trangle1 {
      width: 18px;
      height: 30px;
      background: url(../../assets/tranright.png);
      background-size: cover;
      transform: translate(0, -50%);
    }
    .trangle2 {
      width: 18px;
      height: 30px;
      background: url(../../assets/tranleft.png);
      background-size: cover;
      transform: translate(0, -50%);
    }
  }
}

.a-left {
  box-shadow: 1px 2px 4px rgba(175, 220, 250, 1);

  transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
  .a-left-tab {
    width: 300px;
    transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out,
      0.3s padding-bottom ease-in-out;
    /deep/ .tabs-scrool {
      padding: 5px 0px;
      .el-tabs__header {
        margin: 0;
        .el-tabs__nav-scroll {
          color: #98bff5 !important;
          .el-tabs__nav {
            border-bottom: 1px solid #afdcfa;
            background-color: #fff;
            .el-tabs__nav.is-stretch > * {
              flex: 1;
              text-align: left !important;
            }
            .el-tabs__item {
              padding: 0;
              // margin-left: 15px;
              width: 300px !important;
            }
          }
        }
      }
      .el-tabs__content {
        padding: 13px;
        background-color: #f9f9f9;
        z-index: 1;
        /*height: calc(100vh - 29px);*/
      }

      .el-tabs__nav-wrap.is-scrollable {
        padding: 0;
        box-sizing: border-box;
      }
    }
  }
  .b-left-tab {
    transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out,
      0.3s padding-bottom ease-in-out;
    width: 0;
  }

  .b-left {
    padding-right: 5px;
    transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out,
      0.3s padding-bottom ease-in-out;
    width: 0;
  }
}

.seachM {
  margin-top: 60%;
  font-size: 18px;
  text-align: center;
  color: rgba(164, 195, 255, 1);
}
.seaShow {
  margin-top: 65px;
  height: calc(100% - 100px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .row-sr {
    margin: 10px 0;
    .el-divider {
      background-color: #afdcfa;
    }
    .knowlage {
      display: flex;

      font-size: 14px;
      .knowlage-right {
        margin-left: 13px;
        .knowlage-r-t {
          font-size: 16px;
          margin-bottom: 6px;
        }
        .knowlage-r-m {
          margin-bottom: 6px;
          .txt {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            color: #707070;
          }
        }
        .knowlage-r-b {
          .knowlage-r-m .txt();
        }
      }
    }
  }
}
.result {
  padding-left: 15px;
  font-size: 14px;
  background-color: #fff;
  color: #2a82fe;
  width: 100%;
  height: 35px;
  line-height: 35px;
  position: absolute;
  left: 0;
  top: 60px;
  border-top: 2px solid rgba(181, 212, 255, 1);
  border-bottom: 2px solid rgba(181, 212, 255, 1);
}
.el-input {
  .el-input__inner {
    border-radius: 1px;
    height: 40px;
    line-height: 40px;
    border: #b9d6ff 1px solid;
  }
  .el-input__icon {
    color: #b9d6ff;
    font-size: 16px;
    line-height: 40px;
  }
}
/deep/ .middel1 {
  height: calc(100vh - 121px);
  .el-input;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .top {
    overflow: hidden;
    .title1 {
      font-weight: 700;
      margin: 20px 0;
      margin-top: 7px;
      font-size: 16px;
      color: #54677e;
    }
    .el-button {
      margin-top: 5px;
      float: right;
    }
    .el-button--primary {
      color: #fff;
      background-color: #86aefb;
      border-color: #86aefb;
    }
    .el-button:focus,
    .el-button:hover {
      color: #fff;
      border-color: #c6e2ff;
      background-color: #86aefb;
    }
    .el-button--primary.is-active,
    .el-button--primary:active {
      background: #86aefb;
      border-color: #86aefb;
      color: #fff;
    }
  }
  .el-divider {
    background-color: #afdcfa;
  }
}
/deep/ .middel {
  height: calc(100vh + 150px);
  .el-input;

  .result {
    padding-left: 15px;
    font-size: 14px;
    background-color: #fff;
    color: #2a82fe;
    width: 100%;
    height: 35px;
    line-height: 35px;
    position: absolute;
    left: 0;
    top: 65px;
    border-top: 2px solid rgba(181, 212, 255, 1);
    border-bottom: 2px solid rgba(181, 212, 255, 1);
  }

  .seachM {
    margin-top: 60%;
    font-size: 18px;
    text-align: center;
    color: rgba(164, 195, 255, 1);
  }
  .seaShow {
    margin-top: 65px;
    height: calc(100% - 100px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .row-sr {
      margin: 10px 0;
      .el-divider {
        background-color: #afdcfa;
      }
      .knowlage {
        display: flex;

        font-size: 14px;
        .img_size1 {
          width: 60px;
          height: 60px;
        }
        .knowlage-right {
          margin-left: 13px;
          .knowlage-r-t {
            font-size: 16px;
            margin-bottom: 6px;
          }
          .knowlage-r-m {
            margin-bottom: 6px;
            .txt {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              color: #707070;
            }
          }
          .knowlage-r-b {
            .knowlage-r-m .txt();
          }
        }
      }
    }
  }
}
</style>

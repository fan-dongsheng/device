<template>
  <div type="flex" justify="space-around" class="atlas">
    <!-- <el-button @click="hidden = !hidden">Click Me</el-button> -->
    <!-- <el-switch
  v-model="hidden"
  >
    </el-switch>-->

    <div class="tran" style="position: absolute;
    left: 0;">
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
                    <div @click="nodeSearch(item.entityvalue)" class="knowlage">
                      <div>
                        <img :src="item.entitylabel | imgage" class="img_size1" />
                      </div>
                      <div class="knowlage-right">
                        <div :title="item.entityvalue" class="knowlage-r-t">{{item.entityvalue}}</div>
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
            <!-- 关系检索========================================================== -->
            <el-tab-pane label="图谱检索" name="second">
              <div class="middel1">
                <div class="top">
                  <div class="title1">关系检索</div>
                  <el-input
                    style="margin-bottom:10px;"
                    clearable
                    size="small"
                    v-model="relation.inputScor"
                    placeholder="请输入实体"
                  ></el-input>
                  <el-input
                    style="margin-bottom:10px;"
                    clearable
                    size="small"
                    v-model="relation.inputTage"
                    placeholder="请输入实体"
                  ></el-input>
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="mini"
                    @click="getShortestPath"
                  >检索</el-button>
                </div>
                <el-divider style="background-color:#DBECFF;"></el-divider>
                <div class="top">
                  <div class="title1">实体检索</div>
                  <el-input
                    style="margin-bottom:10px;"
                    clearable
                    size="small"
                    v-model="ent.input"
                    placeholder="请输入实体"
                  ></el-input>

                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="mini"
                    @click="nodeSearch(ent.input)"
                  >检索</el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="tran-le" @click="hidden = !hidden">
        <div class="trangle" :class="{'trangle1':hidden}"></div>
      </div>
      <el-row class="a-middle-a">
        <el-col :span="24" style="margin-top:20px;margin-left:40px;">
          <span @mousedown="backDown" @mouseup="backShow">
            <img src="@/assets/back0.png" v-if="!this.backAct" class="img_size" />
            <img src="@/assets/back1.png" v-if="this.backAct" class="img_size" />
          </span>
          <span @mousedown="forwardDown" @mouseup="forwardShow">
            <img src="@/assets/forward0.png" v-if="!this.forwardAct" class="img_size" />
            <img src="@/assets/forward1.png" v-if="this.forwardAct" class="img_size" />
          </span>
          <!--<img src="@/assets/u1449.png" class="img_size" @click="showHistoryDialog" />-->
          <span @mousedown="locateDown" @mouseup="showSearchDialog">
            <img src="@/assets/locate0.png" v-if="!this.locateAct" class="img_size" />
            <img src="@/assets/locate1.png" v-if="this.locateAct" class="img_size" />
          </span>
          <!-- <span @mousedown="snipDown" @mouseup="showThemeDialog">
            <img src="@/assets/snip0.png" v-if="!this.snipAct" class="img_size" />
            <img src="@/assets/snip1.png" v-if="this.snipAct" class="img_size" />
          </span>-->

          <span id="deleteG" @mousedown="deleteDown" @mouseup="deleteUp">
            <img src="@/assets/delete0.png" v-if="!this.deleteAct" class="img_size" />
            <img src="@/assets/delete1.png" v-if="this.deleteAct" class="img_size" />
          </span>
          <span id="mag" @click="magnifyeLens">
            <img src="@/assets/fangdajing1.png" v-if="!this.magShow" class="img_size" />
            <img src="@/assets/fangdajing2.png" v-if="this.magShow" class="img_size" />
          </span>
          <span id="resetWD" @mousedown="resetDown" @mouseup="resetUp">
            <img src="@/assets/reset0.png" v-if="!this.resetAct" class="img_size" />
            <img src="@/assets/reset1.png" v-if="this.resetAct" class="img_size" />
          </span>
        </el-col>
        <!--<el-col :span="4">-->
        <!--<img src="@/images/u1022.png" class="img_size"/>-->
        <!--<img src="@/images/u1024.png" class="img_size"/>-->
        <!--</el-col>-->
      </el-row>
    </div>
    <div class="a-middle" ref="d3Width">
      <el-row>
        <el-col>
          <div id="container" ref="tuImage"></div>
          <!--<kg-plot :loadData="this.nodeData" :wide="720"></kg-plot>-->
        </el-col>
      </el-row>
    </div>

    <!-- 搜索话框 -->
    <el-dialog class="gps" title="定位搜索" :visible.sync="searchVisible" width="30%">
      <el-input
        @change="doSearchNode"
        v-model="searchNode"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <i class="el-icon-search el-input__icon" slot="suffix" @click="doSearchNode"></i>
      </el-input>
    </el-dialog>
    <!-- 历史记录 -->
    <el-dialog title="历史记录" :visible.sync="historyVisible" width="30%">
      <el-table :data="historylist" stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="导入时间" prop="datatime"></el-table-column>
        <el-table-column label="导入实体数量" prop="number"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 截图 -->
    <!-- <el-dialog @close="scrren" title="保存主题" class="gps" :visible.sync="themeVisible" width="670px">
      <Theme v-on:flag="shutDialog" v-bind:haoba="this.$refs.tuImage" :screenVisbal="screenVisbal"></Theme>
    </el-dialog>-->
    <!-- 条件拓展图谱需要输入的关系 -->
    <el-dialog
      class="gps scrgps"
      title="条件拓展"
      :visible.sync="$store.state.val"
      width="30%"
      @close="extendDialogClosed"
    >
      <el-input v-model="$store.state.name" disabled placeholder="请输入实体" class="input-with-select"></el-input>
      <div class="input-with-select">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <el-button icon="el-icon-search" @click="extendSearchNode">提交</el-button>
    </el-dialog>
  </div>
</template>
<script>
// const host = 'http://localhost.228:8081'
// import { load } from './js/graph.js'
import { update } from './update'
// import { getGraphData } from './js/graph.js'
// import { gethistCache } from './js/graph'
import { pltKg, magLens, locateNode } from './pltkg.js'
// import { dialogNode } from './js/pltkg' // 条件拓展
import { nodeSearch, getSearchNeoEntity, getRelation, reExtendNode } from '@/api/atlas.js'

const host1 = 'http://localhost:8023'
export default {
  components: {

  },
  mounted () {
    this.restaurants = this.loadAll()
    this.getRelation()
  },
  watch: {
    // 条件拓展监听
    '$store.state.val': function (newVal) {
      if (newVal === true) {
        this.getRelation()
      }
    },
    // dataset变化监听
    '$store.state.dataset': function (newdata) {
      // console.log(newdata)
      if (!this.bf) {
        this.backCount = 1
        if (this.histCache.length <= this.backStepLen) {
          this.histCache.push(newdata)
        } else {
          this.histCache.shift()
          this.histCache.push(newdata)
        }
      }
      this.bf = false
      // console.log("OOOOKKKKKKOOKKKK")
      // console.log(this.histCache)
    }
  },
  data () {
    return {
      screenVisbal: false, // '截图清空'
      statisticalNode: null, // 右侧统计
      statisticalRela: null,
      extend: {
        ent: '',
        link: ''
      },
      value: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      extndVisible: false,
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
      // listData:[{id:0,name:"中北大学",mainKey:"问题1",detail:"分系统1"},
      //           {id:1,name:"北京理工大学",mainKey:"问题2",detail:"分系统2"},
      //           {id:2,name:"北京航空航天大学",mainKey:"问题3",detail:"分系统3"},
      //           {id:3,name:"三部",mainKey:"问题4",detail:"分系统4"},
      //           {id:4,name:"304",mainKey:"问题5",detail:"分系统5"}],
      nodeData: Object,
      searchNode: '',
      backCount: 1,
      bf: false,
      resNode: null,
      magShow: false,
      histCache: [],
      backStepLen: 4,
      backAct: false,
      forwardAct: false,
      snipAct: false,
      locateAct: false,
      deleteAct: false,
      resetAct: false
    }
  },
  filters: {
    // 列表抽取，标记，入库状态
    imgage (value) {
      if (value === '型号') {
        return require('@/assets/u262x.png')
      } else if (value === '质量问题') {
        return require('@/assets/problem.png')
      } else if (value === '产品') {
        return require('@/assets/prod.png')
      } else if (value === '内部单位') {
        return require('@/assets/danwei.png')
      }
    },
    nodeSplice (val) {
      return val.substring(1, val.length - 1)
    }
  },
  methods: {
    // 获取条件拓展的关系
    async getRelation () {
      try {
        const { data } = await getRelation({
          nodeName: this.$store.state.name
        })

        console.log(data, 'sousuo===============')
        this.options = data.map((item, index) => {
          return {
            value: item,
            label: item
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 条件拓展
    async reExtendNode () {
      try {
        const { data } = await reExtendNode({
          node: this.$store.state.name,
          edge: this.$store.state.relation
        })
        const comData = data
        var arrEdges = []
        var arrNodes = []
        // 判断元素是否在ARRAY中
        var a = function isInArray (arr, value) {
          for (var i = 0; i < arr.length; i++) {
            if (value === arr[i].name) {
              return true
            }
          }
          return false
        }

        // 判断元素是否在ARRAY中
        var b = function EdgeIsInArray (arr, value) {
          for (var i = 0; i < arr.length; i++) {
            if (value.source_name === arr[i].target_name && value.target_name === arr[i].source_name) {
              return true
            }
          }
          return false
        }

        for (let i = 0; i < comData.nodes.length; i++) {
          if (!a(this.wnode.nodes, comData.nodes[i].name)) {
            arrNodes.push(comData.nodes[i])
          }
        }
        // nodes = dataset.nodes.concat(arrNodes)
        // console.log(nodes)
        for (let i = 0; i < comData.links.length; i++) {
          const obj2 = comData.links[i]
          if (!b(this.wnode.links, comData.links[i])) {
            arrEdges.push(obj2)
          }
        }

        this.wnode = { nodes: this.wnode.nodes.concat(arrNodes), links: this.wnode.links.concat(data.links) }
        this.initSvg(this.wnode)
      } catch (error) {
        console.log(error)
      }
    },
    // 条件拓展
    extendSearchNode () {
      console.log(this.value)
      this.$store.commit('val', false)
      this.$store.commit('relation', this.value)
      update()
      this.reExtendNode()
      this.options = []
      // this.initSvg(this.wnode).reExtendNode()
    },
    // svg启动程序
    initSvg (data) {
      pltKg(data)
      // this.hidden=false
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.page.current = newPage
      this.getSearchNeoEntity(this.state)
    },
    // 输入input值
    changeValue (value) {
      console.log(value, 1111111111)
      this.getSearchNeoEntity(value)
    },
    // 模糊搜索接口

    async getSearchNeoEntity (value) {
      try {
        const params = {
          page: this.page.current,
          size: this.page.pageSize
        }
        const { data } = await getSearchNeoEntity(value, params)
        console.log(data, 'sousuo===============')
        this.total = data.count
        this.listData = data.datas
      } catch (error) {
        console.log(error)
      }
    },
    // 模糊搜索
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (state) => {
        return state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    loadAll () {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
        { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { value: '泷千家(天山西路店)', address: '天山西路438号' }
      ]
    },
    handleSelect (item) {
      console.log(item)
      item.value = this.state
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    // 检索tabs
    handleClick () { },
    extendDialogClosed () {
      this.extndVisible = false
      this.options = []
      this.value = []
    },
    // searchDialogClosed() {
    //   this.$refs.addressFormRef.resetFields()
    // },
    locateDown () {
      this.locateAct = true
    },
    showSearchDialog () {
      this.locateAct = false
      this.searchVisible = true
    },
    showHistoryDialog () {
      this.historylist = this.doHistory()
      this.historyVisible = true
    },
    doHistory () {
      this.$ajax
        .get(host1 + '/getHistoriesByType?type=knowledge')
        .then((res) => {
          const tableData = []
          res.data.data.histories.forEach((val, index, arr) => {
            const obj = {}
            // 处理record
            const subject = val.historySubject
            const scope = val.historyScope
            obj.record = subject + '（' + scope + '）'
            // 处理time
            const date = new Date(val.createDate)
            const year = date.getFullYear()
            let month
            if (date.getMonth() + 1 < 10) {
              month = '0' + (date.getMonth() + 1)
            } else {
              month = date.getMonth() + 1
            }
            let day
            if (date.getDate() + 1 < 10) {
              day = '0' + date.getDate()
            } else {
              day = date.getDate()
            }
            const hours = date.getHours()
            let minutes
            if (date.getMinutes() + 1 < 10) {
              minutes = '0' + date.getMinutes()
            } else {
              minutes = date.getMinutes()
            }
            let seconds
            if (date.getSeconds() + 1 < 10) {
              seconds = '0' + date.getSeconds()
            } else {
              seconds = date.getSeconds()
            }
            obj.time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
            // 处理id
            obj.historyId = val.historyId
            tableData.push(obj)
          })
          return tableData
          // this.$Loading.service().close()
          // this.$emit("listenHistories", tableData)
        })
        .catch((error) => {
          console.log(error)
          this.$alert('获取历史记录失败！', '错误', {
            confirmButtonText: '确定'
          })
          // this.$Loading.service().close()
        })
    },
    snipDown () {
      this.snipAct = true
    },
    showThemeDialog () {
      this.snipAct = false
      this.themeVisible = true
    },
    // 处理后台返回的数据
    dataCur () { },
    // 关系检索
    async getShortestPath () {
      const { data } = await this.$ajax({
        url: `${host1}/MapDisplay/getShortestPath`,
        params: {
          node1Name: this.relation.inputScor,
          node2Name: this.relation.inputTage
        }
      })

      this.resNode = data.nodes
      this.wnode = data
      update()

      this.initSvg(data)
      // load(data, 720, false)
    },
    // 知识检索，实体检索
    async nodeSearch (keyword) {
      try {
        const params = {
          nodeName: keyword
        }
        const { data } = await nodeSearch(params)
        // console.log(data.links[0].source)
        this.resNode = data.nodes // d3
        this.statisticalNode = data.labels // 统计实体
        this.statisticalRela = data.edges // 统计关系
        this.wnode = data
        update()
        this.initSvg(data)
      } catch (error) {
        this.$alert('知识检索失败！', '错误', {
          confirmButtonText: '确定'
        })
        console.log(error)
      }
    },
    doSearchNode () {
      this.searchVisible = false
      var finded = locateNode(this.searchNode)
      if (!finded) {
        this.$message.warning('没有找到该实体')
      }
      this.searchNode = ''
    },
    backDown () {
      this.backAct = true
    },
    backShow () {
      this.backAct = false
      this.bf = true
      if (this.backCount < this.histCache.length) {
        this.backCount++
      } else {
        this.backCount = this.histCache.length
      }
      update()
      this.initSvg(this.histCache[this.histCache.length - this.backCount])
      console.log(this.backCount)
    },
    forwardDown () {
      this.forwardAct = true
    },
    forwardShow () {
      this.forwardAct = false
      this.bf = true
      if (this.backCount > 1) {
        this.backCount--
      } else {
        this.backCount = 1
      }
      console.log('长度' + this.histCache.length)
      console.log('步数' + this.backCount)
      update()
      this.initSvg(this.histCache[this.histCache.length - this.backCount])
    },

    shutDialog (da) {
      this.themeVisible = da
    },
    scrren () {
      this.screenVisbal = !this.screenVisbal
    },
    magnifyeLens () {
      this.magShow = !this.magShow
      console.log(this.magShow)
      const ob = this.magShow
      magLens(ob)
    },
    deleteDown () {
      this.deleteAct = true
    },
    deleteUp () {
      this.deleteAct = false
    },
    resetDown () {
      this.resetAct = true
    },
    resetUp () {
      this.resetAct = false
    }
  }
}
</script>
<style lang="less" scoped>
.collapse-transition {
  transition: 10s width ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}

.atlas {
  display: flex;
  height: calc(100vh - 29px);
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
    .a-middle-a {
      height: 60px;
      z-index: 999;
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
              .el-tabs__item {
                padding: 0;
                width: 150px !important;
              }
            }
          }
        }
        .el-tabs__content {
          padding: 13px;
          background-color: #f9f9f9;
          z-index: 1;
          height: calc(100vh - 85px);
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
  .a-middle {
    margin-left: 10px;
    flex: 1;
  }
  .a-bottom-tab {
    width: 240px;
    transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out,
      0.3s padding-bottom ease-in-out;
    /deep/ .el-tabs {
      .el-tabs__header {
        margin: 0;
        .el-tabs__nav {
          border-bottom: 1px solid #afdcfa;
          background-color: #fff;
          .el-tabs__item {
            padding: 0;
            width: 80px !important;
          }
        }
      }
      .el-tabs__content {
        padding: 10px;
        padding-right: 0;
        background-color: #f9f9f9;
        z-index: 2;
        height: calc(100vh - 74px);
      }
    }
    /deep/ .el-tabs__nav-wrap.is-scrollable {
      padding: 0;
      box-sizing: border-box;
    }
  }
  .b-bottom-tab {
    border: none;
    width: 0;
    transition: 0.3s width ease-in-out, 0.3s padding-top ease-in-out,
      0.3s padding-bottom ease-in-out;
    /deep/ .el-tabs {
      .el-tabs__content {
        padding: 0px;
        background-color: #f9f9f9;
        z-index: 1;
        height: calc(100vh - 74px);
      }
    }
  }
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/deep/ .el-input__suffix {
  cursor: pointer;
}

.paget {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
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
/deep/ .middel {
  height: calc(100vh - 131px);
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
        .knowlage-right {
          margin-left: 13px;
          .knowlage-r-t {
            font-size: 16px;
            margin-bottom: 6px;
            box-sizing: border-box;
            max-width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .knowlage-r-m {
            margin-bottom: 6px;
            .txt {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis; /* 修剪文本 */
              -webkit-line-clamp: 2;
              overflow: hidden;
              color: #707070;
              display: -moz-box;
              -moz-line-clamp: 2;
              -moz-box-orient: vertical;
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
.statis {
  margin: 8px;
  .statT {
    margin-bottom: 10px;
    font-size: 14px;
    span {
      display: inline-block;
      margin: 5px;
      width: 17px;
    }
    .title {
      font-size: 16px;
      color: #5b5b5b;
      margin-bottom: 10px;
    }
    .conent {
      color: cornflowerblue;
      display: flex;
      align-items: center;
      margin: 5px 0;
      .one {
        box-sizing: border-box;
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pill {
        width: 40px;
        border-radius: 2px;
        border: 5px cornflowerblue solid;
        margin: 0 5px;
      }
    }
  }
}
.img_size {
  width: 30px;
  height: 30px;
  margin: 3px;
}
.img_size1 {
  width: 60px;
  height: 60px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

<style lang="less" scoped>
@title_bgc: #e6f0fe;
@border_c: #b1d2ff;

.el-tabs--border-card > .el-tabs__header {
  background-color: #ffffff;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #e6f0fe !important;
}
.el-tabs--border-card {
  border: 1px solid @border_c;
}
</style>
<style lang="less" scoped src="@/styles/dialog.less">
// @import '@/components/atlas/dialog.less';
</style>

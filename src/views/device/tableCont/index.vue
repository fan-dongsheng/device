<template>
  <div class="tableCont">
    <!-- 左侧菜单 -->
    <div class="side">
      <div class="side-top">
        <span @click="visbleSide = !visbleSide">隐藏过滤器</span>
        <span @click="clearData">重置</span>
      </div>
      <el-button
        type="primary"
        size="small"
        @click="searchAll"
        style="margin-left: 10px; margin-bottom: 10px; cursor: pointer"
        >搜索</el-button
      >
      <div class="side-bottom" v-if="visbleSide">
        <div class="box">
          <div class="title">
            <el-checkbox v-model="van.checked">委托单位</el-checkbox>
          </div>
          <div class="cont">
            <el-input
              size="small"
              v-model="van.input"
              placeholder="请输入单位名称"
            ></el-input>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="cheng.checked">元器件名称</el-checkbox>
          </div>
          <div class="cont">
            <el-input
              size="small"
              v-model="cheng.input"
              placeholder="请输入单位名称"
            ></el-input>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="weituo.checked">委托时间</el-checkbox>
          </div>
          <div class="cont">
            <el-date-picker
              size="small"
              v-model="weituo.timeValue"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="type.checked">元器件类型</el-checkbox>
          </div>
          <div class="cont">
            <el-select size="small" v-model="type.value" placeholder="请选择">
              <el-option
                v-for="item in type.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="factor.checked">生产厂家</el-checkbox>
          </div>
          <div class="cont">
            <el-input
              size="small"
              v-model="factor.input"
              placeholder="请输入厂家名称"
            ></el-input>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="contry.checked">国产进口</el-checkbox>
          </div>
          <div class="cont">
            <el-select size="small" v-model="contry.value" placeholder="请选择">
              <el-option
                v-for="item in contry.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="result.checked">试验结论</el-checkbox>
          </div>
          <div class="cont">
            <el-select size="small" v-model="result.value" placeholder="请选择">
              <el-option
                v-for="item in result.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="fight.checked">试验单位</el-checkbox>
          </div>
          <div class="cont">
            <el-input
              size="small"
              v-model="fight.input"
              placeholder="请输入单位名称"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 元器件表格 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="复验筛选" name="first">
        <tableCommon :tableDatas="tableData" />
      </el-tab-pane>
      <el-tab-pane label="DPA试验" name="second">
        <dpa :tableDatas="tableDataDpa" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tableCommon from '../tableCommon'
import dpa from '../dpa'
import { getTable, getDpa, getFind, getDpaFind } from '@/api/collra.js'
import eventBus from '@/eventBus'
export default {
  components: {
    tableCommon,
    dpa
  },
  // props: ["keyWord"],
  data () {
    return {
      // 隐藏过滤器
      visbleSide: true,
      // 需要传给表格的数据
      tableData: {},
      tableDataDpa: {},
      // 委托单位
      van: {
        input: '',
        checked: false
      },
      // 元器件名称
      cheng: {
        input: '',
        checked: false
      },
      // 委托shijian
      weituo: {
        timeValue: '',
        checked: false
      },
      // 元器件类型
      type: {
        checked: false,
        value: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]

      },
      // 生产厂家
      factor: {
        checked: false,
        input: ''
      },
      // 国产进口
      contry: {
        checked: false,
        value: '',
        options: [{
          value: '1',
          label: '国产'
        }, {
          value: '2',
          label: '进口'
        }]
      },
      // 试验结论
      result: {
        checked: false,
        value: '',
        options: [{
          value: '1',
          label: '合格'
        }, {
          value: '2',
          label: '不合格'
        }]
      },
      // 试验单位
      fight: {
        checked: false,
        input: ''
      },
      // tabs页
      activeName: 'first'

    }
  },
  methods: {
    // 清空查询
    clearData () {
      this.van = {
        input: '',
        checked: false
      }
      this.cheng = {
        input: '',
        checked: false
      }
      this.weituo = {
        timeValue: '',
        checked: false
      }
      this.type = {
        checked: false,
        value: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
      this.factor = {
        checked: false,
        input: ''
      }
      this.contry = {
        checked: false,
        value: '',
        options: [{
          value: '1',
          label: '国产'
        }, {
          value: '2',
          label: '进口'
        }]
      }
      this.result = {
        checked: false,
        value: '',
        options: [{
          value: '1',
          label: '合格'
        }, {
          value: '2',
          label: '不合格'
        }]
      }
      this.fight = {
        checked: false,
        input: ''
      }
      this.searchAll()
    },
    searchAll () {
      this.getTable()
    },
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.name == 'second') {
        this.getDpa()
        //Dpa产品推荐
        this.$emit('getDpaRecommended', this.activeName)
      }
      else if (tab.name == 'first') {
        // this.getDpa()
        //复验产品推荐
        this.$emit('getDpaRecommended', this.activeName)
      }
    },
    // 处理请求参数
    curPam () {
      const params = {

        entrustedunit: '', // 委托单位
        componentsname: '', // 元器件名称
        entrustedtime: '', // 委托时间
        componentstype: '', // 元器件类型
        manufacturer: '', // 生产厂家
        countriesorimports: '', // 国产/进口
        testconclusion: '', // 试验结论
        testunit: '' // 试验单位

      }
      var van = this.van
      var cheng = this.cheng
      var weituo = this.weituo
      var type = this.type
      var factor = this.factor
      var contry = this.contry
      var result = this.result
      var fight = this.fight
      if (van.checked) {
        params.entrustedunit = van.input
      }
      if (cheng.checked) {
        params.componentsname = cheng.input
      }
      if (weituo.checked) {
        params.entrustedtime = weituo.timeValue
      }
      if (type.checked) {
        params.componentstype = type.value
      }
      if (factor.checked) {
        params.manufacturer = factor.input
      }
      if (contry.checked) {
        params.countriesorimports = contry.value
      }
      if (result.checked) {
        params.testconclusion = result.value
      }
      if (fight.checked) {
        params.testunit = fight.input
      }
      return params
    },
    //调取复验筛选查询
    async getTable () {
      const params = this.curPam()
      const { data } = await getTable(params)

      this.tableData = data.data
    },
    //DPA查询
    async getDpa () {
      const params = this.curPam()
      const { data } = await getDpa(params)
      console.log(data, '=========')
      this.tableDataDpa = data.data
    },
    //复验关键字搜索
    async getFind (val) {
      const { data } = await getFind({
        keyword: val
      })
      this.tableData = data.data
    },
    //DPA关键字搜索
    async getDpaFind (val) {
      const { data } = await getDpaFind({
        keyword: val
      })
      this.tableDataDpa = data.data
    }
  },
  watch: {
    "activeName": function (params) {
      console.log(params);
    }
  },
  created () {
    this.getTable()
    eventBus.$on('keyWord', (val) => {
      if (this.activeName == 'first') {
        this.getFind(val)
      } else if (this.activeName == 'second') {
        this.getDpaFind(val)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.tableCont {
  display: flex;
  margin-top: 30px;
  margin-right: 20px;
  margin-bottom: 20px;
  .side {
    width: 15%;
    margin: 0 20px;

    .side-top {
      text-align: left;
      margin-bottom: 20px;
      cursor: pointer;
      span {
        margin: 10px;
      }
    }
    .side-bottom {
      .box {
        width: 100%;
        border: 1px solid #ccc;
        .title {
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background: #e5f0ff;
        }
        .cont {
          height: 60px;
          line-height: 60px;
          padding: 0 5px;
          .el-date-editor.el-input,
          .el-date-editor.el-input__inner {
            width: auto;
          }
        }
      }
    }
  }
  /deep/ .el-tabs {
    width: 83%;
    box-sizing: border-box;
    .el-tabs__item {
      font-size: 16px;
    }
  }
}
</style>

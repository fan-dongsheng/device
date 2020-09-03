<template>
  <div class="tableCont">
    <!-- 左侧菜单 -->
    <div class="side">
      <div class="side-top">
        <span>隐藏过滤器</span>
        <span>重置</span>
      </div>
      <div class="side-bottom">
        <div class="box">
          <div class="title">
            <el-checkbox v-model="van.checked">委托单位</el-checkbox>
          </div>
          <div class="cont">
            <el-input size="small" v-model="van.input" placeholder="请输入单位名称"></el-input>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="cheng.checked">元器件名称</el-checkbox>
          </div>
          <div class="cont">
            <el-input size="small" v-model="cheng.input" placeholder="请输入单位名称"></el-input>
          </div>
        </div>
        <div class="box">
          <div class="title">
            <el-checkbox v-model="weituo.checked">委托时间</el-checkbox>
          </div>
          <div class="cont">
            <el-date-picker size="small" v-model="weituo.timeValue" type="date" placeholder="选择日期"></el-date-picker>
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
            <el-input size="small" v-model="factor.input" placeholder="请输入厂家名称"></el-input>
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
            <el-input size="small" v-model="fight.input" placeholder="请输入单位名称"></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 元器件表格 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="复验筛选" name="first">
        <tableCommon />
      </el-tab-pane>
      <el-tab-pane label="DPA试验" name="second">DPA试验</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tableCommon from '../tableCommon'
import { getTable } from '@/api/collra.js'
export default {
  components: {
    tableCommon
  },
  data () {
    return {
      // 物资编码
      van: {
        input: '',
        checked: false
      },
      // 元器件名称
      cheng: {
        input: '',
        checked: false
      },
      // 委托单位
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
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    async getTable () {
      const params = []
      const { data } = await getTable(params)
      console.log(data, '=========')
    }
  },
  created () {
    this.getTable()
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
    width: 12%;
    margin: 0 20px;

    .side-top {
      text-align: center;
      margin-bottom: 20px;
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
  .el-tabs {
    width: 85%;
    box-sizing: border-box;
  }
}
</style>

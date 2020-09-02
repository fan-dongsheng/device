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
            <el-checkbox v-model="van.checked">物资编码</el-checkbox>
          </div>
          <div class="cont">
            <el-input size="small" v-model="van.input" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 元器件表格 -->

    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{ background: '#E5F0FF',color:'#6D87A7',textAlign:'center' }"
      :cell-style="cellstyle"
      @selection-change="handleSelectionChange"
      :row-key="getRowKeys"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column label="文件名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="入库" v-if="$route.query.dataType=='s'">
        <template slot-scope="scope">{{ scope.row.bank }}</template>
      </el-table-column>
      <el-table-column label="抽取" v-else width="100">
        <template slot-scope="scope">{{ scope.row.extract }}</template>
      </el-table-column>

      <el-table-column label="标记" v-if="$route.query.dataType!='s'" width="100">
        <template slot-scope="scope">{{ scope.row.mark }}</template>
      </el-table-column>

      <!-- <el-table-column prop="extract" label="抽取" ></el-table-column> -->
      <!-- <el-table-column prop="mark" label="标记" ></el-table-column>
      <el-table-column prop="bank" label="入库" ></el-table-column> item.substring( 0,item.lastIndexOf('.'))-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <!-- <el-button @click="delData(scope.row)" type="text" size="small">删除</el-button> -->
          <el-button
            type="text"
            size="small"
            v-if="scope.row.name.substring( scope.row.name.lastIndexOf('.')+1)=='txt'"
            @click="pushextract(scope.row)"
          >抽取</el-button>
          <el-button
            type="text"
            size="small"
            v-if="scope.row.name.substring( scope.row.name.lastIndexOf('.')+1)=='txt'"
            @click="pushmark(scope.row)"
          >标注</el-button>
          <el-button type="text" size="small" v-else @click="pushbank(scope.row)">入库</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 物资编码
      van: {
        input: '',
        checked: false
      },
      // 获取row的key值
      getRowKeys (row) {
        return row.name
      },
      tableData: [
        {
          name: 'a.txt',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        },
        {
          name: 'b.txt',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        },
        {
          name: 'c.txt',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        }
      ], // 多选列表
      multipleSelection: [], // 多选结果
      mut: []
    }
  },
  methods: {
    // 表格属性
    cellstyle ({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center;height:46px;line-height:46px;padding:0;border-right: 1px solid #DBE8FB;border-bottom: 1px solid #DBE8FB;'
    },
    // 表格多选
    handleSelectionChange (val) {
      console.log(this.multipleSelection)

      this.mut.push(...val)
      console.log(val)
      console.log(this.mut)
      var a = []
      a = val.map(item => {
        return item.name
      })
      this.multipleSelection = a

      console.log(a)
    }
  }
}
</script>

<style lang="less" scoped>
.tableCont {
  display: flex;
  margin-top: 30px;
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
        }
      }
    }
  }
}
</style>

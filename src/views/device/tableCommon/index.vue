<template>
  <div class="tableCommon">
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :header-cell-style="{ background: '#E5F0FF',color:'#6D87A7',textAlign:'center' }"
      :cell-style="cellstyle"
      @selection-change="handleSelectionChange"
      :row-key="getRowKeys"
    >
      <el-table-column type="selection" width="39" :reserve-selection="true"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="table-ee">
            <div class="ee-top">
              <img src="@/assets/qijian.png" alt />
            </div>
            <div class="ee-minddle">
              <div class="ee-minddle-t">
                <span>LM321LV</span>
                <span>停止供货</span>
                <span>推荐指数：</span>
                <el-rate
                  v-model="rateValue"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                ></el-rate>
              </div>
              <div class="ee-minddle-m">
                <img src="@/assets/detail.png" alt />
                <span>产品详情</span>

                <img src="@/assets/tupu.png" alt />
                <span>图谱分析</span>
              </div>
              <div class="ee-minddle-b">
                <span>筛选结果：合格</span>
                <span>是否故障：是</span>
                <span>DPA失效模式：xxxxxxx</span>
              </div>
            </div>
            <div class="ee-bottom">
              <img src="@/assets/zhanshi.png" alt />
              {{ props.row.name }}
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="序号">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="试验编号"></el-table-column>
      <el-table-column prop="createTime" label="委托单位"></el-table-column>
      <el-table-column prop="createTime" label="所属工程"></el-table-column>
      <el-table-column prop="createTime" label="元器件类型"></el-table-column>
      <el-table-column prop="createTime" label="元器件名称"></el-table-column>
      <el-table-column prop="createTime" label="生产批次"></el-table-column>
      <el-table-column prop="createTime" label="生产厂家"></el-table-column>
      <el-table-column prop="createTime" label="国产/进口"></el-table-column>
      <el-table-column prop="createTime" label="试验类型"></el-table-column>
      <el-table-column prop="createTime" label="送检数量"></el-table-column>
      <el-table-column prop="createTime" label="试验单位"></el-table-column>
      <el-table-column prop="createTime" label="试验结论"></el-table-column>
      <el-table-column prop="createTime" label="失效数量"></el-table-column>
      <el-table-column prop="createTime" label="合格判据"></el-table-column>
      <el-table-column prop="createTime" label="实测数值"></el-table-column>
      <el-table-column prop="createTime" label="失效模式"></el-table-column>
      <el-table-column prop="createTime" label="质量等级"></el-table-column>
      <el-table-column prop="createTime" label="封装形式"></el-table-column>
      <el-table-column prop="createTime" label="费用"></el-table-column>
      <el-table-column prop="createTime" label="一级分类"></el-table-column>
      <el-table-column prop="createTime" label="流程单备注"></el-table-column>
      <el-table-column prop="createTime" label="委托人"></el-table-column>
      <el-table-column prop="createTime" label="状态"></el-table-column>
      <el-table-column prop="createTime" label="采购编号"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pag">
      <el-pagination
        background
        layout="prev, pager, next,jumper"
        :current-page="page.currentPage"
        :total="page.total"
        @current-change="getCurrentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rateValue: 3.7,
      // 获取row的key值
      getRowKeys (row) {
        return row.name
      },
      tableData: [
        {
          name: '101',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        },
        {
          name: '102',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        },
        {
          name: '103',
          createTime: '2020-6-15',
          description: '描述',
          extract: '未抽取',
          mark: '未标注',
          bank: '未入库'
        }
      ], // 多选列表
      multipleSelection: [], // 多选结果
      mut: [],
      page: {
        total: 0, // 总条数
        pageSize: 10, // 每页显示条数
        currentPage: 1 // 当前页
      }
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
    },
    // 请求当前页数;
    getCurrentPage (newPage) {
      this.page.currentPage = newPage

      // 掉接口
    }
  }
}
</script>

<style lang="less" scoped>
.tableCommon {
  .pag {
    text-align: right;
    height: 65px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    .el-pagination {
      margin-top: 24px;
      .el-pager {
        color: #606266;
        font-weight: 500;
      }
      .el-pagination__total {
        margin-right: 25px;
      }
    }
  }
}
.table-ee {
  width: 70%;
  display: flex;
  .ee-top {
    width: 22%;
  }
  .ee-minddle {
    flex: 1;
    font-size: 16px;
    .ee-minddle-t {
      line-height: 20px;
      display: flex;
      span {
        margin-right: 15px;
      }
    }
    .ee-minddle-m {
      display: flex;
      align-items: center;
      margin: 20px 0;
      span {
        margin: 0 10px;
      }
    }
    .ee-minddle-b {
      span {
        margin-right: 20px;
      }
    }
  }
  .ee-bottom {
    width: 22%;
    img {
      width: 100%;
      height: 70%;
    }
  }
}
</style>

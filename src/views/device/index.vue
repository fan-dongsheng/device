<template>
  <div class="device">
    <!-- 检索 -->

    <div class="div-flx">
      <el-input
        placeholder="输入关键字搜索"
        v-model="inputV"
        class="input-with-select"
      ></el-input>
      <el-button type="primary" @click="changeAllStatus">
        <span class="iconImg"></span>
      </el-button>
    </div>

    <!-- 产品推荐 -->
    <div class="recommended">
      <span style="border-right: 1px #396fff solid">产品推荐</span>
      <el-select
        @change="changeType"
        clearable
        v-model="LeveValue"
        size="small"
        placeholder="请选择一级分类"
        class="level"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        clearable
        v-model="LeveTvalue"
        size="small"
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span v-for="(item, index) in componentsnameList" :key="index">{{
        item
      }}</span>
    </div>

    <!-- 元器件表格 -->
    <tableCont @getDpaRecommended="getDpaRecommended" />
  </div>
</template>

<script>
import tableCont from './tableCont'
import { getRecommended, getDpaRecommended, getLeve, getLeveDpa } from '@/api/collra.js'
import eventBus from '@/eventBus'
export default {
  components: {
    tableCont
  },
  data () {
    return {
      //产品推荐的下拉框
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
      }],
      //产品推荐下拉二
      optionsType: [
        {
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
        }
      ],
      //一级分类
      LeveValue: "",
      //二级分类
      LeveTvalue: '',
      // 搜索
      inputV: '',
      //传给tableCount的值
      inputNew: '',
      //复验产品推荐
      componentsnameList: [],
      tabs: ''

    }
  },
  methods: {
    //关键字搜索
    async changeAllStatus () {
      // const {data}=await getFind()
      this.inputNew = this.inputV
      eventBus.$emit('keyWord', this.inputV)
    },
    //改变一级分类调取产品推荐
    async changeType (val) {
      if (this.tabs == 'second') {

        this.getDpaRecommendedtype()
        // const { data } = await getDpaRecommended()
        // this.componentsnameList = data.data.componentsnameList
      } else if (this.tabs == 'first') {
        this.getRecommended()
        // this.getRecommended()
      }
    },
    //获取产品推荐一级分类
    async getLeve () {
      const { data } = await getLeve()
      console.log(data, '一级分类');
    },
    //获取复验产品推荐
    async getRecommended () {
      const { data } = await getRecommended()
      this.componentsnameList = data.data.componentsnameList

    },
    //获取dpa一级分类
    async getLeveDpa () {
      const { data } = await getLeveDpa()
      console.log(data, 'dpa一级分类');
    },
    //获取dpa产品推荐
    async getDpaRecommendedtype () {
      const { data } = await getDpaRecommended()
      this.componentsnameList = data.data.componentsnameList

    },
    //监听tabs传过来的值
    async getDpaRecommended (val) {
      this.tabs = val
      if (val == 'second') {
        this.getLeveDpa()
        // const { data } = await getDpaRecommended()
        // this.componentsnameList = data.data.componentsnameList
      } else if (val == 'first') {
        this.getLeve()
        // this.getRecommended()
      }
    }
  },
  created () {
    this.getRecommended()
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
    border-top: 1px solid #b9d6ff;
    border-bottom: 1px solid #b9d6ff;
    text-align: center;
    position: relative;
    align-items: center;
    span {
      display: inline-block;
      width: 7%;
      cursor: pointer;
      &:hover {
        color: #396fff;
      }
    }
    .level {
      margin: 0 10px;
    }
  }
}
</style>

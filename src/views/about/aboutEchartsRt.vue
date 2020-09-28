<template>
  <div class="aboutEchartsRt">
    <div class="left">
      <div class="title" @click="activeTle(0)" :class="{ common: active == 0 }">
        <div class="box">
          <span>复验筛选不合格器件按国产进口比例统计</span>
        </div>
      </div>
      <div class="title" @click="activeTle(1)" :class="{ common: active == 1 }">
        <div class="box">
          <span>复验筛选不合格器件按器件类别统计</span>
        </div>
      </div>
      <div class="title" @click="activeTle(2)" :class="{ common: active == 2 }">
        <div class="box">
          <span>复验筛选不合格器件按元器件类型类别统计</span>
        </div>
      </div>
      <!-- <div class="title" @click="activeTle(3)" :class="{ common: active == 3 }">
        <div class="box">
          <span>复验筛选不合格按生产厂家出现次数排序</span>
        </div>
      </div> -->
      <div class="title" @click="activeTle(3)" :class="{ common: active == 3 }">
        <div class="box">
          <span>复验筛选不合格占比(%)按生产 厂家排序</span>
        </div>
      </div>
      <div class="title" @click="activeTle(4)" :class="{ common: active == 4 }">
        <div class="box">
          <span>批退</span>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- 复验筛选不合格器件按国产进口比例统计 -->
      <div
        id="PaiXu"
        style="width: 100%; height: 100%"
        v-show="active == 0"
      ></div>
      <div
        id="EacHFn1"
        style="width: 100%; height: 100%"
        v-show="active == 1"
      ></div>
      <div
        id="echartsOne"
        style="width: 100%; height: 100%"
        v-show="active == 2"
      ></div>
      <!-- <div
        id="PaiXu2"
        style="width: 100%; height: 100%"
        v-show="active == 3"
      ></div> -->
      <div
        id="anli"
        style="width: 100%; height: 100%"
        v-show="active == 3"
      ></div>
      <!-- <div
        id="anli"
        style="width: 100%; height: 100%"
        v-show="active == 4"
      ></div> -->
    </div>
    <el-dialog
      @open="huidiao"
      title="详情"
      :visible.sync="$store.state.echartsVisble"
    >
      <div id="anli1" style="width: 100%; min-height: 300px"></div>
    </el-dialog>
  </div>
</template>

<script>
import { PaiXu, EacHFn1, echartsOne, anli, anliType } from './ea'
import { getCountcountriesorimports, getCountprimaryclassification, getCountcomponentstype, getCountmanufacturer, getQuerynowmanufacturer } from '@/api/screen'
export default {
  data () {
    return {
      active: 0,
      //复验筛选不合格器件按国产进口比例统计
      datas: [
        {
          NAME: '国产',
          VALUE: 31,
          TIME: '202001',
          SECRET: null
        },
        {
          NAME: '进口',
          VALUE: 20,
          TIME: '202001',
          SECRET: null
        }
      ],
      //复验筛选不合格器件按器件类别统计
      datasOne: [
        {
          NAME: '集成电路',
          VALUE: 31,
          TIME: '202001',
          SECRET: null
        },
        {
          NAME: '半导体分立器件',
          VALUE: 20,
          TIME: '202001',
          SECRET: null
        },
      ],
      //复验筛选不合格器件按元器件类型类别统计
      datasTwo: [
        {
          NAME: '半导体',
          GC: 36,
          JK: 24,
          TIME: '202001',
          SECRET: null
        },
      ],
      //复验筛选不合格按生产厂家出现次数排序
      datasThree: [
        {
          YQJMC: '三极管',
          WTDW: '上海',
          BHGSL: 10,
          PM: '1',
          F_GUOCHANJINKOU: '国产',
          SECRET: null
        },
        {
          YQJMC: '三极管',
          WTDW: '天津',
          BHGSL: 8,
          PM: '3',
          F_GUOCHANJINKOU: '国产',
          SECRET: null
        },
        {
          YQJMC: '三极管',
          WTDW: '天津',
          BHGSL: 2,
          PM: '1',
          F_GUOCHANJINKOU: '国产',
          SECRET: null
        },
        {
          YQJMC: '二极管',
          WTDW: '北京',
          BHGSL: 0,
          PM: '1',
          F_GUOCHANJINKOU: '国产',
          SECRET: null
        },
        {
          YQJMC: '二极管',
          WTDW: '济南',
          BHGSL: 12,
          PM: '1',
          F_GUOCHANJINKOU: '国产',
          SECRET: null
        },

        {
          YQJMC: '二极管',
          WTDW: '天津',
          BHGSL: 8,
          PM: '3',
          F_GUOCHANJINKOU: '国产',
          SECRET: null
        }
      ],
      // 复验筛选不合格占比（%）按生产厂家排序
      datasFour: [
        {
          "import": "国外厂家",
          "name": "Texas Instruments",
          "type": "中小规模数字逻辑电路",
          "value": "25"
        }, {
          "import": "国外厂家",
          "name": "Texas Instruments",
          "type": "单片数字集成电路",
          "value": "25"
        }, {
          "import": "国内厂家",
          "name": "中航光电科技股份有限公司(158厂)",
          "type": "低频电连接器（1-49芯）",
          "value": "50"
        },
        {
          "import": "国内厂家",
          "name": "贵州航天电器股份有限公司（3412、19厂）",
          "type": "单片数字集成电路",
          "value": "15"
        },
        {
          "import": "国内厂家",
          "name": "BURR-BROWN",
          "type": "单片数字集成电路",
          "value": "10"
        },
        {
          "import": "国内厂家",
          "name": "石家庄天林石无二电子有限公司",
          "type": "中小功率半导体三极管（<10W）",
          "value": "16"
        },
        {
          "import": "国内厂家",
          "name": "陕西金山电气集团有限公司电感器件厂(4390厂)",
          "type": "电感器",
          "value": "0"
        }
      ],
      dataZuanqu: []
    }
  },
  methods: {
    huidiao (val) {
      console.log(this.$store.state.echartsVisble, '===================');
      //点击查询排序的厂家型号
      console.log(this.$store.state.FactorName);
      this.getQuerynowmanufacturer(this.$store.state.FactorName)
      this.$nextTick(function () {
        //用来解决数据不更新问题

        anliType('anli1', this.dataZuanqu, null)
      });
      // this.$store.commit('echartsVisble', false)
    },
    activeTle (index) {
      this.active = index
      if (index == 1) {
        this.$nextTick(function () {
          //用来解决数据不更新问题
          EacHFn1('EacHFn1', this.datasOne, null)
        });

      } else if (index == 2) {
        this.$nextTick(function () {
          //用来解决数据不更新问题
          echartsOne('echartsOne', this.datasTwo, null)
        });
      }
      // else if (index == 3) {
      //   this.$nextTick(function () {
      //     //用来解决数据不更新问题
      //     PaiXu2('PaiXu2', this.datasThree, '国内厂家', null)
      //   });
      // }
      else if (index == 3) {
        this.$nextTick(function () {
          //用来解决数据不更新问题
          anli('anli', this.datasFour, null)
        });
      }
      else if (index == 4) {
        this.$nextTick(function () {
          //用来解决数据不更新问题
          // anli('anli', this.datasFour, null)
        });
      }
    },
    //复验筛选不合格器件按国产进口比例统计
    async getCountcountriesorimports () {
      const { data } = await getCountcountriesorimports()
      this.datas = data.data.countcountriesorimportsList
      PaiXu('PaiXu', this.datas, null)
    },
    //复验筛选不合格器件按器件类别统计
    async getCountprimaryclassification () {
      const { data } = await getCountprimaryclassification()
      this.datasOne = data.data.countPrimaryclassificationList
      // EacHFn1('EacHFn1', this.datasOne, null)
    },
    //复验筛选不合格器件按器件类型统计
    async getCountcomponentstype () {
      const { data } = await getCountcomponentstype()
      this.datasTwo = data.data.countComponentstypeList
      // echartsOne('echartsOne', this.datasTwo, null)
    },
    //复验筛选不合格按生产厂家出现次数排序
    async getOrdermanufacturer () {
      const { data } = await getOrdermanufacturer()
      this.datasThree = data.data.orderManufacturerList
      // PaiXu2('PaiXu2', this.datasThree, '国产', null)
    },
    //复验筛选不合格器件按生产厂家占比排序
    async getCountmanufacturer () {
      const { data } = await getCountmanufacturer()
      this.datasFour = data.data.countmanufacturerList
      // PaiXu3('PaiXu3', this.datasFour, null)
    },
    //排序点击获取厂家型号具体排列
    async getQuerynowmanufacturer (val) {
      const { data } = await getQuerynowmanufacturer({
        manufacturer: val
      })
      console.log(data, 'paixiiii');
      this.dataZuanqu = data
    },
    //获取批退的数据

  },
  mounted () {

    // PaiXu('PaiXu', this.datas, null)
    this.getCountcountriesorimports()
    this.getCountprimaryclassification()
    this.getCountcomponentstype()
    // this.getOrdermanufacturer()
    this.getCountmanufacturer()
  },
  watch: {
    '$store.state.TimeScreen': function (val) {
      console.log(val, '=======>>>>>');
      this.getCountcountriesorimports()
      this.getCountprimaryclassification()
      this.getCountcomponentstype()
      // this.getOrdermanufacturer()
      this.getCountmanufacturer()
    }
  }
}
</script>

<style lang="less" scoped>
@border: #8dcef6;
.aboutEchartsRt {
  display: flex;
  height: 100%;
  .common {
    background-image: linear-gradient(
      270deg,
      #99ccff 0%,
      #99ffff 81%,
      #d0f5fe 100%
    );
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    color: #333;
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
      padding-left: 10px;
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
        color: #333;
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
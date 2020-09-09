import echarts from 'echarts'
var flag = false;

var date = new Date();
//年
var year = date.getFullYear();
//月
var month = date.getMonth() + 1;
// 头部数据文本更新
export function h3_text (data, StartTime, EndtTime) {
  var sum_all = 0, sum = 0, count_sx = 0, num_sx = 0, count_fy = 0, num_fy = 0, count_cqfy = 0, num_cqfy = 0;
  var sum_all1 = 0, sum1 = 0, count_sx1 = 0, num_sx1 = 0, count_fy1 = 0, num_fy1 = 0, count_cqfy1 = 0, num_cqfy1 = 0;
  for (var i = 0; i < data.length; i++) {
    sum_all += 1;
    sum += parseInt(data[i].F_SONGSHAISHULIANG);
    if (data[i].F_SHIYANLEIXING == '筛选') {
      count_sx += 1;
      num_sx += parseInt(data[i].F_SONGSHAISHULIANG);
    } else if (data[i].F_SHIYANLEIXING == '复验') {
      count_fy += 1;
      num_fy += parseInt(data[i].F_SONGSHAISHULIANG);
    } else if (data[i].F_SHIYANLEIXING == '超期复验') {
      count_cqfy += 1;
      num_cqfy += parseInt(data[i].F_SONGSHAISHULIANG);
    }
    if (parseInt(data[i].TIME.substr(0, 4)) == parseInt(EndtTime[0]) && parseInt(data[i].TIME.substr(5, 2)) == parseInt(EndtTime[1])) {
      sum_all1 += 1;
      sum1 += parseInt(data[i].F_SONGSHAISHULIANG);
      if (data[i].f_shiyanleixing == '筛选') {
        count_sx1 += 1;
        num_sx1 += parseInt(data[i].F_SONGSHAISHULIANG);
      } else if (data[i].f_shiyanleixing == '复验') {
        count_fy1 += 1;
        num_fy1 += parseInt(data[i].F_SONGSHAISHULIANG);
      } else if (data[i].f_shiyanleixing == '超期复验') {
        count_cqfy1 += 1;
        num_cqfy1 += parseInt(data[i].F_SONGSHAISHULIANG);
      }
    }
  }


  if (!flag) {

    flag = !flag;
    $("#box_desc h3").html('<sapn>' + EndtTime[0] + '</sapn>年<sapn>' + EndtTime[1]
      + '</sapn>月共完成各型号的元器件检测任务<sapn class="zhong">' + sum_all1 + '</sapn>项<sapn class="zhong">' + sum1 + '</sapn>只，'
      + '其中筛选<sapn class="zhong">' + count_sx1 + '</sapn>项<sapn class="zhong">' + num_sx1 + '</sapn>只，复验<sapn class="zhong">'
      + count_fy1 + '</sapn>项<sapn class="zhong">' + num_fy1 + '</sapn>只，超期复验<sapn class="zhong">'
      + count_cqfy1 + '</sapn>项<sapn class="zhong">' + num_cqfy1 + '</sapn>只</br>本年度'
      + '共完成各型号的元器件检测任务<sapn class="zhong">' + sum_all + '</sapn>项<sapn class="zhong">' + sum + '</sapn>只，'
      + '其中筛选<sapn class="zhong">' + count_sx + '</sapn>项<sapn class="zhong">' + num_sx + '</sapn>只，复验<sapn class="zhong">'
      + count_fy + '</sapn>项<sapn class="zhong">' + num_fy + '</sapn>只，超期复验<sapn class="zhong">'
      + count_cqfy + '</sapn>项<sapn class="zhong">' + num_cqfy + '</sapn>只');
  } else {
    $("#box_desc h3").html('<sapn>' + StartTime[0] + '</sapn>年<sapn>' + StartTime[1] + '</sapn>月至<sapn">' + EndtTime[0] + '</sapn>年<sapn>' + EndtTime[1]
      + '</sapn>月共完成各型号的元器件检测任务<sapn class="zhong">' + sum_all + '</sapn>项<sapn class="zhong">' + sum + '</sapn>只，'
      + '其中筛选<sapn class="zhong">' + count_sx + '</sapn>项<sapn class="zhong">' + num_sx + '</sapn>只，复验<sapn class="zhong">'
      + count_fy + '</sapn>项<sapn class="zhong">' + num_fy + '</sapn>只，超期复验<sapn class="zhong">'
      + count_cqfy + '</sapn>项<sapn class="zhong">' + num_cqfy + '</sapn>只');
  }


}

// 复验筛选不合格器件按国产进口比例统计
export function PaiXu (name, data, secret) {
  var arr = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].NAME) == -1) {
      lx.push(data[i].NAME);
    }
  }
  for (var i = 0; i < lx.length; i++) {
    var value = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].NAME) {
        value += parseInt(data[j].VALUE);
      }
    }
    var array = {
      name: lx[i],
      value: value
    }
    arr.push(array);
  }
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var myChart = echarts.init(document.getElementById(name));
  var span = '40%'   //span 饼图环化程度  0%-100%  0%实心 --非必选参数
  option = {
    backgroundColor: '#f9f9f9',
    title: {
      text: 'DPA不合格按国产/进口比例统计',
      subtext: commonSubTitle,
      left: 'center',
      bottom: '2',
      padding: [24, 0],
      textStyle: {
        color: '#333',
        fontSize: 12,
        align: 'center'
      },
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      }
    },
    tooltip: {
      trigger: 'item',
      // {a}：系列名。
      // {b}：数据名。
      // {c}：数据值。
      // {d}：百分比。
      formatter: ""
    },
    color: ['#4C84FF', '#13C2C2', '#9A47FF', '#F04864', '#FF884C', '#FACC14', '#2FC25B', '#66B5FF'],
    legend: {
      orient: 'horizontal',
      show: true,
      top: 0,
      textStyle: {
        color: "#333"
      },
      data: arr
    },
    series: [{
      // name: '详细数据',
      type: 'pie',
      radius: [span || '0%', '55%'],
      labelLine: {
        normal: {
          length: 30,
          length2: 80,
          // lineStyle: {
          //     color: '#fff'
          // }
        }
      },
      label: {
        normal: {
          formatter: '{b}\n',
          borderWidth: 0,
          borderRadius: 4,
          padding: [0, -50],
          textStyle: {
            fontSize: 20
          }
        }
      },
      data: arr
    }]
  };
  myChart.setOption(option);
}

// 复验筛选不合格占比（%）按生产厂家排序
export function PaiXu3 (name, data) {
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var myChart = echarts.init(document.getElementById(name));
  var dataX = [], data_one = [], data_two = [], data_three = [], dest = [];
  group("YQJMC", data, dest);
  for (var i = 0; i < dest.length; i++) {
    dataX.push(dest[i].name);

    if (null != dest[i].data[0]) {
      var test1 = '{"name":"' + dest[i].data[0].WTDW + '","value":' + dest[i].data[0].BL + '}';
      var test2 = JSON.parse(test1);
      data_one.push(test2);
    }

    if (null != dest[i].data[1]) {
      var test3 = '{"name":"' + dest[i].data[1].WTDW + '","value":' + dest[i].data[1].BL + '}';
      var test4 = JSON.parse(test3);
      data_two.push(test4);
    }

    if (null != dest[i].data[2]) {
      var test5 = '{"name":"' + dest[i].data[2].WTDW + '","value":' + dest[i].data[2].BL + '}';
      var test6 = JSON.parse(test5);
      data_three.push(test6);
    }

  }
  myChart.clear()
  var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
  ];

  myChart.configParameters = {
    rotate: {
      min: -90,
      max: 90
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right'
      }
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom'
      }
    },
    position: {
      options: echarts.util.reduce(posList, function (map, pos) {
        map[pos] = pos;
        return map;
      }, {})
    },
    distance: {
      min: 0,
      max: 100
    }
  };

  myChart.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
      var labelOption = {
        normal: {
          rotate: myChart.config.rotate,
          align: myChart.config.align,
          verticalAlign: myChart.config.verticalAlign,
          position: myChart.config.position,
          distance: myChart.config.distance,
        }
      };
      myChart.setOption({
        series: [{
          label: labelOption
        }, {
          label: labelOption
        }, {
          label: labelOption
        }, {
          label: labelOption
        }]
      });
    }
  };

  var labelOption = {
    normal: {
      show: true,
      position: 'top',
      // position: myChart.config.position,
      // distance: myChart.config.distance,
      // align: myChart.config.align,
      // verticalAlign: myChart.config.verticalAlign,
      rotate: myChart.config.rotate,
      formatter: function (params) {
        // console.log(params)

      },
      // formatter: '{c}\n',
      fontSize: 11,
      rich: {
        name: {
          textBorderColor: 'white'
        }
      }
    }
  };

  option = {
    title: {
      text: '复验筛选不合格占比（%）按生产厂家排序',
      left: 'center',
      bottom: '10',
      subtext: commonSubTitle,
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
      padding: [0, 0],
      textStyle: {
        color: '#333',
        fontSize: 13,
        align: 'center'
      },
    },
    backgroundColor: '#f9f9f9',
    color: ['rgb(197,73,249)', '#006699', 'rgb(32,220,237)'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return params[0].data.name + ':' + params[0].data.value
          + "<br/>" + params[1].data.name + ':' + params[1].data.value
          + "<br/>" + params[2].data.name + ':' + params[2].data.value;
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        // data: ['2012', '2013', '2014', '2015', '2016'],
        data: dataX,
        axisLabel: {
          show: true,
          textStyle: {
            color: 'white'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: true,
          textStyle: {
            color: 'white'
          }
        }
      }
    ],
    series: [
      {
        name: 'Forest',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        // data: [320, 332, 301, 334, 390]
        data: data_one
      },
      {
        name: 'Steppe',
        type: 'bar',
        label: labelOption,
        // data: [220, 182, 191, 234, 290]
        data: data_two
      },
      {
        name: 'Desert',
        type: 'bar',
        label: labelOption,
        // data: [150, 232, 201, 154, 190]
        data: data_three
      }
    ]
  };
  myChart.setOption(option);
}

// 复验筛选不合格按元器件类型分布
export function echartsOne (name, data, secret) {
  var dataX = [], dataY_GC = [], dataY_JK = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].NAME) == -1) {
      lx.push(data[i].NAME);
    }
  }

  for (var i = 0; i < lx.length; i++) {
    dataX.push(lx[i]);
    var value_GC = 0, value_JK = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].NAME) {
        value_GC += parseInt(data[j].JK);
        value_JK += parseInt(data[j].GC);
      }
    }
    dataY_GC.push(value_GC);
    dataY_JK.push(value_JK);

  }
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var myChart = echarts.init(document.getElementById(name));
  myChart.clear()
  option = {
    title: {
      text: '复验筛选不合格按元器件类型分布',
      left: 'center',
      subtext: commonSubTitle,
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
      bottom: '0',
      padding: [0, 0],
      textStyle: {
        color: '#333',
        fontSize: 13,
        align: 'center'
      },
    },
    legend: {
      name: [],
      data: ["国产", "进口"],
      textStyle: {
        color: '#333',
        fontSize: 15,
      },
    },
    backgroundColor: '#f9f9f9',
    // tooltip（提示框组件）
    tooltip: {
      //trigger(触发类型)，可选'item','axis','none'
      trigger: 'axis',
      axisPointer: {
        //指示器类型,可选'line','shadow','cross'
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      // data: ['1', '2', '3', '4', '5'],
      data: dataX,
      axisLabel: {
        show: true,
        color: '#333',
        fontSize: 20,
      },
      splitLine: {
        show: false
      },
      axisLine: {
        // show:false,
        lineStyle: {
          color: '#333',
        }
      },
      axisTick: {
        show: false
      },

    },
    yAxis: [
      {
        name: '国产/进口数量',
        type: 'value',
        //axisTick 坐标轴刻度相关设置
        axisTick: {
          show: true
        },
        //axixLine 坐标轴轴线相关设置
        axisLine: {
          lineStyle: {
            color: '#333',
          }
        },
        //axisLabel 坐标轴刻度标签的相关设置
        axisLabel: {
          show: true,
          color: '#333',
          fontSize: 20
        }
      },
    ],
    series: [
      {
        name: '国产',
        type: 'bar',
        stack: '数量',
        // data: [2.5, 2, 1.5, 2.5, 4],
        data: dataY_GC,
        barWidth: '30%',
        itemStyle: {
          color: 'rgba(193,73,249,0.8)',
          normal: {
            color: "rgba(255,165,0,0.8)"
          }
        }

      },
      {
        name: '进口',
        //type决定图表类型
        type: 'bar',
        //stack 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
        stack: '数量',
        // data: [2, 3, 2, 2, 2.5],
        data: dataY_JK,
        barWidth: '30%',
        itemStyle: {
          color: '#51FFAE',
          normal: {
            color: "rgba(0,122,204,0.8)"
          }
        },
      }

    ]
  };
  myChart.setOption(option);
}

//第一个饼状图-复检筛选按类别统计
export function LeiBie (name, data, secret) {
  var arr = [];
  var lx = [];
  // debugger;
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].NAME) == -1) {
      lx.push(data[i].NAME);
    }
    // var array={
    // 	name:data[i].name,
    // 	value:data[i].value
    // }
    // arr.push(array);
  }
  for (var i = 0; i < lx.length; i++) {
    var value = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].NAME) {
        value += parseInt(data[j].VALUE);
      }
    }
    var array = {
      name: lx[i],
      value: value
    }
    arr.push(array);
  }
  var myChart = echarts.init(document.getElementById(name));
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var option = {
    color: ['rgba(49,197,197,0.8)', 'rgba(182,162,223,0.8)', 'rgba(214,112,112,0.8)', 'rgba(254,185,128,0.8)', 'rgba(85,179,240,0.8)'],
    title: {
      text: '复验筛选按类别统计分布',
      subtext: commonSubTitle,
      top: 10,
      left: 10,
      textStyle: {
        color: '#333',
        fontSize: 15,
      },
      subtextStyle: {
        fontSize: 15,
        color: '#666'
      },
    },
    legend: {
      orient: 'horizontal',
      show: true,
      bottom: 0,
      textStyle: {
        color: "#333"
      },
      data: arr
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: '筛选类别',
        type: 'pie',
        radius: '55%',
        data: arr,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);
}

// 复验筛选不合格按生产厂家出现次数排序
export function PaiXu2 (name, data, name1, secret) {
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  // debugger
  var myChart = echarts.init(document.getElementById(name));
  var dataX = [], data_one = [], data_two = [], data_three = [];
  var data1 = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].F_GUOCHANJINKOU == name1) {
      data1.push(data[i])
    }
  }
  var dest = [];
  group("YQJMC", data1, dest);
  for (var i = 0; i < dest.length; i++) {
    dataX.push(dest[i].name);

    if (null != dest[i].data[0]) {
      var test1 = '{"name":"' + dest[i].data[0].WTDW + '","value":' + dest[i].data[0].BHGSL + '}';
      var test2 = JSON.parse(test1);
      data_one.push(test2);
    }

    if (null != dest[i].data[1]) {
      var test3 = '{"name":"' + dest[i].data[1].WTDW + '","value":' + dest[i].data[1].BHGSL + '}';
      var test4 = JSON.parse(test3);
      data_two.push(test4);
    }

    if (null != dest[i].data[2]) {
      var test5 = '{"name":"' + dest[i].data[2].WTDW + '","value":' + dest[i].data[2].BHGSL + '}';
      var test6 = JSON.parse(test5);
      data_three.push(test6);
    }
  }
  myChart.clear()
  var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
  ];

  myChart.configParameters = {
    rotate: {
      min: -90,
      max: 90
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right'
      }
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom'
      }
    },
    position: {
      options: echarts.util.reduce(posList, function (map, pos) {
        map[pos] = pos;
        return map;
      }, {})
    },
    distance: {
      min: 0,
      max: 100
    }
  };

  myChart.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
      var labelOption = {
        normal: {
          rotate: myChart.config.rotate,
          align: myChart.config.align,
          verticalAlign: myChart.config.verticalAlign,
          position: myChart.config.position,
          distance: myChart.config.distance,
        }
      };
      myChart.setOption({
        series: [{
          label: labelOption
        }, {
          label: labelOption
        }, {
          label: labelOption
        }, {
          label: labelOption
        }]
      });
    }
  };

  var labelOption = {
    normal: {
      show: true,
      position: 'top',
      // position: myChart.config.position,
      // distance: myChart.config.distance,
      // align: myChart.config.align,
      // verticalAlign: myChart.config.verticalAlign,
      rotate: myChart.config.rotate,
      formatter: function (params) {
        // console.log(params)

      },
      // formatter: '{c}\n',
      fontSize: 11,
      rich: {
        name: {
          textBorderColor: '#333'
        }
      }
    }
  };

  option = {
    title: {
      text: '复验筛选不合格按生产厂家出现次数排序',
      left: 'center',
      subtext: commonSubTitle,
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
      bottom: '0',
      padding: [0, 0],
      textStyle: {
        color: '#333',
        fontSize: 13,
        align: 'center'
      },
    },
    backgroundColor: '#f9f9f9',
    color: ['rgb(197,73,249)', '#006699', 'rgb(32,220,237)'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return params[0].data.name + ':' + params[0].data.value
          + "<br/>" + params[1].data.name + ':' + params[1].data.value
          + "<br/>" + params[2].data.name + ':' + params[2].data.value;
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        // data: ['2012', '2013', '2014', '2015', '2016'],
        data: dataX,
        axisLabel: {
          show: true,
          textStyle: {
            color: 'white'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name:'TOP3数量',
        axisLabel: {
          show: true,
          textStyle: {
            color: 'white'
          }
        }
      }
    ],
    series: [
      {
        name: 'd',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        data: data_one
      },
      {
        name: 'Steppe',
        type: 'bar',
        label: labelOption,
        data: data_two
      },
      {
        name: 'Desert',
        type: 'bar',
        label: labelOption,
        data: data_three
      }
    ]
  };
  myChart.setOption(option);
}

// 复验筛选不合格器件按器件类别统计
export function EacHFn1 (name, data, secret) {
  var arr = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].NAME) == -1) {
      lx.push(data[i].NAME);
    }
  }
  for (var i = 0; i < lx.length; i++) {
    var value = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].NAME) {
        value += parseInt(data[j].VALUE);
      }
    }
    var array = {
      name: lx[i],
      value: value
    }
    arr.push(array);
  }
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var myChart = echarts.init(document.getElementById(name));
  option = {
    color: ['rgba(49,197,197,0.8)', 'rgba(182,162,223,0.8)', 'rgba(214,112,112,0.8)', 'rgba(254,185,128,0.8)', 'rgba(85,179,240,0.8)'],
    backgroundColor: '#f9f9f9',
    title: {
      text: '复验筛选不合格器件按器件类别统计',
      left: 'center',
      bottom: '10',
      subtext: commonSubTitle,
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
      padding: [0, 0],
      textStyle: {
        color: '#333',
        fontSize: 13,
        align: 'center'
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      top: "middle",
      left: "4%",
      // left: 'left',
      // data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
      data: arr,
      textStyle: {                 //----图例内容样式
        color: '#333',               //---所有图例的字体颜色
        //backgroundColor:'black',  //---所有图例的字体背景色
        fontSize: 11
      }
    },
    series: [
      {
        name: '筛选类别',
        type: 'pie',
        radius: '55%',
        center: ['50%', '55%'],
        // data:[
        // {value:335, name:'直接访问'},
        // {value:310, name:'邮件营销'},
        // {value:234, name:'联盟广告'},
        // {value:135, name:'视频广告'},
        // {value:1548, name:'搜索引擎'}
        // ],
        data: arr.sort(function (a, b) { return a.value - b.value; }),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart.setOption(option);
}

// 复检筛选按质量等级分布
export function EacHFn2 (name, data, secret) {
  var arr = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].NAME) == -1) {
      lx.push(data[i].NAME);
    }
  }
  for (var i = 0; i < lx.length; i++) {
    var value = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].NAME) {
        value += parseInt(data[j].VALUE);
      }
    }
    var array = {
      name: lx[i],
      value: value
    }
    arr.push(array);
  }
  var myChart = echarts.init(document.getElementById(name));
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var myChart = echarts.init(document.getElementById(name));
  option = {
    color: ['#A0CE3A', '#31C5C0', '#1E9BD1', '#0F347B', '#585247', '#7F6AAD', '#009D85', "rgba(250,250,250,0.3)"],
    title: {
      text: '复验筛选质量等级分布',
      top: 10,
      left: 10,
      subtext: commonSubTitle,
      textStyle: {
        color: '#333',
        fontSize: 15,
      },
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
    },
    legend: {
      orient: 'horizontal',
      show: true,
      bottom: 0,
      textStyle: {
        color: "#333"
      },
      data: arr
    },
    grid: {
      bottom: 150,
      left: 100,
      right: '10%'
    },
    series: [
      // 主要展示层的
      {
        radius: ['30%', '61%'],
        center: ['50%', '50%'],
        type: 'pie',
        label: {
          normal: {
            show: true,
            //                        formatter: "{a}",
            textStyle: {
              fontSize: 15,

            },
            position: 'outside'
          },
          emphasis: {
            show: true
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 30,
            length2: 55
          },
          emphasis: {
            show: true
          }
        },
        // name: "民警训练总量",
        data: arr,

      },
      // 边框的设置
      {
        radius: ['30%', '34%'],
        center: ['50%', '50%'],
        type: 'pie',
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        animation: false,
        tooltip: {
          show: false
        },
        data: [{
          value: 1,
          itemStyle: {
            color: "rgba(250,250,250,0.3)",
          },
        }],
      }, {
        name: '外边框',
        type: 'pie',
        clockWise: false, //顺时加载
        hoverAnimation: false, //鼠标移入变大
        center: ['50%', '50%'],
        radius: ['65%', '65%'],
        label: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 9,
          name: '',
          itemStyle: {
            normal: {
              borderWidth: 2,
              borderColor: '#0b5263'
            }
          }
        }]
      },
    ]
  };
  myChart.setOption(option);
}

// js分组
// 第一个参数为，分组字段(字符串)，
// 第二个参数，传入待分组数组（原始数组），
// 第三个参数，接收分组后的数组（自定义空数组）
function group (id, data, data2) {
  var map = {};
  for (var a = 0; a < data.length; a++) {
    var ai = data[a];
    if (!map[ai[id]]) {
      data2.push({
        name: ai[id],
        data: [ai]
      });
      map[ai[id]] = ai;
    } else {
      for (var b = 0; b < data2.length; b++) {
        var bi = data2[b];
        if (bi.name == ai[id]) {
          bi.data.push(ai);
          break;
        }
      }
    }
  }
}



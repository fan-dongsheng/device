import echarts from 'echarts'
var flag = false;
//头部数据文本更新
function h3_text (data, year, month, year1, month1) {
  var sum = 0,
    count_sx = 0,
    num_sx = 0,
    count_fy = 0,
    num_fy = 0,
    count_cqfy = 0,
    num_cqfy = 0;
  var sum1 = 0,
    count_sx1 = 0,
    num_sx1 = 0,
    count_fy1 = 0,
    num_fy1 = 0,
    count_cqfy1 = 0,
    num_cqfy1 = 0;

  for (var i = 0; i < data.length; i++) {
    if (data[i].f_dpajielun == '不合格') {
      count_sx += 1;
      if (parseInt(data[i].time.substr(0, 4)) == parseInt(year1) &&
        parseInt(data[i].time.substr(5, 2)) == parseInt(month1)) {
        count_sx1 += 1;
      }
    }
  }
  var bhg = 0
  if (data.length == 0) {
    bhg = 0;
  } else {
    bhg = parseFloat(count_sx / data.length * 100).toFixed(2);
  }

  var bhg1 = 0
  if (data.length == 0) {
    bhg1 = 0;
  } else {
    bhg1 = parseFloat(count_sx1 / data.length * 100).toFixed(2);
  }

  if (!flag) {
    $("#box_desc h3").html(
      '<span class="zhong">' + year + '</span>年<span class="zhong">' +
      month + '</span>月完成元器件DPA试验<sapn class="zhong">' +
      data.length + '</sapn>项，' +
      '其中不合格项目数<sapn class="zhong">' + count_sx1 +
      '</sapn>项，不合格比例为<sapn class="zhong">' + bhg1 +
      '% </sapn>。<br>' + '本年完成元器件DPA试验<sapn class="zhong">' +
      data.length + '</sapn>项，' +
      '其中不合格项目数<sapn class="zhong">' + count_sx +
      '</sapn>项，不合格比例为<sapn class="zhong">' + bhg +
      '% </sapn>。<br>');
    flag = !flag;
  } else {

    $("#box_desc h3").html(
      '<span class="zhong">' + year + '</span>年<span class="zhong">' +
      month + '</span>月至' + '<span class="zhong">' + year1 +
      '</span>年<span class="zhong">' + month1 + '</span>月' +
      '完成元器件DPA试验<sapn class="zhong">' + data.length +
      '</sapn>项，' + '其 中不合格项目数<sapn class="zhong">' +
      count_sx + '</sapn>项，不合格比例为<sapn class="zhong">' +
      bhg + '% </sapn>。');
  }

}
//DPA试验按器件类型统计
function eCharts1 (name, data, secret) {
  var myChart = echarts.init(document.getElementById(name));
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var arr = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].name) == -1) {
      lx.push(data[i].name);
    }
  }
  for (var i = 0; i < lx.length; i++) {
    var value = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].name) {
        value += parseInt(data[i].value);
      }
    }
    var array = {
      name: lx[i],
      value: value
    }
    arr.push(array);
  }
  var myChart = echarts.init(document.getElementById(name));
  // myChart.clear();
  var scale = 1;

  option = {
    backgroundColor: '#f9f9f9',
    title: {
      text: 'DPA试验量按器件类型统计',
      left: 'center',
      bottom: '2',
      subtext: commonSubTitle,
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
      padding: [24, 0],
      textStyle: {
        color: '#333',
        fontSize: 12 * scale,
        align: 'center'
      }
    },
    series: [{
      name: 'DPA试验量按器件类型统计',
      type: 'pie',
      radius: ['42%', '50%'],
      hoverAnimation: false,
      color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da',
        '#00ffb4'
      ],
      label: {
        normal: {
          formatter: function (params, ticket, callback) { },
          rich: ''
        },
      },
      labelLine: {
        normal: {
          length: 55 * scale,
          length2: 0,
          lineStyle: {
            color: '#0b5263'
          }
        }
      },
      data: arr
    }]
  };
  myChart.setOption(option);
}

// DPA不合格按国产/进口比例统计
function eCharts2 (name, data, secret) {
  var myChart = echarts.init(document.getElementById(name));
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var arr = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].name) == -1) {
      lx.push(data[i].name);
    }
  }
  for (var i = 0; i < lx.length; i++) {
    var value = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].name) {
        value += parseInt(data[i].value);
      }
    }
    var array = {
      name: lx[i],
      value: value
    }
    arr.push(array);
  }
  var myChart = echarts.init(document.getElementById(name));

  let span = '40%' //span 饼图环化程度  0%-100%  0%实心 --非必选参数
  option = {
    title: {
      text: 'DPA不合格按国产/进口比例统计',
      left: 'center',
      bottom: '10',
      subtext: commonSubTitle,
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
      padding: [24, 0],
      textStyle: {
        color: '#333',
        fontSize: 12,
        align: 'center'
      }
    },
    backgroundColor: '#f9f9f9',
    tooltip: {
      trigger: 'item',
      // {a}：系列名。
      // {b}：数据名。
      // {c}：数据值。
      // {d}：百分比。
      formatter: ""
    },
    color: ['#4C84FF', '#13C2C2', '#9A47FF', '#F04864', '#FF884C',
      '#FACC14', '#2FC25B', '#66B5FF'
    ],
    legend: {
      orient: 'horizontal',
      show: true,
      bottom: 0,
      data: arr
    },
    series: [{
      name: '详细数据',
      type: 'pie',
      radius: [span || '0%', '55%'],
      labelLine: {
        normal: {
          length: 30,
          length2: 80,
          lineStyle: {
            color: '#fff'
          }
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

// DPA不合格按元器件类别分布
function eCharts3 (name, data, secret) {
  var myChart = echarts.init(document.getElementById(name));
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var arr = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].name) == -1) {
      lx.push(data[i].name);
    }
  }
  for (var i = 0; i < lx.length; i++) {
    var value = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].name) {
        value += parseInt(data[i].value);
      }
    }
    var array = {
      name: lx[i],
      value: value
    }
    arr.push(array);
  }
  var myChart = echarts.init(document.getElementById(name));
  // myChart.clear();
  var scale = 1;
  var rich = {
    yellow: {
      color: "#ffc72b",
      fontSize: 30 * scale,
      padding: [5, 4],
      align: 'center'
    },
    total: {
      color: "#ffc72b",
      fontSize: 40 * scale,
      align: 'center'
    },
    white: {
      color: "#fff",
      align: 'center',
      fontSize: 14 * scale,
      padding: [21, 0]
    },
    blue: {
      color: '#49dff0',
      fontSize: 16 * scale,
      align: 'center'
    },
    hr: {
      borderColor: '#0b5263',
      width: '100%',
      borderWidth: 1,
      height: 0,
    }
  }
  option = {
    backgroundColor: '#f9f9f9',
    title: {
      text: 'DPA不合格按元器件类别分布',
      left: 'center',
      subtext: commonSubTitle,
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
      bottom: '30',
      padding: [0, 0],
      textStyle: {
        color: '#333',
        fontSize: 12,
        align: 'center'
      },
    },
    legend: {
      selectedMode: false,
      formatter: function (name) {

      },
      data: arr,
      // data: ['高等教育学'],
      // itemGap: 50,
      left: 'center',
      top: 'center',
      icon: 'none',
      align: 'center',
      textStyle: {
        color: "#333",
        fontSize: 16 * scale,
        rich: rich
      },
    },
    series: [{
      name: '总考生数量',
      type: 'pie',
      radius: ['42%', '50%'],
      hoverAnimation: false,
      color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da',
        '#00ffb4', 'skyblue'
      ],
      label: {
        normal: {
          formatter: function (params, ticket, callback) {
            return params.name;
          },
          rich: rich
        },
      },
      data: arr
    }]
  };
  myChart.setOption(option);
}

//DPA按国产/进口及质量等级分布
function eCharts4 (name, data, secret) {
  var myChart = echarts.init(document.getElementById(name));
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var arr = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].name) == -1) {
      lx.push(data[i].name);
    }
  }
  for (var i = 0; i < lx.length; i++) {
    var value = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].name) {
        value += parseInt(data[i].value);
      }
    }
    var array = {
      name: lx[i],
      value: value
    }
    arr.push(array);
  }
  var myChart = echarts.init(document.getElementById(name));
  option = {
    title: {
      text: 'DPA按质量等级分布',
      left: 'center',
      top: '30',
      subtext: commonSubTitle,
      subtextStyle: {
        fontSize: 15,
        color: '#666',
      },
      padding: [0, 0],
      textStyle: {
        color: "#333",
        fontSize: 14,
        align: 'center'
      },
    },
    backgroundColor: '#f9f9f9',
    color: ['#2edfa3', '#bce672', '#ff4777', '#70f3ff', '#4b5cc4',
      '#f47983', '#8d4bbb', '#6635EF', '#FFAFDA'
    ],
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)"
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '50%'],
      label: {
        normal: {
          formatter: "{b}({d}%)",
          rich: {}
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 20,
          length2: 20,
          lineStyle: {
            type: 'dashed',
            width: 2
          }
        }
      },
      data: arr
    }]
  };
  myChart.setOption(option);
}

//DPA不合格按元器件类型分布
export function eCharts5 (name, data, secret) {
  var myChart = echarts.init(document.getElementById(name));
  var commonSubTitle = "机密★";
  var commonSubTitleStar = "★";
  if (secret) {
    commonSubTitle = secret + commonSubTitleStar;
  }
  var myChart = echarts.init(document.getElementById(name));
  // debugger;
  var dataX = [],
    dataY_GC = [],
    dataY_JK = [];
  var lx = [];
  for (var i = 0; i < data.length; i++) {
    if (lx.indexOf(data[i].name) == -1) {
      lx.push(data[i].name);
    }
  }

  for (var i = 0; i < lx.length; i++) {
    dataX.push(lx[i]);
    var value_GC = 0,
      value_JK = 0;
    for (var j = 0; j < data.length; j++) {
      if (lx[i] == data[j].name) {
        value_GC += parseInt(data[j].gc);
        value_JK += parseInt(data[j].jk);
      }
    }
    dataY_GC.push(value_GC);
    dataY_JK.push(value_JK);

  }
  // myChart.clear();
  var option = {
    title: {
      text: 'DPA不合格按元器件类型分布',
      left: 10,
      top: 0,
      padding: [2, 0],
      // subtext: commonSubTitle,
      // subtextStyle: {
      //   fontSize: 15,
      //   color: '#fff',
      // },
      textStyle: {
        color: '#fff',
        fontSize: 13,
        align: 'center'
      },
    },
    grid: {
      left: '15%',   // 与容器左侧的距离
      right: '5%', // 与容器右侧的距离
      top: '15%',   // 与容器顶部的距离
      bottom: '15%', // 与容器底部的距离
    },
    legend: {
      name: [],
      data: ["国产", "进口"],
      textStyle: {
        color: '#fff',
        fontSize: 15,
      },
      top: 5,
    },
    // backgroundColor: '#f9f9f9',
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
      data: dataX,

      axisLabel: {
        show: true,
        color: '#fff',
        fontSize: 16,
      },
      splitLine: {
        show: false
      },
      axisLine: {
        // show:false,
        lineStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false
      },

    },
    yAxis: [{
      name: '国产/进口数量',
      type: 'value',
      //axisTick 坐标轴刻度相关设置
      axisTick: {
        show: false
      },
      //axixLine 坐标轴轴线相关设置
      axisLine: {
        show: false,
        // lineStyle: {
        //   color: '#fff',
        // }
      },
      //y轴图例北京线条
      splitLine: {
        show: true,
        lineStyle: {
          color: '#3C6FAC',
        }
      },
      //axisLabel 坐标轴刻度标签的相关设置
      axisLabel: {
        show: true,
        color: '#fff',
        fontSize: 16
      }
    },],
    series: [{
      name: '国产',
      type: 'bar',
      stack: '费用',
      data: dataY_GC,
      barWidth: '30%',

      itemStyle: {
        color: 'rgba(193,73,249,0.8)',
        normal: {
          color: "rgba(193,73,249,0.8)"
        }
      }

    }, {
      name: '进口',
      //type决定图表类型
      type: 'bar',
      //stack 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
      stack: '费用',
      data: dataY_JK,
      barWidth: '30%',
      itemStyle: {
        color: '#51FFAE',
        normal: {
          color: "rgba(32,220,237,0.8)"
        }
      },
    }

    ]
  };
  myChart.setOption(option);
}

//DPA不合格按元器件类型分布
function eCharts6 (name) {
  var myChart = echarts.init(document.getElementById(name));
  option = {
    title: {
      text: 'DPA不合格按不合格项目分布',
      left: 'center',
      top: 10,
      padding: [0, 0],
      textStyle: {
        color: 'white',
        fontSize: 14,
        align: 'center'
      },
    },
    backgroundColor: '#f9f9f9',
    legend: {
      name: [],
      textStyle: {
        color: '#fff',
        fontSize: 24,
      },
    },
    backgroundColor: '#08254F',
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
      data: ['扬州炒饭', '龙门花甲', '黄焖鸡米饭', '麻辣烫', '回锅肉盖浇饭'],
      axisLabel: {
        show: true,
        color: '#fff',
        fontSize: 20,
      },
      splitLine: {
        show: false
      },
      axisLine: {
        // show:false,
        lineStyle: {
          color: '#FFFFFF'
        }
      },
      axisTick: {
        show: false
      },

    },
    yAxis: [{
      name: '/元',
      type: 'value',
      //axisTick 坐标轴刻度相关设置
      axisTick: {
        show: true
      },
      //axixLine 坐标轴轴线相关设置
      axisLine: {
        lineStyle: {
          color: '#FFFFFF',
        }
      },
      //axisLabel 坐标轴刻度标签的相关设置
      axisLabel: {
        show: true,
        color: '#fff',
        fontSize: 20
      }
    },],
    series: [{
      name: '运送费',
      type: 'bar',
      stack: '费用',
      data: [2.5, 2, 1.5, 2.5, 4],
      barWidth: '30%',
      itemStyle: {
        color: '#00C1FF',
      },

    }, {
      name: '餐盒费',
      //type决定图表类型
      type: 'bar',
      //stack 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
      stack: '费用',
      data: [2, 3, 2, 2, 2.5],
      barWidth: '30%',
      itemStyle: {
        color: '#51FFAE',
      },
    }, {
      name: '食品费',
      //type决定图表类型
      type: 'bar',
      //stack 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
      stack: '费用',
      data: [15, 25, 18, 20, 20],
      barWidth: '30%',
      itemStyle: {
        color: '#CEC608',
      },
    },

    ]
  };
  myChart.setOption(option);
}
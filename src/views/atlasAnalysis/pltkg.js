import * as d3 from 'd3'
import { lens } from './fisheye.js'
import axios from 'axios'
import store from '../../store/index'
import router from '@/router'
export function dialogNode (params, name) {
  store.commit('val', params)
  store.commit('name', name)
}

export function pltKg (datases) {
  // const margin = {
  //   top: 30,
  //   right: 30,
  //   bottom: 5,
  //   left: 5
  // }
  // var width = window.sessionStorage.getItem('w') || 800
  var width = document.body.clientWidth

  var height = 800
  /* 实体颜色 */
  var colorScale = d3.scaleOrdinal() //= d3.scaleOrdinal(d3.schemeSet2)
    .domain(d3.range(datases.nodes.labels))
    .range(['#ff9e6d', '#86cbff', '#c2e5a0', '#fff686', '#9e79db'])

  var simulation = window.simulation = d3.forceSimulation()
    .force('link', d3.forceLink() // This force provides links between nodes,链接力
      .id(d => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
      .distance(150) /* links的长度； */
      .strength(1)
    )
    .force('charge', d3.forceManyBody().strength(-150)) // This adds repulsion (if it's negative) between nodes.万有引力
    // .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area,用指定的x坐标和y坐标创建一个居中力。
    // 控制力学模拟衰减率，[0-1] ,设为0则不停止 ， 默认0.0228，直到0.001
    .alphaDecay(0.1528)
    // 碰撞作用力，为节点指定一个radius区域来防止节点重叠，设置碰撞力的强度，范围[0,1], 默认为0.7。设置迭代次数，默认为1，迭代次数越多最终的布局效果越好，但是计算复杂度更高
    .force('collide', d3.forceCollide(60).strength(0.7).iterations(5))
  // .force("boundary", forceBoundary(-width / 2, -height / 2, width, height))
  // .force("x", d3.forceX())
  // .force("y", d3.forceY());

  var container = window.container = d3.select('#container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])

  var svg = window.svg = container
    .append('g')
  // .attr("transform", `translate(${width/2},${height/2})`);

  // appending little triangles, path object, as arrowhead
  // The <defs> element is used to store graphical objects that will be used at a later time
  // The <marker> element defines the graphic that is to be used for drawing arrowheads or polymarkers on a given <path>, <line>, <polyline> or <polygon> element.
  var defs = svg.append('defs')

  // var marker = defs
  //   .append('marker')
  //   .attr('viewBox', '-0 -5 10 10')
  //   .attr('id', 'arrowhead')
  //   .attr('markerWidth', 10) // marker视窗的宽
  //   .attr('markerHeight', 10) // marker视窗的高
  //   .attr('refX', 40) // refX和refY，指的是图形元素和marker连接的位置坐标
  //   .attr('refY', 0)
  //   .attr('orient', 'auto') // orient="auto"设置箭头的方向为自动适应线条的方向
  //   .attr('markerUnits', 'userSpaceOnUse') // marker是否进行缩放 ,默认值是strokeWidth,会缩放
  //   .append('path')
  //   .attr('d', 'M 0,-5 L 10 ,0 L 0,5') // 箭头的路径 从 （0,0） 到 （8,4） 到（0,8）
  //   .attr('fill', '#ffb997')

  // defs.append('marker')
  //   .attr("id", 'arrowhead')
  //   .attr('viewBox', '-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
  //   .attr('refX', 33) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
  //   .attr('refY', 0)
  //   .attr('orient', 'auto')
  //   .attr('markerWidth', 6)
  //   .attr('markerHeight', 6)
  //   // .attr('xoverflow', 'visible')
  //   .append('path')
  //   // .attr("markerUnits", "userSpaceOnUse")
  //   .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
  //   .attr('fill', '#999')
  //   .style('stroke', 'none')
  //   .attr("fill", "#ffb997");

  // 3.2 添加多个头像图片的 <pattern>
  var patterns = window.patterns = defs
    .selectAll('pattern.patternclass')
    .data(datases.nodes)
    .enter()
    .append('pattern')
    .attr('class', 'patternclass')
    .attr('id', function (d, index) {
      return 'image' + d.id
    })
    // 两个取值userSpaceOnUse  objectBoundingBox
    .attr('patternUnits', 'objectBoundingBox')
    // <pattern>，x、y值的改变决定图案的位置，宽度、高度默认为pattern图案占填充图形的百分比。
    .attr('x', '0')
    .attr('y', '0')
    .attr('width', '1')
    .attr('height', '1')

  // 3.3 向<defs> - <pattern>添加 头像
  patterns.append('image')
    .attr('class', 'circle')
    .attr('xlink:href', function (d) {
      return require('@/assets/problem.png') // 修改节点头像
    })
    .attr('src', function (d) {
      return require('@/assets/problem.png') // 修改节点头像
    })
    // .attr("crossOrigin","anonymous")
    // .attr("background-image", 'url(../)')
    .attr('height', 30 * 2)
    .attr('width', 30 * 2)
    .attr('preserveAspectRatio', 'xMidYMin slice')
  /* 图形缩放 */
  var zoom = window.zoom = d3.zoom() // 自动创建事件侦听器
    .scaleExtent([0.1, 10]) // 缩放允许的级数
    .on('zoom', zoomed)

  function zoomed () {
    svg.attr('transform', d3.event.transform)
    // translate变换矢量（使用二元组标识）scale当前尺度的数字
  }

  container.call(zoom)
    .on('dblclick.zoom', null)
  /* 让整体图形归位 */
  d3.select('#resetWD')
    .on('mouseup', resetted)

  function resetted () {
    container.transition()
      .duration(750)
      .call(zoom.transform, d3.zoomIdentity)
  }

  // create some data
  let dataset = datases
  store.commit('dataset', dataset)

  // console.log("dataset is ...", dataset);

  var adjlist = []
  /* 判断是不是直连，高亮显示 */
  dataset.links.forEach(function (d) {
    if (typeof d.source === 'object') {
      adjlist[d.source.id + '-' + d.target.id] = true
      adjlist[d.target.id + '-' + d.source.id] = true
    } else {
      adjlist[d.source + '-' + d.target] = true
      adjlist[d.target + '-' + d.source] = true
    }
  })
  function neigh (a, b) {
    return a === b || adjlist[a + '-' + b]
  }

  /* 控制关系links的样式 */
  var link = window.link = svg.selectAll('.links')
    .data(dataset.links)
    .enter()
    .append('line')
    .attr('class', 'links')
    .attr('stroke', '#ffb997')
    .style('stroke-width', 2)
    .attr('marker-end', 'url(#arrowhead)') // The marker-end attribute defines the arrowhead or polymarker that will be drawn at the final vertex of the given shape.
    .on('mouseenter', function () {
      d3.select(this).style('stroke-width', 4) // 让线变宽
    })
    .on('mouseleave', function () {
      d3.select(this).style('stroke-width', 2)
    })

  // The <title> element provides an accessible, short-text description of any SVG container element or graphics element.
  // Text in a <title> element is not rendered as part of the graphic, but browsers usually display it as a tooltip.
  /* 鼠标悬浮展示数据 */
  link.append('title')
    .text(d => d.type)

  var edgepaths = window.edgepaths = svg.selectAll('.edgepath') // make path go along with the link provide position for link labels
    .data(dataset.links)
    .enter()
    .append('path')
    .attr('class', 'edgepath')
    .attr('fill-opacity', 1)
    .attr('stroke-opacity', 1)
    .attr('id', function (d, i) {
      return 'edgepath' + i
    })
  // .style("pointer-events", "none");

  var edgelabels = window.edgelabels = svg.selectAll('.edgelabel')
    .data(dataset.links)
    .enter()
    .append('text')
    .attr('dy', -3) /* 调整文字与线的垂直距离 */
    .style('transform-origin', 'center')
    // .style("pointer-events", "none")
    .attr('class', 'edgelabel')
    .attr('id', function (d, i) {
      return 'edgelabel' + i
    })
    .attr('font-size', 12)
    .attr('fill', 'purple')

  edgelabels.append('textPath') // To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
    .attr('xlink:href', function (d, i) {
      return '#edgepath' + i
    })
    // .attr("x", function (d) {
    //   console.log("d:", d)
    //   let k = JSON.stringify(d)
    //   console.log("k:",k)
    //   console.log("d.source:", d.source)
    //   // console.log("obj.source.x:", obj.source.x)
    //   return (d.source.x + d.target.x) / 2
    // })
    // .attr("y", function (d) {
    //   return (d.source.y + d.target.y) / 2
    // })
    .style('text-anchor', 'middle')
    .attr('startOffset', '50%')
    .text(d => d.name.length > 6 ? d.name.slice(0, 6) + '...' : d.name)

  edgelabels.append('title')
    .text(d => d.name)
  /* 实体球的拖拽 */
  var node = window.node = svg.selectAll('.nodes')
    .data(dataset.nodes)
    .enter()
    .append('g')
    .attr('class', 'nodes')
    .call(d3.drag() // sets the event listener for the specified typenames and returns the drag behavior.
      .on('start', dragstarted) // start - after a new pointer becomes active (on mousedown or touchstart).
      .on('drag', dragged) // drag - after an active pointer moves (on mousemove or touchmove).
      .on('end', dragended) // end - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).
    )
  /* //实体球的大小样式控制 */
  window.nodeCicles = node.append('circle')
    .attr('r', d => 30)// + d.runtime/20 )
    // 这居然这么关键？+++++++++++++++
    // .attr("cx", function (d) { return d.x; })
    // .attr("cy", function (d) { return d.y; })
    .style('stroke', d => colorScale(d.labels)) // 圆环边线颜色
    // .style("stroke-opacity", 0.3)
    .style('stroke-width', d => 5) // .style("stroke-width", d => d.runtime / 10)
    .style('fill', function (d) {
      return ('url(#image' + d.id + ')')
    })
    // .style("fill","blue")
    .on('mouseover', function (d) {
      d3.select(this).style('stroke-width', 8)
    })
    .on('mouseout', function (d) {
      d3.select(this).style('stroke-width', 3)
    })
  // 球悬浮title
  node.append('title')
    .text(d => d.name)

  window.nodeText = node.append('text')
    .attr('class', 'nodeText')
    .attr('x', 35)
    .attr('y', 10)
    .text(d => d.name.length > 9 ? d.name.slice(0, 9) + '...' : d.name)
  // let strs = []
  // dataset.nodes.forEach((val) => {
  //   strs.push(val.name)
  // })

  // nodeText.selectAll("tspan")
  //   .data(function(d){
  //     let nameStr = []
  //     if(d.name.length>11){
  //       nameStr[0] = d.name.slice(0,6).toString();
  //       nameStr[1] = d.name.slice(6,12).toString() + "...";
  //       return nameStr;
  //     }else {
  //       nameStr[0] = d.name.slice(0,6).toString();
  //       nameStr[1] = d.name.slice(6,).toString();
  //       return nameStr;
  //     }})
  //   .enter()
  //   .append("tspan")
  //   // .attr("x",nodeText.attr('x'))
  //   .attr("dy","1.3em")
  //   .text(d => d);
  /* 实体球周围的圆环入口 */
  node.on('click', drawCircle)

  // Listen for tick events to render the nodes as they update in your Canvas or SVG.
  simulation
    .nodes(dataset.nodes)
    .on('tick', ticked)

  simulation.force('link')
    .links(dataset.links)

  // This function is run at each iteration of the force algorithm, updating the nodes position (the nodes data array is directly manipulated).
  function ticked () {
    link.attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    // const radius = 30
    node.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')

    // node.attr("cx", function(d) {
    //     return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
    //   })
    //   .attr("cy", function(d) {
    //     return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
    //   })

    edgepaths.attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y)
  }

  // When the drag gesture starts, the targeted node is fixed to the pointer
  // The simulation is temporarily “heated” during interaction by setting the target alpha to a non-zero value.
  function dragstarted (d) {
    if (!d3.event.active) simulation.alphaTarget(0.7).restart()// sets the current target alpha to the specified number in the range [0,1].
    d.fy = d.y // fx - the node’s fixed x-position. Original is null.
    d.fx = d.x // fy - the node’s fixed y-position. Original is null.
    d3.select('#eee').remove() // 删除节点扇形
  }

  /* 拖拽实体球，位置锁定 */
  function dragged (d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  /* 拖拽实体球，位置锁定 */
  function dragended (d) {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  // drawing the legend
  const legendg = container.append('svg').selectAll('.legend')
    .data(colorScale.domain())
    .enter().append('g')
    .attr('transform', (d, i) => `translate(${width - 150},${i * 20 + 10})`)

  legendg.append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 5)
    .attr('fill', colorScale)

  legendg.append('text')
    .attr('x', 10)
    .attr('y', 5)
    .text(d => d)

  // 圆环数据
  const nodeData = {
    name: 'TOPICS',
    children: [{
      name: 'TopicC',
      icon: '\ue62a',
      iconName: '拓展节点',
      children: [{ name: 'Sub C1', icon: '全部', icon2: '拓展', size: 3 }, { name: 'Sub C2', icon: '条件', icon2: '拓展', size: 3 }]
    }, {
      name: 'TopicD',
      icon: '\ue62c',
      iconName: '删除节点',
      children: [{ name: 'Sub D1', icon: '删除', icon2: '节点', size: 3 }, { name: 'Sub D2', icon: '删除', icon2: '链路', size: 3 }]
    }, {
      name: 'TopicG', icon: '\ue624', size: 6, iconName: '查看档案'
      // "children": [{ "name": "Sub D1", "icon": "删除", "icon2": "节点", "size": 3 }, { "name": "Sub D2", "icon": "删除", "icon2": "链路", "size": 3 }]
    },
    {
      // 锁定
      name: 'TopicE', icon: '\ue6a0', size: 6, iconName: '锁定节点'
      // "children": [{ "name": "Sub E1", "icon": "加载", "size": 3 }, { "name": "Sub E2", "icon": "扩展", "size": 3 }]
    }, {
      name: 'TopicA', size: 6, icon: '\ue684', iconName: '解锁节点'
      // "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
    }, {
      name: 'TopicF', size: 6, icon: '\ue621', iconName: '取消定位'
      // "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
    }, {
      name: 'TopicB',
      icon: '\ue64c',
      iconName: '查看模式',
      children: [{ name: 'Sub B1', icon: '普通', icon2: '查看', size: 2 }, { name: 'Sub B2', icon: '查看', icon2: '直连', size: 2 }, {
        name: 'Sub B3', icon: '查看', icon2: '链路', size: 2
      }]
    }
    ]
  }
  let showModel = 0
  // 圆环入口,样式,尺寸
  function drawCircle (nd) {
    // Variables
    // var width1 = 250
    // var height1 = 250
    var radius = 150

    // Create primary <g> element
    var g = svg.append('g')
      .attr('id', 'eee')
      .attr('transform', 'translate(' + nd.x + ',' + nd.y + ')')

    // Data strucure
    var partition = d3.partition()
      .size([2 * Math.PI, radius])

    // Find data root
    var root = d3.hierarchy(nodeData)
      .sum(function (d) { return d.size })

    // Size arcs
    partition(root)
    var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 })

    // Put it all together
    var path = g.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr('display', function (d) {
        return d.depth === 1 ? null : 'none'
      })
      .attr('d', arc)
      // .attr("fill-opacity", 0.8)
      .style('fill', function (d) {
        return d.depth === 1 ? '#F0F6FE' : '#45A5EF'
      })
      .attr('class', function (d) {
        return d.depth === 2 ? 'hiddenUp' : null
      })
      .style('opacity', function (d) {
        return d.depth === 2 ? 0.7 : 1
      })
      .style('cursor', 'pointer')
      .on('mouseenter', function (d) {
        d3.select(this).style('fill', function (d) {
          return d.depth === 1 ? '#F0F6F0' : '#45A5B0'
        })
        const dd = d.children
        path
          .filter(d => dd === undefined ? false : dd.indexOf(d) > -1)
          .attr('display', null)
          .attr('class', 'showUp')

        iconsLab.filter(d => dd === undefined ? false : dd.indexOf(d) > -1)
          .attr('display', null)
          .attr('class', 'visUp')
      })
      .on('mouseleave', function (d) {
        d3.select(this).style('fill', function (d) {
          return d.depth === 1 ? '#F0F6FE' : '#45A5EF'
        })
      })
      .on('mouseover', function (d) {
        const showed = d3.selectAll('.showUp')
        if (!showed.empty()) {
          if (showed.datum().parent.children.indexOf(d) === -1 && d.data.name !== showed.datum().parent.data.name) {
            d3.selectAll('.showUp')
              .attr('display', 'none')
              .attr('class', 'hiddenUp')
            d3.selectAll('.visUp')
              .attr('display', 'none')
              .attr('class', 'hidUp')
          }
        }
      })

    g.on('mouseleave', d => d3.select('#eee').remove())

    path.on('click', function (d) {
      switch (d.data.name) {
        case 'TopicA':
          startForce()
          d3.select('#eee').remove()
          console.log('您点击的是TopicA按钮')
          break
        case 'TopicB':
          console.log('您点击的是TopicB按钮')
          break
        case 'TopicC':
          console.log('您点击的是TopicC按钮')
          break
        case 'TopicD':
          console.log('您点击的是TopicD按钮')
          break
        case 'TopicE':
          stopForce()
          d3.select('#eee').remove()
          console.log('您点击的是TopicE按钮')
          break
        case 'TopicF':
          unfocus()
          d3.select('#eee').remove()
          console.log('您点击的是TopicA按钮')
          break
        case 'TopicG':
          unfocus()
          router.push({
            path: '/Morerecord'
          })
          d3.select('#eee').remove()
          console.log('您点击的是TopicG按钮')
          break
        case 'Sub B1':
          showModel = 0
          d3.select('#eee').remove()
          console.log('您点击的是Sub B1按钮')
          break
        case 'Sub B2':
          showModel = 1
          d3.select('#eee').remove()
          console.log('您点击的是Sub B2按钮')
          break
        case 'Sub B3':
          showModel = 2
          d3.select('#eee').remove()
          console.log('您点击的Sub B3按钮')
          break
        case 'Sub C1':
          myExtendNode(nd.name)
          d3.select('#eee').remove()
          console.log('您点击的是Sub C1按钮')
          break
        case 'Sub C2':
          console.log('您点击的是Sub C2按钮')
          break
        case 'Sub D1':
          deleteNode(nd)
          d3.select('#eee').remove()
          console.log('您点击的是Sub D1按钮')
          break
        case 'Sub D2':
          deleteLink(nd)
          d3.select('#eee').remove()
          console.log('您点击的是Sub D2按钮')
          break
        case 'Sub E1':
          console.log('您点击的是Sub E1按钮')
          break
        case 'Sub E2':
          console.log('您点击的是Sub E2按钮')
          break
        default:
          console.log('您未点击有效按钮')
      }
    })

    const iconsLab = g.append('g')
      .selectAll('text')
      .data(root.descendants())
      .join('text')
      // .attr("fill-opacity", 0.3)
      /* 控制圆环的文字方向 */
      .attr('transform', function (d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI
        const y = (d.y0 + d.y1) / 2
        return `rotate(${x - 90}) translate(${y},0) rotate(${90 - x})`
      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('class', d => d.depth > 0 ? (d.depth === 1 ? 'iconfont' : 'hidUp') : null)
      .attr('display', d => d.depth > 0 ? (d.depth === 1 ? null : 'none') : null)
      // .attr('style', "color:#ff00ff;")
      .attr('font-size', '10px')
      .style('cursor', 'pointer')
      .text(d => d.depth > 0 ? d.data.icon : null)

    iconsLab.append('tspan')
      .attr('x', 0)
      .attr('dy', '1.3em')
      .attr('font-size', '10px')
      .text(d => d.data.iconName)

    iconsLab.append('tspan')
      .attr('x', 0)
      .attr('dy', '1.3em')
      .attr('font-size', '10px')
      .text(d => d.data.icon2)

    iconsLab.on('mouseenter', function (d) {
      const dd = d
      path.filter(d => dd === d).style('fill', function (d) { return d.depth === 1 ? '#F0F6F0' : '#45A5B0' })
    })
      .on('mouseleave', function (d) {
        const ddd = d
        path.filter(d => ddd === d)
          .style('fill', function (d) {
            return d.depth === 1 ? '#F0F6FE' : '#45A5EF'
          })
      })

    iconsLab.on('click', function (d) {
      switch (d.data.name) {
        case 'TopicA':
          startForce()
          d3.select('#eee').remove()
          console.log('您点击的是TopicA按钮')
          break
        case 'TopicB':
          console.log('您点击的是TopicB按钮')
          break
        case 'TopicC':
          console.log('您点击的是TopicC按钮')
          break
        case 'TopicD':
          console.log('您点击的是TopicD按钮')
          break
        case 'TopicE':
          stopForce()
          d3.select('#eee').remove()
          console.log('您点击的是TopicE按钮')
          break
        case 'TopicF':
          unfocus()
          d3.select('#eee').remove()
          console.log('您点击的是TopicA按钮')
          break
        case 'TopicG':
          unfocus()
          router.push({
            path: '/Morerecord',
            query: {
              label: nd.label,
              value: nd.name
            }
          })
          d3.select('#eee').remove()
          console.log('您点击的是TopicG按钮')
          break
        case 'Sub B1':
          showModel = 0
          d3.select('#eee').remove()
          console.log('您点击的是Sub B1按钮')
          break
        case 'Sub B2':
          showModel = 1
          d3.select('#eee').remove()
          console.log('您点击的是Sub B2按钮')
          break
        case 'Sub B3':
          showModel = 2
          d3.select('#eee').remove()
          console.log('您点击的Sub B3按钮')
          break
        case 'Sub C1':
          myExtendNode(nd.name)
          d3.select('#eee').remove()
          console.log('您点击的是Sub C1按钮')
          break
        case 'Sub C2':
          // 条件拓展
          dialogNode(true, nd.name)
          console.log('您点击的是Sub C2按钮')
          break
        case 'Sub D1':
          deleteNode(nd)
          d3.select('#eee').remove()
          console.log('您点击的是Sub D1按钮')
          break
        case 'Sub D2':
          deleteLink(nd)
          d3.select('#eee').remove()
          console.log('您点击的是Sub D2按钮')
          break
        case 'Sub E1':
          console.log('您点击的是Sub E1按钮')
          break
        case 'Sub E2':
          console.log('您点击的是Sub E2按钮')
          break
        default:
          console.log('您未点击有效按钮')
      }
    })
  }

  // 鼠标位置,获取画布坐标
  // function printPosition () {
  //   var position = d3.mouse(svg.node())
  //   return position
  // }

  function stopForce () {
    node.each((val) => {
      val.fx = val.x
      val.fy = val.y
      val.fixed = true
      val.locked = true
    })
    simulation.stop()
  }

  // 全局开始力作用之间的影响
  function startForce () {
    node.each((val) => {
      val.fx = null
      val.fy = null
      val.fixed = false
      val.locked = false
    })
    simulation.restart()
  }

  function deleteNode (nd) {
    const newNodes = []
    const newLinks = []
    var index = nd.id
    node.each((o) => {
      return index === o.id ? null : newNodes.push(o)
    })
    link.each((o) => {
      return o.source.id === index || o.target.id === index ? null : newLinks.push(o)
    })
    dataset = { nodes: newNodes, links: newLinks }
    //
    // console.log("测试++++++++++")
    // console.log(dataset)
    // 触发后退数据更新
    store.commit('dataset', dataset)

    svg.selectAll('.nodes')
      .data(dataset.nodes, (d) => { return d.id })
      .exit()
      .remove()

    svg.selectAll('.links')
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()

    svg.selectAll('.edgepath') // make path go along with the link provide position for link labels
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()

    svg.selectAll('.edgelabel')
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()
  }

  function deleteLink (nd) {
    const ind = nd.id
    let newNodes = []
    const newLinks = []
    var childLinkList = []
    var childNodeList = []
    var sourceList = []
    var targetList = []
    var nodeList = []
    dataset.links.forEach((val) => {
      if (typeof val.source === 'object') {
        sourceList.push(val.source.id)
        targetList.push(val.target.id)
      } else {
        sourceList.push(val.source)
        targetList.push(val.target)
      }
    })

    dataset.nodes.forEach((val) => {
      nodeList.push(val.id)
    })

    function findChild (data, id) {
      data.forEach((item) => {
        if (typeof item.source === 'object') {
          if (item.source.id === id) {
            childLinkList.push(item.index)
            childNodeList.push(item.target.id)
            id = item.target.id
            var t = data.indexOf(item)
            data.splice(t, 1)
            findChild(data, id)
          }
        } else {
          if (item.source === id) {
            childLinkList.push(item.index)
            childNodeList.push(item.target)
            id = item.target
            var s = data.indexOf(item)
            data.splice(s, 1)
            findChild(data, id)
          }
        }
      })
    }
    findChild(JSON.parse(JSON.stringify(dataset.links)), ind)
    childNodeList.push(nd.id)
    newNodes = dataset.nodes
    childNodeList.forEach((val) => {
      const inx = nodeList.indexOf(val)
      if (inx > -1) {
        newNodes.splice(inx, 1)
        nodeList.splice(inx, 1)
      }

      link.each((o) => {
        return o.source.id === val || o.target.id === val ? newLinks.push(o) : null
      })
    })
    const temLink = dataset.links
    newLinks.forEach((val) => {
      const inde = temLink.indexOf(val)
      if (inde > -1) {
        temLink.splice(inde, 1)
      }
    })
    dataset = { nodes: newNodes, links: temLink }
    // 触发数据更新
    store.commit('dataset', dataset)
    svg.selectAll('.nodes')
      .data(dataset.nodes, (d) => { return d.id })
      .exit()
      .remove()

    svg.selectAll('.links')
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()

    svg.selectAll('.edgepath') // make path go along with the link provide position for link labels
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()

    svg.selectAll('.edgelabel')
      .data(dataset.links, (d) => { return d.index })
      .exit()
      .remove()
  }

  function focus (d) {
    var index = d3.select(d3.event.target).datum().id
    node.style('opacity', function (o) {
      return neigh(index, o.id) ? 1 : 0.1
    })
    edgelabels.attr('display', function (o) {
      return o.source.id === index || o.target.id === index ? 'block' : 'none'
    })
    link.style('opacity', function (o) {
      return o.source.id === index || o.target.id === index ? 1 : 0.1
    })
  }

  function unfocus (d) {
    node.style('opacity', 1)
    edgelabels.attr('display', 'block')
    link.style('opacity', 1)
  }

  function focusLink (d) {
    var ind = d3.select(d3.event.target).datum().id
    var childLinkList = []
    var childNodeList = []
    var parentLinkList = []
    var parentNodeList = []
    var PnameList = []
    var sourceList = []
    var targetList = []
    dataset.links.forEach((val) => {
      if (typeof val.source === 'object') {
        sourceList.push(val.source.id)
        targetList.push(val.target.id)
      } else {
        sourceList.push(val.source)
        targetList.push(val.target)
      }
    })

    function findChild (data, id) {
      data.forEach((item) => {
        if (typeof item.source === 'object') {
          if (item.source.id === id) {
            childLinkList.push(item.index)
            childNodeList.push(item.target.id)
            id = item.target.id
            var t = data.indexOf(item)
            data.splice(t, 1)
            findChild(data, id)
          }
        } else {
          if (item.source === id) {
            childLinkList.push(item.index)
            childNodeList.push(item.target)
            id = item.target
            var s = data.indexOf(item)
            data.splice(s, 1)
            findChild(data, id)
          }
        }
      })
    }
    findChild(JSON.parse(JSON.stringify(dataset.links)), ind)

    function findParent (data, id) {
      data.forEach((item) => {
        if (typeof item.source === 'object') {
          if (item.target.id === id) {
            PnameList.push(item.source.name)
            parentLinkList.push(item.index)
            parentNodeList.push(item.source.id)
            id = item.source.id
            var t = data.indexOf(item)
            data.splice(t, 1)
            findParent(data, id)
          } else {
            if (item.target === id) {
              PnameList.push(item.source.name)
              parentLinkList.push(item.index)
              parentNodeList.push(item.source)
              id = item.source
              var s = data.indexOf(item)
              data.splice(s, 1)
              findParent(data, id)
            }
          }
        }
      })
    }
    findParent(JSON.parse(JSON.stringify(dataset.links)), ind)
    const nodeList = parentNodeList.concat(childNodeList)
    const linkList = parentLinkList.concat(childLinkList)
    node.style('opacity', function (o) {
      return nodeList.indexOf(o.id) > -1 || o.id === ind ? 1 : 0.1
    })
    edgelabels.attr('display', function (o) {
      return linkList.indexOf(o.index) > -1 ? 'block' : 'none'
    })
    link.style('opacity', function (o) {
      return linkList.indexOf(o.index) > -1 ? 1 : 0.1
    })
  }

  // 显示链路、直接相连、普通模式
  node.on('mouseover', (d) => {
    return showModel === 0 ? null : (showModel === 1 ? focus(d) : focusLink(d))
  })
    .on('mouseout', (d) => {
      return showModel === 0 ? null : unfocus(d)
    })

  d3.select('#deleteG').on('mouseup', function () {
    dataset.nodes = null
    dataset.links = null
    d3.select('svg').remove()
  })

  function isInArray (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i].name) {
        return true
      }
    }
    return false
  }

  // 判断元素是否在ARRAY中
  function EdgeIsInArray (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if ((value.source === arr[i].target) && (value.target === arr[i].source)) {
        return true
      }
    }
    return false
  }
  // 条件拓展
  // function reExtendNode () {
  //   axios.get(`http://localhost:8023/MapDisplay/extensionNodes?node=${this.$store.state.name}&edge=${this.$store.state.relation}`)
  //     .then(res => {
  //       const comData = res.data
  //       var arrEdges = []; var arrNodes = []

  //       for (let i = 0; i < comData.nodes.length; i++) {
  //         if (!isInArray(datases.nodes, comData.nodes[i].name)) {
  //           arrNodes.push(comData.nodes[i])
  //         }
  //       }

  //       for (let i = 0; i < comData.links.length; i++) {
  //         const obj2 = comData.links[i]
  //         if (!EdgeIsInArray(datases.links, comData.links[i])) {
  //           arrEdges.push(obj2)
  //         }
  //       }

  //       dataset = { nodes: datases.nodes.concat(arrNodes), links: datases.links.concat(arrEdges) }

  //       d3.selectAll('svg').remove()
  //       pltKg(dataset)
  //     }
  //     )
  // }
  // 拓展
  function myExtendNode (name) {
    axios.get('http://localhost:8023/MapDisplay/subGraph?nodeName=' + name)
      .then(res => {
        const comData = res.data
        var arrEdges = []; var arrNodes = []

        for (let i = 0; i < comData.nodes.length; i++) {
          if (!isInArray(dataset.nodes, comData.nodes[i].name)) {
            arrNodes.push(comData.nodes[i])
          }
        }

        for (let i = 0; i < comData.links.length; i++) {
          const obj2 = comData.links[i]
          if (!EdgeIsInArray(dataset.links, comData.links[i])) {
            arrEdges.push(obj2)
          }
        }

        dataset = { nodes: dataset.nodes.concat(arrNodes), links: dataset.links.concat(arrEdges) }

        d3.selectAll('svg').remove()
        pltKg(dataset)
      }
      )
  }
}
/* 放大镜 */
export function magLens (ob) {
  if (ob) {
    // container.transition()
    //   .duration(750)
    //   .call(zoom.transform, d3.zoomIdentity);
    // container.on('.zoom', null);
    // container.call(zoom)
    // nodeCicles
    //   .style("fill", "#ffb997")

    var fisheye = lens().circular()
      .radius(100)
      .distortion(5)
    var container = window.container
    var glass = container.append('circle')
      .attr('class', 'glass')
      .attr('r', fisheye.radius())
      .style('stroke-opacity', 0.6)
      .attr('stroke', 'gray')
      .attr('stroke-width', 2)
      .attr('fill', 'none')

    // 鼠标进入
    window.container.on('mousemove', function () {
      const pointer = d3.mouse(this)
      // console.log(svg.attr("transform"))
      var svg = window.svg
      if (svg.attr('transform')) {
        const tran = getXYFromTranslate(svg)
        fisheye.focus([(pointer[0] - tran[0]) / tran[2], (pointer[1] - tran[1]) / tran[2]])
        // fisheye.focus([pointer[0]-d3.event.transform.invertX,pointer[1]-d3.event.transform.invertY])
      } else {
        fisheye.focus(d3.mouse(this))
      }
      var mouseX = d3.mouse(this)[0]
      var mouseY = d3.mouse(this)[1]
      // var r = fisheye.radius()

      glass.attr('cx', mouseX)
        .attr('cy', mouseY)

      window.nodeCicles.each(function (d) {
        d.fisheye = fisheye(d)
      })

      window.nodeCicles
        .attr('cx', function (d) {
          return d.fisheye.x - d.x
        })
        .attr('cy', function (d) {
          return d.fisheye.y - d.y
        })
        // .attr("r", function (d) {
        //   return d.fisheye.z * 30;
        // })
        .attr('transform', function (d) {
          return `scale(${d.fisheye.z})`
        })

      window.nodeText
        .attr('dx', function (d) {
          return d.fisheye.x - d.x
        })
        .attr('dy', function (d) {
          return d.fisheye.y - d.y
        })
        .attr('transform', function (d) {
          return `scale(${d.fisheye.z})`
        })

      window.edgepaths
        .attr('d', d => 'M ' + d.source.fisheye.x + ' ' + d.source.fisheye.y + ' L ' + d.target.fisheye.x + ' ' + d.target.fisheye.y)

      window.link.attr('x1', function (d) {
        return d.source.fisheye.x
      })
        .attr('y1', function (d) {
          return d.source.fisheye.y
        })
        .attr('x2', function (d) {
          return d.target.fisheye.x
        })
        .attr('y2', function (d) {
          return d.target.fisheye.y
        })
    })
  } else {
    // container.call(zoom)
    //   .on("dblclick.zoom", null);
    // nodeCicles.style("fill", function (d) {
    //   return ("url(#image" + d.id+ ")");})

    d3.select('.glass').remove()
    window.container.on('mousemove', null)
  }

  function getXYFromTranslate (element) {
    const te = element.attr('transform').split(' ')[0].split('(')[1].split(')')[0].split(',')
    const x = parseFloat(te[0])
    const y = parseFloat(te[1])
    const s = element.attr('transform').split(' ')[1].split('(')[1].split(')')[0].split(',')
    const z = parseFloat(s)
    console.log('[x, y, z]', [x, y, z])
    return [x, y, z]
  }
}
/* 节点定位 */
// export function locateNode (nodeName) {
//   const nodeNameList = []

//   node.each((val) => {
//     nodeNameList.push(val.name)
//   })
//   const finded = nodeNameList.indexOf(nodeName) > -1
//   if (finded) {
//     node.style('opacity', function (o) {
//       return o.name == nodeName ? 1 : 0.1
//     })
//     edgelabels.attr('display', 'none')
//     link.style('opacity', 0.1)
//   }
//   return finded
// }

(function() {
  return function(data, config) {
 const hidth = config.dimensions.fullWidth
 const height = config.dimensions.fullHeight
 const radius = Math.min(width, height) / 2 - 10
 const d3 = window.d3
 var data = d3.range(10).map(Math.random).sort(d3.descending)
 console.log(data)
 var color = d3.scale.category20()

var arc = d3.svg.arc()
    .outerRadius(radius)

var pie = d3.layout.pie()
const fauxNode = window.ReactFauxDOM.createElement('svg')
const svg = window.d3.select(fauxNode)
    .datum(data)
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

var arcs = svg.selectAll('g.arc')
    .data(pie)
  .enter().append('g')
    .attr('class', 'arc')

arcs.append('path')
    .attr('fill', function(d, i) { return color(i) })
  .transition()
    .ease('bounce')
    .duration(2000)
    .attrTween('d', tweenPie)
  .transition()
    .ease('elastic')
    .delay(function(d, i) { return 2000 + i * 50 })
    .duration(750)
    .attrTween('d', tweenDonut)

function tweenPie(b) {
  b.innerRadius = 0
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b)
  return function(t) { return arc(i(t)) };
}

 function tweenDonut(b) {
  b.innerRadius = radius * 0.6
  var i = d3.interpolate({innerRadius: 0}, b)
  return function(t) { return arc(i(t)) };
}
  return fauxNode
  }
})()

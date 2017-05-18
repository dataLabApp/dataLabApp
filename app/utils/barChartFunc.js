// when your chart is drawn, your code will be given
// a data array containing the data you selected in the slice
// the configuration settings you selected in an object named config

(function(){
  return function(data, config){
  // the config will be based on your settings from the control panel as well
  let x = config.x.dataColumn
  let y = config.y.dataColumn
  let chartTitle = config.title

  let yAxisLabel = 'Dollars'

  let margin = {top: 20, right: 5, bottom: 50, left: 50}
  // here, we want the full chart to be 700x200, so we determine
  // the width and height by subtracting the margins from those values
  let fullWidth = 700
  let fullHeight = 200
  // the width and height values will be used in the ranges of our scales
  let width = fullWidth - margin.right - margin.left
  let height = fullHeight - margin.top - margin.bottom

  let fauxNode = window.ReactFauxDOM.createElement('svg')
  let svg = window.d3.select(fauxNode)
  .attr('width', fullWidth)
  .attr('height', fullHeight)
  // this g is where the bar chart will be drawn
  .append('g')
  // translate it to leave room for the left and top margins
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  let xLabels = data.map(function(i) {
    return i[x]
  })

  // x value determined by month
  var xScale = window.d3.scaleBand()
  .domain(xLabels)
  .range([0, width])
  .paddingInner(0.3)

  // the width of the bars is determined by the scale
  var bandwidth = xScale.bandwidth()

  // y value determined by temp
  var maxY = window.d3.max(data, d => +d[y]||d[y])
  var yScale = window.d3.scaleLinear()
  .domain([0, maxY])
  .range([height, 0])
  .nice()

  var xAxis = window.d3.axisBottom(xScale)
  var yAxis = window.d3.axisLeft(yScale)

  // draw the axes
  svg.append('g')
  .classed('x axis', true)
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis)

  var yAxisEle = svg.append('g')
  .classed('y axis', true)
  .call(yAxis)

  // add a label to the yAxis
  var yText = yAxisEle.append('text')
  .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
  .style('text-anchor', 'middle')
  .style('fill', 'black')
  .attr('dy', '-2.5em')
  .style('font-size', 14)
  .text(yAxisLabel)

  var barHolder = svg.append('g')
  .classed('bar-holder', true)

  // draw the bars
  var bars = barHolder.selectAll('rect.bar')
  .data(data)
  .enter().append('rect')
  .classed('bar', true)
  .attr('x', function(d, i) {
    return xScale(d[x])
  })
  .attr('width', bandwidth)
  .attr('y', function(d) {
      // this y value is the top edge of the rectangle
    return yScale(d[y])
  })
  .attr('height', function(d) {
      // the bar's height should align it with the base of the chart (y=0)
    return height - yScale(d[y])
  })

  // specify animations here
  fauxNode.update = (data) => {

    xLabels = data.map(function(i) {
      return i[x]
    })

    xScale = window.d3.scaleBand()
      .domain(xLabels)
      .range([0, width])
      .paddingInner(0.3)

    bandwidth = xScale.bandwidth()
    maxY = window.d3.max(data, d => +d[y]||d[y])
    yScale = window.d3.scaleLinear()
      .domain([0, maxY])
      .range([height, 0])
      .nice()
    xAxis = window.d3.axisBottom(xScale)
    yAxis = window.d3.axisLeft(yScale)
    svg.append('g')
      .classed('x axis', true)
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
    yAxisEle = svg.append('g')
      .classed('y axis', true)
      .call(yAxis)
    yText = yAxisEle.append('text')
      .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('dy', '-2.5em')
      .style('font-size', 14)
      .text(yAxisLabel)
    barHolder = svg.append('g')
      .classed('bar-holder', true)
    bars = barHolder.selectAll('rect.bar')
      .data(data)
      .enter().append('rect')
      .classed('bar', true)
      .attr('x', function(d, i) {
        return xScale(d[x])
      })
      .attr('width', bandwidth)
      .attr('y', function(d) {
          // this y value is the top edge of the rectangle
        return yScale(d[y])
      })
      .attr('height', function(d) {
          // the bar's height should align it with the base of the chart (y=0)
        return height - yScale(d[y])
      })
  }

    return fauxNode
  }
})()

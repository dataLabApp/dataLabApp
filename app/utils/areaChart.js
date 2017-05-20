(function() {
  return function(data, config) {
    const fullWidth = config.dimensions.fullWidth
    const fullHeight = config.dimensions.fullHeight
    const xCol = config.x.dataColumn
    const yCol = config.y.dataColumn
    const zCol = config.z.dataColumn
    const d3 = window.d3
    const diameter = 500 // max size of the bubbles
    const color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']) // color category

// set the dimensions and margins of the graph
    const margin = {top: 20, right: 20, bottom: 30, left: 50}
    const width = fullWidth - margin.left - margin.right
    const height = fullHeight - margin.top - margin.bottom

// parse the date / time
    var parseTime = d3.timeParse('%d-%b-%y')

// set the ranges
    var x = d3.scaleTime().range([0, width])
    var y = d3.scaleLinear().range([height, 0])

// define the area
    var area = d3.area()
    .x(function(d) { return x(d[xCol]) })
    .y0(height)
    .y1(function(d) { return y(d[yCol]) })

// define the line
    var valueline = d3.line()
    .x(function(d) { return x(d[xCol]) })
    .y(function(d) { return y(d[yCol]) })

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    const fauxNode = window.ReactFauxDOM.createElement('svg')

    var svg = d3.select(fauxNode)
      // .attr('width', width)
      // .attr('height', height)

      .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
    // var svg = d3.select('body').append('svg')
    // .attr('width', width + margin.left + margin.right)
    // .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')')

    // format the data
    data.forEach(function(d,i) {
      if (xCol === 'date') d.date = i
      d[yCol] = +d[yCol]
    })

    // scale the range of the data
    x.domain(d3.extent(data, function(d) { return d[xCol] }))
    y.domain([0, d3.max(data, function(d) { return d[yCol] })])

    // add the area
    svg.append('path')
        .data([data])
        .attr('class', 'area')
        .attr('d', area)

    // add the valueline path.
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', valueline)

    // add the X Axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))

    // add the Y Axis
    svg.append('g')
        .call(d3.axisLeft(y))

    // d3.select(self.frameElement).style('height', diameter + 'px')
    return fauxNode
  }
})()

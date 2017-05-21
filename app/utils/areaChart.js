(function() {
  return function(oldData, config) {
    const fullWidth = config.dimensions.fullWidth
    const fullHeight = config.dimensions.fullHeight
    const xCol = config.x.dataColumn
    const yCol = config.y.dataColumn
    const zCol = config.z.dataColumn
    const d3 = window.d3
    const color = d3.scaleOrdinal(config.colorScheme) // color category

// set the dimensions and margins of the graph
    const margin = {top: 20, right: 20, bottom: 30, left: 50}
    const width = fullWidth - margin.left - margin.right
    const height = fullHeight - margin.top - margin.bottom

// parse the date / time
    var parseTime = d3.timeParse('%B %d, %Y')

// set the ranges
    var x = d3.scaleTime().range([0, width])
    var y = d3.scaleLinear().range([height, 0])

// define the area
    var area = d3.area()
    .x(function(d) { return x(d.date) })
    .y0(height)
    .y1(function(d) { return y(d[yCol]) })

// define the line
    var valueline = d3.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d[yCol]) })

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    const fauxNode = window.ReactFauxDOM.createElement('svg')

    var svg = d3.select(fauxNode)
      .attr('width', fullWidth)
      .attr('height', fullHeight)

      // .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)
      // .attr('preserveAspectRatio', 'xMidYMid meet')
    // var svg = d3.select('body').append('svg')
    // .attr('width', width + margin.left + margin.right)
    // .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')')
    let data = oldData.slice()
    data.forEach(d => {
      let newObj = {}
      for (let key in d) {
        newObj[key] = d[key]
      }
      d = newObj
    })
    // format the data
    let newData = []
    data.forEach(function(d,i) {
      newData.push({date: parseTime(d.date), [yCol]: +d[yCol]})
    })

    // scale the range of the data
    x.domain(d3.extent(newData, function(d) { return d[xCol] }))
    y.domain([0, d3.max(newData, function(d) { return d[yCol] })])

    // add the area
    svg.append('path')
        .data([newData])
        .attr('class', 'area')
        .attr('d', area)
        .attr('fill', 'lightsteelblue')

    // add the valueline path.
    svg.append('path')
        .data([newData])
        .attr('class', 'line')
        .attr('d', valueline)
        .style('fill', 'none')

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

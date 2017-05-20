(function() {
  return function(data, config) {
    const width = config.dimensions.fullWidth
    const height = config.dimensions.fullHeight
    const radius = Math.min(width, height) / 2
    const d3 = window.d3
    const x = config.x.dataColumn
    const y = config.y.dataColumn

    const fauxNode = window.ReactFauxDOM.createElement('svg')

    var svg = d3.select(fauxNode)
      // .attr('width', width)
      // .attr('height', height)

      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
    const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    var color = d3.scaleOrdinal(config.colorScheme)

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return +d[x] })

    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0)

    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40)

    var arc = g.selectAll('.arc')
        .data(pie(data))
        .enter().append('g')
          .attr('class', 'arc')

    arc.append('path')
          .attr('d', path)
          .attr('fill', function(d) { return color(d.data[y]) })

    arc.append('text')
          .attr('transform', function(d) { return 'translate(' + label.centroid(d) + ')' })
          .attr('dy', '0.35em')
          .text(function(d) { return d.data[y] })

    return fauxNode
  }
})()

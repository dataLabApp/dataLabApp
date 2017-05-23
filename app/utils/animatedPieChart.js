// when your chart is drawn, your code will be given
// a data array containing the data you selected in the slice
// the configuration settings you selected in an object named config

(function() {
  return function(data, config) {
  // the config will be based on your settings from the control panel as well
    const x = config.x.dataColumn
    const y = config.y.dataColumn
    const chartTitle = config.title
    const width = config.dimensions.fullWidth
    const height = config.dimensions.fullHeight
    const d3 = window.d3
    const color = d3.scaleOrdinal(config.colorScheme)
    const radius = Math.min(width, height) / 2

    var pie = d3.pie()
        .value(function(d) { return d[x] })
        .sort(null)

    var arc = d3.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 20)

    const fauxNode = window.ReactFauxDOM.createElement('svg')
    const svg = d3.select(fauxNode)
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    var path = svg.datum(data).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i) })
        .attr("d", arc)
        .each(function(d) { this._current = d }) // store the initial angles

    // d3.selectAll("input")
    //     .on("change", change)

    // var timeout = setTimeout(function() {
    //   d3.select("input[value=\"oranges\"]").property("checked", true).each(change)
    // }, 2000)

    fauxNode.update = (newData, hook) => {
      let pie =d3.pie().value(function(d) { return d[x] })(newData)
      path = path.data(pie)
      path.attr('d', arc)
      // path.transition().duration(400).attrTween('d', arcTween)
      // pie.value(function(d) { return +d[x] }) // change the value function
      // console.log(pie)
      // path = path.data(pie) // compute the new angles
      // path.transition().duration(300).attrTween("d", arcTween).call(hook) // redraw the arcs
    }

    function type(d) {
      d[x] = +d[x]
      return d
    }

    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
      var i = d3.interpolate(this._current, a)
      this._current = i(0)
      return function(t) {
        return arc(i(t))
      }
    }

    return fauxNode
  }
})()

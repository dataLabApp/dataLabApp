(function() {
  return function(data, config) {
    const width = config.dimensions.fullWidth
    const height = config.dimensions.fullHeight
    const x = config.x.dataColumn
    const y = config.y.dataColumn
    const z = config.z.dataColumn
    const d3 = window.d3
    const diameter = width > height ? height : width // max size of the bubbles
    const color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']) // color category

    const format = d3.format(',d')

    var bubble = d3.pack()
        .size([diameter, diameter])
        .padding(1.5)

    const fauxNode = window.ReactFauxDOM.createElement('svg')

    var svg = d3.select(fauxNode)
      .attr('viewBox', `0 0 ${diameter} ${diameter}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('class', 'bubble')

    var root = d3.hierarchy(classes(data))
        .sum(function(d) { return d.value })
        .sort(function(a, b) { return b.value - a.value })

    bubble(root)
    var node = svg.selectAll('.node')
        .data(root.children)
      .enter().append('g')
        .attr('class', 'node')
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')' })

    node.append('title')
        .text(function(d) { return d.data.className + ': ' + format(d.value) })

    node.append('circle')
        .attr('r', function(d) { return d.r })
        .style('fill', function(d, i) {
          if (typeof d.data.packageName==='number') {
            return color(d.data.packageName)
          } else return color(i)
        })

    node.append('text')
        .attr('dy', '.3em')
        .style('text-anchor', 'middle')
        .text(function(d) { return d.data.className.substring(0, d.r / 3) })

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = []
      console.log('root is', root, 'node is', node, 'x is', x, 'y is', y, 'z is', z)
      function recurse(name, node) {
        // if (node.children) node.children.forEach(function(child) { recurse(node.name, child) })
        node.forEach(node => classes.push({packageName: node[z], className: node[y], value: node[x]}))
      }

      recurse(null, root)
      return {children: classes}
    }

    // d3.select(self.frameElement).style('height', diameter + 'px')
    return fauxNode
  }
})()

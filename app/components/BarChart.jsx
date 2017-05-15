// import React from 'react'
// import ReactFauxDOM from 'react-faux-dom'
// import d3 from 'd3'

var d3 = require('d3')
import React, { Component } from 'react';
var ReactFauxDOM = require('react-faux-dom')

export default class BarChart extends React.Component {
  render() {
    let data = window.TEMPDB || null
    console.log('data****', data)
  // let data = [
  // {letter: 'A', frequency: .08167},
  // {letter: 'B', frequency: .01492},
  // {letter: 'C', frequency: .02782},
  // {letter: 'D', frequency: .04253},
  // {letter: 'E', frequency: .12702},
  // {letter: 'F', frequency: .02288},
  // {letter: 'G', frequency: .02015},
  // {letter: 'H', frequency: .06094},
  // {letter: 'I', frequency: .06966},
  // {letter: 'J', frequency: .00153},
  // {letter: 'K', frequency: .00772},
  // {letter: 'L', frequency: .04025},
  // {letter: 'M', frequency: .02406},
  // {letter: 'N', frequency: .06749},
  // {letter: 'O', frequency: .07507},
  // {letter: 'P', frequency: .01929},
  // {letter: 'Q', frequency: .00095},
  // {letter: 'R', frequency: .05987},
  // {letter: 'S', frequency: .06327},
  // {letter: 'T', frequency: .09056},
  // {letter: 'U', frequency: .02758},
  // {letter: 'V', frequency: .00978},
  // {letter: 'W', frequency: .02360},
  // {letter: 'X', frequency: .00150},
  // {letter: 'Y', frequency: .01974},
  // {letter: 'Z', frequency: .00074}]

    let totalWidth = 800
    let totalHeight = 400

    let margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = totalWidth - margin.left - margin.right,
      height = totalHeight - margin.top - margin.bottom;

    let x = d3.scaleBand()
      .rangeRound([0, width])

    let y = d3.scaleLinear()
      .range([height, 0])

    let xAxis = d3.axisBottom()
      .scale(x)

    let yAxis = d3.axisLeft()
      .scale(y)
      .ticks(10, "%");

    //Create the element
    const div = new ReactFauxDOM.Element('div')

    //Pass it to d3.select and proceed as normal
    let svg = d3.select(div).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

      x.domain(data.map((d) => d.letter));
      y.domain([0, d3.max(data, (d) => d.frequency)]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.letter))
      .attr("width", 20)
      .attr("y", (d) => y(d.frequency))
      .attr("height", (d) => {return height - y(d.frequency)});

    //DOM manipulations done, convert to React
    return (
      <div>
        <h3>Frequency of Letters Graph</h3>
        { window.TEMPDB && div.toReact() }
      </div>
    )
}

}

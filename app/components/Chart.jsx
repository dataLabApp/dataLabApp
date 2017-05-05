var d3 = require('d3')
import React, { Component } from 'react';
var ReactFauxDOM = require('react-faux-dom')

export default class Chart extends Component {
  render () {
   var temperatures = [
        {temp: 32, month: 'January'},
        {temp: 38, month: 'February'},
        {temp: 47, month: 'March'},
        {temp: 59, month: 'April'},
        {temp: 70, month: 'May'},
        {temp: 80, month: 'June'},
        {temp: 84, month: 'July'},
        {temp: 83, month: 'Auguest'},
        {temp: 76, month: 'September'},
        {temp: 64, month: 'October'},
        {temp: 49, month: 'November'},
        {temp: 37, month: 'December'}
    ];
    var months = temperatures.map(function(t) {
        return t.month
    });

    var margin = {top: 20, right: 5, bottom: 50, left: 50};
    // here, we want the full chart to be 700x200, so we determine
    // the width and height by subtracting the margins from those values
    var fullWidth = 700;
    var fullHeight = 200;
    // the width and height values will be used in the ranges of our scales
    var width = fullWidth - margin.right - margin.left;
    var height = fullHeight - margin.top - margin.bottom;



    var fauxNode = ReactFauxDOM.createElement('svg')
    var svg = d3.select(fauxNode)
       .attr('width', fullWidth)
        .attr('height', fullHeight)
        // this g is where the bar chart will be drawn
        .append('g')
        // translate it to leave room for the left and top margins
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // x value determined by month
    var monthScale = d3.scaleBand()
        .domain(months)
        .range([0, width])
        .paddingInner(0.3);

    // the width of the bars is determined by the scale
    var bandwidth = monthScale.bandwidth();

    // y value determined by temp
    var maxTemp = d3.max(temperatures, function(d) { return d.temp; });
    var tempScale = d3.scaleLinear()
        .domain([0, maxTemp])
        .range([height, 0])
        .nice();

    var xAxis = d3.axisBottom(monthScale);
    var yAxis = d3.axisLeft(tempScale);

    // draw the axes
    svg.append('g')
        .classed('x axis', true)
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    var yAxisEle = svg.append('g')
        .classed('y axis', true)
        .call(yAxis);

    // add a label to the yAxis
    var yText = yAxisEle.append('text')
        .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('dy', '-2.5em')
        .style('font-size', 14)
        .text('Fahrenheit');

    var barHolder = svg.append('g')
        .classed('bar-holder', true);

    // draw the bars
    var bars = barHolder.selectAll('rect.bar')
        .data(temperatures)
        .enter().append('rect')
        .classed('bar', true)
        .attr('x', function(d, i) {
            // the x value is determined using the
            // month of the datum
            return monthScale(d.month)
        })
        .attr('width', bandwidth)
        .attr('y', function(d) {
            // the y position is determined by the datum's temp
            // this value is the top edge of the rectangle
            return tempScale(d.temp);
        })
        .attr('height', function(d) {
            // the bar's height should align it with the base of the chart (y=0)
            return height - tempScale(d.temp);
        });

    return (
      <div>
      <h2>Chart</h2>
        {fauxNode.toReact()}
      </div>
    )
  }
}

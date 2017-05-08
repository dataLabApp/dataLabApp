import React, {Component} from 'react'
var ReactFauxDOM = require('react-faux-dom')
var d3 = require('d3')

    //send in as props or on state:
    var data = window.TEMPDB || [{id:1, price:7}]
    let x = "id"
    let y = "price"
    let chartTitle = "Product Prices"
    let yAxisLabel = 'Dollars'


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


    let xLabels = data.map(function(i) {
    return i[x]
    });

    // x value determined by month
    var xScale = d3.scaleBand()
    .domain(xLabels)
    .range([0, width])
    .paddingInner(0.3);

    // the width of the bars is determined by the scale
    var bandwidth = xScale.bandwidth();

    // y value determined by temp
    var maxY = d3.max(data, function(d) { return d.price; });
    var yScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([height, 0])
    .nice();

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

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
    .text(yAxisLabel);

    var barHolder = svg.append('g')
    .classed('bar-holder', true);

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
        return yScale(d[y]);
    })
    .attr('height', function(d) {
        // the bar's height should align it with the base of the chart (y=0)
        return height - yScale(d[y]);
    });

export default class WidgetCard extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
  }
  render(){
    return(
      <div className="x_panel tile fixed_height_320">
        <div className="x_title">
          <h2>{chartTitle || 'Chart Placeholder'}</h2>
          <ul className="nav navbar-right panel_toolbox">
            <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">Settings 1</a>
                </li>
                <li><a href="#">Settings 2</a>
                </li>
              </ul>
            </li>
            <li><a className="close-link"><i className="fa fa-close"></i></a>
            </li>
          </ul>
          <div className="clearfix"></div>
        </div>
        <div className="x_content" style={{height:200,width:700}}>
          <div>
            {fauxNode ? fauxNode.toReact() : 'save form to see chart'}
          </div>
        </div>
      </div>
  )
  }
}

var d3 = require('d3')
import React, { Component } from 'react';
var ReactFauxDOM = require('react-faux-dom')

export default class LineGraph extends Component {
  render () {

    //send in as props or on state:

    console.log(window.TEMPDB);
    let data = window.TEMPDB;

    // basic SVG setup
	var margin = { top: 20, right: 100, bottom: 40, left: 100 };
	var height = 500 - margin.top - margin.bottom;
	var width = 960 - margin.left - margin.right;

    var fauxNode = ReactFauxDOM.createElement('svg')
    var svg = d3.select(fauxNode)
        .attr("width",width + margin.left + margin.right)
        .attr("height",height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //The SVG Transform Attribute applies a list of transformations to an element and it's children.
        //This transform specifies a translation by x and y. If y is not provided, it is assumed to be zero.

	// setup scales - the domain is specified inside of the function called when we load the data
	var xScale = d3.time.scale().range([0, width]);
	var yScale = d3.scale.linear().range([height, 0]);
	var color = d3.scale.category10();

	// setup the axes
	var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	var yAxis = d3.svg.axis().scale(yScale).orient("left");

	// create function to parse dates into date objects
	var parseDate = d3.time.format("%Y-%m-%d").parse;
	var formatDate = d3.time.format("%Y-%m-%d");
	var bisectDate = d3.bisector(function(d) { return d.date; }).left;

	// set the line attributes
	var line = d3.svg.line()
		.interpolate("basis")
		.x(function(d) { return xScale(d.date); })
		.y(function(d) { return yScale(d.close); });

	var focus = svg.append("g").style("display","none");

    //create a conversion object for json function below to reformat data.
    let conversionObj = {};
    function dataConversion() {
        for (key in data[0]) {
            if (typeOf(+data[key]) === 'number') {
                conversionObj[key] = +d[key]
            }
        }
    }

    console.log("conversionObj ", conversionObj);
	// import data and create chart
	d3.json(data, function(d) {
        console.log(data[0]);
			return conversionObj;
		}, 
		function(error,data) {
			
			// sort data ascending - needed to get correct bisector results
			data.sort(function(a,b) {
				return a.date - b.date;
			});

			// color domain
			color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

			// create stocks array with object for each company containing all data
			var stocks = color.domain().map(function(name) {
				return {
					name: name,
					values: data.map(function(d){
						return {date: d.date, close: d[name]};
					})
				};
			});

			// add domain ranges to the x and y scales
			xScale.domain([
				d3.min(stocks, function(c) { return d3.min(c.values, function(v) { return v.date; }); }),
				d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.date; }); })
			]);
			yScale.domain([
				0,
				// d3.min(stocks, function(c) { return d3.min(c.values, function(v) { return v.close; }); }),
				d3.max(stocks, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
			]);

			// add the x axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			// add the y axis
			svg.append("g")
					.attr("class", "y axis")
					.call(yAxis)
				.append("text")
					.attr("transform","rotate(-90)")
					.attr("y",-60)
					.attr("dy",".71em")
					.style("text-anchor","end")
					.text("Price ($)");

			// add circle at intersection
			focus.append("circle")
				.attr("class","y")
				.attr("fill","none")
				.attr("stroke","black")
				.style("opacity",0.5)
				.attr("r",8);

			// add horizontal line at intersection
			focus.append("line")
				.attr("class","x")
				.attr("stroke","black")
				.attr("stroke-dasharray","3,3")
				.style("opacity",0.5)
				.attr("x1", 0)
				.attr("x2", width);

			// add vertical line at intersection
			focus.append("line")
				.attr("class","y")
				.attr("stroke","black")
				.attr("stroke-dasharray","3,3")
				.style("opacity",0.5)
				.attr("y1", 0)
				.attr("y2", height);

			// append rectangle for capturing if mouse moves within area
			svg.append("rect")
				.attr("width",width)
				.attr("height",height)
				.style("fill","none")
				.style("pointer-events","all")
				.on("mouseover", function() { focus.style("display", null); })
				.on("mouseout", function() { focus.style("display", "none"); })
				.on("mousemove", mousemove);
			
			// add the line groups
			var stock = svg.selectAll(".stockXYZ")
					.data(stocks)
				.enter().append("g")
					.attr("class","stockXYZ");

			// add the stock price paths
			stock.append("path")
				.attr("class","line")
				.attr("id",function(d,i){ return "id" + i; })
				.attr("d", function(d) {
					return line(d.values); 
				})
				.style("stroke", function(d) { return color(d.name); });


			// add the stock labels at the right edge of chart
			var maxLen = data.length;
			stock.append("text")
				.datum(function(d) { 
					return {name: d.name, value: d.values[maxLen - 1]}; 
				})
				.attr("transform", function(d) { 
					return "translate(" + xScale(d.value.date) + "," + yScale(d.value.close) + ")"; 
				})
				.attr("id",function(d,i){ return "text_id" + i; })
		    .attr("x", 3)
		    .attr("dy", ".35em")
		    .text(function(d) { return d.name; })
		    .on("mouseover",function(d,i) { 
		    	for (j=0; j < 6; j++) {
						if (i !== j) {
							d3.select("#id"+j).style("opacity",0.1);
							d3.select("#text_id"+j).style("opacity",0.2);
						}
					};
		    })
		    .on("mouseout", function(d,i) {
		    	for (j=0; j < 6; j++) {
						d3.select("#id"+j).style("opacity",1);
						d3.select("#text_id"+j).style("opacity",1);
					};
		    });

			// mousemove function
			function mousemove() {

				var x0 = xScale.invert(d3.mouse(this)[0]);
				var i = bisectDate(data, x0, 1); // gives index of element which has date higher than x0
				var d0 = data[i - 1], d1 = data[i];
				var d = x0 - d0.date > d1.date - x0 ? d1 : d0;
				var close = d3.max([+d.Amazon,+d.Apple,+d.Facebook,+d.Google,+d.IBM,+d.Microsoft]);

				focus.select("circle.y")
				.attr("transform", "translate(" + xScale(d.date) + "," + yScale(close) + ")");

				focus.select("line.y")
					.attr("y2",height - yScale(close))
					.attr("transform", "translate(" + xScale(d.date) + "," 
						+ yScale(close) + ")");

				focus.select("line.x")
				.attr("x2",xScale(d.date))
				.attr("transform", "translate(0," 
					+ (yScale(close)) + ")");

			};

	});




    return (
      <div>
      <h2>"LineGraph"</h2>
        {fauxNode.toReact()}
      </div>
    )
  }
}

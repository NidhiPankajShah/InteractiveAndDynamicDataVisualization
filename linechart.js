
function fn(url)
{
console.log(url);
alert(url);
}

function lineChart(url)
{
	//alert(url);
var svg = d3.select("body").append("svg");	
//var width = 700;
//var height=600;
      margin = {top: 220, right: 30, bottom: 30, left: 500};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y")
    bisectDate = d3.bisector(function(d) { return d.TimeDigits; }).left;

var x = d3.scaleTime().range([0, width - margin.right - margin.left]);
var y = d3.scaleLinear().range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.TimeDigits); })
    .y(function(d) { return y(d.Quantity); });

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data1.json", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
	console.log( d.TimeDigits);
      d.TimeDigits = +d.TimeDigits;
	  
      d.Quantity = +d.Quantity;
    });

    x.domain([d3.min(data, function(d) { return d.TimeDigits; }), d3.max(data, function(d) { return d.TimeDigits; })]);
    y.domain([d3.min(data, function(d) { return d.Quantity; }) / 1.005, d3.max(data, function(d) { return d.Quantity; }) * 1.005]);

    g.append("g")
        .attr("class", "axis axis--x")
		.style("font","10px sans-serif")
		.style("fill", "none")
  .style("stroke", "#D4D8DA")
  .style("stroke-width", "2px")
  .style("shape-rendering","crispEdges")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(8).tickFormat(function(d) { return parseInt(d); }))
		
;

    g.append("g")
        .attr("class", "axis axis--y")
		.style("font","10px sans-serif")
.style("fill", "none")
  .style("stroke", "#D4D8DA")
  .style("stroke-width", "2px")
  .style("shape-rendering","crispEdges")
        .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d/50) + "k"; }))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Quantity");
	
	  /*g.append("g")
        .attr("class", "axis axis--x")
        .call(d3.Bottom(x).ticks(6).tickFormat(function(d) { return parseInt(d/50) + "k"; }))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Quantity");*/

    g.append("path")
        .datum(data)
        .attr("class", "line")
		.style("font","10px sans-serif")
.style("fill", "none")
  .style("stroke", "#D4D8DA")
  .style("stroke-width", "2px")
  .style("shape-rendering","crispEdges")
  .style("stroke", "#6F257F")
.style("stroke-width", "5px")
        .attr("d", line);

    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none")
		 .style("fill", "#F1F3F3")
   .style("stroke","#6F257F")
   .style("stroke-width", "5px")
;

    focus.append("line")
        .attr("class", "x-hover-line")
		.style("stroke","#6F257F")
   .style("stroke-width", "2px")
   .style("stroke-dasharray","3,3")

        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line")
		.style("stroke","#6F257F")
   .style("stroke-width", "2px")
   .style("stroke-dasharray","3,3")

        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5)
		 .style("fill", "#F1F3F3")
   .style("stroke","#6F257F")
   .style("stroke-width", "5px");

    focus.append("text")
        .attr("x", 15)
      	.attr("dy", ".31em");

    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("fill", "none")
  .style("pointer-events", "all")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.TimeDigits > d1.TimeDigits - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.TimeDigits) + "," + y(d.Quantity) + ")");
      focus.select("text").text(function() { return d.Quantity; });
      focus.select(".x-hover-line").attr("y2", height - y(d.Quantity));
      focus.select(".y-hover-line").attr("x2", width + width);
    }
});
}


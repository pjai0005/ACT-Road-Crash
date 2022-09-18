function DrawLine(data) {
    d3.select("#line_graph svg").remove();
    // set the dimensions and margins of the graph
    var margin = { top: 40, right: 30, bottom: 80, left: 60 },
        width = 660 - margin.left - margin.right,
        height = 640 - margin.top - margin.bottom;
    tooltip = { width: 100, height: 100, x: 10, y: -30 };

    // append the svg object to the body of the page
    var svg = d3.select("#line_graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("#line_graph").append("div")
        .attr("class", "tooltip");

    // Add X axis --> it is a date format

    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.key; }))
        .padding(0.2);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return +d.value; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d.key) })
            .y(function (d) { return y(d.value) })
        )

    svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.key); })
        .attr("cy", function (d) { return y(d.value); })
        .attr("r", 5.5)
        .style("fill", "#69b3a2")
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("<strong>" + d.key + "</strong>" + "<br/>" + "Accidents : " + (d.value))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0);
        })
    // text label for the x axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Year");
    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("No of accidents");

}
function ClearBar(data) {
    d3.select("#line_graph svg").remove();
}
function DrawMap(data) {
    //Width and height
    var w = 850;
    var h = 700;

    //Define map projection
    var projection = d3.geoMercator()
        .center([149.12, -35.50])
        .translate([w / 2, h / 2])
        .scale(35000);

    //Define path generator
    var path = d3.geoPath()
        .projection(projection);

    //Create SVG
    var svg = d3.select("#svganchor")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    // Define Tooltip
    var tooltip = d3.select("#svganchor").append("div")
        .attr("class", "tooltip")
    //Load in GeoJSON data
    d3.json("https://raw.githubusercontent.com/pjai0005/ACT-Road-Accident-Data/main/act.json", function (json) {
        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", function (d, i) {
                return '#ADDCC9'
            });

        svg.selectAll("circle")
            .data(data).enter().append("circle")
            .attr("id", function(d){
                return d.key.replace(/ /g,'');
            })
            .attr("cx", function (d, i) {
                var coordinates = projection([+d.value.lon, +d.value.lat]);
                return coordinates[0];
            })
            .attr("cy", function (d, i) {
                var coordinates = projection([+d.value.lon, +d.value.lat]);
                return coordinates[1];
            })
            .attr("r", function (d, i) {
                return d.value.length/90;
            })
            .style("fill", "#DB6557")
            .style("opacity", 0.5)
            .attr("stroke", "dimgray")
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("<strong>" + d.key + "</strong>" + "<br/>" + "Accidents : " + (d.value.length))
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);

           
            })
            .on("click", function (d) {
                d3.selectAll("circle").style("fill", "#DB6557");
                d3.select(this).style("fill", "#60698A");
                LineGraphUpdate(d.key);      
            });
    });
}
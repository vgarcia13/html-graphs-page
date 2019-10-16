var dataset = [
    {name: 'Tablet', percent: 60},
    {name: 'Smartphone', percent: 40}
];

var dataset2 = [
    {name: 'Tablet', percent: 40},
    {name: 'Smartphone', percent: 60}
];

var dataset3 = [
    {name: 'Tablet', percent: 80},
    {name: 'Smartphone', percent: 20}
];

var pie = d3.layout.pie()
    .value(function (d) {
        return d.percent
    })
    .sort(null)
    .padAngle(.03);

var w = 200, h = 450;

var outerRadius = w / 2;
var innerRadius = 92;

var color = d3.scale.ordinal().range(["#1f77b4", "#aec7e8"]);
var color2 = d3.scale.ordinal().range(["#ff7f0e", "#ffbb78"]);
var color3 = d3.scale.ordinal().range(["#2ca02c", "#98df8a"]);

var title = ['Revenue', '$200.000'];
var title2 = ['Impresions', '45.000.000'];
var title3 = ['Visits', '30.000.000'];

var arc = d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

generateGraph(1, dataset, color, title);
generateGraph(2, dataset2, color2, title2);
generateGraph(3, dataset3, color3, title3);

function generateGraph(id, data, color, title) {
    var svg = d3.select("#chart" + id)
        .append("svg")
        .attr({
            width: w,
            height: h
        }).append('g')
        .attr({
            transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
        });
    var path = svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr({
            d: arc,
            fill: function (d, i) {
                return color(d.data.name);
            }
        });

    path.transition()
        .duration(1000)
        .attrTween('d', function (d) {
            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function (t) {
                return arc(interpolate(t));
            };
        });


    var restOfTheData = function () {
        var text = svg.selectAll('text')
            .data(pie(dataset))
            .enter()
            .append("text")
            .transition()
            .duration(200)
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            });

        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g');

         legend.append('text')
            .attr("text-anchor", "middle")
		    .attr('font-size', '25px')
            .attr('font-weight', '100')
		    .attr('y', 0)
            .attr('fill', 'white')
	        .text(title[0]);

        legend.append('text')
            .attr("text-anchor", "middle")
		    .attr('font-size', '30px')
		    .attr('y', 30)
            .attr('fill', 'white')
	        .text(title[1]);

        legend.append('text')
            .attr("text-anchor", "middle")
		    .attr('font-size', '20px')
            .attr('font-weight', '300')
            .attr('x', 0)
		    .attr('y', 130)
            .attr('fill', color.range()[0])
	        .text(data[0].name);

        legend.append('text')
            .attr("text-anchor", "middle")
		    .attr('font-size', '20px')
            .attr('font-weight', '100')
            .attr('x', 0)
		    .attr('y', 150)
            .attr('fill', 'white')
	        .text(data[0].percent + '%');

        legend.append('text')
            .attr("text-anchor", "middle")
		    .attr('font-size', '20px')
            .attr('font-weight', '300')
            .attr('x', 0)
		    .attr('y', 200)
            .attr('fill', color.range()[1])
	        .text(data[1].name);

        legend.append('text')
            .attr("text-anchor", "middle")
		    .attr('font-size', '20px')
            .attr('font-weight', '100')
            .attr('x', 0)
		    .attr('y', 220)
            .attr('fill', 'white')
	        .text(data[1].percent + '%');
    };
    setTimeout(restOfTheData, 1000);
}


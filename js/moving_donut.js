d3.select("input[value=\"opt1\"]").property("checked", true);

var svg = d3.select("#chart")
    .append("div")
    .classed("svg-container", true) // container class to make it responsive
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 450")
    .classed("svg-content-responsive", true)
    .append("g");

svg.append("g")
    .attr("class", "slices");
svg.append("g")
    .attr("class", "labelName");
svg.append("g")
    .attr("class", "labelValue");
svg.append("g")
    .attr("class", "lines");

var width = 960,
    height = 450,
    radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d.value;
    });

var arc = d3.svg.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

var legendRectSize = (radius * 0.05);
var legendSpacing = radius * 0.02;


var div = d3.select("#chart").append("div").attr("class", "toolTip");

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var colorRange = d3.scale.category20();
var color = d3.scale.ordinal()
    .range(colorRange.range());


var dataset1 = [
    { label: "SC", value: 42 },
    { label: "UC", value: 32 },
    { label: "NA", value: 29 },
    { label: "WYS", value: 27 },
    { label: "LWS", value: 26 },
    { label: "CC", value: 19 },
    { label: "MC", value: 12 },
    { label: "SHHO", value: 12 },
    { label: "CWC", value: 8 },
];

var datasetOption1 = [
    { label: "Category 1", value: 10 },
    { label: "Category 2", value: 33 },
    { label: "Category 3", value: 4 },
    { label: "Category 4", value: 8 },
    { label: "Category 5", value: 34 },
    { label: "Category 6", value: 0 },
    { label: "Category 7", value: 2 },
    { label: "Category 8", value: 7 },
    { label: "Category 9", value: 12 },

];

var datasetOption2 = [
    { label: "Category 1", value: 10 },
    { label: "Category 2", value: 14 },
    { label: "Category 3", value: 27 },
    { label: "Category 4", value: 5 },
    { label: "Category 5", value: 5 },
    { label: "Category 6", value: 23 },
    { label: "Category 7", value: 7 },
    { label: "Category 8", value: 6 },
    { label: "Category 9", value: 3 },

];

change(dataset1);


d3.selectAll("input")
    .on("change", selectDataset);

function selectDataset() {
    var value = this.value;
    if (value == "opt1") {
        change(dataset1);
    } else if (value == "opt2") {
        change(datasetOption1);
    } else if (value == "opt3") {
        change(datasetOption2);
    }
}

function change(data) {

    /* ------- PIE SLICES -------*/
    var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(data), function(d) {
            return d.data.label
        });

    slice
        .enter()
        .insert("path")
        .style("fill", function(d) {
            return color(d.data.label);
        })
        .attr("class", "slice");

    slice
        .transition().duration(1000)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        });

    slice
        .on("mousemove", function(d) {
            div.style("left", d3.event.pageX + 10 + "px");
            div.style("top", d3.event.pageY - 25 + "px");
            div.style("display", "inline-block");
            div.html((d.data.label) + "<br>" + (d.data.value) + "%");
        });

    slice
        .on("mouseout", function(d) {
            div.style("display", "none");
        });

    slice.exit()
        .remove();
/*
    var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = height * color.domain().length / 2;
            var horz = -3 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        });

    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) {
            return d;
        });*/

    /* ------- TEXT LABELS -------*/

    var text = svg.select(".labelName").selectAll("text")
        .data(pie(data), function(d) {
            return d.data.label
        });

    text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d) {
            return (d.data.label + ": " + d.value + "%");
        });

    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text
        .transition().duration(1000)
        .attrTween("transform", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate(" + pos + ")";
            };
        })
        .styleTween("text-anchor", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start" : "end";
            };
        })
        .text(function(d) {
            return (d.data.label + ": " + d.value + "%");
        });


    text.exit()
        .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(data), function(d) {
            return d.data.label
        });

    polyline.enter()
        .append("polyline");

    polyline.transition().duration(1000)
        .attrTween("points", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();
};

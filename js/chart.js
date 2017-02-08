(function(d3) {

    var chart1 = c3.generate({
        bindto: '#chart1',
        data: {
            columns: [
                ['SC', 42],
                ['UC', 32],
                ['NA', 29],
                ['WYS', 27],
                ['LWS', 26],
                ['CC', 19],
                ['MC', 12],
                ['SHHO', 12],
                ['CWC', 8]
            ],
            type: 'donut',
            onclick: function(d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function(d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function(d, i) {
                console.log("onmouseout", d, i);
            }
        },
        donut: {
            title: "단위: 명"
        },
        tooltip: {
            format: {
                value: function(value, ratio, id) {
                    var format = d3.format(',');
                    return format(value);
                }
            }
        }
    });

    var chart2 = c3.generate({
        bindto: '#chart2',
        data: {
            columns: [
                ['Business', 93],
                ['Social Science', 85],
                ['Engineering', 18],
                ['Others', 13]
            ],
            type: 'donut',
            onclick: function(d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function(d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function(d, i) {
                console.log("onmouseout", d, i);
            }
        },
        donut: {
            title: "단위: 명"
        },
        tooltip: {
            format: {
                value: function(value, ratio, id) {
                    var format = d3.format(',');
                    return format(value);
                }
            }
        }
    });

    var chart3 = c3.generate({
        bindto: '#chart3',
        data: {
            columns: [
                ['재학생', 119],
                ['휴학생', 53],
                ['졸업생', 26],
                ['기타', 11]
            ],
            type: 'donut',
            onclick: function(d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function(d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function(d, i) {
                console.log("onmouseout", d, i);
            }
        },
        donut: {
            title: "단위: 명"
        },
        tooltip: {
            format: {
                value: function(value, ratio, id) {
                    var format = d3.format(',');
                    return format(value);
                }
            }
        }
    });

})(window.d3);

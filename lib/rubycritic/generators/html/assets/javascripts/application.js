var COLOR = {
                'A' : '#00B50E',
                'B': '#53D700',
                'C': '#FDF400',
                'D': '#FF6C00',
                'F': '#C40009'
            };

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});


$("#churn-vs-complexity-graph-container").highcharts({
    chart: {
        type: "scatter",
        zoomType: "xy"
    },
    title: {
        text: "Churn vs Complexity"
    },
    xAxis: {
        title: {
            enabled: true,
            text: "Churn"
        },
        floor: 0,
        startOnTick: true,
        endOnTick: true
    },
    yAxis: {
        title: {
            text: "Complexity"
        },
        floor: 0,
        startOnTick: true,
        endOnTick: true
    },
    plotOptions: {
        series: {
            turboThreshold: 1500
        },
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: "rgb(100,100,100)"
                    }
                }
            },
            tooltip: {
                headerFormat: "<b>{point.key}</b><br>",
                pointFormat: "Committed {point.x} times, with Flog score of {point.y}"
            }
        }
    },
    series: [{
        showInLegend: false,
        color: "steelblue",
        data: getMappedTurbulenceData()
    }]
});

function getMappedTurbulenceData(){
    var dataWithColorInformation = turbulenceData.map(function(data){
        data.color = COLOR[data.rating];
        return data;
    });
    return dataWithColorInformation;
};

$(function() {
    var chart = new Highcharts.Chart({
    chart: {
        renderTo: 'gpa-chart',
        type: 'pie'
    },
    title: {
        text: 'Grade Point Average'
    },
    plotOptions: {
        pie: {
            shadow: false
        }
    },
    tooltip: {
        formatter: function() {
            return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
        }
    },
    series: [{
        name: 'Browsers',
        data: getGpaData(),
        size: '90%',
        innerSize: '65%',
        showInLegend:true,
        dataLabels: {
            enabled: false
        }
    }]}
    ,
    function(chart) { // on complete
        var textX = chart.plotLeft + (chart.plotWidth  * 0.5);
        var textY = chart.plotTop  + (chart.plotHeight * 0.5);
        var span = '<span id="pieChartInfoText" style="position:absolute; text-align:center;">';
        span += '<span style="font-size: 32px">'+((score/100)*4).toFixed(2)+'</span><br>';
        span += '<span style="font-size: 16px">GPA</span>';
        span += '</span>';

        $("#addText").append(span);
        span = $('#pieChartInfoText');
        span.css('left', 180);
        span.css('top', 185);
    }
    );
});
function getGpaData(){
    var ratingACount = getRatingWiseCount("A");
    var ratingBCount = getRatingWiseCount("B");
    var ratingCCount = getRatingWiseCount("C");
    var ratingDCount = getRatingWiseCount("D");
    var ratingFCount = getRatingWiseCount("F");
    var total = ratingACount + ratingBCount + ratingCCount + ratingDCount + ratingFCount;
    return [
            {name: 'A', y: parseFloat(calculatePercentage(ratingACount, total).toFixed(2)), color: COLOR['A']},
            {name: 'B', y: parseFloat(calculatePercentage(ratingBCount, total).toFixed(2)), color: COLOR['B']},
            {name: 'C', y: parseFloat(calculatePercentage(ratingCCount, total).toFixed(2)), color: COLOR['C']},
            {name: 'D', y: parseFloat(calculatePercentage(ratingDCount, total).toFixed(2)), color: COLOR['D']},
            {name: 'F', y: parseFloat(calculatePercentage(ratingFCount, total).toFixed(2)), color: COLOR['F']},
            ];
};

function calculatePercentage(gradeCount, total){
    return (gradeCount/total)*100;
};

function getRatingWiseCount(rating){
    var count = 0;
    turbulenceData.forEach(function(data, index){
        if(data.rating === rating){
            count++;
        }
    });
    return count;
};

$('#ratingAfileCount').text(getRatingWiseCount("A"));
$('#ratingBfileCount').text(getRatingWiseCount("B"));
$('#ratingCfileCount').text(getRatingWiseCount("C"));
$('#ratingDfileCount').text(getRatingWiseCount("D"));
$('#ratingFfileCount').text(getRatingWiseCount("F"));

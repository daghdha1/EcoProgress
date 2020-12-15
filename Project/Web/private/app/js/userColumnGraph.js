var optionsColumn = {
    series: [],
    chart: {
        type: 'bar',
        height: 300
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        type: 'datetime',
        categories: [],
        tickAmount: 10,
        labels: {
            formatter: function (value, timestamp, opts) {
                return timeConverter(timestamp);
            }
        }
    },
    yaxis: {
        title: {
            text: 'CO (ppm)'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "CO: " + val + " ppm"
            }
        }
    }
};
var columnChart = new ApexCharts(document.querySelector("#columnChart"), optionsColumn);
columnChart.render();
fetch(config.restDir + '/measures').then((response) => {
    return response.json()
}).then((data) => {
    convertAndUpdateData(data);
});

function convertAndUpdateData(measures) {
    var parsedData = {
        name: "CO",
        data: []
    };
    //console.log("USER COLUMN GRAPH", measures);
    for (var i = 0; i < measures.length; i++) {
        var myDate = new Date(measures[i].timestamp * 1000);
        parsedData.data.push({
            x: parseInt(measures[i].timestamp),
            y: measures[i].value
        });
    } //for
    columnChart.updateSeries([parsedData]);
}
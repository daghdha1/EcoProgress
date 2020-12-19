window.Apex = {
    chart: {
        foreColor: '#36345fff',
        toolbar: {
            show: false
        },
    },
    colors: ['#422e65', '#1a5979', '#008ba3', '#6f2279'],
    stroke: {
        width: 3
    },
    stacked: true,
    fill: {
        type: 'gradient',
        gradient: {
            type: "vertical",
            gradientToColors: ['#682172ff', '#09728aff', '#2d4066ff']
        },
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        theme: 'dark'
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    grid: {
        borderColor: "#d4d4d4",
        xaxis: {
            lines: {
                show: false
            }
        }
    }
};
//******************************************************************
// Funciones para generar datos aleatorios
//******************************************************************
var trigoStrength = 3
var iteration = 11

function getRandom() {
    var i = iteration;
    return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
}

function getRangeRandom(yrange) {
    return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))
        series.push([x, y]);
        baseval += 300000;
        i++;
    }
    return series;
}

function getNewData(baseval, yrange) {
    var newTime = baseval + 300000;
    return {
        x: newTime,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    }
}
//*****************************************************************************************************************************
//*****************************************************************************************************************************
//*****************************************************************************************************************************
//*****************************************************************************************************************************
//COLUMNS
//*****************************************************************************************************************************
//*****************************************************************************************************************************
var optionsColumn = {
    series: [{
        name: 'Distancia recorrida',
        data: [44, 55, 57, 56, 61, 58, 63]
    }],
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'flat'
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
        categories: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    },
    yaxis: {
        title: {
            text: 'Distancia recorrida'
        }
    },
    fill: {
        type: 'solid',
        colors: '#007d93'
    },
    tooltip: {
        y: {
            formatter: function(val) {
                return val + " Km"
            }
        }
    }
};
var chartColumn = new ApexCharts(document.querySelector("#columnchart"), optionsColumn);
chartColumn.render()
//*****************************************************************************************************************************
//*****************************************************************************************************************************
//SPARKS
//*****************************************************************************************************************************
//*****************************************************************************************************************************
var spark1 = {
    chart: {
        id: 'spark1',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 20,
            bottom: 10,
            left: 110
        }
    },
    colors: ['#fff'],
    fill: {
        type: 'solid'
    },
    tooltip: {
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}
var spark2 = {
    chart: {
        id: 'spark2',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
    }],
    stroke: {
        curve: 'smooth'
    },
    grid: {
        padding: {
            top: 20,
            bottom: 10,
            left: 110
        }
    },
    markers: {
        size: 0
    },
    colors: ['#fff'],
    fill: {
        type: 'solid'
    },
    tooltip: {
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}
var spark3 = {
    chart: {
        id: 'spark3',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 20,
            bottom: 10,
            left: 110
        }
    },
    colors: ['#fff'],
    fill: {
        type: 'solid'
    },
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        x: {
            show: true
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}
var spark4 = {
    chart: {
        id: 'spark4',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2,
        }
    },
    series: [{
        data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
    }],
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 0
    },
    grid: {
        padding: {
            top: 20,
            bottom: 10,
            left: 110
        }
    },
    colors: ['#fff'],
    fill: {
        type: 'solid'
    },
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        x: {
            show: true
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return '';
                }
            }
        }
    }
}
new ApexCharts(document.querySelector("#spark1"), spark1).render();
new ApexCharts(document.querySelector("#spark2"), spark2).render();
new ApexCharts(document.querySelector("#spark3"), spark3).render();
new ApexCharts(document.querySelector("#spark4"), spark4).render();
var optionsLines = {
    series: [{
        name: 'CO',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    chart: {
        height: 350,
        type: 'line',
    },
    stroke: {
        width: 7,
        curve: 'smooth'
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    title: {
        text: 'CO',
        align: 'left',
        style: {
            fontSize: "16px",
            color: '#666'
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [{
                offset: 10,
                color: "#682172ff",
                opacity: 1
            }, {
                offset: 40,
                color: "#562a69ff",
                opacity: 1
            }, {
                offset: 60,
                color: "#09728aff",
                opacity: 1
            }, {
                offset: 100,
                color: "#007d93ff",
                opacity: 1
            }]
        }
    },
    markers: {
        size: 4,
        colors: ["#00a0bc"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
            size: 7,
        }
    },
    yaxis: {
        min: 0,
        max: 100,
        title: {
            text: 'PPM',
        },
    }
};
var chartLine = new ApexCharts(document.querySelector("#linechart"), optionsLines);
chartLine.render()
///////////////////////////////////////////////////////////////////
var optionsCircle = {
    chart: {
        type: 'radialBar',
        height: 320,
        offsetY: -30,
        offsetX: 20
    },
    plotOptions: {
        radialBar: {
            size: undefined,
            inverseOrder: false,
            hollow: {
                margin: 5,
                size: '48%',
                background: 'transparent',
            },
            track: {
                show: true,
                background: '#40475D',
                strokeWidth: '10%',
                opacity: 1,
                margin: 3, // margin is in pixels
            },
        },
    },
    series: [71, 63],
    labels: ['Personalizado 1', 'Personalizado 2'],
    legend: {
        show: true,
        position: 'left',
        offsetX: -30,
        offsetY: 10,
        formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex] + '%'
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
    }
}
var chartCircle = new ApexCharts(document.querySelector('#circlechart'), optionsCircle);
//chartCircle.render();
var optionsArea = {
    series: [{
        name: 'CO',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'NO2',
        data: [11, 32, 45, 32, 34, 52, 41]
    }, {
        name: 'SO2',
        data: [63, 32, 15, 02, 34, 25, 31]
    }, {
        name: 'O3',
        data: [51, 37, 20, 5, 67, 34, 86]
    }],
    chart: {
        height: 300,
        type: 'area'
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: 0.1,
    },
    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    },
};
var chartArea = new ApexCharts(document.querySelector("#areachart"), optionsArea);
chartArea.render();
window.setInterval(function() {
    iteration++;
    /* chartColumn.updateSeries([{
      data: [...chartColumn.w.config.series[0].data,
        [
          chartColumn.w.globals.maxX + 300000,
          getRandom()
        ]
      ]
    }])
  */
    /*chartCircle.updateSeries([getRangeRandom({
      min: 10,
      max: 100
    }), getRangeRandom({
      min: 10,
      max: 100
    })])*/
}, 3000);
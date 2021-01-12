//*****************************************************************************************************************************
//*****************************************************************************************************************************
//SPARKS
//*****************************************************************************************************************************
//*****************************************************************************************************************************
// Fill function in case fetch fails.
function getcoData() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
var minico = {
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
        data: getcoData()
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
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return 'PPM: ';
                }
            }
        }
    }
}
var minino2 = {
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
        data: randomDataArray()
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
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return 'PPM: ';
                }
            }
        }
    }
}
var miniso2 = {
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
        data: randomDataArray()
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
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return 'PPM: ';
                }
            }
        }
    }
}
var minio3 = {
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
        data: randomDataArray()
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
            show: false
        },
        y: {
            title: {
                formatter: function formatter(val) {
                    return 'PPM: ';
                }
            }
        }
    }
}
var minicoGrafica = new ApexCharts(document.querySelector("#minico"), minico);
var minino2Grafica = new ApexCharts(document.querySelector("#minino2"), minino2);
var miniso2Grafica = new ApexCharts(document.querySelector("#miniso2"), miniso2);
var minio3Grafica = new ApexCharts(document.querySelector("#minio3"), minio3);
minicoGrafica.render();
minino2Grafica.render();
miniso2Grafica.render();
minio3Grafica.render();
/*
getMeasuresFromTimestamp((data) => {
    var last10Data = [];
    if (data != null && data.length > 10) {
        for (var i = 0; i < 10; i++) {
            last10Data.push(parseInt(data[i].value));
        }
        minicoGrafica.updateSeries([{
            data: last10Data
        }])
    }
}, localStorage.getItem("mail"), "month")
*/
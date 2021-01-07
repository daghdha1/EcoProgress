//*****************************************************************************************************************************
//*****************************************************************************************************************************
//Grafico de lineas
//*****************************************************************************************************************************
//*****************************************************************************************************************************
// Fill function in case fetch fails.
function getcoData() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
var optionsLines = {
    series: [{
        name: 'CO',
        data: getcoData()
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
        labels: {
            show: false
        }
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
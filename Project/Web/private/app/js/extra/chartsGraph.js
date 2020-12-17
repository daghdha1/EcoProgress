'use strict';
var optionsLines = {
    series: [{
        name: 'CO',
        data: []
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
        type: 'datetime',
        categories: [],
        tickAmount: 10,
        labels: {
            formatter: function(value, timestamp, opts) {
                return timeConverter(timestamp);
            }
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
var lineChart = new ApexCharts(document.querySelector("#lineChart"), optionsLines);
lineChart.render();
getData();
setInterval(getData, 3000);

function getData() {
    fetch(config.restDir + '/measures').then((response) => {
        return response.json()
    }).then((data) => {
        data = data.reverse();
        convertAndUpdateDataLine(data);
        populateTable(data);
    });
}
//*****************************************************************
//Primero vamos a obtener las fechas en epoch y convertirlas en LocaleString para poder utilizarlas en el gráfico.
//Despues, actualizaremos el gráfico  
function convertAndUpdateDataLine(measures) {
    var newData = {
        data: []
    };
    for (var i = 0; i < measures.length; i++) {
        var myDate = new Date(measures[i].timestamp * 1000);
        newData.data.push({
            x: parseInt(measures[i].timestamp),
            y: measures[i].value
        });
    } //for
    lineChart.updateSeries([newData]);
}

function populateTable(data) {
    var table = document.querySelector("#tablaMedidas").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        var tr = table.insertRow(-1);
        var valorCell = tr.insertCell(-1);
        valorCell.innerHTML = data[i].value;
        var momentoCell = tr.insertCell(-1);
        momentoCell.innerHTML = data[i].timestamp;
        var lugarCell = tr.insertCell(-1);
        lugarCell.innerHTML = data[i].location.latitude + "," + data[i].location.longitude;
        var sensorCell = tr.insertCell(-1);
        sensorCell.innerHTML = data[i].sensorID;
    }
}
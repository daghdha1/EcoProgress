// Se guardan en la variable window (que funciona de global)
// las opciones que son compartidas generalmente entre los graficos
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
            type: "horizontal",
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

getMeasuresFromTimestamp((data) => {
    //populateColumchart(getFakeData()) // later it'll be data from fetch
    //populateLinechart(data);
    //populateMinicharts(data);
}, sessionStorage.getItem("mail"), "month")

function populateMinicharts(data) {
    var last10Data = [];
    if (data != null && data.length > 10) {
        for (var i = 0; i < 10; i++) {
            last10Data.push(parseInt(data[i].value));
        }
        //console.log("Last 10->", last10Data);
        minicoGrafica.updateSeries([{
            data: last10Data
        }])
    }
}

function populateLinechart(data) {
    var parsedData = []
    var parsedTimestamps = []
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            parsedData.push(parseInt(data[i].value));
            parsedTimestamps.push(timeConverter(data[i].timestamp))
        }
        chartLine.updateOptions({
            series: [{
                data: parsedData
            }],
            xaxis: {
                categories: parsedTimestamps
            }
        })
    }
}

function populateColumchart(data) {
    let parsedData = []
    let days = []
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            parsedData.push(data[i].distance);
            days.push(data[i].date)
        }
        chartColumn.updateOptions({
            series: [{
                data: parsedData
            }],
            xaxis: {
                categories: days
            }
        })
    }
}
//va a recibir un array de objetos. Cada objeto va a estar formado por un día y la distancia recorrida
function getFakeData() {
    let fakeData = [{
        date: "01/01/2021",
        distance: 5.5
    }, {
        date: "02/01/2021",
        distance: 10.04
    }, {
        date: "03/01/2021",
        distance: 10.9
    }, {
        date: "04/01/2021",
        distance: 7.9
    }, {
        date: "05/01/2021",
        distance: 4.7
    }];
    return fakeData;
}
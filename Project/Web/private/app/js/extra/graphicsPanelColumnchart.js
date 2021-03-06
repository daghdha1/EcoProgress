//*****************************************************************************************************************************
//*****************************************************************************************************************************
//Grafico de columnas
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
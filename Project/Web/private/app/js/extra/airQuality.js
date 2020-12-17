GetDataForGraphicsBar();
/*
 * Obtención de valores en mg/m3 de calidad del aire del usuario activo para el rosco gráfico
 * 
 *                   GetDataForGraphicsBar() <--
 * <-- Lista<R>
 */
function GetDataForGraphicsBar() {
    let airQualitysPromiseList = [];
    airQualitysPromiseList.push(InitRequestLastMeasure());
    airQualitysPromiseList.push(InitRequestLastHourMeasures());
    airQualitysPromiseList.push(InitRequestLastDayMeasures());
    Promise.all(airQualitysPromiseList).then((response) => {
        populateGraph(response);
    }).catch(error => console.log("Error in promises ${error}"));
}

function InitRequestLastMeasure() {
    return new Promise((resolve, reject) => {
        getLastMeasure((dataReceived) => {
            let airQuality = -1;
            if (dataReceived != null) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, "daghdha@developer.com");
    });
}

function InitRequestLastHourMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived != null) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, "daghdha@developer.com", "hour");
    });
}

function InitRequestLastDayMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived != null) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, "daghdha@developer.com", "day");
    });
}

function InitRequestLastWeekMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived != null) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, "daghdha@developer.com", "week");
    });
}

function InitRequestLastMonthMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived != null) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, "daghdha@developer.com", "month");
    });
}
// DONT USE IT (IN PROGRESS)
function InitRequestMyCustomMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived != null) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, "daghdha@developer.com", "153923022-162828823");
    });
}
/*
 * Calcular la media de las medidas recibidas
 * 
 * Lista<Measure> --> 
 *                       calculateAirQuality() <--
 * <-- gasValue:R
 */
function calculateAirQuality(measureList) {
    let result = 0;
    measureList.forEach(measure => {
        result += parseFloat(measure.value);
    });
    result /= measureList.length;
    return result;
}
//********************************************************************
//************************* GRAPHIC BARS *****************************
//********************************************************************
'use strict';
var elementoQueBuscar = "cardOfGraphs";
var idQueBuscar = "chart";
var myElement = document.getElementById(elementoQueBuscar);
var listaIds = myElement.querySelectorAll('*[id]');
//console.log("Lista ids sin filtrar:",listaIds);
/*
 * Rellena el rosco gráfico de medidas de calidad del aire
 * 
 * Lista<gasValue:R> --> 
 *                       populateGraph() <--
 * 
 */
function populateGraph(valueList) {
    var options = {
        series: getPercentagesFromValues(valueList),
        chart: {
            height: '110%',
            type: 'radialBar',
        },
        colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        show: true,
                        fontSize: '12px',
                        formatter: function(val) {
                            return getLabelsFromPercentage(val)
                        }
                    },
                    total: {
                        show: true,
                        label: 'Gas',
                        formatter: function(w) {
                            return "CO"
                        }
                    }
                }
            }
        },
        labels: ['Diaria', 'Horaria', 'Actual'],
    };
    var chartCo = new ApexCharts(document.querySelector("#coChart"), options);
    chartCo.render();
}
/*
 * Obtiene los pocentajes a mostrar de los valores calculados de calidad del aire
 * 
 * Lista<gasValue:R> --> 
 *                        getPercentagesFromValues() <--
 * <-- Lista<N>
 */
function getPercentagesFromValues(valueList) {
    // valor minimo son 0ppm y el maximo 70ppm
    let min = 0;
    let max = 70;
    let maxPercent = 100;
    let percentList = [];
    for (var i = 0; i < valueList.length; i++) {
        if (valueList[i] != -1) {
            let percent = valueList[i] * maxPercent / max;
            let formatPercent = Math.round((percent + Number.EPSILON) * 100) / 100;
            percentList[i] = formatPercent > 100 ? 100 : formatPercent;
        } else {
            percentList[i] = 0;
        }
    }
    return percentList;
}
/*
 * Obtiene los labels a mostrar de cada barra gráfica
 * 
 * R --> 
 *           getLabelsFromPercentage() <--
 * <-- R
 */
function getLabelsFromPercentage(percent) {
    // valor minimo son 0ppm y el maximo 70ppm
    let min = 0;
    let max = 70;
    let maxPercent = 100;
    if (percent != 0) {
        let label = percent * max / maxPercent;
        return label + " ppm";
    }
    return "No hay datos";
}
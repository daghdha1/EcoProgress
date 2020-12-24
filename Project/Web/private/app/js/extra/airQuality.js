GetDataForGraphicsBar();
/*
 * Obtención de valores en mg/m3 de calidad del aire del usuario activo para el rosco gráfico
 * 
 *                   GetDataForGraphicsBar() <--
 * <-- Lista<R>
 */
function GetDataForGraphicsBar() {
    let airQualitysPromiseList = []; // [day,hour,last]
    airQualitysPromiseList.push(InitRequestLastDayMeasures());
    airQualitysPromiseList.push(InitRequestLastHourMeasures());
    airQualitysPromiseList.push(InitRequestLastMeasure());
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
/*
 * Rellena el rosco gráfico de medidas de calidad del aire
 * 
 * Lista<gasValue:R> --> 
 *                       populateGraph() <--
 * 
 */
function populateGraph(valueList) {
    valueList = [4.89, 69.5, 78];
    var options = {
        series: getPercentagesFromValues(valueList),
        labels: ['Diaria', 'Horaria', 'Última'],
        chart: {
            height: '190%',
            width: '100%',
            type: 'radialBar',
            fontFamily: 'CenturyGothic',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 3000,
                dynamicAnimation: {
                    enabled: true,
                    speed: 1500
                }
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                dataLabels: {
                    show: true,
                    name: {
                        show: true,
                        color: myColors.soft_black,
                        offsetY: -55,
                    },
                    value: {
                        show: true,
                        fontSize: '18px',
                        color: myColors.blue_sapphire,
                        offsetY: -20,
                        formatter: function(val) {
                            return getLabelsFromPercentage(val)
                        }
                    },
                    total: {
                        show: true,
                        label: 'CO',
                        color: myColors.soft_black,
                        fontSize: '27px',
                        formatter: function(w) {
                            return ""
                        }
                    }
                }
            }
        },
        fill: {
            colors: applyColorBarByValue(valueList),
            opacity: 0.9,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.3,
                gradientToColors: applyGradientToColorsByValue(valueList),
                inverseColors: false,
                opacityFrom: 0.9,
                opacityTo: 1,
                stops: [0, 100],
                colorStops: []
            }
        }
    };
    let chartCo = new ApexCharts(document.querySelector("#coChart"), options);
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
            percentList[i] = formatPercent >= 100 ? 100 : formatPercent;
        } else {
            percentList[i] = 100;
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

function applyColorBarByValue(dataList) {
    colorList = [];
    dataList.forEach(function(val) {
        switch (true) {
            case val >= 0:
                colorList.push(myColors.artic_blue);
                break;
            default:
                colorList.push(myColors.soft_grey);
        }
    });
    return colorList;
}

function applyGradientToColorsByValue(dataList) {
    colorList = [];
    dataList.forEach(function(val) {
        switch (true) {
            case val > 60:
                colorList.push(myColors.eminence);
                break;
            case val > 40:
                colorList.push(myColors.space_cadet);
                break;
            case val > 20:
                colorList.push(myColors.blue_sapphire);
                break;
            case val >= 0:
                colorList.push(myColors.metallic_seaweed);
                break;
            default:
                colorList.push(myColors.soft_grey);
        }
    });
    return colorList;
}
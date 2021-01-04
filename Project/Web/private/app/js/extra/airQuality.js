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
        }, "test@test");
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
        }, "test@test", "hour");
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
        }, "test@test", "day");
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
        }, "test@test", "week");
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
        }, "test@test", "month");
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
        }, "test@test", "153923022-162828823");
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

    console.log(measureList)
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
    //valueList = [-1, 43.5, 16.4];
    var options = {
        series: getPercentagesFromValues(valueList),
        labels: ['Diaria', 'Horaria', 'Actual'],
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
            colors: getColorBarByValue(valueList),
            opacity: 0.9,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "horizontal",
                shadeIntensity: 0.3,
                gradientToColors: getGradientToColorsByValue(valueList),
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
            let formatPercent = Math.round(percent * 100) / 100;
            percentList[i] = formatPercent >= 100 ? 100 : formatPercent;
        } else {
            percentList[i] = 101; // 101 for non data
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
    // Valor mínimo son 0ppm y el maximo 70ppm
    let min = 0;
    let max = 70;
    let maxPercent = 100;
    if (percent != 101) {
        let label = percent * max / maxPercent;
        let formatLabel = Math.round(label * 100) / 100;
        return formatLabel + " ppm";
    }
    return "No hay datos";
}
/*
 * Obtiene los colores de las barras iniciales dependiendo de si hay datos o no (>=0 || -1)
 * 
 * Lista<gasValue:R> -->  
 *                              getColorBarByValue() <--
 * <-- Lista<colors:Texto>
 */
function getColorBarByValue(valueList) {
    colorList = [];
    valueList.forEach(function(val) {
        switch (true) {
            case val >= 0:
                colorList.push(myColors.soft_metallic_seaweed);
                break;
            default:
                colorList.push(myColors.soft_grey);
        }
    });
    return colorList;
}
/*
 * Obtiene los gradientes de color de las barras dependiendo del valor dado
 * 
 * Lista<gasValue:R> -->  
 *                              getGradientToColorsByValue() <--
 * <-- Lista<colors:Texto>
 */
function getGradientToColorsByValue(valueList) {
    colorList = [];
    valueList.forEach(function(val) {
        switch (true) {
            case val >= 50:
                colorList.push(myColors.eminence);
                break;
            case val >= 30:
                colorList.push(myColors.space_cadet);
                break;
            case val >= 15:
                colorList.push(myColors.blue_sapphire);
                break;
            case val >= 7:
                colorList.push(myColors.metallic_seaweed);
                break;
            case val >= 0:
                colorList.push(myColors.soft_metallic_seaweed);
                break;
            default:
                colorList.push(myColors.soft_grey);
        }
    });
    return colorList;
}
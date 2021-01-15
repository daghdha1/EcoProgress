getDataAndUpdateGraph("btn_co");
configBtnsGases();

function initRequestLastMeasure() {
    return new Promise((resolve, reject) => {
        getLastMeasure((dataReceived) => {
            let airQuality = -1;
            if (dataReceived.length > 0) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, localStorage.getItem(("mail")));
    });
}

function initRequestLastHourMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived.length > 0) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, localStorage.getItem(("mail")), "hour");
    });
}

function initRequestLastDayMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived.length > 0) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, localStorage.getItem(("mail")), "day");
    });
}

function initRequestLastWeekMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived.length > 0) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, localStorage.getItem(("mail")), "week");
    });
}

function initRequestLastMonthMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived.length > 0) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, localStorage.getItem(("mail")), "month");
    });
}
// DONT USE IT (IN PROGRESS)
function initRequestMyCustomMeasures() {
    return new Promise((resolve, reject) => {
        getMeasuresFromTimestamp((dataReceived) => {
            let airQuality = -1;
            if (dataReceived.length > 0) {
                airQuality = calculateAirQuality(dataReceived);
            }
            resolve(airQuality);
        }, localStorage.getItem(("mail")), "153923022-162828823");
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
 * Configura los botones de tipo de gases para cambiar la información del rosco gráfico
 * 
 * configBtnsGases() <--
 * 
 */
function configBtnsGases() {
    let allBtnsGases = $("#btns-gases").find('button');
    allBtnsGases.each((index, btn) => {
        executeCallbackBtnDOM(btn.id, () => {
            getDataAndUpdateGraph(btn.id);
        });
    });
}
/*
 * Obtención de valores en mg/m3 de calidad del aire del usuario activo para el rosco gráfico y actualización de este
 * 
 *                  getDataAndUpdateGraph() <--
 * <-- Lista<R>
 */
function getDataAndUpdateGraph(btnGas) {
    let airQualitysPromiseList = []; // [day,hour,last]
    switch (btnGas) {
        case "btn_co":
            airQualitysPromiseList.push(initRequestLastDayMeasures());
            airQualitysPromiseList.push(initRequestLastHourMeasures());
            airQualitysPromiseList.push(initRequestLastMeasure());
            Promise.all(airQualitysPromiseList).then((response) => {
                if (myGraphs.airQualityChart != null) myGraphs.airQualityChart.destroy();
                populateGraph(response);
            }).catch(error => console.log("Error in promises ${error}", error));
            break;
        case "btn_no2":
            airQualitysPromiseList.push(12.5, 3, 0.3);
            myGraphs.airQualityChart.destroy();
            populateGraph(airQualitysPromiseList);
            break;
        case "btn_so2":
            airQualitysPromiseList.push(24, 13.7, 3);
            myGraphs.airQualityChart.destroy();
            populateGraph(airQualitysPromiseList);
            break;
        case "btn_o3":
            airQualitysPromiseList.push(24, 0, -1);
            myGraphs.airQualityChart.destroy();
            populateGraph(airQualitysPromiseList);
            break;
    }
}
/*
 * Rellena el rosco gráfico de medidas de calidad del aire
 * 
 * Lista<gasValue:R> --> 
 *                          populateGraph() <--
 * 
 */
function populateGraph(valueList) {
    var options = {
        series: getPercentagesFromValues(valueList),
        labels: ['Diaria', 'Horaria', 'Actual'],
        chart: {
            id: 'chartCo',
            height: '190%',
            width: '100%',
            type: 'radialBar',
            fontFamily: 'CenturyGothic',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 2000,
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
                        formatter: function (val) {
                            return getLabelsFromPercentage(val)
                        }
                    },
                    total: {
                        show: true,
                        label: 'CO',
                        color: myColors.soft_black,
                        fontSize: '27px',
                        formatter: function (w) {
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
    myGraphs.airQualityChart = new ApexCharts(document.querySelector("#coChart"), options);
    myGraphs.airQualityChart.render();
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
    let max = 30;
    let maxPercent = 100;
    let percentList = [];
    for (var i = 0; i < valueList.length; i++) {
        if (valueList[i] >= 0.5) {
            let percent = valueList[i] * maxPercent / max;
            let formatPercent = Math.round(percent * 100) / 100;
            percentList[i] = formatPercent >= 100 ? 100 : formatPercent;
        } else if (valueList[i] >= 0) {
            percentList[i] = 0.5;
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
    let max = 30;
    let maxPercent = 100;
    if (percent > 100) {
        return "No hay datos";
    } else if (percent <= 0.5) {
        return "< 0.5 ppm";
    } else {
        let label = percent * max / maxPercent;
        let formatLabel = Math.round(label * 100) / 100;
        return formatLabel + " ppm";
    }
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
    valueList.forEach(function (val) {
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
    valueList.forEach(function (val) {
        switch (true) {
            case val >= 20:
                colorList.push(myColors.eminence);
                break;
            case val >= 12:
                colorList.push(myColors.space_cadet);
                break;
            case val >= 8:
                colorList.push(myColors.blue_sapphire);
                break;
            case val >= 4:
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

//********************************************************************
//************************* INTERPOLACION *****************************
//********************************************************************
//********************************************************************
//************************* INTERPOLACION *****************************
//********************************************************************
let allBtnsGases = $("#btns-gases").find('button');
allBtnsGases.each((index, btn) => {
    executeCallbackBtnDOM(btn.id, () => {
        retrieveDataToDraw(btn.id);
        playAnimation();
    });
});

function retrieveDataToDraw(id) {
    getMeasuresFromTimestamp((measures) => {
        let data = processData(measures);
        postData(data, (heatMap) => {
            let parsedData = parseToObjectForHeatmap(heatMap);
            drawFakeData(parsedData, id);
            stopAnimation();
            updateLegend();
        });
    }, localStorage.getItem("mail"), "month");
}

function updateLegend(){
    //document.getElementById("#maxValueLegend")
}


function drawFakeData(data, id) {
    let measures;
    switch (id) {
        case 'btn_co':
            measures = dataFaker(data, 1, 70,0)
            break;
        case 'btn_no2':
            measures = dataFaker(data, 2, 20,5)
            break;
        case 'btn_so2':
            measures = dataFaker(data, 0.3, 20,3)
            break;
        case 'btn_o3':
            measures = dataFaker(data, 0.5, 30,10)
            break;
        default:
            break;
    }
    changeHeatmap(measures);
}

function dataFaker(data, n, top,bottom) {
    let result = [];
    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].value < top && data.data[i].value>bottom) {
            let measure = data.data[i];
            measure.value = measure.value * n;
            result.push(measure);
        }
    }
    return {
        max: 70,
        data: result
    }
}
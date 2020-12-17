function showLastMeasure() {
    //console.log(calculateQuality(getData(24)));
    getLastMeasure((dataReceived) => {
        let airQuality = calculateAirQuality(dataReceived);
        fillInGraphicBar(airQuality)
        //console.log(airQuality);
    }, "daghdha@developer.com");
}

function showLastHourMeasures() {
    getMeasuresFromTimestamp((dataReceived) => {
        let airQuality = calculateAirQuality(dataReceived);
        fillInGraphicBar(airQuality)
        //console.log(airQuality);
    }, "daghdha@developer.com", periodValue);
}

function showLastDayMeasures() {
    getMeasuresFromTimestamp((dataReceived) => {
        let airQuality = calculateAirQuality(dataReceived);
        fillInGraphicBar(airQuality)
        //console.log(airQuality);
    }, "daghdha@developer.com", periodValue);
}

function showLastWeekMeasures() {
    getMeasuresFromTimestamp((dataReceived) => {
        let airQuality = calculateAirQuality(dataReceived);
        fillInGraphicBar(airQuality)
        //console.log(airQuality);
    }, "daghdha@developer.com", periodValue);
}

function showLastMonthMeasures() {
    getMeasuresFromTimestamp((dataReceived) => {
        let airQuality = calculateAirQuality(dataReceived);
        fillInGraphicBar(airQuality)
        //console.log(airQuality);
    }, "daghdha@developer.com", periodValue);
}
// DONT USE IT (IN PROGRESS)
function showMyCustomMeasures() {
    getMeasuresFromTimestamp((dataReceived) => {
        let airQuality = calculateAirQuality(dataReceived);
        fillInGraphicBar(airQuality)
        //console.log(airQuality);
    }, "daghdha@developer.com", "153923022-162828823");
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
        result += measure.value;
    });
    return (result / measureList.length);
}

function fillInGraphicBar(data) {}
var rest = require("./../rest_measures.js");

showLastMeasure().then((data) => {console.log(data)});
function showLastMeasure() {
    return new Promise(function(resolve, reject) {
        rest.getLastMeasure((dataReceived) => {
            let airQuality = calculateAirQuality(dataReceived);
            resolve(airQuality);
        }, "daghdha@developer.com");
    });
}
/*
function showLastHourMeasures(callback) {
    getMeasuresFromTimestamp((dataReceived) => {
        let airQuality = calculateAirQuality(dataReceived);
        fillInGraphicBar(airQuality)
        //console.log(airQuality);
    }, "daghdha@developer.com", periodValue);
}

function showLastDayMeasures(callback) {
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

 /*
function calculateAirQuality(measureList) {
    let result = 0;
    measureList.forEach(measure => {
        result += measure.value;
    });
    return (result / measureList.length);
}

function fillInGraphicBar(callback) {
    let airQualitysPromiseList=[];
    airQualitysPromiseList.push(showLastMeasure(() =>{
        return new Promise();
    }));
}

//**********************************************************************

'use strict';

let elementoQueBuscar = "cardOfGraphs";
let idQueBuscar = "chart";
var myElement = document.getElementById(elementoQueBuscar);

var listaIds = myElement.querySelectorAll('*[id]');

//console.log("Lista ids sin filtrar:",listaIds);

function populateGraph(list) {
  var options = {
    series: getPercentagesFromValues(list),
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
            formatter: function (val) {
              return  getValueFromPercentage(val) + " ppm"
            }
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return 249
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

function getPercentagesFromValues(valueList) {
  // valor minimo son 0ppm y el maximo 70ppm

  let min = 0;
  let max = 70;
  let maxPercent = 100;
  let percentList = [];
  for (var i = 0; i < valueList.length; i++) {
    let percent = valueList[i] * maxPercent / max;

    percentList[i] = percent > 100 ? 100 : percent;

  }
  return percentList;
}

function getValueFromPercentage(percent) {
  // valor minimo son 0ppm y el maximo 70ppm
  let min = 0;
  let max = 70;
  let maxPercent = 100;

  let value = percent * max / maxPercent;
  return value > 70 ? 70 : value;
}
*/


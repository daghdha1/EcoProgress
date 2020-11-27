// https://apexcharts.com/docs/
/*
Lo que vamos a hacer es buscar todos los elementos que contengan in id
dentro del elemento 'elementoQueBuscar', una vez tengo todos los elementos
me aseguro que son contenedores de 'charts' e itero sobre ellos para
rellenarlos de informacion segun el tipo de chart que sean.
*/
'use strict';

let elementoQueBuscar = "cardOfGraphs";
let idQueBuscar = "chart";
var myElement = document.getElementById(elementoQueBuscar);

var listaIds = myElement.querySelectorAll('*[id]');

//console.log("Lista ids sin filtrar:",listaIds);

var options = {
          series: [20],
          chart: {
          height: 125,
          type: 'radialBar',
          toolbar: {
            show: false // activar descarga
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -170,
            endAngle: 170,
             hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
              show: true,
              name: {
                offsetY: -5, // offset del nombre del gas
                show: true,
                color: '#888',
                fontSize: '8px'
              },
              value: {
                formatter: function(val) {
                  return parseInt(val)+ "%";
                },
                offsetY:-5,
                color: '#111',
                fontSize: '15px',
                show: true,
              }
            }   
          }
        },
        fill: {
          type: 'image',
          image: {
            src: ["../media/gradient.png"],
            width: undefined,
            height: undefined
        }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['CO'],
        };

var listaFiltradaIds = [];

for (let id = 0; id < listaIds.length;id++) {
  if ((listaIds[id].id).toLocaleLowerCase().includes(idQueBuscar) == true) {
    listaFiltradaIds.push(listaIds[id].id);
  }
}
//console.log("Lista filtrada:", listaFiltradaIds);
  for (let id = 0; id < listaFiltradaIds.length;id++) {
    switch(listaFiltradaIds[id]){
      case "coChart":
        var chartCo = new ApexCharts(document.querySelector("#coChart"), options);
        chartCo.render();
        getAndPublishLastMeasure(chartCo);
        setInterval(()=>{
          getAndPublishLastMeasure(chartCo);
        }, 10000);
      break;
      case "no2Chart":
        options.labels = ['NO2'];
        var chartNo2 = new ApexCharts(document.querySelector("#"+listaFiltradaIds[id]), options);
        chartNo2.render();
        randomValueAndAppedTo(chartNo2);
        setInterval(()=>{
          randomValueAndAppedTo(chartSo2);
        }, 4000);
      break;
  
      case "so2Chart":
        options.labels = ['SO2'];
        var chartSo2 = new ApexCharts(document.querySelector("#"+listaFiltradaIds[id]), options);
        chartSo2.render()
        randomValueAndAppedTo(chartSo2);
        setInterval(()=>{
          randomValueAndAppedTo(chartSo2);
        }, 4000);
      break;
  
      case "o3Chart":
        options.labels = ['O3'];
        var chartO3 = new ApexCharts(document.querySelector("#"+listaFiltradaIds[id]), options);
        chartO3.render();
        randomValueAndAppedTo(chartO3);
        setInterval(()=>{
          randomValueAndAppedTo(chartO3);
        }, 4000);
      break;
    }
  }

function getAndPublishLastMeasure(chart){
  fetch('http://localhost/EcoProgress/Project/Web/private/api/v1.0/measures/day')
  .then(response => response.json())
  .then( (data) => {
    //console.log(data);
    var measure = { timestamp:0};

    for(let i = 0; i<data.length;i++){
      if(parseInt(data[i].timestamp) > parseInt(measure.timestamp)){
        measure = data[i];
      }
    }
    //console.log(measure);
    chart.updateSeries([parseInt(getPercentageFromValue(measure.value))],true);
  });
}

function getPercentageFromValue(value){
  // valor minimo son 0ppm y el maximo 1200ppm
  let min = 0;
  let max = 1200;
  let maxPercent = 100;

  let percent = value*maxPercent/max;
  return percent > 100 ? 100:percent;
}

function randomValueAndAppedTo(chart){

  //console.log(chart.w.globals.series);

    let max = parseInt(chart.w.globals.series) + 5;
    let min = parseInt(chart.w.globals.series) - 5;
    //console.log("Min y max: ", min ,max);
    let valor =  Math.floor(Math.random() * (max - min)) + min;

    valor = valor > 100 ? 100:valor;
    valor = valor < 0 ? 0:valor;

    //console.log("Rellenando: " + chart.toString() + " con: "+valor);
    chart.render();
    chart.updateSeries([valor],true);
}




function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
 
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
       formatter: function (value, timestamp, opts) {
        

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
         },
         {
           offset: 40,
           color: "#562a69ff",
           opacity: 1
         },
         {
           offset: 60,
           color: "#09728aff",
           opacity: 1
         },
         {
           offset: 100,
           color: "#007d93ff",
           opacity: 1
         }
       ]
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

 fetch('http://192.168.1.12/EcoProgress/Project/Web/private/api/v1.0/measures')
   .then((response) => {
     return response.json()
   }).then((data) => {
     //console.log("Recibimos data del server", data);

     convertAndUpdateDataLine(data);

   });

 //*****************************************************************
 //Primero vamos a obtener las fechas en epoch y convertirlas en LocaleString para poder utilizarlas en el gráfico.
 //Despues, actualizaremos el gráfico  

 function convertAndUpdateDataLine(measures) {
   //chart.resetSeries()
   var newData = {
     data: []
   };
   //console.log("Antes del for", measures.length);
   for (var i = 0; i < measures.length; i++) {
     //console.log(measures[i].timestamp);
     var myDate = new Date(measures[i].timestamp * 1000);
    // measures[i].timestamp = myDate.toLocaleString().split(" ")[0].replaceAll("/","-");

     newData.data.push({
       x: parseInt(measures[i].timestamp),
       y: measures[i].value
     });

   //console.log(measures[i].timestamp);
   //console.log(measures[i].value);
 } //for
 /*
    for (var i = 0; i < measures.length; i++) {
      newData.push([measures[i].timestamp, measures[i].value]);
    }
 */

 //console.log(newData);
 // array de objetos
 //lineChart.updateSeries([newData]);

 
 lineChart.updateSeries([newData]);

 }
  
getAllMeasures((measures)=>{
   let data = processData(measures);
    postData(data,(heatMap)=>{
        //console.log(heatMap.l)
        drawMap(heatMap.l);
        //drawGoogleMaps(heatMap.l);
    });
});

function processData(data){
    //console.log("data---->",data);
    let finalData = {
        listx:[],
        listy:[],
        listz:[]
    };
    
    for(let i = 0; i < data.length;i++){
        finalData.listx.push(data[i].location.longitude);
        finalData.listy.push(data[i].location.latitude);
        finalData.listz.push((data[i].value));
    }

    return finalData;
}

function postData(data,cb){

    fetch("http://localhost:8080/interpolate", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => cb(response));

} 


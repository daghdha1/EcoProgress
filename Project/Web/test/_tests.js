let map;

function initMap() {
    const myLatlng = {
        lat: 39.00230588963022,
        lng: -0.16240468179437695
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: myLatlng,
    });
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
    });
    // Configure the click listener.


    var heatMapData = [
        {location: new google.maps.LatLng(39.00230588963022, -0.16240468179437695), weight: 3},
        {location: new google.maps.LatLng(39.00232654985196, -0.1623330143563928), weight: 3}
      ];

    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        //heatMapData.push({location:new google.maps.latLng(mapsMouseEvent.latLng.toJSON().lat,mapsMouseEvent.latLng.toJSON().lng),weight: 3})
        console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON()));
    });

    addHeatmapToMap(map,heatMapData);
}


function addHeatmapToMap(map,heatMapData){
    
      
      
      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
      });
      heatmap.setMap(map);
}
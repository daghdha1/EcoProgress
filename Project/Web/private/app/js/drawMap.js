function drawMap(data) {
    var map = L.map('map').setView([39.003628, -0.166529], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([39.003628, -0.166529]).addTo(map);

    var heat = L.heatLayer(data, {
        radius: 20,
        blur: 30, 
        maxZoom: 10,
        max: 50.0,
        gradient: {
            0.0: 'green',
            0.5: 'yellow',
            1.0: 'red'
        }
    }).addTo(map);

}


function drawGoogleMaps(data) {

    var sanFrancisco = new google.maps.LatLng(38.995823, -0.174677);

    map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 13,
        mapTypeId: 'satellite'
    });



    var heatMapData = [];
    for (let i = 0; i < data.length; i++) {
        let aux = data[i];
        heatMapData.push({
            location: new google.maps.LatLng(aux[0], aux[1]),
            weight: aux[2]
        });
    }
    //console.log(heatMapData.length);




    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
    });
    const gradient = ["rgba(102, 255, 0, 0)",
    "rgba(102, 255, 0, 1)",
    "rgba(147, 255, 0, 1)",
    "rgba(193, 255, 0, 1)",
    "rgba(238, 255, 0, 1)",
    "rgba(244, 227, 0, 1)",
    "rgba(249, 198, 0, 1)",
    "rgba(255, 170, 0, 1)",
    "rgba(255, 113, 0, 1)",
    "rgba(255, 57, 0, 1)",
    "rgba(255, 0, 0, 1)"];
    heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
    heatmap.set("radius", heatmap.get("radius") ? null : 20);
    heatmap.set("maxIntensity", 70)
    heatmap.setMap(map);
    console.log("Se supone que va??");
}
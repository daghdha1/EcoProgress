
/*
     -->   [{
            location: new google.maps.LatLng(37.782, -122.447),
            weight: 0.5
        }]
*/
function initMap(heatMapData) {

    var sanFrancisco = new google.maps.LatLng(38.966667, -0.183333);

    let map = new google.maps.Map(document.getElementById('map'), {
        center: sanFrancisco,
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
    });
    heatmap.setMap(map);

    heatmap.setOptions({
        dissipating: false,
        maxIntensity: 70,
        radius: 0.0005,
        opacity: 0.4
    });
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    const gradient = [
        'rgba(255, 0, 0, 0)',
        'rgba(255, 255, 0, 0.9)',
        'rgba(0, 255, 0, 0.7)',
        'rgba(173, 255, 47, 0.5)',
        'rgba(152, 251, 152, 0)',
        'rgba(152, 251, 152, 0)',
        'rgba(0, 0, 238, 0.5)',
        'rgba(186, 85, 211, 0.7)',
        'rgba(255, 0, 255, 0.9)',
        'rgba(255, 0, 0, 1)'];
    heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
    heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
    heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
}

// Heatmap data: 500 Points
/*
   -->   [{
            location: new google.maps.LatLng(37.782, -122.447),
            weight: 0.5
        }]

*/

function parseData(data) {
    let heatMap = [];
    console.log(data[0][0]);
    for (let index = 0; index < data.length; index++) {
        if (data[index][2] > 0) {
            heatMap.push({
                location: new google.maps.LatLng(data[index][0], data[index][1]),
                weight: data[index][2]
            });
        }

    }
    console.log("-->",heatMap);

    initMap(heatMap)
}


getAllMeasures((measures) => {
    let data = processData(measures);
    postData(data, (heatMap) => {
        let parsedData = parseData(heatMap);
        //drawMap(parsedData);
    });
});
/*
function drawMap(heatmap) {
    var testData = heatmap;
    var baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    });
    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 0.0008,
        "maxOpacity": .6,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": false,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'value',
        blur: .4,
        gradient: {
            // enter n keys between 0 and 1 here
            // for gradient color customization
            '0': '#000000FF', //0
            '0.1429': '#b6ff3c', //10
            '0.3143': '#d9ff42', //22
            '0.50': '#ffff3e', //35
            '0.7143': '#ffa700', //50
            '0.9286': '#ff6b30', //65
            '1.00': '#ff0030' //70
        }
    };
    var heatmapLayer = new HeatmapOverlay(cfg);
    var map = new L.Map('map', {
        center: new L.LatLng(39.003628, -0.166529),
        zoom: 14,
        layers: [baseLayer, heatmapLayer]
    });
    addOfficialSensors(map)
    heatmapLayer.setData(testData);
}

function addOfficialSensors(map) {
    var mapIcon = L.icon({
        iconUrl: 'public/media/map_marker.png',
        iconSize: [38, 38], // size of the icon
    });
    var marker = L.marker([38.96797739, -0.19109882], { // el de gandía
        icon: mapIcon
    }).addTo(map);
    marker.bindPopup("Estacion de medida de Gandía").openPopup();
}
*/
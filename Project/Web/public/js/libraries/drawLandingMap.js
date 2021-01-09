getAllMeasures((measures) => {
    let data = processData(measures);
    console.log(data)
    postData(data, (heatMap) => {
        let parsedData = parseToObjectForHeatmap(heatMap);
        drawMap(parsedData);
    });
});

function drawMap(heatmap) {

    var testData = heatmap;

    var baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
        }
    );

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
            '1.00': '#ff0030'  //70
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
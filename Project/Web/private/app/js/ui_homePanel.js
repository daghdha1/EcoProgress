getMeasuresFromTimestamp((measures) => {
    let data = processData(measures);
    postData(data, (heatMap) => {
        let parsedData = parseToObjectForHeatmap(heatMap);
        changeHeatmap(parsedData);
    });
}, localStorage.getItem("mail"), "month");

drawMap();
getMedidasFromGVA();

function getMedidasFromGVA() {
    var request = new Request("http://localhost:8080/sensorOficial", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        updateOficial(json);
    });

}
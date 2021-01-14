getMeasuresFromTimestamp((measures) => {
    let data = processData(measures);
    postData(data, (heatMap) => {
        let parsedData = parseToObjectForHeatmap(heatMap);
        changeHeatmap(parsedData);
    });
}, localStorage.getItem("mail"), "month");

drawMap();



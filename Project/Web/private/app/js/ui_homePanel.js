getMeasuresFromTimestamp((measures) => {
    let data = processData(measures);
    postData(data, (heatMap) => {
        let parsedData = parseToObjectForHeatmap(heatMap);
        drawMap(parsedData);
    });
}, localStorage.getItem("mail"), "month");


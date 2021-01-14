// .....................................................................
// PENDING
// .....................................................................
getAllMeasures((measures) => {
    let data = processData(measures);
    postData(data, (heatMap) => {
        let parsedData = parseToObjectForHeatmap(heatMap);
        changeHeatmap(parsedData);
    });
});

drawMap();
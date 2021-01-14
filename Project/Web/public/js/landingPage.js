// .....................................................................
// PENDING
// .....................................................................
getAllMeasures((measures) => {
    let data = processData(measures);
    console.log(data)
    postData(data, (heatMap) => {
        let parsedData = parseToObjectForHeatmap(heatMap);
        changeHeatmap(parsedData);
    });
});

drawMap();
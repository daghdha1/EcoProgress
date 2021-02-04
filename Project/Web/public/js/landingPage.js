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

$('.btn').on('click', function (e) {
    console.log("Buenos días me has clicado");
    console.log(e.target.id);
    retrieveDataToDraw(e.target.id);
    playAnimation();

});


function retrieveDataToDraw(id) {
    // .....................................................................
    getAllMeasures((measures) => {
        let data = processData(measures);
        postData(data, (heatMap) => {
            let parsedData = parseToObjectForHeatmap(heatMap);
            console.log(parsedData);
            drawFakeData(parsedData,id);
        });
    });
}

function drawFakeData(data, id) {
    let measures;
    console.log("Vamos a fakear la data de",id);
    switch (id) {
        case 'btn_co':
            measures = dataFaker(data, 1, 70, 0)
            break;
        case 'btn_no2':
            measures = dataFaker(data, 2, 20, 5)
            break;
        case 'btn_so2':
            measures = dataFaker(data, 0.3, 20, 3)
            break;
        case 'btn_o3':
            measures = dataFaker(data, 0.5, 30, 10)
            break;
        default:
            break;
    }
    changeHeatmap(measures);
}

function dataFaker(data, n, top, bottom) {
    let result = [];
    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].value < top && data.data[i].value > bottom) {
            let measure = data.data[i];
            measure.value = measure.value * n;
            result.push(measure);
        }
    }
    return {
        max: 70,
        data: result
    }
}
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


function processData(data) {
    //console.log("data---->",data);
    let finalData = {
        listx: [],
        listy: [],
        listz: []
    };
    for (let i = 0; i < data.length; i++) {
        finalData.listx.push(data[i].location.longitude);
        finalData.listy.push(data[i].location.latitude);
        finalData.listz.push(Math.round((data[i].value)));

    }
    return finalData;
}

function parseToObjectForHeatmap(data) {
    var dataObj = {
        max: 70,
        data: []
    };
    //array dde arrays [ [lat, lon, value],  [lat, lon, value], ...]
    for (let i = 0; i < data.length; i++) {
        let pos = data[i];
        var obj = {
            lat: pos[0],
            lng: pos[1],
            value: Math.round(pos[2])
        };
        
        if (obj.value == 0 || obj.value < 0) {

        } else {
            dataObj.data.push(obj);
        }
    }
    return dataObj;
}

function postData(data, cb) {
    fetch(config.restInterpDir, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json();
    }).catch(error => console.error('Error:', error)).then(response => {
        cb(response)
    });
}
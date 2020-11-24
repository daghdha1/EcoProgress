//window.setInterval(getMeasures(), 5000);

function getMeasures() {
    let request = new Request("../../api/v1.0/measures", {
        method: "get"
    });
    fetch(request).then((response) => {
        return response.json();
    }).then((json) => {
        createTableOfMeasures(json);
    })
}

function createTableOfMeasures(data) {
    var col = [];
	data = data.reverse();
    // Obtenemos los nombres de las columnas
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // Tabla dinámica
    var table = document.createElement("table");
    // Creamos los encabezados de las columnas 
    var tr = table.insertRow(-1); // Row
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // Header.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    // Añadir medidas
    for (var i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (col[j] == "location") {
                tabCell.innerHTML = data[j].location.latitude + ", " + data[j].location.longitude;
            } else {
                tabCell.innerHTML = data[i][col[j]];
            }
        }
    }
    // Se añade la tabla con las medidas al contenedor
    var divContainer = document.getElementById("container");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

//postMeasures(); //COMENTAR ESTA LLAMADA AL USAR SENSOR
function postMeasures() {
    let dataTest = {
        value: 101010,
        timestamp: "0000111333",
        location: "3323244,-033222113",
        sensorID: "2"
    };
    let request = new Request("../../api/v1.0/measures", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataTest)
    });
    fetch(request).then((response) => {
        return response.json()
    }).then((json) => {
        console.log("Medida insertada--> ", json);
    })
}
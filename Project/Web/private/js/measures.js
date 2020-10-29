// .....................................................................
// GET mediciones LOOP
// .....................................................................
window.setInterval(function() {
    fetch('http://192.168.43.29:8080/measures').then((response) => {
        return response.text()
    }).then((data) => {
        console.log(data);
        var mediciones = JSON.parse(data);
        var col = [];
        for (var i = 0; i < mediciones.length; i++) {
            for (var key in mediciones[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var tr = table.insertRow(-1); // TABLE ROW.
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th"); // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < mediciones.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = mediciones[i][col[j]];
            }
        }
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("container");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    })
}, 5000);
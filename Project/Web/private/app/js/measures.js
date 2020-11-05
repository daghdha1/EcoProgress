// .....................................................................
// GET measures LOOP
// .....................................................................
window.setInterval(function() {
    var request = new Request("../../api/v1.0/measures", {
        method: "get"
    });
    fetch(request).then((response) => {
        return response.json()
    }).then((json) => {
        try {
            JSON.parse(json);
            console.log('bienn');
        } catch (e) {
            console.log('----> ' + e);
        }
        var measures = json;
        var col = [];
        for (var i = 0; i < measures.length; i++) {
            for (var key in measures[i]) {
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
        for (var i = 0; i < measures.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = measures[i][col[j]];
            }
        }
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("container");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    })
}, 5000);
// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function(servidorExpress) {
    // .......................................................
    // Database Connection
    // .......................................................
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1111",
        database: "ecoprogress"
    });
    // .......................................................
    // GET PRUEBA
    // .......................................................
    servidorExpress.get('/test/', function(peticion, respuesta) {
        console.log(" * GET /test ");
        respuesta.send("¡Funciona!");
    });
    // .......................................................
    // GET USUARIOS
    // .......................................................
    servidorExpress.get('/measures', function(peticion, respuesta) {
        console.log(" * GET /measures ")
        con.query("select * from Measures", (err, result) => {
            if (err) console.log(err);
            console.log(result);
            respuesta.send(JSON.stringify(result))
        });
    });
    // .......................................................
    // POST MEDICION
    // .......................................................
    servidorExpress.post('/measure', function(peticion, respuesta) {
        console.log(" * POST /measure")
        var data = JSON.parse(peticion.body)
        console.log(datos.nombre);
        con.query("INSERT INTO Measures(value,instant,location,user) values (?,?,?,?);", [data.value, data.instant, data.location, data.user], (err, result) => {
            if (err) throw err;
            console.log(result);
            respuesta.send(JSON.stringify(result));
        });
    });
} // ()
// .....................................................................
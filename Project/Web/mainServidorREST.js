// .....................................................................
// mainServidorREST.js
// .....................................................................
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// .....................................................................
// cargarLogica()
// .....................................................................
// .....................................................................
// main()
// .....................................................................
async function main() {
    // Se crea el servidor
    var servidorExpress = express()
    // Cors
    servidorExpress.use(cors())
    // Para poder acceder a la carga de la petición http, asumiendo que es JSON
    servidorExpress.use(bodyParser.text({
        type: 'application/json'
    }));

    // Reglas REST
    var reglas = require("./ReglasREST.js")
    reglas.cargar(servidorExpress);

    // Inicialización del servidor
    var servicio = servidorExpress.listen(8080, function() {
        console.log("servidor REST escuchando en el puerto 8080 ")
    })

    // Capturo control-c para cerrar el servicio ordenadamente
    process.on('SIGINT', function() {
        console.log(" terminando ")
        servicio.close()
    })
} // ()

main()
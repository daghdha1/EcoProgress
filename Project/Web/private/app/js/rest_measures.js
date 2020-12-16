
// NO TOCAR, EN PROCESO

/* 
 * Obtiene la última medida tomada del usuario activo
 *
 *                      getLastMeasure() <--
 * <-- MeasureEntity
 */
function getLastMeasure(callback) {
    var request = new Request(config.restDir + "/measures/users/daghdha@developer.com/period/last", {
        method: "get"
    });
    fetch(request).then((response) => {
        // Si la respuesta es exitosa (200 code), devuelve json
        if (response.ok) return response.json();
        // FUTURE: Si ha habido algún fallo de red, redireccionamos a mensajes de fallo (necesitamos response)
        else return false;
    }).then((json) => {
        console.log("Datos medida:", json);
        callback(json);
    });
}
/* 
 * Obtiene las medidas del usuario desde el instante solicitado
 *
 *                      						 getMeasuresFromTimestamp() <--
 * <-- Lista<MeasureEntity> | MeasureEntity
 */
function getMeasuresFromTimestamp(callback) {
    var request = new Request(config.restDir + "/measures/users/daghdha@developer.com/period/month", {
        method: "get"
    });
    fetch(request).then((response) => {
        // Si la respuesta es exitosa (200 code), devuelve json
        if (response.ok) return response.json();
        // FUTURE: Si ha habido algún fallo de red, redireccionamos a mensajes de fallo (necesitamos response)
        else return false;
    }).then((json) => {
        console.log("Datos usuario:", json);
        callback(json);
        "daghdha@developer.com";
    });
    callback(json_test);
}
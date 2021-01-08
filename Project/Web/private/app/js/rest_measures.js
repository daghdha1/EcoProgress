/* 
 * Obtiene todas las medidas disponibles
 *
 *                                  getAllMeasures() <--
 * Lista<MeasureEntity> | Nada
 */
function getAllMeasures(callback) {
    var request = new Request(config.restDir + "/measures", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        responseHandler(json, callback);
    });
}
/* 
 * Obtiene la última medida tomada del usuario activo
 *
 * mail:Texto -->
 *                                      getLastMeasure() <--
 * <-- Lista<MeasureEntity> | Nada
 */
function getLastMeasure(callback, mail) {
    var request = new Request(config.restDir + "/measures/users/" + mail + "/period/last", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        responseHandler(json, callback);
    });
}
/* 
 * Obtiene las medidas del usuario desde el instante solicitado
 *
 * mail:Texto, period:Texto --> 
 *                                       getMeasuresFromTimestamp() <--
 * <-- Lista<MeasureEntity> | Nada
 */
function getMeasuresFromTimestamp(callback, mail, periodValue) {
    var request = new Request(config.restDir + "/measures/users/" + mail + "/period/" + periodValue, {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        responseHandler(json, callback);
    });
}
/* 
 * Obtiene la última medida tomada del usuario activo
 *
 * mail:Texto -->
 *                               getLastMeasure() <--
 * <-- MeasureEntity | Nada
 */
function getLastMeasure(callback, userID) {
    var request = new Request(config.restDir + "/measures/users/" + userID + "/period/last", {
        method: "get"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return false;
    }).then((json) => {
        console.log("Datos medida recibidos --> ", json);
        callback(json);
    });
}
/* 
 * Obtiene las medidas del usuario desde el instante solicitado
 *
 * mail:Texto, period:Texto --> 
 *                                                      getMeasuresFromTimestamp() <--
 * <-- Lista<MeasureEntity> | MeasureEntity | Nada
 */
function getMeasuresFromTimestamp(callback, userID, periodValue) {
    var request = new Request(config.restDir + "/measures/users/" + userID + "/period/" + periodValue, {
        method: "get"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return false;
    }).then((json) => {
        console.log("Datos medidas recibidos --> ", json);
        callback(json);
    });
}
/* 
 * Obtiene la última medida tomada del usuario activo
 *
 * mail:Texto -->
 *                               getLastMeasure() <--
 * <-- MeasureEntity | Nada
 */
function getLastMeasure(callback, userID) {
    var request = new Request(config.restDir + "/measures/users/" + userID + "/period/last", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return false;
    }).then((json) => {
        if (json != null) callback(json);
        else window.location.replace(config.indexDir);
    });
}
/* 
 * Obtiene la última medida tomada del usuario activo
 *
 *                               getAllMeasures() <--
 * <-- ListaMeasures | Nada
 */
function getAllMeasures(callback) {
    var request = new Request(config.restDir + "/measures", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return false;
    }).then((json) => {
        if (json != null) callback(json);
        else window.location.replace(config.indexDir);
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
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return false;
    }).then((json) => {
        if (json != null) callback(json);
        else window.location.replace(config.indexDir);
    });
}


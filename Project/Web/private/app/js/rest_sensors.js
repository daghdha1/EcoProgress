/* 
 * Obtiene todos los usuarios activos y sus sensores asociados
 *
 *                                  getUserDataAndSensorIds() <--
 * Lista<T> | Nada
 */
function getUserDataAndSensorIds(callback) {
    var request = new Request(config.restDir + "/sensors/users/id", {
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
 * Todos los sensores
 *
 *                                  getAllSensors() <--
 * Lista<T> | Nada
 */
function getAllSensors(callback) {
    var request = new Request(config.restDir + "/sensors", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        responseHandler(json, callback);
    });
}
/* 
 * Obtiene todos los usuarios activos y sus sensores asociados
 *
 *                                  getSensorIdsFromUser() <--
 * Lista<T> | Nada
 */
function getSensorIdsFromUser(callback) {
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
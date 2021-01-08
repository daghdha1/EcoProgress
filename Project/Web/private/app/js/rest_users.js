/* 
 * Obtiene todos los usuarios registrados
 *
 *                              getAllUsers() <--
 * <-- List<Users> | Nada
 */
function getAllUsers(callback) {
    var request = new Request(config.restDir + "/users", {
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
 * Obtiene los datos del usuario activo
 *
 * mail:Texto -->
 *                    getUser() <--
 * <-- User | Nada
 */
function getUser(callback, userID) {
    var request = new Request(config.restDir + "/users/users/" + userID, {
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
 * Obtiene el tiempo total activo del usuario
 *
 * mail:Texto, Texto -->
 *                    getUser() <--
 * <-- seconds:N | Nada
 */
function getActiveTimeUser(callback, userID, differenceValue) {
    var request = new Request(config.restDir + "/users/users/" + userID + "/difference/" + differenceValue, {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        responseHandler(json, callback);
    });
}
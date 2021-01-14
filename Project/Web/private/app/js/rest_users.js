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
 * Obtiene los datos del usuario
 *
 * mail:Texto -->
 *                    getUser() <--
 * <-- User | Nada
 */
function getUser(callback, mail) {
    var request = new Request(config.restDir + "/users/users/" + mail, {
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
 *                          getActiveTimeOfUser() <--
 * <-- seconds:N | Nada
 */
function getActiveTimeOfUser(callback, mail, diffValue) {
    var request = new Request(config.restDir + "/users/users/" + mail + "/difference/" + diffValue, {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.text();
        else return null;
    }).then((json) => {
        console.log(json)
        responseHandler(json, callback);
    });
}
/* 
 * Obtiene las distancia totales recorridas de cada día por el usuario especificado
 *
 * mail:Texto -->
 *                            getTraveledDistanceOfUser() <--
 * <-- distance:N | Nada
 */
function getTraveledDistanceOfUser(callback, mail) {
    var request = new Request(config.restDir + "/users/users/" + mail + "/distance/day", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        responseHandler(json, callback);
    });
}

function createUser() {
    let params = createUser.arguments;
    let form = params[0];
    if (isValidForm(form, params)) {
        // Form data
        let formData = new FormData(form);
        formData.append("action", "create");
        let url = config.restDir + "/users";
        var myInit = {
            method: "POST",
            body: formData
        };
        let request = new Request(url, myInit);
        // Enviamos la petición
        fetch(request).then(function(response) {
            if (response.ok) return response.json();
            else return null;
        }).then(function(json) {
            responseHandler(json, addUserTable)
        });
    }
}
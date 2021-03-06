/*************************** USERS DATA ******************************/
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
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
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
/*************************** TOP STATS ******************************/
function getMaxDistanceOfUser(callback) {
    var request = new Request(config.restDir + "/users/maxDistance/all", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        responseHandler(json, callback);
    });
}

function getMaxActiveTimeOfUser(callback) {
    var request = new Request(config.restDir + "/users/maxTime/all", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        responseHandler(json, callback);
    });
}

/*************************** INSERT UPDATE DELETE ******************************/
function insertUser() {
    let params = insertUser.arguments;
    let form = params[0];
    if (isValidForm(form, params)) {
        // Form data
        let formData = new FormData(form);
        formData.append("action", "insert");
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
            responseHandler(json, (data) => {
                refreshUsersTable(data, true);
            });
            hideModalPanel('createUserPanel');
            alert("Usuario creado correctamente");
        });
    }
}

function updateUser() {
    let params = updateUser.arguments;
    let form = params[0];
    if (isValidForm(form, params)) {
        // Form data
        let formData = new FormData(form);
        formData.append("action", "update");
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
            responseHandler(json, (data) => {
                refreshUsersTable(data, false);
            });
            hideModalPanel('updateUserPanel');
            alert("Usuario modificado correctamente");
        });
    }
}

function deleteUser() {
    let params = deleteUser.arguments;
    let form = params[0];
    if (isValidForm(form, params)) {
        // Form data
        let formData = new FormData(form);
        formData.append("action", "delete");
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
            responseHandler(json, (data) => {
                refreshUsersTable(data, true);
            });
            hideModalPanel('deleteUserPanel');
            alert("Usuario eliminado correctamente");
        });
    }
}
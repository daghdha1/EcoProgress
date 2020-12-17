/* 
 * Obtiene los datos del usuario activo
 *
 * mail:Texto -->
 *                    getUser() <--
 * <-- User | Nada
 */
function getUser(callback, userID) {
    /*var request = new Request(config.restDir + "/users/users/" + userID, {
        method: "get"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return false;
    }).then((json) => {
        // callback(json); // HERE
    });*/
    // TEST, IT NEED CHANGES TO GET REAL ACTIVE USER IN PREVIOUS FUNCTION
    let json_test = new Object();
    json_test.mail = "daghdha@developer.com";
    json_test.name = "Adrian";
    json_test.surnames = "Dago";
    json_test.devices = ["C000001", "M000002"];
    callback(json_test);
}
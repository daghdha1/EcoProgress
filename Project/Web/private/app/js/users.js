// getUser()
function getUser(callback) {
    /*var request = new Request("../../api/v1.0/users/id/" + sessionStorage.getItem("id"), {
        method: "get"
    });
    fetch(request).then((response) => {
        // Si la respuesta es exitosa (200 code), devuelve json
        if (response.ok) return response.json();
        // FUTURE: Si ha habido algún fallo de red, redireccionamos a mensajes de fallo (necesitamos response)
        else return false;
    }).then((json) => {
        console.log("Datos usuario:", json);
        callback(json);"daghdha@developer.com";
    })*/
    let json_test = new Object();
    json_test.mail = "daghdha@developer.com";
    json_test.name = "Adrian";
    json_test.surnames = "Dago";
    json_test.devices = ["C000001", "M000002"];
    callback(json_test);
}
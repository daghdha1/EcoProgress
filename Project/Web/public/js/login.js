function login() {
    let params = login.arguments;
    let form = params[0];
    if (isValidForm(form, params)) {
        let formData = new FormData(form);
        formData.append("action", "login");
        let request = new Request(config.restDir + "/auth", {
            method: "post",
            body: formData
        });
        clearElementDOM("log_email"); //TEST
        clearElementDOM("log_password"); //TEST
        setFocusElementDOM("log_email"); //TEST
        // TODO
        // Enviamos la petición
        /*fetch(request).then(function(response) {
            // Si la respuesta es exitosa (200 code), devuelve json
            if (response.ok) return response.json();
            else return null;
        }).then(function(json) {
            // Si es null (no ha encontrado ninguna coincidencia)
            if (json === null) {
                clearElementDOM("log_email");
                clearElementDOM("log_password");
                setFocusElementDOM("log_email");
            }
            // Sino, se guardan los datos de sesión de usuario y redireccionamos a la página principal del usuario
            else {
                hideModalPanel('loginPanel');
                //saveUserSession(json);
                window.location.href = './private/app/html/home.html';
            }
        });*/
    }
}
// FALTA RECIBIR DE LA BASE DE DATOS SI ES ROOT O USER
function saveUserSession(userDataSession) {
    sessionStorage.setItem("mail", userDataSession.mail);
    sessionStorage.setItem("root", userDataSession.root);
}
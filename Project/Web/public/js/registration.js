function registration() {
    let params = registration.arguments;
    let form = params[0];
    if (isValidForm(form, params)) {
        let formData = new FormData(form);
        formData.append("action", "registration");
        let request = new Request(config.restDir + "/auth", {
            method: "post",
            body: formData
        });
        // Enviamos la petición
        fetch(request).then(function(response) {
            // Si la respuesta es exitosa (200 code), devuelve json
            if (response.ok) return response.json();
            else return false;
        }).then(function(json) {
            // Si es null (no ha encontrado ninguna coincidencia)
            if (json === null) {
                clearElementDOM("reg_name");
                clearElementDOM("reg_email");
                clearElementDOM("reg_password");
                clearElementDOM("reg_key");
                setFocusElementDOM("reg_name");
            }
            // Sino, se guardan los datos de sesión de usuario y redireccionamos a la página principal del usuario
            else {
                swapModalPanel('registrationPanel', 'loginPanel');
                alert("Registro realizado, por favor, inicia sesión.")
            }
        });
    }
}
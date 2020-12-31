/* 
 * Crea un nuevo usuario con estado 'pending', después envía un correo de verificación de cuenta
 *
 * Form, Lista<Texto> -->
 *                               registration() <--
 * <-- UserEntity | Texto
 */
function registration() {
    let params = registration.arguments;
    let form = params[0];
    // Si los campos no están vacíos (excepto apellidos)
    if (isValidForm(form, params)) {
        let formData = new FormData(form);
        formData.append("action", "registration");
        formData.delete("reg_password_confirm");
        let request = new Request(config.restDir + "/auth", {
            method: "POST",
            body: formData
        });
        // Enviamos la petición
        fetch(request).then(function(response) {
            if (response.ok) return response.json();
            else return 'Ha habido un error en la conexión con el servidor';
        }).then(function(json) {
            switch (typeof json) {
                case 'object':
                    swapModalPanel("registrationPanel", "registrationCodePanel", () => {
                        setTextValueDOM("reg_code_mail", formData.get("reg_mail"));
                        setTextValueDOM("reg_code_key", formData.get("reg_key"));
                        setTextValueDOM("reg_code", json[0].secretCode); // FUTURE: El usuario debería introducirlo manualmente (con mail)
                        // setFocusElementDOM("reg_code"); // FIX ME: No recibe el focus (??)
                    });
                    break;
                case 'string':
                    console.log(json);
                    break;
                default:
            }
        });
    }
}

/* 
 * Actualiza el usuario registrado con estado 'pending' a 'active', y lo asocia al sensor registrado
 *
 * Form, Lista<Texto> -->
 *                               accountActivation() <--
 * <-- Texto
 */
function accountActivation() {
    let params = accountActivation.arguments;
    let form = params[0];
    // Si el campo no está vacío
    if (isValidForm(form, params)) {
        let formData = new FormData(form);
        formData.append("action", "accountActivation");
        let request = new Request(config.restDir + "/auth", {
            method: "POST",
            body: formData
        });
        // Enviamos la petición
        fetch(request).then(function(response) {
            if (response.ok) return response.json();
            else return 'Ha habido un error en la conexión con el servidor';
        }).then(function(json) {
            switch (typeof json) {
                case 'object':
                    swapModalPanel("registrationCodePanel", "loginPanel", () => {
                        showElementDOM("lbl_account_activated");
                    });
                    break;
                case 'string':
                    console.log(json);
                    break;
                default:
            }
        });
    }
}
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
        formData.delete("password_confirm");
        let request = new Request(config.restDir + "/auth", {
            method: "POST",
            body: formData
        });
        // Enviamos la petición
        fetch(request).then(function(response) {
            if (response.ok) return response.json();
            else return 'Ha habido un error en la conexión con el servidor';
        }).then(function(json) {
            responseHandler(json, (data) => {
                swapModalPanel("registrationPanel", "registrationCodePanel", null, () => {
                    setTextValueDOM("reg_code_mail", formData.get("reg_mail"));
                    setTextValueDOM("reg_code_key", formData.get("reg_key"));
                    // FUTURE: El usuario debería introducir el codigo manualmente (en mail)
                    setTextValueDOM("reg_code", json[0].secretCode);
                    setReadOnlyInputDOM("reg_code_mail");
                    setReadOnlyInputDOM("reg_code_key");
                });
            });
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
                    swapModalPanel("registrationCodePanel", "loginPanel", null, () => {
                        showElementDOM("lbl_account_activated");
                    });
                    break;
                case 'string':
                    alert(json);
                    break;
                default:
            }
        });
    }
}
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
            method: "post",
            body: formData
        });
        // Enviamos la petición
        fetch(request).then(function(response) {
            if (response.ok) return response.json();
            else return null;
        }).then(function(json) {
            switch (typeof json) {
                case 'object':
                    swapModalPanel("registrationPanel", "registrationCodePanel", () => {
                        setTextValueDOM("reg_code_mail", json[0].mail);
                        setTextValueDOM("reg_code", json[0].secretCode); // FUTURE: El usuario debería introducirlo manualmente (con mail)
                        // setFocusElementDOM("reg_code"); // FIX ME: No recibe el focus
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
*                               registration() <--
* <-- UserEntity | Texto
*/
function registrationCode() {
    let params = registration.arguments;
    let form = params[0];
    // Si el campo no está vacío
    if (isValidForm(form, params)) {
        let formData = new FormData(form);
        formData.append("action", "accountActivation");
        let request = new Request(config.restDir + "/auth", {
            method: "put",
            body: formData
        });
        // Enviamos la petición
        fetch(request).then(function(response) {
            if (response.ok) return response.json();
            else return null;
        }).then(function(json) {
            
        });
    }
}


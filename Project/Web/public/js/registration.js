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
                        setTextValueDOM("reg_code", json[0].secretCode); // FUTURE: El usuario debería introducirlo manualemnte (con mail)
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
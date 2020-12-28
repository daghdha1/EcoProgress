function registration() {
    let params = registration.arguments;
    let form = params[0];
    // Si los campos no están vacíos (excepto apellidos)
    if (isValidForm(form, params)) {
        let formData = new FormData(form);
        formData.append("action", "registration");
        let request = new Request(config.restDir + "/auth", {
            method: "post",
            body: formData
        });
        // Enviamos la petición
        fetch(request).then(function(response) {
            // Si el email y la product key son válidas
            // Return Success - Valid Email
            // $msg = 'Your account has been made, <br /> please verify it by clicking the activation link that has been send to your email.';
            if (response.ok) return response.json(); 
            else return null;
        }).then(function(json) {
            // Si es null (no ha encontrado ninguna coincidencia)
            if (json === null) {
                clearElementDOM("reg_name");
                clearElementDOM("reg_email");
                clearElementDOM("reg_password");
                clearElementDOM("reg_key");
                setFocusElementDOM("reg_name");
            }
            // Sino, 
            else {
                alert("Registro realizado, por favor, inicia sesión.")
            }
        });
    }
}
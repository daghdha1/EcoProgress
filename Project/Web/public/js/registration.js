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
            if (json === null) {
                //clearElementDOM("reg_name");
                //clearElementDOM("reg_mail");
                //clearElementDOM("reg_password");
                //clearElementDOM("reg_password_confirm")
                //clearElementDOM("reg_key");
                setFocusElementDOM("reg_mail");
            } else {
                console.log(json);
            }
        });
    }
}
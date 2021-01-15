function login() {
    let params = login.arguments;
    let form = params[0];
    if (isValidForm(form, params)) {
        // Form data
        let formData = new FormData(form);
        formData.append("action", "login");
        let url = config.restDir + "/auth";
        var myInit = {
            method: "POST",
            mode: "cors",
            cache: "default",
            body: formData
        };
        let request = new Request(url, myInit);
        // Enviamos la petición
        fetch(request).then(function(response) {
            if (response.ok) return response.json();
            else return null;
        }).then(function(json) {
            responseHandler(json, (data) => {
                if (data[0].role === 'user') {
                    // Guardamos datos básicos de usuario
                    saveUserSession(data);
                    // Redireccionamos a la página principal del usuario
                    window.location.replace('./private/app/html/home.html');
                } else if (data[0].role === 'admin') {
                    // Redireccionamos a la página de admin
                    window.location.replace('./private/app/html/adminPanel.html');
                }
                hideModalPanel('loginPanel');
            });
        });
    }
}

function saveUserSession(userDataSession) {
    localStorage.setItem("mail", userDataSession[0].mail);
    localStorage.setItem("name", userDataSession[0].name);
}
function login() {
    let params = login.arguments;
    let form = params[0];
    if (isValidForm(form, params)) {
        // Form data
        let formData = new FormData(form);
        formData.append("action", "login");
        // URL to send request
        let url = config.restDir + "/auth";
        // Token of user for authorization
        // let bearer = 'Bearer ' + bearer_token; // Login no dispone del token aún (se envía pass y se obtiene un token para posteriori)
        // Headers
        // let headers = new Headers();
        // headers.append("Authorization", bearer);
        // headers.append("Content-Type", "application/json"); // Login no necesita content-type, viene implícito en el form
        var myInit = {
            method: "POST",
            //headers: headers,
            //withCredentials: true,
            //credentials: "include",
            mode: "cors",
            cache: "default",
            body: formData
        };
        let request = new Request(url, myInit);
        // Enviamos la petición
        fetch(request).then(function(response) {
            if (response.ok) return response.json();
            else return 'Ha habido un error en la conexión con el servidor';
        }).then(function(json) {
            switch (typeof json) {
                case 'object':
                    if (json[0].role === 'user') {
                        // Guardamos datos básicos de usuario
                        saveUserSession(json);
                        // Redireccionamos a la página principal del usuario
                        window.location.replace('./private/app/html/home.html');
                    } else if (json[0].role === 'root') {
                        // Redireccionamos a la página de admin
                        window.location.redirect('./private/app/html/adminPanel.html');
                    }
                    hideModalPanel('loginPanel');
                    break;
                case 'string':
                    alert(json);
                    break;
                default:
            }
        });
    }
}

function saveUserSession(userDataSession) {    
    localStorage.setItem("mail", userDataSession[0].mail);
    localStorage.setItem("name", userDataSession[0].name);
}
function logout() {
    let url = config.restDir + "/auth";
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let myInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            action: "logout"
        })
    };
    let request = new Request(url, myInit);
    // Enviamos la petición
    fetch(request).then(function(response) {
        if (response.ok) return response.json();
        else return false;
    }).then(function(json) {
        if (json) {
            localStorage.clear();
            alert("Sesión cerrada, nos vemos pronto!");
            window.location.replace(config.indexDir);
        } else {
            alert("Ha habido un problema al cerrar la sesión, vuelve a intentarlo");
        }
    });
}
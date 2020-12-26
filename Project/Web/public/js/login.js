var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function logValidation() {
    var email = document.getElementById("log_email").value;
    var password = document.getElementById("log_password").value;
    if (email == "ecoprogress" && password == "1234") {
        //alert("Has sido logeado");
        // Para el servidor la direccion es, de momento, 
        // window.location = "./../../private/app/html/home.html"; // Redirecting to other page. //server
        window.location = "../Web/private/app/html/home.html"; // Redirecting to other page.
    } else if (email == "admin" && password == "admin") {
        window.location = "../Web/private/app/html/adminPanel.html"; // Redirecting to admin page.
    } else {
        attempt--; // Decrementing by one.
        alert("Te quedan " + attempt + " intentos");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("log_email").disabled = true;
            document.getElementById("log_password").disabled = true;
            document.getElementById("log_submit").disabled = true;
        }
    }
    return false;
}
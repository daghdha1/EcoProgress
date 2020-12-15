var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email == "ecoprogress" && password == "1234") {
        //alert("Has sido logeado");
		// Para el servidor la direccion es, de momento, 
		// window.location = "./../../private/app/html/home.html"; // Redirecting to other page. //server
        window.location = "../Web/private/app/html/home.html"; // Redirecting to other page.
        return false;
    } else {
        attempt--; // Decrementing by one.
        alert("Te quedan " + attempt + " intentos");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("email").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}
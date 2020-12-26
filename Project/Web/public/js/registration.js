function regValidation() {
	let name = document.getElementById("log_name").value;
    var email = document.getElementById("log_email").value;
    var password = document.getElementById("log_password").value;
    alert("Has sido registrado satisfactoriamente");
    window.location = "../Web/private/app/html/home.html"; // Redirecting to other page.
    alert("Te quedan " + attempt + " intentos");
    // Disabling fields after 3 attempts.
    if (attempt == 0) {
        document.getElementById("log_email").disabled = true;
        document.getElementById("log_password").disabled = true;
        document.getElementById("log_submit").disabled = true;
    }
}
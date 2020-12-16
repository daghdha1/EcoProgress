function showUserData() {
    getUser((userData) => {
        fillInUserFields(userData)
        //console.log(userData);
    });
}

function fillInUserFields(userData) {
    document.getElementById("name").innerHTML = userData.name;
    document.getElementById("surnames").innerHTML = userData.surnames;
    document.getElementById("mail").innerHTML = userData.mail;
    document.getElementById("devices").innerHTML = userData.devices[0] + ", " + userData.devices[1];
}
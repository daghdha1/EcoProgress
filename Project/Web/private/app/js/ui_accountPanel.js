function showUserData() {
    getUser((dataReceived) => {
        fillInUserFields(dataReceived);
    }, "daghdha@developer.com");
}

function fillInUserFields(userData) {
    document.getElementById("name").innerHTML = userData.name;
    document.getElementById("surnames").innerHTML = userData.surnames;
    document.getElementById("mail").innerHTML = userData.mail;
    document.getElementById("devices").innerHTML = userData.devices[0] + ", " + userData.devices[1];
}
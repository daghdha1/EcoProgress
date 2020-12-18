showUserData();

function showUserData() {
    getUser((dataReceived) => {
        console.log(dataReceived);
        fillInUserFields(dataReceived);
    }, "daghdha@developer.com");
}

function fillInUserFields(userData) {
    document.getElementById("l_name").innerHTML = userData.name;
    document.getElementById("l_surnames").innerHTML = userData.surnames;
    document.getElementById("l_mail").innerHTML = userData.mail;
    document.getElementById("l_devices").innerHTML = "C000001";
}
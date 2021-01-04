showUserData();

function showUserData() {
    getUser((dataReceived) => {
        fillInUserFields(dataReceived);
    }, "test@test");
}

function fillInUserFields(userData) {
    document.getElementById("l_name").innerHTML = userData[0].name;
    document.getElementById("l_surnames").innerHTML = userData[0].surnames;
    document.getElementById("l_mail").innerHTML = userData[0].mail;
    document.getElementById("l_devices").innerHTML = "C000001";
}
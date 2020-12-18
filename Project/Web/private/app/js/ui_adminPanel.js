showUserData();
showActiveTimeUser();

// Callbacks
function showUserData() {
    getUser((dataReceived) => {
        fillInUserFields(dataReceived);
    }, "daghdha@developer.com");
}

function showActiveTimeUser() {
    getActiveTimeUser((dataReceived) => {
        fillInActiveTimeField(dataReceived);
    }, "daghdha@developer.com", "hour");
}

// Fill functions
function fillInUserFields(userData) {
    document.getElementById("a_name").innerHTML = userData.name;
    document.getElementById("a_surnames").innerHTML = userData.surnames;
    document.getElementById("a_devices").innerHTML = userData.devices[0];
}

function fillInActiveTimeField(activeTime) {
    document.getElementById("a_totalTimeActive").innerHTML = convertSecondsToFormatTime(activeTime);
}
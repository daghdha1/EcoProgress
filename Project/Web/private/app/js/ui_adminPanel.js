showUserListData();
showUserData();
showActiveTimeUser();
// Callbacks
function showUserListData() {
    getAllUsers((dataReceived) => {
        fillUsersTable(dataReceived);
    });
}

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
function fillUsersTable(userListData) {
    var table = document.querySelector("#usersDataTable").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    for (let i = 0; i < userListData.length; i++) {
        var tr = table.insertRow(-1);
        var cellName = tr.insertCell(-1);
        cellName.innerHTML = userListData[i].name;
        var cellMail = tr.insertCell(-1);
        cellMail.innerHTML = userListData[i].mail;
        var cellTypeDevice = tr.insertCell(-1);
        cellTypeDevice.innerHTML = "C000001";
    }
}

function fillInUserFields(userData) {
    document.getElementById("a_name").innerHTML = userData.name;
    document.getElementById("a_surnames").innerHTML = userData.surnames;
    document.getElementById("a_devices").innerHTML = userData.devices[0];
}

function fillInActiveTimeField(activeTime) {
    document.getElementById("a_totalTimeActive").innerHTML = convertSecondsToFormatTime(activeTime);
}
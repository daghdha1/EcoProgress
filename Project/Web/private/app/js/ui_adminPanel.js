showUsersTable();
showUserData();
showActiveTimeUser();
showTotalDistanceUser();
//////// Callbacks functions ////////
function showUsersTable() {
    getAllUsers((dataReceived) => {
        fillUsersTable(dataReceived);
    });
}

function showUserData() {
    getUser((dataReceived) => {
        console.log(dataReceived);
        fillInUserFields(dataReceived);
    }, "test@test");
}

function showActiveTimeUser() {
    getActiveTimeUser((dataReceived) => {
        fillInActiveTimeField(dataReceived);
    }, "test@test", "hour");
}

function showTotalDistanceUser() {
    // TODO: falta llamar a la funcion de distancia total
    fillInTotalDistanceField("1325m");
}
//////// Fill functions ////////
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
    document.getElementById("a_name").innerHTML = userData[0].name;
    document.getElementById("a_surnames").innerHTML = userData[0].surnames;
    document.getElementById("a_devices").innerHTML = "COOOOO1";
}

function fillInActiveTimeField(activeTime) {
    document.getElementById("a_timeActive").innerHTML = convertSecondsToFormatTime(activeTime);
}

function fillInTotalDistanceField(distance) {
    document.getElementById("a_totalDistance").innerHTML = distance;
}
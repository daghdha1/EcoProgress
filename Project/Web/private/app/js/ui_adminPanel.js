showUsersTable();
showActiveTimeUser();
showTotalDistanceUser();
/*****************************************************************************
/*************************** CALLBACK FUNCTIONS ******************************
/****************************************************************************/
function showUsersTable() {
    getSensorIdsFromUser((dataReceived) => {
        fillUsersTable(dataReceived);
        if (dataReceived.length > 0) {
            showUserData(dataReceived[0].mail);
        }
    });
}

function showUserData(mail) {
    getUser((dataReceived) => {
        console.log("HERE--> " + dataReceived);
        fillInUserFields(dataReceived);
    }, mail);
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
/*****************************************************************************
/*************************** FILL DOM FUNCTIONS ******************************
/****************************************************************************/
function fillUsersTable(dataUserList) {
    var table = document.querySelector("#usersDataTable").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    for (let i = 0; i < dataUserList.length; i++) {
        var tr = table.insertRow(-1);
        var cellName = tr.insertCell(-1);
        cellName.innerHTML = dataUserList[i].name;
        var cellMail = tr.insertCell(-1);
        cellMail.innerHTML = dataUserList[i].mail;
        var cellTypeDevice = tr.insertCell(-1);
        cellTypeDevice.innerHTML = dataUserList[i].type;
    }
}

function fillInUserFields(userData) {
    document.getElementById("lbl_name").innerHTML = userData[0].name;
    document.getElementById("lbl_surnames").innerHTML = userData[0].surnames;
    document.getElementById("lbl_devices").innerHTML = "COOOOO1";
}

function fillInActiveTimeField(activeTime) {
    document.getElementById("lbl_activity_time").innerHTML = convertSecondsToFormatTime(activeTime);
}

function fillInTotalDistanceField(distance) {
    document.getElementById("lbl_total_distance").innerHTML += distance;
}
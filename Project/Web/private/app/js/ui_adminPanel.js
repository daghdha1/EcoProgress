initUsersTable(true);
initTopStatsData();
/*****************************************************************************
/*************************** CALLBACK FUNCTIONS ******************************
/****************************************************************************/
function initUsersTable(moveBackground) {
    getUserDataAndSensorIds((dataReceived) => {
        if (dataReceived.length > 0) {
            // Users Table
            fillUsersTable(dataReceived);
            // Row selected
            let rowSelected;
            // In register update
            if (moveBackground) {
                rowSelected = document.getElementById("userTableCells").rows[0];
            } else {
                rowSelected = document.getElementById("userTableCells").rows[myIndex.lastRowIndex];
            }
            // Aplicamos el background color
            rowSelected.style.background = "#00b7d1";
            // Obtenemos los datos de user
            let mail = rowSelected.cells[1].innerText;
            let devices = rowSelected.cells[2].innerText;
            // Iniciamos el relleno de los datos de usuario
            initUserData(mail, devices);
            // Add row table listener
            addTableListenerToGetEmailFromRowClicked();
        }
    });
}

function initUserData(mail, devices) {
    showUserData(mail);
    showUserActiveTime(mail, "hour");
    showUserTotalTraveledDistance(mail);
    showUserDevices(devices);
}

function initTopStatsData() {
    showMaxDistanceOfUser();
    showMaxActiveTimeOfUser();
    showPercentActiveTimeOfUsers();
    showPercentUsedOfSensors();
}
/*************************** USER DATA ******************************/
function showUserData(mail) {
    getUser((dataReceived) => {
        fillInUserFields(dataReceived);
    }, mail);
}

function showUserActiveTime(mail, diffValue) {
    getActiveTimeOfUser((dataReceived) => {
        fillInUserActiveTimeField(dataReceived);
    }, mail, diffValue);
}

function showUserTotalTraveledDistance(mail) {
    getTraveledDistanceOfUser((dataReceived) => {
        let totalDistance = 0;
        if (dataReceived.length > 0) {
            dataReceived.forEach(data => {
                totalDistance += Math.round(data.distance);
            });
        }
        fillInUserTotalDistanceField(totalDistance);
    }, mail);
}

function showUserDevices(devices) {
    fillInUserDevicesField(devices);
}
/*************************** TOP STATS ******************************/
function showMaxDistanceOfUser() {
    //getMaxDistanceOfUser((dataReceived) => {});
    let maxDistance = "52519";
    let mail = 'test@test';
    fillInMaxDistanceOfUser(maxDistance, mail);
}

function showMaxActiveTimeOfUser() {
    getMaxActiveTimeOfUser((dataReceived) => {
        let maxActiveTime = convertSecondsToFormatTime(dataReceived[0]['maxTime']);
        let mail = dataReceived[0]['user'];
        fillInMaxActiveTimeOfUser(maxActiveTime, mail);
    });
}

function showPercentActiveTimeOfUsers() {
    fillInPercentActiveTimeOfUsers();
}

function showPercentUsedOfSensors() {
    fillInPercentUsedOfSensors();
}
/*************************************************************************
/*************************** FORM FUNCTIONS ******************************
/*************************************************************************/
function showAndFillUpdateUserPanel() {
    initPrivateModalPanel('updateUserPanel', null, () => {
        setTextValueDOM("mail", getTextValueDOM("lbl_mail"));
        setTextValueDOM("name", getTextValueDOM("lbl_name"));
        setTextValueDOM("surnames", getTextValueDOM("lbl_surnames"));
        setTextValueDOM("account_status", getTextValueDOM("lbl_account_status"));
        setReadOnlyInputDOM("mail");
    });
}

function showAndFillDeleteUserPanel() {
    initPrivateModalPanel('deleteUserPanel', null, () => {
        setTextValueDOM("mail", getTextValueDOM("lbl_mail"));
    });
}
/*************************************************************************
/*************************** FILL FUNCTIONS ******************************
/*************************************************************************/
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

function refreshUsersTable(userData, moveBackground) {
    // Reiniciamos la tabla de usuarios
    initUsersTable(moveBackground);
}

function fillInUserFields(userData) {
    document.getElementById("lbl_name").innerHTML = userData[0].name;
    document.getElementById("lbl_surnames").innerHTML = userData[0].surnames;
    document.getElementById("lbl_mail").innerHTML = userData[0].mail;
    document.getElementById("lbl_role").innerHTML = userData[0].role;
    document.getElementById("lbl_account_status").innerHTML = userData[0].accountStatus;
    document.getElementById("lbl_secret_code").innerHTML = userData[0].secretCode;
    document.getElementById("lbl_last_conn").innerHTML = timeConverter(userData[0].lastConn);
    document.getElementById("lbl_reg_date").innerHTML = timeConverter(userData[0].regDate);
}

function fillInUserActiveTimeField(activeTime) {
    document.getElementById("lbl_activity_time").innerHTML = convertSecondsToFormatTime(activeTime);
}

function fillInUserTotalDistanceField(distance) {
    document.getElementById("lbl_total_distance").innerHTML = distance + " metros";
}

function fillInUserDevicesField(devices) {
    document.getElementById("lbl_devices").innerHTML = devices;
}

function fillInMaxDistanceOfUser(maxDistance, mail) {
    document.getElementById("lbl_user_max_distance").innerHTML = maxDistance + "m del usuario " + mail;
}

function fillInMaxActiveTimeOfUser(maxActiveTime, mail) {
    document.getElementById("lbl_user_max_active").innerHTML = maxActiveTime + " del usuario " + mail;
}

function fillInPercentActiveTimeOfUsers() {
    document.getElementById("lbl_percent_users_active").innerHTML = "65%";
}

function fillInPercentUsedOfSensors() {
    document.getElementById("lbl_percent_used_sensors").innerHTML = "50%";
}
/*****************************************************************************
/******************************** LISTENERS **********************************
/****************************************************************************/
function addTableListenerToGetEmailFromRowClicked(tr) {
    $('#userTableCells').delegate('tr', 'click', (e) => {
        // Descoloreamos la row antigua
        document.getElementById("userTableCells").rows[myIndex.lastRowIndex].style.background = null;
        // Coloreamos la row clickada
        e.currentTarget.style.background = "#00b7d1";
        // Obtenemos el index de la row clickada
        rowIndex = $(e.currentTarget).index();
        // Si hemos clickado en un usuario distinto
        if (rowIndex != myIndex.lastRowIndex) {
            // Obtenemos el email y los dispositivos del usuario seleccionado
            let mail = e.currentTarget.cells[1].innerText;
            let devices = e.currentTarget.cells[2].innerText;
            // Mostramos sus datos en el panel de usuario
            initUserData(mail, devices);
            // Guardamos el index de la row clickada
            myIndex.lastRowIndex = rowIndex;
        }
        return true;
    });
}
// #######################################################################
// #######################################################################
// #######################################################################
// #######################################################################
// #######################################################################
//                                 MAPAS
// #######################################################################
// #######################################################################
// #######################################################################
// #######################################################################
// #######################################################################
function getHistoricNamesForDropdown() {
    getHistoricNames((names) => {
        var dropdown = document.getElementById("dropdown");
        names.forEach(name => {
            var li = document.createElement("li");
            let a = document.createElement("a");
            a.innerHTML = name;
            a.href = "#"
            li.appendChild(a);
            dropdown.appendChild(li);
        });
    })
}
drawMap();
document.getElementById('dropdown').onclick = function(event) {
    console.log("---->", event.target.innerHTML);
    getHistoric(event.target.innerHTML, (heatmap) => {
        let data = parseToObjectForHeatmap(heatmap);
        changeHeatmap(data);
    });
}
getHistoricNamesForDropdown();
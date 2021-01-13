showUsersTable();
/*****************************************************************************
/*************************** CALLBACK FUNCTIONS ******************************
/****************************************************************************/
function showUsersTable() {
    getSensorIdsFromUser((dataReceived) => {
        if (dataReceived.length > 0) {
            fillUsersTable(dataReceived);
            document.getElementById("userTableCells").rows[myIndex.lastRowIndex].style.background = "#00b7d1";
            addTableListenerToGetEmailFromRowClicked();
            showUserData(dataReceived[0].mail);
            showActiveTimeUser(dataReceived[0].mail, "hour");
            showTotalDistanceUser(dataReceived[0].mail);
        }
    });
}

function showUserData(mail) {
    getUser((dataReceived) => {
        fillInUserFields(dataReceived);
    }, mail);
}

function showActiveTimeUser(mail, diffValue) {
    getActiveTimeOfUser((dataReceived) => {
        fillInActiveTimeField(dataReceived);
    }, mail, diffValue);
}

function showTotalDistanceUser(mail) {
    // TODO: falta llamar a la funcion de distancia total en rest_users --> getTraveledDistanceOfUser()
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
    document.getElementById("lbl_email").innerHTML = userData[0].mail;
    document.getElementById("lbl_role").innerHTML = userData[0].role;
    document.getElementById("lbl_account_status").innerHTML = userData[0].accountStatus;
    document.getElementById("lbl_secret_code").innerHTML = userData[0].secretCode;
    document.getElementById("lbl_last_conn").innerHTML = timeConverter(userData[0].lastConn);
    document.getElementById("lbl_reg_date").innerHTML = timeConverter(userData[0].regDate);
}

function fillInActiveTimeField(activeTime) {
    document.getElementById("lbl_activity_time").innerHTML = convertSecondsToFormatTime(activeTime);
}

function fillInTotalDistanceField(distance) {
    document.getElementById("lbl_total_distance").innerHTML = distance;
}

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
            // Obtenemos el email del usuario seleccionado
            let mail = e.currentTarget.cells[1].innerText;
            // Mostramos sus datos en el panel de usuario
            showUserData(mail);
            showActiveTimeUser(mail, "hour");
            showTotalDistanceUser(mail);
            // Guardamos el index de la row clickada
            myIndex.lastRowIndex = rowIndex;
        }
        return true;
    });
}
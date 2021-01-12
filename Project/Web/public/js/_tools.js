// -------------------------------------------------------------------------------- //
// -------------------------  Manejador de responses (JSON) ----------------------- //
// -------------------------------------------------------------------------------- //
function responseHandler(json, callback = null) {
    switch (true) {
        case json == null:
            alert("Error en la conexión con el servidor");
            break;
        case json.hasOwnProperty('error'):
            alert(json.error + ": Class--> " + json.class + ", Method--> " + json.method + ", at line " + json.line + ". (Auth-->" + json.auth + ")");
            if (json.auth === 1) window.location.replace(config.indexDir);
            break;
        case Array.isArray(json):
            if (callback != null) callback(json);
            break;
    }
}
// -------------------------------------------------------------------------------- //
// -------------------- Funciones interacción DOM (HTML/CSS) ---------------------- //
// -------------------------------------------------------------------------------- //
function initModalPanel(namePanel, cb1, cb2) {
    if (document.getElementById(namePanel) == null) {
        $.ajax({
            url: './public/html/' + namePanel + '.html',
            dataType: 'html',
            success: (data) => {
                document.body.insertAdjacentHTML('beforeend', data);
                configModalPanel(namePanel, cb1, cb2);
                showModalPanel(namePanel);
            }
        });
    }
}

// -------------------------------------------------------------------------------- //
// -------------------- Funciones interacción DOM (HTML/CSS) ---------------------- //
// -------------------------------------------------------------------------------- //
function initPrivateModalPanel(namePanel, cb1, cb2) {
    if (document.getElementById(namePanel) == null) {
        $.ajax({
            url: './' + namePanel + '.html',
            dataType: 'html',
            success: (data) => {
                document.body.insertAdjacentHTML('beforeend', data);
                configModalPanel(namePanel, cb1, cb2);
                showModalPanel(namePanel);
            }
        });
    }
}

function configModalPanel(namePanel, hiddenCallback, shownCallback) {
    $('#' + namePanel).modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#' + namePanel).on('hidden.bs.modal', () => {
        destroyModalPanel(namePanel);
        if (hiddenCallback != null) hiddenCallback();
    });
    $('#' + namePanel).on('shown.bs.modal', () => {
        findAndFocusFirstInputForm();
        if (shownCallback != null) shownCallback();
    });
}

function showModalPanel(namePanel) {
    $('#' + namePanel).modal('show');
}

function hideModalPanel(namePanel) {
    $('#' + namePanel).modal('hide');
}

function destroyModalPanel(namePanel) {
    // Solo elimina la instancia, no el elemento del DOM
    //$('#' + namePanel).modal('dispose');
    removeElementDOM(namePanel);
}

function swapModalPanel(activePanel, targetPanel, cb1, cb2) {
    hideModalPanel(activePanel);
    initModalPanel(targetPanel, cb1, cb2);
}

function createElementDOM(containerId, html) {
    return document.getElementById(containerId).insertAdjacentHTML('beforeend', html);
}

function clearElementDOM(id) {
    document.getElementById(id).value = "";
}

function removeElementDOM(id) {
    document.getElementById(id).remove();
}

function showElementDOM(id) {
    document.getElementById(id).style.display = "inline";
}

function hideElementDOM(id) {
    document.getElementById(id).style.display = "none";
}

function setFocusElementDOM(id) {
    document.getElementById(id).focus();
}

function setReadOnlyInputDOM(id) {
    document.getElementById(id).readOnly = true;
}

function getTextValueDOM(id) {
    return document.getElementById(id).value.replace(/<[^>]*>/g, "");
}

function setTextValueDOM(id, str) {
    document.getElementById(id).value = str;
}

function setPlaceHolderDOM(id, str) {
    document.getElementById(id).placeholder = str;
}

function findAndFocusFirstInputForm() {
    $(document).ready(() => {
        let e = $("form").find("*").filter(":input:visible:enabled:not([readonly]):first").get(0);
        setFocusElementDOM(e.id);
    });
}

function executeCallbackBtnDOM(id, cb=null) {
    $("#" + id).on("click", (e) => {
        if (cb != null) cb();
    });
}

function isValidForm(form, params) {
    for (var i = 1; i < params.length; i++) {
        if (form[params[i]].name != 'reg_surnames') {
            if (form[params[i]].value.length == 0 || form[params[i]].name == 'reg_password_confirm' && form[params[i]].value != form[params[i - 1]].value) {
                setFocusElementDOM(params[i]);
                return false;
            }
        }
    }
    return true;
}

// -------------------------------------------------------------------------------- //
// ------------------------------ Funciones Tiempo -------------------------------- //
// -------------------------------------------------------------------------------- //
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function convertSecondsToFormatTime(seconds) {
    var a = new Date(seconds * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + 'h:' + min + 'm:' + sec + 's';
    return time;
}
//******************************************************************
//          Funciones para generar datos aleatorios
//******************************************************************
function randomDataArray() {
    var dataArray = [];
    var start = 20;
    var range = 10;
    for (var i = 0; i < 10; i++) {
        let aux = getRandomInt(start - range, start + range)
        aux < 0 ? aux = 0 : aux = aux;
        dataArray.push(aux);
        start = aux;
    }
    return dataArray;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
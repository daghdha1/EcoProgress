function initModalPanel(namePanel, cb1, cb2) {
    if (document.getElementById(namePanel) == null) {
        $.ajax({
            url: '../html/' + namePanel + '.html',
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
        findAndFocusFirstInputFormElement();
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

function findAndFocusFirstInputFormElement() {
    $(document).ready(() => {
        let e = $("form").find("*").filter(":input:visible:enabled:not([readonly]):first").get(0);
        setFocusElementDOM(e.id);
    });
}

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
// Funciones para generar datos aleatorios
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
    console.log(dataArray);
    return dataArray;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//******************************************************************
//******************************************************************
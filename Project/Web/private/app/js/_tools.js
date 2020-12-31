function initModalPanel(namePanel, callback) {
    if (document.getElementById(namePanel) == null) {
        $.ajax({
            url: '../html/' + namePanel + '.html',
            dataType: 'html',
            success: function(data) {
                document.body.insertAdjacentHTML('beforeend', data);
                configModalPanel(namePanel);
                showModalPanel(namePanel);
                if (callback != null) callback();
            }
        });
    }
}

function configModalPanel(namePanel) {
    $('#' + namePanel).modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#' + namePanel).on('hidden.bs.modal', function() {
        destroyModalPanel(namePanel);
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

function swapModalPanel(activePanel, targetPanel, callback) {
    hideModalPanel(activePanel);
    initModalPanel(targetPanel, callback);
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
function showModalPanel(namePanel) {
    if (!document.getElementById(namePanel)) {
        $.ajax({
            url: '../html/' + namePanel + '.html',
            dataType: 'html',
            success: function(data) {
                document.body.insertAdjacentHTML('afterbegin', data);
                initModalPanel(namePanel);
            }
        });
    } else {
        initModalPanel(namePanel);
    }
}

function initModalPanel(namePanel) {
    $('#' + namePanel).modal({
        show: true,
        keyboard: false
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
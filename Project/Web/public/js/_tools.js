function showThisModalPanel(namePanel) {
    if (!document.getElementById(namePanel)) {
        $.ajax({
            url: './public/html/' + namePanel + '.html',
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
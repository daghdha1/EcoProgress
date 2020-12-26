function initModalPanel(namePanel) {
    if (!document.getElementById(namePanel)) {
        $.ajax({
            url: './public/html/' + namePanel + '.html',
            dataType: 'html',
            success: function(data) {
                document.body.insertAdjacentHTML('afterbegin', data);
                showModalPanel(namePanel);
            }
        });
    } else {
        showModalPanel(namePanel);
    }
}

function showModalPanel(namePanel) {
    $('#' + namePanel).modal({
        show: true,
        keyboard: false
    });
}

function hideModalPanel(namePanel) {
    $('#' + namePanel).modal('hide');
}

function swapModalPanel(activePanel, targetPanel) {
    hideModalPanel(activePanel);
    initModalPanel(targetPanel);
}
function isValidForm(form, params) {
    for (var i = 1; i < params.length; i++) {
        if (form[params[i]].name != 'reg_surnames') {
            if (form[params[i]].value.length == 0) {
                setFocusElementDOM(params[i]);
                return false;
            }
        }
    }
    return true;
}

function initModalPanel(namePanel, callback) {
    if (!document.getElementById(namePanel)) {
        $.ajax({
            url: './public/html/' + namePanel + '.html',
            dataType: 'html',
            success: function(data) {
                document.body.insertAdjacentHTML('beforeend', data);
                showModalPanel(namePanel);
                if (callback != null) callback();
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

function swapModalPanel(activePanel, targetPanel, callback) {
    hideModalPanel(activePanel);
    initModalPanel(targetPanel, callback);
}

function createElementDOM(containerId, html) {
    return document.getElementById(containerId).insertAdjacentHTML('beforeend', html);
}

function clearElementDOM(id) {
    document.getElementById(id).value = "";
}

function getTextValueDOM(id) {
    return document.getElementById(id).value.replace(/<[^>]*>/g, "");
}

function setTextValueDOM(id, str) {
    document.getElementById(id).value = str;
}

function setFocusElementDOM(id) {
    document.getElementById(id).focus();
}

function setAsyncFocusElementDOM(id) {
    var r = setInterval(() => {
        if (document.getElementById(id)) {
            clearInterval(r);
            setFocusElementDOM(id);
        }
    }, 100);
};

function setPlaceHolderDOM(id, str) {
    document.getElementById(id).placeholder = str;
}
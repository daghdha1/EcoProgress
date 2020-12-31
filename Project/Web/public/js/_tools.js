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

function initModalPanel(namePanel, callback) {
    if (document.getElementById(namePanel) == null) {
        $.ajax({
            url: './public/html/' + namePanel + '.html',
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
    console.log(namePanel + " eliminado!");
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
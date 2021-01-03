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

function findAndFocusFirstInputFormElement() {
    $(document).ready(() => {
        let e = $("form").find("*").filter(":input:visible:enabled:not([readonly]):first").get(0);
        setFocusElementDOM(e.id);
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
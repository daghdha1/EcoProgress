showActiveTimeUser();

function showActiveTimeUser() {
    getActiveTimeUser((dataReceived) => {
        fillInActiveTimeField(dataReceived);
    }, "daghdha@developer.com", "hour");
}

function fillInActiveTimeField(activeTime) {
    //console.log(convertSecondsToFormatTime(activeTime));
}
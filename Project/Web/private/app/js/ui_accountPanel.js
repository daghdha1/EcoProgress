showUserData();
showUserDevices();

function showUserData() {
    getUser((dataReceived) => {
        fillInUserFields(dataReceived);
    }, localStorage.getItem("mail"));
}

function showUserDevices() {
    getUserDataAndSensorIds((dataReceived) => {
        fillInUserDevicesField(dataReceived);
    }, localStorage.getItem("mail"));
}

function fillInUserFields(userData) {
    document.getElementById("l_name").innerHTML = userData[0].name;
    document.getElementById("l_surnames").innerHTML = userData[0].surnames;
    document.getElementById("l_mail").innerHTML = userData[0].mail;
}

function fillInUserDevicesField(data) {
	console.log(data);
    let strDevices = "";
    data.forEach(user => {
    	console.log("-->" + user.mail);
        if (user.mail == localStorage.getItem("mail")) {
            strDevices += user.type + " ";
        }
    });
    document.getElementById("l_devices").innerHTML = strDevices;
}
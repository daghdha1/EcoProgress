// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function (servidorExpress) {
    

    
    servidorExpress.get('/prueba/', function (peticion, respuesta) {
        console.log(" * GET /prueba ");
        respuesta.send("¡Funciona!");
    });


    // .......................................................
    // GET USUARIOS
    // .......................................................
    servidorExpress.get(
        '/interpolate',
        function (peticion, respuesta) {
            console.log(" * GET /interpolate ");

            let data = getFakeData()
            data = addFixedPoints(data);

            listx = convertDataToString(data.listx);
            console.log("X-> ", listx);

            listy = convertDataToString(data.listy);
            console.log("Y-> ", listy);

            listz = convertDataToString(data.listz);
            console.log("Z-> ", listz);


            writeFile("listx.txt",listx);
            writeFile("listy.txt",listy);
            writeFile("listz.txt",listz);

            executeComand("matlab -nosplash -nodesktop -minimize -r interpola('listx.txt','listy.txt','listz.txt','result.txt')");

            
            respuesta.send("Hola");
            //executeComand();
        });

}

function getFakeData() {

    return {
        listy: [39.014858,39.007964,39.000172],
        listx: [-0.174677, -0.167992, -0.161251],
        listz: [70,30,70]
    }
}

function addFixedPoints(data){
    data.listx.push(-0.181846);
    data.listx.push(-0.145412);
    
    data.listy.push(39.018389);
    data.listy.push(38.998124);

    data.listz.push(0);
    data.listz.push(0);

    return data;
}
function convertDataToString(list) {

    let result = "";
    for (let i = 0; i < list.length; i++) {
        result += list[i];
        if (i != list.length - 1) {
            result += ",";
        }
    }
    return result;
}
const fs = require('fs');
function writeFile(nombre,data) {
    fs.writeFile(nombre, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

const {exec} = require("child_process");

function executeComand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}


// .....................................................................
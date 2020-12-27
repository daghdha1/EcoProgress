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
    servidorExpress.post(
        '/interpolate',
        function (peticion, respuesta) {
            console.log(" * GET /interpolate ");

            let data = JSON.parse(peticion.body)
            data = addFixedPoints(data);

            listx = convertDataToString(data.listx);
            console.log("X-> ", listx);

            listy = convertDataToString(data.listy);
            console.log("Y-> ", listy);

            listz = convertDataToString(data.listz);
            console.log("Z-> ", listz);


            writeFile("listx.txt", listx);
            writeFile("listy.txt", listy);
            writeFile("listz.txt", listz);

            executeComand("matlab -nosplash -nodesktop -minimize -r interpola('listx.txt','listy.txt','listz.txt','result.txt')");

            let interpolation = getMatrixFromFile("result.txt");
            console.log(interpolation);
            respuesta.send(interpolation);
        });
}

executeComand("matlab -nosplash -nodesktop -minimize -r interpola('listx.txt','listy.txt','listz.txt','result.txt')");

setInterval(() => {
    executeComand("matlab -nosplash -nodesktop -minimize -r interpola('listx.txt','listy.txt','listz.txt','result.txt')");
}, 300000);



var fs = require('fs');
var math = require("mathjs")
var lastTimestamp = 0;

function getMatrixFromFile(file) {
    let allx = fs.readFileSync("fixedx.txt", "utf8");
    allx = allx.trim(); // final crlf in file
    let linesx = allx.split("\n");
    let nx = linesx.length;

    let ally = fs.readFileSync("fixedy.txt", "utf8");
    ally = ally.trim(); // final crlf in file
    let linesy = ally.split("\n");
    let ny = linesy.length;


    let all = fs.readFileSync(file, "utf8");
    all = all.trim(); // final crlf in file
    let lines = all.split("\n");
    let n = lines.length;
    console.log(n);

    console.log("Nro Lineas:", n);
    let matriz = [];
    for (let i = 0; i < n; i++) {
        //console.log(i);
        let values = lines[i].split(",");
        let valx = linesx[i].split(",");
        let valy = linesy[i].split(",");
        for (let j = 0; j < values.length; j++) {
            //console.log(values.length)
            /*console.log("Valores: ");
            console.log(valx[j]);
            console.log(valy[j]);
            console.log(values[j]);*/
            //console.log("Posicion:",i + " " + j);
            matriz.push([parseFloat(valy[j]), parseFloat(valx[j]), parseFloat(values[j])]);
        }
    }   
    //console.log(matriz.length);
    return {
        l: matriz
    };
}


function addFixedPoints(data) {
    data.listx.push(-0.181846);
    data.listx.push(-0.145412);
    data.listx.push(-0.145412);
    data.listx.push(-0.181846);

    data.listy.push(39.018389);
    data.listy.push(38.998124);
    data.listy.push(39.018389);
    data.listy.push(38.998124);

    data.listz.push(0);
    data.listz.push(0);
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

function writeFile(nombre, data) {
    fs.writeFileSync(nombre, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

const {
    exec
} = require("child_process");
const {
    Console
} = require('console');

function executeComand(command) {
    let currentTimestamp = Date.now();
    console.log(currentTimestamp);

    if ((lastTimestamp - currentTimestamp) > 300) {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        });
        lastTimestamp = currentTimestamp;
    }
}


// .....................................................................
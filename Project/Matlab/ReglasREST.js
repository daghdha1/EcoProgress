var fs = require('fs');
var math = require("mathjs");
var cfg = require("./config.js");

const fetch = require('node-fetch');

//var exec =  require("child_process");
const {
    exec
} = require("child_process");
// -------------------------- COSAS

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32':
            cmd = `tasklist`;
            break;
        case 'darwin':
            cmd = `ps -ax | grep ${query}`;
            break;
        case 'linux':
            cmd = `ps -A`;
            break;
        default:
            break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

function cosa(cb) {
    let interval = setInterval(() => {
        isRunning('matlab.exe', (status) => {
            console.log(status); // true|false
            if (status == false) {
                clearInterval(interval);
                cb();
            }
        })
    }, 1000);
}
// -------------------------- COSAS

console.log(cfg.lastTimestamp);
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
            console.log(" * POST /interpolate ");

            let data = JSON.parse(peticion.body)
            cfg.n = 2; // data.n / de momento hasta que se reciba por el body
            console.log(data);
            data = addNullPoints(data);

            console.log(data);

            let listx = convertDataToString(data.listx);
            console.log("X-> ", listx);

            let listy = convertDataToString(data.listy);
            console.log("Y-> ", listy);

            let listz = convertDataToString(data.listz);
            console.log("Z-> ", listz);

            writeFile(cfg.pathx, listx);
            writeFile(cfg.pathy, listy);
            writeFile(cfg.pathz, listz);

            //console.log(cfg.basiccommand + " interpola('" + cfg.pathx + "','" + cfg.pathy + "','" + cfg.pathz + "','" + cfg.pathResult + "','" + data.n + "')");

            // ejecuta matlab
            executeComand(cfg.basiccommand + " interpola('" + cfg.pathx + "','" + cfg.pathy + "','" + cfg.pathz + "','" + cfg.pathResult + "'," + cfg.n + ")");

            // comprbar si hemos acabado
            cosa(() => {
                let interpolation = getMatrixFromFile();
                respuesta.send(interpolation);
            });

        });
    servidorExpress.get('/historicNames', function (peticion, respuesta) {
        getFilenamesFromHistoric().then((result) => {
            console.log(result);
            respuesta.send(result);
        })

    });
    servidorExpress.get('/historic', function (peticion, respuesta) {
        console.log(peticion.query.arg)
        let result = getMatrixFromHistoric(peticion.query.arg.toString());
        respuesta.send(result);
    });

    servidorExpress.get('/sensorOficial', function (peticion, respuesta) {
        /* fetch("http://webcat-web.gva.es/webcat_web/datosOnlineRvvcca/obtenerTablaPestanyaDatosOnline").then((response) => {
             return response.text();
         }).then((json) => {
             console.log(json);
             respuesta.send(json);
         });*/
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        newdate =day +"/" + month + "/" + year;
        respuesta.send({
            dia: newdate,
            medida: "0.1"
        });
    });

}
counter = 0;

executeComand(cfg.basiccommand + " interpola('" + cfg.pathx + "','" + cfg.pathy + "','" + cfg.pathz + "','" + cfg.pathResult + "'," + cfg.n + ")");
saveForHistoric();
setInterval(() => {
    if (counter >= 288) {
        counter = 0;
        saveForHistoric();
    } else {
        counter++;
    }
}, 300000);

function saveForHistoric() {

    var dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = "historic/Mapa-" + year + "-" + month + "-" + day
    // File destination.txt will be created or overwritten by default.
    fs.copyFile('./required/result.txt', newdate, (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
    })
}



function getMatrixFromFile() {
    let allx = fs.readFileSync(cfg.pathfx, "utf8");
    allx = allx.trim(); // final crlf in file
    let linesx = allx.split("\n");
    let nx = linesx.length;

    let ally = fs.readFileSync(cfg.pathfy, "utf8");
    ally = ally.trim(); // final crlf in file
    let linesy = ally.split("\n");
    let ny = linesy.length;

    let all = fs.readFileSync(cfg.pathResult, "utf8");
    all = all.trim(); // final crlf in file
    let lines = all.split("\n");
    let n = lines.length;

    let matriz = [];
    for (let i = 0; i < n; i++) {
        let values = lines[i].split(",");
        let valx = linesx[i].split(",");
        let valy = linesy[i].split(",");
        for (let j = 0; j < values.length; j++) {
            matriz.push([parseFloat(valx[j]), parseFloat(valy[j]), parseFloat(values[j])]);
        }
    }
    return matriz;
}


function addNullPoints(data) {

    // Esquinas
    data.listx.push('-0.211071');
    data.listx.push('-0.129491');
    data.listx.push('-0.129491');
    data.listx.push('-0.211071');

    data.listy.push('39.020594');
    data.listy.push('39.020594');
    data.listy.push('38.944588');
    data.listy.push('38.944588');

    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');

    // Playa
    data.listx.push('-0.17301');
    data.listx.push('-0.17105');
    data.listx.push('-0.16921');
    data.listx.push('-0.16781');
    data.listx.push('-0.16545');
    data.listx.push('-0.16361');
    data.listx.push('-0.16151');
    data.listx.push('-0.1585');
    data.listx.push('-0.15661');
    data.listx.push('-0.14902');
    data.listx.push('-0.14584');
    data.listx.push('-0.14249');
    data.listx.push('-0.13889');
    data.listx.push('-0.13554');
    data.listx.push('-0.13026');


    data.listy.push('39.02016');
    data.listy.push('39.01773');
    data.listy.push('39.01515');
    data.listy.push('39.01326');
    data.listy.push('39.01034');
    data.listy.push('39.00799');
    data.listy.push('39.00516');
    data.listy.push('39.00116');
    data.listy.push('38.99829');
    data.listy.push('38.98525');
    data.listy.push('38.98121');
    data.listy.push('38.97741');
    data.listy.push('38.97334');
    data.listy.push('38.9697');
    data.listy.push('38.96507');


    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');
    data.listz.push('0');

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


function executeComand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
    });
}


// .....................................................................


function getFilenamesFromHistoric() {
    let result = new Promise((resolve, reject) => {
        fs.readdir('./historic', function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            let names = [];
            //listing all files using forEach
            files.forEach(function (file) {
                names.push(file);
            });
            resolve(names)
        });
    });;
    return result;
}

function getMatrixFromHistoric(filename) {
    let allx = fs.readFileSync(cfg.pathfx, "utf8");
    allx = allx.trim(); // final crlf in file
    let linesx = allx.split("\n");
    let nx = linesx.length;

    let ally = fs.readFileSync(cfg.pathfy, "utf8");
    ally = ally.trim(); // final crlf in file
    let linesy = ally.split("\n");
    let ny = linesy.length;

    let all = fs.readFileSync('./historic/' + filename, "utf8");
    all = all.trim(); // final crlf in file
    let lines = all.split("\n");
    let n = lines.length;

    let matriz = [];
    for (let i = 0; i < n; i++) {
        let values = lines[i].split(",");
        let valx = linesx[i].split(",");
        let valy = linesy[i].split(",");
        for (let j = 0; j < values.length; j++) {
            matriz.push([parseFloat(valx[j]), parseFloat(valy[j]), parseFloat(values[j])]);
        }
    }

    return matriz;
}
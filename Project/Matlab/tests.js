var fs = require('fs');
function getFilenamesFromHistoric() {
    fs.readdir('./historic', function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        let names = [];
        //listing all files using forEach
        files.forEach(function (file) {
            console.log(file)
            names.push(file);
        });
        console.log(names);
        return names;
    });
}

function getMatrixFromHistoric(filename) {
    console.log("Leyendo file:",filename);
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

let names = getFilenamesFromHistoric();
let result = [];
/*for (let i = 0; i < names.length; i++) {
    result.push(getMatrixFromHistoric(names[i]));
}*/

console.log(result);
//res.send(result);
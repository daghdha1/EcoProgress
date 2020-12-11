
// Crear llamada getMeasuresByLastPeriod() con GET a /measures/period/day
// /measures desaparece de la uri como recurso principal, a partir de ahí, siempre pares de key-value (ej. period/day)
// Se reciben últimas 24h de medidas
//lastDay(); 

// En principio deberiamos de cambiar la cantidad de horas que solicitamos a la api
function lastDay() {
    console.log(calculateQuality(getData(24)));
}

// media aritmetica clasica / promedio
function calculateQuality(res) {
    let result = 0;
    res.forEach(item => {
        result += item;
    });
    return (result / res.length);
}

// 1 g/m3 = 1 mg/L = 1 ppm
function getData(x) {
    // suponiendo que son mg/m3 y que la bd los devuelve asi, si no habrá que parsear
    let data = new Array();
    data = [7, 5, 3, 2, 5, 6, 4, 6, 2];
    return data;
}

function convertToMgM3(array) {
    let result = new Array();
    array.forEach(element => {
        result.push(element * 1.146);
    });
    return result;
}
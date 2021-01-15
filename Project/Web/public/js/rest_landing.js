// He pensado en poner aqui todas aquellas reglas rest que se utilicen y
// que no nos moleste que sean "publicas"  a diferencia de las privadas
/* 
 * Obtiene la última medida tomada del usuario activo
 *
 *                               getAllMeasures() <--
 * <-- ListaMeasures | Nada
 */
function getAllMeasures(callback) {
    var request = new Request(config.restDir + "/measures", {
        method: "GET"
    });
    fetch(request).then((response) => {
        if (response.ok) return response.json();
        else return null;
    }).then((json) => {
        if (json != null) callback(json);
        else window.location.replace(config.indexDir);
    });
}
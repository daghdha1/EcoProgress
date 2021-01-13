// He pensado en poner aqui todas aquellas reglas rest que se utilicen y
// que no nos moleste que sean "publicas"  a diferencia de las privadas
/* 
 * Obtiene la última medida tomada del usuario activo
 *
 *                               getAllMeasures() <--
 * <-- ListaMeasures | Nada
 */
function getAllMeasures(callback) {
    var request = new Request("http://localhost/EcoProgress/Project/Web/private/api/v1.0/measures", {
        method: "GET",
        mode: "same-origin"
    });

    fetch(request).then((response) => {
         return response.json();
    }).then((json) => {
        callback(json);
    });
}
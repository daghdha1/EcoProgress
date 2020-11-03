<?php

class MeasuresController extends BaseController {

	/* Constructor
	* 	
	*	__construct() <-- 
	*/
    public function __construct() {
        parent::__construct();
    }
    
    /* - Recibe y trata una petición GET solicitada
    *  - Se comunica con el modelo correspondiente y obtiene los datos solicitados por la petición
    *  - Una vez recibidos, los delega a la vista correspondiente, encargada de mostrárselos al cliente web
	*
	* Texto -->
	*					getAction() <--
	* <-- Lista<Texto> 
	*/
    public function getAction($request) {
        $result = null;
        // Cargamos el modelo de Measures
        $model = $this->loadModel($request->resource);
        // Obtenemos el array de datos (object)
        $data = $model->getMeasures();
        // Si hay datos
        if (!is_null($data)) {
            // Por cada elemento del array de datos
            for ($i=0; $i < count($data); $i++) {
                // Creamos un nueva medición
                $measure = $this->createEntity($request->resource);
                // Asignamos las propiedades del objeto measure
                $measure->setValue($data[$i]->value);
                $measure->setTimestamp($data[$i]->timestamp);
                $measure->setLocation($data[$i]->location);
                $measure->setSensorID($data[$i]->sensorID);
                // Guardamos la medición
                $result = $measure->toARRAY();
            }
        }
        // Cargamos la vista seleccionada
        $view = $this->loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    // -----------------------------------
    // FUTURE
    public function postAction($request) {
       
    }

    public function putAction($request) {

    }

    public function deleteAction($request) {

    }
}
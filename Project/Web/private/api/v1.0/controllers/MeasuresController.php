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
	* Action -->
	*					getAction() <--
	* <-- Lista<T> 
	*/
    public function getAction($request) {
        // Cargamos el modelo de Measures
        $model = $this->loadModel($request->resource);
        // Obtenemos el array de mediciones (objects)
        $data = $model->getMeasures();
        // Si hay datos
        if (!is_null($data)) {
            // Por cada elemento del array de datos
            for ($i=0; $i < count($data); $i++) {
                // Creamos un nueva medición
                $measure = $this->createEntity($request->resource);
                // Asignamos las propiedades de cada objeto measure
                $measure->setValue($data[$i]->value);
                $measure->setTimestamp($data[$i]->timestamp);
                $measure->setLocation($data[$i]->location);
                $measure->setSensorID($data[$i]->sensorID);
                // Guardamos las mediciones en el array result[]
                $result[] = $measure->toARRAY();
            }
        }
        // Cargamos la vista seleccionada
        $view = $this->loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    /* - Recibe y trata una petición POST solicitada
    *  - Se comunica con el modelo correspondiente y envia los datos facilitados por la petición
    *  - Una vez enviados, los envia de vuelta a la vista correspondiente, encargada de mostrárselos al cliente web
    *
    * Action -->
    *                   postAction() <--
    * <-- Lista<T>
    */
    public function postAction($request) {
       // Cargamos el modelo de Measures
        $model = $this->loadModel($request->resource);
		
        // Enviamos la medida
        $data = $model->postMeasure($request->parameters);
		
		
        // Si hay datos
        if (!is_null($data)) {
            // Creamos un nueva medición
            $measure = $this->createEntity($request->resource);
            // Asignamos las propiedades de cada objeto measure
            $measure->setValue($data['value']);
			$measure->setTimestamp($data['timestamp']);
            $measure->setLocation($data['location']);
            $measure->setSensorID($data['sensorID']);
            $result = $measure->toARRAY();
			}else{
				$result = null;
			}
			
		/*echo "--------------------------\n>";
		print_r($result);
		echo "\n-------------------------->";*/
        // Cargamos la vista seleccionada
        $view = $this->loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    public function putAction($request) {

    }

    public function deleteAction($request) {

    }
}
<?php

class MeasuresController extends BaseController {

	/* Constructor
	* 	
	*	__construct() <-- 
	*/
    public function __construct() {
        parent::__construct();
    }
    
    // -------------------------------------------------------------------------------------- //
    // ------------------------------ GET, POST, PUT, DELETE--------------------------------- //
    // -------------------------------------- ACTIONS --------------------------------------- //
    // -------------------------------------------------------------------------------------- //

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
        $model = parent::loadModel($request->resource);

        // Check de parámetros
        if (!$this->areThereParameters($request->parameters)) {
            // Obtiene todas las medidas
            $result = $this->getMeasures($model, $request);
        } else {
            $result = $this->getIncomingParametersAndExecuteGetMethod($model, $request->parameters);
        }

        // Cargamos la vista seleccionada
        $view = parent::loadView($request->format);
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
        $model = parent::loadModel($request->resource);

        if ($this->areThereParameters($request->parameters)) {
            $result = $this->postMeasure($model, $request);
        } else {
            $result = null;
        }

        // Cargamos la vista seleccionada
        $view = $this->loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    public function putAction($request) {

    }

    public function deleteAction($request) {

    }

    // ---------------------------------- PRIVATE METHODS ------------------------------------- //
    // ---------------------------------------------------------------------------------------- //

    /* 
    * Obtiene todas las medidas disponibles
    *
    * MeasuresModel, Request -->
    *                               getMeasures() <--
    * <-- Lista<MeasureEntity>
    */
    private function getMeasures($model, $request) {
        // Obtenemos el array de mediciones (objects stdClass)
        $data = $model->getMeasures();
        $result = array();
        // Si hay datos
        if (!is_null($data)) {
            // Por cada elemento del array de objetos
            for ($i=0; $i < count($data); $i++) {
                // Creamos un nueva medición
                $measure = parent::createEntity($request->resource);
                // Asignamos las propiedades de cada objeto measure
                $measure->setValue($data[$i]->value);
                $measure->setTimestamp($data[$i]->timestamp);
                $measure->setLocation($data[$i]->location);
                $measure->setSensorID($data[$i]->sensorID);
                // Guardamos las mediciones en el array asociativo $result
                array_push($result, $measure->toARRAY());
            }
        }
        return $result;
    }

    /* 
    * Inserta una medida en la base de datos
    *
    * MeasuresModel, Request -->
    *                              postMeasure() <--
    * <-- MeasureEntity
    */
    private function postMeasure($model, $request) {
        // Enviamos la medida
        $data = $model->postMeasure($request->parameters);
        $result = null;
        // Si hay datos
        if (!is_null($data)) {
            // Creamos un nueva medición
            $measure = parent::createEntity($request->resource);
            // Asignamos las propiedades de cada objeto measure
            $measure->setValue($data['value']);
            $measure->setTimestamp($data['timestamp']);
            $measure->setLocation($data['location']);
            $measure->setSensorID($data['sensorID']);
            $result = $measure->toARRAY();
        }
        return $result;             
    }


    /* 
    * Comprueba si existen parámetros en la petición
    *
    * Lista<Texto> -->
    *                   areThereParameters() <--
    * <-- T | F
    */
    private function areThereParameters(&$params) {
        if (count($params) > 0) {
            return true;
        }
        return false;
    }

    /* 
    * Escoge el método GET acorde con el parámetro recibido
    *
    * MeasuresModel, Lista<Texto> -->
    *                                                       getIncomingParametersAndExecuteGetMethod() <--
    * <-- Lista<MeasureEntity> | MeasureEntity | Nada
    */
    private function getIncomingParametersAndExecuteGetMethod($model, $params) {
        $result = null;
        foreach ($params as $key => $value) {
            switch ($key) {
                case 'period':
                    $timestamp = getTimestampOfPeriod($value);
                    if ($timestamp != -1) {
                        $result = $model->getMeasuresFromTimestamp("1595559909");
                    }
                    break;
                default:
                    break;
            }
        }
        return $result;
    }

}
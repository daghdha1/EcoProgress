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
    // --------------------- THESE METHODS CALL PRIVATE LOGIC METHODS ----------------------- //

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
        if (!areThereParameters($request->parameters)) {
            $result = $this->getAllMeasures($model, $request);
        } elseif (authenticateUserSession()) {
            $result = $this->getIncomingParametersAndExecuteMethod($model, $request);
        } else {
            $result = createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__, 1);
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

        if (areThereParameters($request->parameters)) {
            $result = $this->postMeasure($model, $request);
        } else {
            $result = createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
        }

        // Cargamos la vista seleccionada
        $view = $this->loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    // INFO: php no recomienda el uso de 'put' por seguridad, usar 'post' en su defecto
    public function putAction($request) {

    }

    public function deleteAction($request) {

    }

    // -------------------------------------- PRIVATE LOGIC METHODS ------------------------------------- //
    // -------------------------------------------------------------------------------------------------- //

    // -------------------------------------------- REQUEST --------------------------------------------- //

    /* 
    * Escoge el método GET acorde con el parámetro recibido
    *
    * MeasuresModel, Lista<Texto> -->
    *                                                       getIncomingParametersAndExecuteMethod() <--
    * <-- Lista<MeasureEntity> | MeasureEntity | Nada
    */
    private function getIncomingParametersAndExecuteMethod($model, $request) {
        $params = $request->parameters;
        foreach ($params as $key => $value) {
            switch ($key) {
                case 'users':
                    $mail = $value;
                    if (count($params) === 1) {
                        $dataList = $model->getAllMeasuresOfUser($mail);
                    }
                    break;
                case 'period':
                    if (is_numeric($value)) {
                        $tList = explode('-', $value);
                        $dataList = $model->getMeasuresFromTwoTimestamp($tList[0], $tList[1], $mail);
                    } elseif ($value === 'last') {
                        $dataList = $model->getLastMeasure($mail);
                    } else {
                        $ts = getTimestampOfPeriod($value);
                        $dataList = $model->getMeasuresFromTimestamp($ts, $mail);
                    }
                    break;
                default:
                    break;
            }
        }
        if (!is_null($dataList)) {
            return $this->parseDataListToAssocArrayMeasures($dataList, $request->resource);
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    // ---------------------------------------------- (GET) ----------------------------------------------- //

    /* 
    * Obtiene todas las medidas disponibles
    *
    * MeasuresModel, Request -->
    *                               getAllMeasures() <--
    * <-- Lista<MeasureEntity>
    */
    private function getAllMeasures($model, $request) {
        // Obtenemos el array de mediciones (objects stdClass)
        $dataList = $model->getAllMeasures();
        if (!is_null($dataList)) {
            return $this->parseDataListToAssocArrayMeasures($dataList, $request->resource);
        } 
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    // ---------------------------------------------- (POST) ----------------------------------------------- //

    /* 
    * Inserta una medida en la base de datos
    *
    * MeasuresModel, Request -->
    *                              postMeasure() <--
    * <-- MeasureEntity
    */
    private function postMeasure($model, $request) {
        // Enviamos la medida
        if ($model->postMeasure($request->parameters)) {
            // Creamos un nueva medición
            $measure = parent::createEntity($request->resource)->createMeasureFromParams($request->parameters);
            return $measure->parseMeasureToAssocArrayMeasures(); 
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    // ---------------------------------------------- UTILS ----------------------------------------------- //

    /*
    * Crea un array asociativo de objetos Measure (MeasureEntity) desde una lista de objetos stdClass (TO SEND WITH RESPONSE)
    * 
    * Lista<stdClass>, Texto -->
    *                               parseDataListToAssocArrayMeasures() <--
    * <-- Lista<MeasureEntity>
    *
    * Nota: dataList es una array númerica (iterativa)
    */
    private function parseDataListToAssocArrayMeasures($dataList, $resource) {
        $result = array();
        // Por cada elemento del array de objetos
        for ($i=0; $i < count($dataList); $i++) {
            // Creamos un nueva medición
            $measure = parent::createEntity($resource)->createMeasureFromDatabase($dataList, $i);
            // Guardamos cada measure iterada en el array asociativo $result
            array_push($result, $measure->toARRAY());
        }
        return $result;
    }

}
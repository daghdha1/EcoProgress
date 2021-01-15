<?php

class SensorsController extends BaseController {

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
	*					                     getAction() <--
	* <-- Lista<Lista<T>> | Lista<Error>
	*/
    public function getAction($request) {
        if (true) {
            // Cargamos el modelo de Sensors
            $model = parent::loadModel($request->resource);
            // Check de parámetros
            if (!areThereParameters($request->parameters)) {
                // Obtiene todos los sensores
                $result = $model->getAllSensors();
            } else {
                // Ejecuta el método correspondiente
                $result = $this->getIncomingParametersAndExecuteGetMethod($model, $request);
            }
        } else {
            $result = createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__, 1);
        }

        // Cargamos la vista seleccionada
        $view = parent::loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    // ------------------------------------- PRIVATE LOGIC METHODS ------------------------------------- //
    // ------------------------------------------------------------------------------------------------- //

    // ---------------------------------------------- GET ----------------------------------------------- //

    /* 
    * Escoge el método GET acorde con el parámetro recibido
    *
    * SensorsModel, Lista<Texto> -->
    *                                           getIncomingParametersAndExecuteGetMethod() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function getIncomingParametersAndExecuteGetMethod($model, $request) {
        $params = $request->parameters;
        foreach ($params as $key => $value) {
            switch ($key) {
                case 'users':
                    $dataList = $model->getAllUsersWithSensorIds();
                    break;
                default:
                    break;
            }
        }
        if (!is_null($dataList)) {
            return $this->parseDataListToAssocArray($dataList);
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    // ---------------------------------------------- UTILS ----------------------------------------------- //

    /*
    * Crea un array que contiene un array asociativo de objetos "User/Sensor" desde una lista de objetos stdClass (TO SEND WITH RESPONSE)
    * 
    * Lista<stdClass> -->
    *                         parseDataListToAssocArray() <--
    * <-- Lista<Lista<T>>
    *
    * Nota: dataList es una array númerica (iterativa)
    */
    private function parseDataListToAssocArray($dataList) {
        $resultList = array();

        if (!empty($dataList)) {
            // Guardamos el primer registro en el array de resultados 
            $firstElement = $this->createDataFromDataBase($dataList, 0);
            array_push($resultList, $firstElement);

            // Por cada elemento del array númerico recibido
            for ($i=1; $i < count($dataList); $i++) {
                $isRepeated = false;
                // Por cada elemento del array de resultados
                for ($j=0; $j < count($resultList); $j++) {
                    if ($resultList[$j]['mail'] == $dataList[$i]->mail) {
                        $resultList[$j]['type'] .= ', ' . $dataList[$i]->type;
                        $isRepeated = true;
                        break;
                    }
                }
                if (!$isRepeated) {
                    // Guardamos nuevo elemento en el array de resultados
                    $newElement = $this->createDataFromDataBase($dataList, $i);
                    array_push($resultList, $newElement);
                }
            }
        }
        return $resultList;
    }

    /*
    * Crea un array asociativo de objetos "User/Sensor (T)" desde una lista de objetos stdClass
    * 
    * Lista<stdClass>, N -->
    *                           createDataFromDataBase() <--
    * <-- Lista<T>
    *
    * Nota: dataList es una array númerica (iterativa)
    */
    private function createDataFromDataBase($dataList, $i) {
        return array(
            'name' => $dataList[$i]->name,
            'mail' => $dataList[$i]->mail,
            'type' => $dataList[$i]->type
        );
    }

}
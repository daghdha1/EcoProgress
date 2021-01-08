<?php

class UsersController extends BaseController
{

    /* Constructor
	* 	
	*	__construct() <-- 
	*/
    public function __construct()
    {
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
    public function getAction($request)
    {
        if (authenticateUserSession()) {
            // Cargamos el modelo de Users
            $model = parent::loadModel($request->resource);
            // Check de parámetros
            if (!areThereParameters($request->parameters)) {
                // Obtiene todos los usuarios
                $result = $this->getAllUsers($model, $request);
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

    /* - Recibe y trata una petición POST solicitada
    *  - Se comunica con el modelo correspondiente y envia los datos facilitados por la petición
    *  - Una vez enviados, los envia de vuelta a la vista correspondiente, encargada de mostrárselos al cliente web
    *
    * Action -->
    *                   postAction() <--
    * <-- Lista<T>
    */
    public function postAction($request)
    {
    }

    // INFO: php no recomienda el uso de 'put' por seguridad, usar 'post' en su defecto
    public function putAction($request)
    {
    }

    public function deleteAction($request)
    {
    }

    // ------------------------------------- PRIVATE LOGIC METHODS ------------------------------------- //
    // ------------------------------------------------------------------------------------------------- //

    // ---------------------------------------------- GET ----------------------------------------------- //

    /* 
    * Escoge el método GET acorde con el parámetro recibido
    *
    * UsersModel, Lista<Texto> -->
    *                                   getIncomingParametersAndExecuteGetMethod() <--
    * <-- UserEntity | N | Nada
    */
    private function getIncomingParametersAndExecuteGetMethod($model, $request)
    {
        $params = $request->parameters;
        foreach ($params as $key => $value) {
            switch ($key) {
                case 'users':
                    $mail = $value;
                    if (count($params) === 1) {
                        $data = $model->getUser($mail);
                        if (!is_null($data) && !empty($data)) {
                            $user = parent::createEntity($request->resource)->createUserFromDatabase($data);
                            $result = $user->parseUserToAssocArrayUsers();
                        } elseif (is_null($data)) {
                            $result = createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
                        } else {
                            $result = $data;
                        }
                    }
                    break;

                case 'difference':
                    if ($value === 'half') {
                        $time = 1800;
                    } elseif ($value === 'hour') {
                        $time = 3600;
                    }
                    $data=$model->getActiveTimeOfUser($mail);
                    $result = $this->getDifference($mail, $time);
                    break;

                case 'distance':
                    $data = $model->getTraveledDistance($mail);
                    $result = $this->getDistanceFromMail($data);
                    break;
            
                case 'maxDistance':
                    $data = $model->getAllUsers();
                    $result = $this->getMaxDistance($model, $data);
                    break;
                case 'maxDifference':
                    $range=$value;
                    $data = $model->getAllUsers();
                    $result = $this->getMaxDifference($model, $data, $range);
                    break;
                default:
                    break;
            }
        }
        return $result;
    }

    /* 
    * Obtiene todos los usuarios registrados
    *
    * UsersModel, Request -->
    *                               getAllUsers() <--
    * <-- Lista<UserEntity>
    */
    private function getAllUsers($model, $request)
    {
        // Obtenemos el array de usuarios (objects stdClass)
        $dataList = $model->getAllUsers();
        if (!is_null($dataList)) {
            return $this->parseDataListToAssocArrayUsers($dataList, $request->resource);
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    // -------------------------------------------- UTILS ---------------------------------------------- //

    /*
    * Crea un array asociativo de objetos User (UserEntity) desde una lista de objetos stdClass (TO SEND WITH RESPONSE)
    * 
    * Lista<stdClass>, Texto -->
    *                               parseDataListToAssocArrayUsers() <--
    * <-- Lista<UserEntity>
    *
    * Nota: dataList es una array númerica (iterativa)
    */
    private function parseDataListToAssocArrayUsers($dataList, $resource)
    {
        $result = array();
        // Por cada elemento del array de objetos
        for ($i = 0; $i < count($dataList); $i++) {
            // Creamos un nuevo usuario
            $user = parent::createEntity($resource)->createUserFromDatabase($dataList, $i);
            // Guardamos cada user iterado en el array asociativo $result
            array_push($result, $user->toARRAY());
        }
        return $result;
    }


    private function getDifference($data, $range){
        $diff = 0;
		$finalResult = 0;
		if (!is_null($data)) {
			for($i = 0; $i < count($data); $i++) {
				$diff = $data[$i]->timestamp - $data[$i+1]->timestamp;
				if($diff <= $range) {
					$finalResult = $finalResult + $diff;
				}
			}
			// Devuelve el finalResult
			return $finalResult;
		}
        $arr = array();
        $assocArray = array('difference' => $finalResult);
        array_push($arr, $assocArray);
        return $arr;
       // $result=$arr;
}
    /* 
    * Obtiene la distancia total recorrida del usuario activo
    *
    * Texto -->
    *                 			getDistanceFromMail($data) <--
    * <-- array, Nada
	*/
    private function getDistanceFromMail($data)
    {
        //var_dump($data);    
        $distance=0;
        for($i=1; $i<count($data); $i++){
            $measure = parent::createEntity('Measures')->createMeasureFromDatabase($data,$i);
            $measureAnterior = parent::createEntity('Measures')->createMeasureFromDatabase($data, $i-1);
            if(($measure->getTimestamp()-$measureAnterior->getTimestamp())<3600){
                $distance+=haversineDistanceCalculator($measure->getLocation()['latitude'], $measure->getLocation()['longitude'], $measureAnterior->getLocation()['latitude'],  $measureAnterior->getLocation()['longitude']); 
            }
        }
        $arr = array();
        $assocArray = array('distance' => $distance);
        array_push($arr, $assocArray);
        return $arr;
       // $result=$arr;
}

    /* 
    * Obtiene la distancia máxima recorrida por un usuario
    *
    * Texto -->
    *                 			getMaxDistance($data) <--
    * <-- array, Nada
	*/
private function getMaxDistance($model,$data){
    $maxDistance = 0;
    $maxUser = -1;
    //var_dump($data);

    foreach ($data as $item) {
        $measureList = $model->getTraveledDistance($item->mail);
        $actualDistance = $this->getDistanceFromMail($measureList);
        if ($actualDistance > $maxDistance) {
            $maxDistance = $actualDistance;
            $maxUser = $item;
        }
    }
    

    $arr = array();
    $assocArray = array('distance' => round($maxDistance[0]['distance']), 'user'=>$maxUser);
    array_push($arr, $assocArray);
    return $arr;
}

private function getMaxDifference($model,$data, $range){
    $maxDifference = 0;
    $maxUser = -1;
    /*for ($i = 0; $i <= count($data); $i++) {
        $actualDifference = $this->getDifference($data[$i]['mail'], $range);
        if ($actualDifference > $maxDifference) {
            $maxDifference = $actualDifference;
            $maxUser = $i;
        }
    }*/
    foreach ($data as $item) {
        $measureList = $model->getActiveTimeOfUser($item->mail);
        $actualDifference = $this->getDifference($measureList, $range);
        if ($actualDifference > $maxDifference) {
            $maxDifference = $actualDifference;
            $maxUser = $item;
        }
    }

    $arr = array();
    $assocArray = array('difference' => $maxDifference, 'user'=>$maxUser);
    array_push($arr, $assocArray);
    return $arr;
}
}
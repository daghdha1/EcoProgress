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
	*					                     getAction() <--
	* <-- Lista<Lista<T>> | Lista<Error> 
	*/
    public function getAction($request) {
        if (true) {
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
    *                                           postAction() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    public function postAction($request) {
        // Cargamos el modelo de Users
        $usersModel = parent::loadModel("Users");
        // Cargamos el modelo de Sensors
        $sensorsModel = parent::loadModel("Sensors");

        $result = $this->getIncomingParametersAndExecutePostMethod($usersModel, $sensorsModel, $request);

        // Cargamos la vista seleccionada
        $view = parent::loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    // INFO: php no recomienda el uso de 'put' por seguridad, usar 'post' en su defecto
    public function putAction($request) {
    }

    public function deleteAction($request) {
    }

    // ------------------------------------- PRIVATE LOGIC METHODS ------------------------------------- //
    // ------------------------------------------------------------------------------------------------- //

    // ------------------------------------------ (REQUEST) -------------------------------------------- //

    /*
    * (GET)
    * 
    * Escoge el método GET acorde con el parámetro recibido
    *
    * UsersModel, Lista<Texto> -->
    *                                           getIncomingParametersAndExecuteGetMethod() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function getIncomingParametersAndExecuteGetMethod($model, $request) {
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
                    if ($value === 'half') $time = 1800; 
                    elseif ($value === 'hour') $time = 3600;
                    $data = $model->getActiveTimeOfUser($mail);
                    if (!is_null($data) && !empty($data)) {
                        $result = $this->getDifference($data, $time);
                    } elseif (is_null($data)) {
                        $result = createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
                    } else {
                        $result = 0;
                    }
                    break;
                case 'distance':
                    $data = $model->getTraveledDistanceOfUser($mail);
                    if (!is_null($data) && !empty($data)) {
                        $result = $this->getDistanceByRangeFromMeasures($data, 86400);
                    } elseif (is_null($data)) {
                        $result = createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
                    } else {
                        $result = 0;
                    }
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
    * (POST)
    * 
    * Escoge el método POST acorde con el parámetro recibido
    *
    * UsersModel, SensorsModel, Lista<Texto> -->
    *                                                   getIncomingParametersAndExecutePostMethod() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function getIncomingParametersAndExecutePostMethod($usersModel, $sensorsModel, $request) {
        $params = $request->parameters;
        // Si existe una de estas acciones, la ejecutamos
        if (isset($params['action'])) {
            switch ($params['action']) {
                case 'registration':
                    if($this->checkRegistrationData($usersModel, $sensorsModel, $params, 1)) {
                        $result = $this->registration($usersModel, $params);
                    } else {
                        $result = createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
                    }
                    break;
                case 'accountActivation':
                    if($this->checkRegistrationData($usersModel, $sensorsModel, $params, 2)) {
                        if ($this->checkRegistrationCode($usersModel, $params)) {
                            $result = $this->accountActivation($usersModel, $sensorsModel, $params);
                        }
                    }
                    break;
                case 'login':
                    if ($this->checkLoginData($usersModel, $params)) {
                        $result = $this->login($usersModel, $params);
                    } else {
                        $result = createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
                    }
                    break;
                case 'logout':
                    $result = $this->deleteUserSession();
                    break;
                case 'recovery':
                    // $result = $model->recovery($params['email']);
                    break;
            }
            return $result;
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    // ---------------------------------------------- (GET) ----------------------------------------------- //

    /* 
    * Obtiene todos los usuarios registrados
    *
    * UsersModel, Request -->
    *                                                   getAllUsers() <--
    * <-- Lista<Lista<UserEntity>> | Lista<Error>
    */
    private function getAllUsers($model, $request) {
        // Obtenemos el array de usuarios (objects stdClass)
        $dataList = $model->getAllUsers();
        if (!is_null($dataList)) {
            return $this->parseDataListToAssocArrayUsers($dataList, $request->resource);
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    /* 
    * Obtiene el tiempo activo de un usuario en un rango especificado
    *
    * Texto, -->
    *                    getDifference() <--
    * <-- N, Nada
    */
    private function getDifference($data, $range){
        $diff = 0;
        $finalResult = 0;
        for($i = 0; $i < count($data)-1; $i++) {
            $diff = $data[$i]->timestamp - $data[$i+1]->timestamp;
            if($diff <= $range) {
                $finalResult = $finalResult + $diff;
            }
        }
        // Devuelve el finalResult
        return $finalResult;
    }
    
    private function getDistanceByRangeFromMeasures($measures, $range) {
        $measuresByDay =  $this->orderMeasuresByDay($measures, $range);
        $distanceByDay = array();

        for ($i=0; $i < count($measuresByDay) ; $i++) { 
            $distance = $this->calculateDistanceOfMeasureList($measuresByDay[$i]);
            if($distance > 0) {
                $timestamp = $measuresByDay[$i][0]->timestamp - ($measuresByDay[$i][0]->timestamp % $range); // para conseguir las 12am.
                $obj = array(
                    'distance' => $distance,
                    'timestamp' => $timestamp 
                );
                array_push($distanceByDay,$obj);
            }
        }
        return $distanceByDay;
    }

        /* 
    * Obtiene la distancia máxima recorrida de entre todos los usuarios 
    * Texto -->
    *                   getMaxDistance($data) <--
    * <-- array, Nada
    */
    private function getMaxDistance($model,$data) {
        $maxDistance = 0;
        $mailUser = -1;

        foreach ($data as $item) {
            $measureList = $model->getTraveledDistanceOfUser($item->mail);
            $actualDistance = $this->getDistanceFromMail($measureList);
            if ($actualDistance > $maxDistance) {
                $maxDistance = $actualDistance;
                $mailUser = $item->mail;
            }
        }
    
        $arr = array();
        $assocArray = array(
            'distance' => round($maxDistance[0]['distance']), 
            'user'=>$mailUser
        );
        array_push($arr, $assocArray);
        return $arr;
    }

    /* 
    * Obtiene el tiempo activo mayor de entre todos los usuarios
    *
    * model, data, range -->
    *                           getMaxDifference($model, $data, $range) <--
    * <-- array, Nada
    */
    private function getMaxDifference($model,$data, $range) {
        $maxDifference = 0;
        $maxUser = -1;
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

    // ---------------------------------------------- (POST) ----------------------------------------------- //

    /* 
    * Crea un nuevo usuario con estado 'pending', después envía un correo de verificación de cuenta
    *
    * UsersModel, Lista<Texto> -->
    *                                        registration() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function createUser($usersModel, $sensorsModel, $params) {
        // Creamos un nuevo usuario
        $user = parent::createEntity('Users')->createUserFromParams($params);
       // $sensors = parent::createEntity('Sensors')->
        if ($usersModel->insertUser($user)) {
            // TEMPORAL hasta que puedan enviarse emails
            return $user->parseUserToAssocArrayUsers();
            /*if ($this->sendVerificationEmail($user)) {
                //line();
                //debug('email sended!', "");
                return $user->parseUserToAssocArrayUsers();
            } else {
                //line();
                //debug('email NOT sended', "");
                return 'Se ha producido un error al enviar el correo'; 
            }*/
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    /* 
    * Crea un nuevo usuario con estado 'pending', después envía un correo de verificación de cuenta
    *
    * UsersModel, Lista<Texto> -->
    *                                        registration() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function updateUser($usersModel, $params) {
        // Creamos un nuevo usuario
        $user = parent::createEntity('Users')->createUserFromParams($params);
        if ($usersModel->insertUser($user)) {
            // TEMPORAL hasta que puedan enviarse emails
            return $user->parseUserToAssocArrayUsers();
            /*if ($this->sendVerificationEmail($user)) {
                //line();
                //debug('email sended!', "");
                return $user->parseUserToAssocArrayUsers();
            } else {
                //line();
                //debug('email NOT sended', "");
                return 'Se ha producido un error al enviar el correo'; 
            }*/
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    /* 
    * Crea un nuevo usuario con estado 'pending', después envía un correo de verificación de cuenta
    *
    * UsersModel, Lista<Texto> -->
    *                                        registration() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function deleteUser($usersModel, $params) {
        // Creamos un nuevo usuario
        $user = parent::createEntity('Users')->createUserFromParams($params);
        if ($usersModel->insertUser($user)) {
            // TEMPORAL hasta que puedan enviarse emails
            return $user->parseUserToAssocArrayUsers();
            /*if ($this->sendVerificationEmail($user)) {
                //line();
                //debug('email sended!', "");
                return $user->parseUserToAssocArrayUsers();
            } else {
                //line();
                //debug('email NOT sended', "");
                return 'Se ha producido un error al enviar el correo'; 
            }*/
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    // -------------------------------------------- UTILS ---------------------------------------------- //

    /*
    * Crea un array asociativo de objetos User (UserEntity) desde una lista de objetos stdClass (TO SEND WITH RESPONSE)
    * 
    * Lista<stdClass>, Texto -->
    *                                   parseDataListToAssocArrayUsers() <--
    * <-- Lista<Lista<UserEntity>>
    *
    * Nota: dataList es una array númerica (iterativa)
    */
    private function parseDataListToAssocArrayUsers($dataList, $resource) {
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

    /* 
    * Ordena las medidas recibidas por día
    *
    * Texto, rango:N -->
    *                       orderMeasuresByDay() <--
    * <-- Lista<N>, Nada
    */
    private function orderMeasuresByDay($measureList,$range) {
        $firstMeasure = $measureList[0];
        $lastMeasure = $measureList[count($measureList)-1];

        // Start / end of first day wich has a measure
        $dateStart = $firstMeasure->timestamp;
        $firstDayStart = floor($dateStart / $range) * $range;
        $firstDayEnd = $firstDayStart + $range;

        // Start / end of last day wich has a measure
        $dateEnd = $lastMeasure->timestamp;
        $lastDayStart = floor($dateEnd / $range) * $range;
        $lastDayEnd = $firstDayStart + $range;
        
        $amountOfDays = 0;
        $auxStart = $firstDayStart;
        $auxEnd = $firstDayEnd;

        $listOfDays = array();
        while($auxStart <= $lastDayStart) {
            $measuresOfDay = array();
            for ($i=0; $i < count($measureList); $i++) { 
                if($measureList[$i]->timestamp >= $auxStart && $measureList[$i]->timestamp <= $auxEnd ) {
                    array_push($measuresOfDay,$measureList[$i]);               
                }
            }
            array_push($listOfDays,$measuresOfDay);
            $auxStart += $range;
            $auxEnd += $range;
        }
        return $listOfDays;
    }

    /* 
    * Obtiene la distancia total recorrida del usuario activo
    *
    * Texto -->
    *                       calculateDistanceOfMeasureList() <--
    * <-- N, Nada
    */
    private function calculateDistanceOfMeasureList($data) {   
        $distance=0;
        $timestampOfDay = 0;
        for($i=1; $i<count($data); $i++){
            $measure = parent::createEntity('Measures')->createMeasureFromDatabase($data,$i);
            $measureAnterior = parent::createEntity('Measures')->createMeasureFromDatabase($data, $i-1);
            if(($measure->getTimestamp()-$measureAnterior->getTimestamp())<3600){
                $distance+=haversineDistanceCalculator($measure->getLocation()['latitude'], $measure->getLocation()['longitude'], $measureAnterior->getLocation()['latitude'],  $measureAnterior->getLocation()['longitude']); 
            }
        }
        return $distance;
    }

}
<?php

class UsersController extends BaseController {

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
        // Cargamos el modelo de Users
        $model = parent::loadModel($request->resource);
        // Check de parámetros
        if (!areThereParameters($request->parameters)) {
            // Obtiene todos los usuarios
            $result = $this->getAllUsers($model, $request);
        } else {
            $result = $this->getIncomingParametersAndExecuteGetMethod($model, $request);
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
    
    }

    // INFO: php no recomienda el uso de 'put' por seguridad, usar 'post' en su defecto
    public function putAction($request) {

    }

    public function deleteAction($request) {

    }

    // ------------------------------------- PRIVATE LOGIC METHODS ------------------------------------- //
    // ------------------------------------------------------------------------------------------------- //

    // ---------------------------------------------- GET ----------------------------------------------- //

    /* 
    * Escoge el método GET acorde con el parámetro recibido
    *
    * UsersModel, Lista<Texto> -->
    *                                   getIncomingParametersAndExecuteGetMethod() <--
    * <-- N | Nada
    */
    private function getIncomingParametersAndExecuteGetMethod($model, $request) {
        $params = $request->parameters;
        foreach ($params as $key => $value) {
            switch ($key) {
                case 'users':
                    $userID = $value;
                    if (count($params) == 1) {
                        $data = $model->getUser($userID);
                        $result = $this->createArrayOfUsers($data, $request->resource);
                    }
                    break;
                case 'difference':
                    if ($value === 'half') {
                        $time = 1800;
                    } elseif ($value === 'hour') {
                        $time = 3600;
                    }
                    $result = $model->getActiveTimeOfUser($userID, $time);
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
    private function getAllUsers($model, $request) {
        // Obtenemos el array de usuarios (objects stdClass)
        $data = $model->getAllUsers();
        $result = $this->createArrayOfUsers($data, $request->resource);
        return $result;
    }

    // -------------------------------------------- UTILS ---------------------------------------------- //

    /*
    * Recibe un array de objetos stdClass y lo convierte en un array asociativo de objetos Users
    * 
    * Lista<stdClass>, Texto -->
    *                               createArrayOfUsers() <--
    * <-- Lista<User>
    *
    * Nota: data es una array númerica (iterativa)
    */
    private function createArrayOfUsers($data, $resource) {
        // Si hay datos
        if (!is_null($data)) {
            $result = array();
            // Por cada elemento del array de objetos
            for ($i=0; $i < count($data); $i++) {
                // Creamos un nuevo usuario
                $user = parent::createEntity($resource);
                // Asignamos las propiedades de cada objeto user
                $user->setMail($data[$i]->mail);
                $user->setName($data[$i]->name);
                $user->setSurnames($data[$i]->surnames);
                $user->setPassword($data[$i]->password);
                // Guardamos los usuarios en el array asociativo $result
                array_push($result, $user->toARRAY());
            }
            return $result;
        } 
        return NULL;
    }

}
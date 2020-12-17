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
        if (!$this->areThereParameters($request->parameters)) {
            // Obtiene todos los usuarios
            $result = $this->getUsers($model, $request);
        } else {
            $result = $this->getIncomingParametersAndExecuteGetMethod($model, $request);
        }

        // Cargamos la vista seleccionada
        $view = parent::loadView($request->format);
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
    * Obtiene todas los usuarios disponibles
    *
    * UsersModel, Request -->
    *                               getUsers() <--
    * <-- Lista<UsersEntity>
    */
    private function getUsers($model, $request) {
        // Obtenemos el array de usuarios (objects stdClass)
        $data = $model->getUsers();
        $result = array();
        // Si hay datos
        if (!is_null($data)) {
            // Por cada elemento del array de objetos
            for ($i=0; $i < count($data); $i++) {
                // Creamos un nuevo usuario
                $user = parent::createEntity($request->resource);
                // Asignamos las propiedades de cada objeto user
                $user->setMail($data[$i]->mail);
                $user->setName($data[$i]->name);
                $user->setSurnames($data[$i]->surnames);
                $user->setPasword($data[$i]->password);
                // Guardamos los usuarios en el array asociativo $result
                array_push($result, $user->toARRAY());
            }
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
                    break;
                case 'difference':
                    if ($value === 'half') {
                        $time = 1800;
                        $result = $model->getActiveTimeUser($userID, $time);
                    } elseif ($value === 'hour') {
                        $time = 3600;
                        $result = $model->getActiveTimeUser($userID, $time);
                    }
                    break;
                default:
                    break;
            }
        }
        return $result;
    }

}
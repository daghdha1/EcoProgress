<?php

class AuthController extends BaseController {

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
        //$model = parent::loadModel("Users");
        
        //debug('get', 'Estoy en el get de auth');

        // Cargamos la vista seleccionada
        //$view = parent::loadView($request->format);
        // Parseamos la respuesta a JSON
        //$view->render($result);
    }

    /* - Recibe y trata una petición POST solicitada
    *  - Se comunica con el modelo correspondiente y envia los datos facilitados por la petición
    *  - Una vez enviados, los reenvía de vuelta a la vista correspondiente, encargada de mostrárselos al cliente web
    *
    * Action -->
    *                   postAction() <--
    * <-- Lista<T>
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

    public function putAction($request) {

    }

    public function deleteAction($request) {

    }


    // -------------------------------------- PRIVATE LOGIC METHODS ------------------------------------- //
    // -------------------------------------------------------------------------------------------------- //

    // ---------------------------------------------- (GET) ----------------------------------------------- //

    

    // ---------------------------------------------- (POST) ----------------------------------------------- //

    /* 
    * Escoge el método POST acorde con el parámetro recibido
    *
    * UsersModel, SensorsModel, Lista<Texto> -->
    *                                               getIncomingParametersAndExecutePostMethod() <--
    * <-- RESULT T
    */
    private function getIncomingParametersAndExecutePostMethod($usersModel, $sensorsModel, $request) {
        $params = $request->parameters;
        // Si existe una de estas acciones, la ejecutamos
        if (isset($params['action'])) {
            switch ($params['action']) {
                case 'registration':
                    $data = $this->prepareUserData($usersModel, $sensorsModel, $params);
                    $result = $this->registration($usersModel, $data);
                    break;
                case 'login':
                    // $result = $model->login($params['username'], $params['password']);
                    break;
                case 'logout':
                    // $result = $model->logout();
                    break;
                case 'recovery':
                    // $result = $model->recovery($params['email']);
                    break;
                default:
            }
        }
        return $result;
    }

    // ---------------------------------------------- REGISTRATION METHODS ----------------------------------------------- //

    /* 
    * Preparación de los datos de usuario para ser insertados en la base de datos
    *
    * UsersModel, SensorsModel, Lista<Texto> -->
    *                                               prepareUserData() <--
    * <-- UserEntity | Nada
    */
    private function prepareUserData($usersModel, $sensorsModel, $params) {
        // Si el sensor a registrar está disponible (existe y no tiene propietario)
        if (!is_null($sensorsModel->isTheSensorAvailable($params['reg_key']))) {
            // Si el email a registrar está disponible (no existe)
            if (is_null($usersModel->getUser($params['reg_mail']))) {
                // Creamos un nuevo usuario
                $user = parent::createEntity('Users');
                // Asignamos las propiedades del objeto user a enviar
                $user->setMail($params['reg_mail']);
                $user->setName($params['reg_name']);
                $user->setSurnames($params['reg_surnames']);
                $user->setPassword(generatePasswordHash($params['reg_password']));
                $user->setSecretCode(generateSecretCode());
                $user->setLastConn(NULL);
                $user->setRegDate(time());
                $user->setRole('user');
                $user->setAccountStatus('pending');
                return $user;
            } else {
                // El mail indicado ya existe!
                $msg = 'El mail indicado ya existe.';
            }
        } else {
            // La clave del producto no es válida!
            $msg = 'La clave del producto no es válida.';
        }
        return $msg;
    }

    private function registration($usersModel, $data) {
        if (is_a($data, 'UserEntity', false)) {
            if ($usersModel->createUser($data)) {
                    line();
                    debug('sending email!', "");
                if ($this->sendVerificationEmailTo($data)) {
                    line();
                    debug('email sended!', "");
                }
            }
        }
        return $data;
    }

    private function sendVerificationEmailTo($data) {
        $to      = $data->getMail();
        $subject = 'EcoProgress Verification';
        $message = '
  
        ¡Bienvenido/a ' . $data->getName() . '!, gracias por registrarse.
        
        Su cuenta ha sido creada, puede iniciar sesión después de haber activado su cuenta introduciendo el siguiente código de activación.
          
        --------------------------
        Código de activación: ' . $data->getSecretCode() . '
        --------------------------
          
        ';
        
        /*Introduzca el código de verificación en nuestro formulario de registro:
        http://www.yourwebsite.com/verify.php?email='.$email.'&hash='.$hash.'*/

        $message = wordwrap($message, 70, "\r\n");

        $headers = 'From:ecoprogress@server.com' . "\r\n";
        
        return mail($to, $subject, $message, $headers);
    }

}
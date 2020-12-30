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

        $result = $this->getIncomingParametersAndExecuteMethod($usersModel, $sensorsModel, $request);

        // Cargamos la vista seleccionada
        $view = parent::loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    public function putAction($request) {
        // Cargamos el modelo de Users
        $usersModel = parent::loadModel("Users");
        // Cargamos el modelo de Sensors
        $sensorsModel = parent::loadModel("Sensors");

        $result = $this->getIncomingParametersAndExecuteMethod($usersModel, $sensorsModel, $request);

        // Cargamos la vista seleccionada
        $view = parent::loadView($request->format);
        // Parseamos la respuesta a JSON
        $view->render($result);
    }

    public function deleteAction($request) {

    }


    // -------------------------------------- PRIVATE LOGIC METHODS ------------------------------------- //
    // -------------------------------------------------------------------------------------------------- //

    // -------------------------------------------- REQUEST --------------------------------------------- //

    /* 
    * Escoge el método POST acorde con el parámetro recibido
    *
    * UsersModel, SensorsModel, Lista<Texto> -->
    *                                               getIncomingParametersAndExecutePostMethod() <--
    * <-- RESULT T
    */
    private function getIncomingParametersAndExecuteMethod($usersModel, $sensorsModel, $request) {
        $params = $request->parameters;
        // Si existe una de estas acciones, la ejecutamos
        if (isset($params['action'])) {
            switch ($params['action']) {
                case 'registration':
                    if($this->checkUserData($usersModel, $sensorsModel, $params)) {
                        $user = $this->createUserEntity($params);
                        $result = $this->registration($usersModel, $user);
                    } else {
                        $result = 'Correo eléctronico y/o clave de producto inválidos';
                    }
                    break;
                case 'accountActivation':
                    if ($this->checkRegistrationCode($usersModel, $params)) {
                        // TODO--> $this->accountActivation();
                    }
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
                    $result = NULL;
            }
            return $result;
        }
        return NULL;
    }

    // ---------------------------------------------- (GET) ----------------------------------------------- //

    

    // ---------------------------------------------- (POST) ----------------------------------------------- //

    /* 
    * Crea un nuevo usuario con estado 'pending', después envía un correo de verificación de cuenta
    *
    * UsersModel, UserEntity -->
    *                                  registration() <--
    * <-- Lista<UserEntity> | Texto
    */
    private function registration($usersModel, $user) {    
        if ($usersModel->createUser($user)) {
            //debug('sending email!', "");
            if ($this->sendVerificationEmail($user)) {
                //line();
                //debug('email sended!', "");
                $result = array();
                array_push($result, $user->toArray());
            } else {
                //line();
                //debug('email NOT sended', "");
                //$result = 'Se ha producido un error al enviar el correo';
                // TEMPORAL hasta que puedan enviarse emails
                $result = array(); 
                array_push($result, $user->toArray()); 
            }
        } else {
            $result = 'Se ha producido un error al crear el usuario';
        }
        return $result;
    }

    /* 
    * Envía un correo de verificación de cuenta con el código secreto implícito
    *
    * UserEntity -->
    *                     sendVerificationEmail() <--
    * <-- V | F
    */
    private function sendVerificationEmail($data) {
        $to      = $data->getMail();
        $subject = 'EcoProgress Verification';
        $message = '
  
        ¡Bienvenido/a ' . $data->getName() . '!, gracias por registrarse.
        
        Su cuenta ha sido creada, puede iniciar sesión después de haber activado su cuenta introduciendo el siguiente código de activación.
          
        --------------------------
        Código de activación: ' . $data->getSecretCode() . '
        --------------------------
          
        ';

        $message = wordwrap($message, 70, "\r\n");

        $headers = 'From:ecoprogress@server.com' . "\r\n";
        
        return mail($to, $subject, $message, $headers);
    }

    // -------------------------------------------- (PUT) --------------------------------------------- //

    // -------------------------------------------- UTIL ---------------------------------------------- //

    /* 
    * Crea un objeto User
    *
    * Lista<Texto> -->
    *                    createUserEntity() <--
    * <-- UserEntity
    */
    private function createUserEntity($params) {
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
    }

    // -------------------------------------------- CHECKS ---------------------------------------------- //

    /* 
    * Comprobación de datos de usuario válidos
    *
    * UsersModel, SensorsModel, Lista<Texto> -->
    *                                               checkUserData() <--
    * <-- V | F
    */
    private function checkUserData($usersModel, $sensorsModel, $params) {
        // Si el sensor a registrar está disponible (existe y no tiene propietario)
        if ($sensorsModel->isTheSensorAvailable($params['reg_key'])) {
            // Si el email a registrar está disponible (no existe)
            if (is_null($usersModel->getUser($params['reg_mail']))) {
                return true;
            } 
        }
        return false;
    }

    /* 
    * Comprobación de código de activación de cuenta
    *
    * UsersModel, Lista<Texto> -->
    *                                checkRegistrationCode() <--
    * <-- V | F
    */
    private function checkRegistrationCode($usersModel, $params) {
        // Si el código de activación de cuenta coincide con el secretCode del usuario
        return $usersModel->isTheRegistrationCodeValid($params['reg_code_mail'], $params['reg_code']) {
    }

}
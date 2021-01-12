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

    public function getAction($request) {
        
    }

    /* - Recibe y trata una petición POST solicitada
    *  - Se comunica con el modelo correspondiente y envia los datos facilitados por la petición
    *  - Una vez enviados, los reenvía de vuelta a la vista correspondiente, encargada de mostrárselos al cliente web
    *
    * Action -->
    *                                       postAction() <--
    * <-- Lista<Lista<T>> | Lista<Error>
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

    // INFO: php no recomienda el uso de 'put' por seguridad, usar 'post' en su defecto
    public function putAction($request) {
        
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
    *                                                   getIncomingParametersAndExecuteMethod() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function getIncomingParametersAndExecuteMethod($usersModel, $sensorsModel, $request) {
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

    

    // ---------------------------------------------- (POST) ----------------------------------------------- //

    /* 
    * Crea un nuevo usuario con estado 'pending', después envía un correo de verificación de cuenta
    *
    * UsersModel, Lista<Texto> -->
    *                                        registration() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function registration($usersModel, $params) {
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
    * Activación de cuenta de usuario
    *
    * UsersModel, SensorsModel, Lista<Texto> -->
    *                                               accountActivation() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function accountActivation($usersModel, $sensorsModel, $params) {
        // Updating user
        $data = $usersModel->getUser($params['reg_code_mail']);
        if (!is_null($data) && !empty($data)) {
            $user = parent::createEntity('Users')->createUserFromDatabase($data);
            $user->setLastConn(time());
            $user->setAccountStatus('active');
            $isUserUpdated = $usersModel->updateUser($user);
            // Updating sensor
            if ($isUserUpdated) {
                $data = $sensorsModel->getSensorFromActivationKey($params['reg_code_key']);
                if (!is_null($data) && !empty($data)) {
                    $sensor = parent::createEntity('Sensors')->createSensorFromDatabase($data);
                    $sensor->setMail($params['reg_code_mail']);
                    $sensor->setState(1);
                    $isSensorUpdated = $sensorsModel->updateSensor($sensor);
                    if ($isSensorUpdated) {
                        return $user->parseUserToAssocArrayUsers();
                    }
                }
            }
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    /* 
    * Inicio de sesión de usuario y guardado de sesión en servidor generando un nuevo id (session_id)
    *
    * UsersModel, Lista<Texto> -->
    *                                           login() <--
    * <-- Lista<Lista<T>> | Lista<Error>
    */
    private function login($usersModel, $params) {
        $data = $usersModel->getUser($params['log_mail']);
        if (!is_null($data) && !empty($data)) {
            $user = parent::createEntity('Users')->createUserFromDatabase($data);
            $this->createUserSession($user);
            return $user->parseUserToAssocArrayUsers();
        }
        return createAssocArrayError(__CLASS__, __FUNCTION__, __LINE__);
    }

    /* 
    * Inicialización de la sesión de usuario actual
    *
    * UserEntity -->
    *                   createUserSession() <--
    */
    private function createUserSession($user) {
        session_start();
        setcookie("REQSESSID", session_id(), time() + 3600); // expira la sesión en 1h
        $_SESSION['SESSID'] = session_id();
        $_SESSION['mail'] = $user->getMail();
        $_SESSION['name'] = $user->getName();
        session_write_close();
    }

    /* 
    * Finalización de sesión de usuario y destrucción de variables de sesión
    *
    *               deleteUserSession() <--
    * <-- V | F
    */
    private function deleteUserSession() {
        session_start();
        setcookie("REQSESSID", session_id(), 1); // expira la sesión
        session_unset();
        $_SESSION = [];
        return session_destroy();
    }

    // -------------------------------------------- CHECKS ---------------------------------------------- //

    /* 
    * Comprobación de datos de registro de usuario
    *
    * UsersModel, SensorsModel, Lista<Texto>, N -->
    *                                                checkRegistrationData() <--
    * <-- V | F
    */
    private function checkRegistrationData($usersModel, $sensorsModel, $params, $step) {
        $sData = $sensorsModel->getAvailableSensorFromActivationKey($params['reg_key']);
        // Si el sensor a registrar está disponible (existe y no tiene propietario)
        if (!is_null($sData) && !empty($sData)) {
            $uData = $usersModel->getUser($params['reg_mail']);
            switch ($step) {
                case 1:
                    // Si el email a registrar no está disponible (no existe)
                    if (!is_null($uData) && empty($uData)) {
                        return true;
                    }
                    break;
                case 2:
                    // Si el email a activar está disponible (existe)
                    if (!is_null($uData) && !empty($uData)) {
                        return true;
                    }
                    break;
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
        // Si el código de activación de cuenta introducido coincide con el código de activación almacenado en la base de datos
        $data = $usersModel->getUserFromMailAndRegCode($params['reg_code_mail'], $params['reg_code']);
        if (!is_null($data) && !empty($data)) {
            return true;
        }
        return false;
    }

    /* 
    * Comprobación de datos de inicio de sesión de usuario
    *
    * UsersModel, Lista<Texto> -->
    *                                checkLoginData() <--
    * <-- V | F
    */
    private function checkLoginData($usersModel, $params) {
        // Obtenemos el usuario de la base de datos
        $data = $usersModel->getUser($params['log_mail']);
        if (!is_null($data) && !empty($data) && $data[0]->account_status === 'active') {
            $pwForm = $params['log_password'];
            $pwHashed = $data[0]->password;
            // Comprobamos si la contraseña enviada desde el formulario se corresponde con el hash alojado en la db
            return verifyPasswordHash($pwForm, $pwHashed);
        }
        return false;
    }

    /*
    * (TESTING, NOT USE)
    *
    * Envía un correo de verificación de cuenta con el código secreto implícito 
    *
    * UserEntity -->
    *                     sendVerificationEmail() <--
    * <-- V | F
    */
    private function sendVerificationEmail($user) {
        $to      = $user->getMail();
        $subject = 'EcoProgress Verification';
        $message = '
  
        ¡Bienvenido/a ' . $user->getName() . '!, gracias por registrarse.
        
        Su cuenta ha sido creada, puede iniciar sesión después de haber activado su cuenta introduciendo el siguiente código de activación.
          
        --------------------------
        Código de activación: ' . $user->getSecretCode() . '
        --------------------------
          
        ';

        $message = wordwrap($message, 70, "\r\n");

        $headers = 'From:ecoprogress@server.com' . "\r\n";
        
        return mail($to, $subject, $message, $headers);
    }

}
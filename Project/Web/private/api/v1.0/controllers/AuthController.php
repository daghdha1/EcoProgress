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
    *                       postAction() <--
    * <-- Lista<T> | Texto
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
    *                                               getIncomingParametersAndExecuteMethod() <--
    * <-- RESULT T
    */
    private function getIncomingParametersAndExecuteMethod($usersModel, $sensorsModel, $request) {
        $params = $request->parameters;
        // Si existe una de estas acciones, la ejecutamos
        if (isset($params['action'])) {
            switch ($params['action']) {
                case 'registration':
                    if($this->checkUserData($usersModel, $sensorsModel, $params)) {
                        $result = $this->registration($usersModel, $params);
                    } else {
                        $result = 'Correo eléctronico y/o clave de producto inválidos';
                    }
                    break;
                case 'accountActivation':
                    if ($this->checkRegistrationCode($usersModel, $params)) {
                        $result = $this->accountActivation($usersModel, $sensorsModel, $params);
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
    private function registration($usersModel, $params) {
        $user = $this->createUserFromParams($params);
        if ($usersModel->insertUser($user)) {
            // TEMPORAL hasta que puedan enviarse emails
            $result = array(); 
            array_push($result, $user->toArray());
            /*if ($this->sendVerificationEmail($user)) {
                //line();
                //debug('email sended!', "");
                $result = array();
                array_push($result, $user->toArray());
            } else {
                //line();
                //debug('email NOT sended', "");
                //$result = 'Se ha producido un error al enviar el correo'; 
            }*/
        } else {
            $result = 'Se ha producido un error al crear el usuario';
        }
        return $result;
    }

    private function accountActivation($usersModel, $sensorsModel, $params) {
        // Updating user
        $data = $usersModel->getUser($params['reg_code_mail']);
        if (!is_null($data)) {
            $user = $this->createUserFromDatabase($data);
            $user->setLastConn(time());
            $user->setAccountStatus('active');
            $isUserUpdated = $usersModel->updateUser($user);
            
            // Updating sensor
            if ($isUserUpdated) {
                $data = $sensorsModel->getSensorByActivationKey($params['reg_code_key']);
                $sensor = $this->createSensorFromDatabase($data);
                $sensor->setMail($params['reg_code_mail']);
                $sensor->setState(1);
                $isSensorUpdated = $sensorsModel->updateSensor($sensor);
                
                // Return user updated
                if ($isSensorUpdated) {
                    $result = array(); 
                    array_push($result, $user->toArray());
                    return $result;
                }
            }
        }
        return "Ha ocurrido un fallo inesperado en la activación del usuario";
    }

    /* 
    * Envía un correo de verificación de cuenta con el código secreto implícito (TESTING, NOT USE)
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

    // -------------------------------------------- UTILS ---------------------------------------------- //

    /* 
    * Crea un objeto User recibido desde los parámetros de un form
    *
    * Lista<Texto> -->
    *                    createUserFromParams() <--
    * <-- UserEntity
    * 
    * Nota: params es una array asociativa (clave-valor)
    */
    private function createUserFromParams($params) {
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

    /* 
    * Crea un objeto User recibido desde la base de datos
    *
    * User<stdClass> -->
    *                       createUserFromDatabase() <--
    * <-- UserEntity
    *
    * Nota: data es una array númerica (iterativa)
    */
    private function createUserFromDatabase($data) {
        // Creamos un nuevo usuario
        $user = parent::createEntity('Users');
        // Asignamos las propiedades del objeto user a enviar
        $user->setMail($data[0]->mail);
        $user->setName($data[0]->name);
        $user->setSurnames($data[0]->surnames);
        $user->setPassword($data[0]->password);
        $user->setSecretCode($data[0]->secret_code);
        $user->setLastConn($data[0]->last_conn);
        $user->setRegDate($data[0]->reg_date);
        $user->setRole($data[0]->role);
        $user->setAccountStatus($data[0]->account_status);
        return $user;
    }

    /* 
    * Crea un objeto Sensor recibido desde la base de datos
    *
    * Sensor<stdClass> -->
    *                           createSensorFromDatabase() <--
    * <-- SensorEntity
    *
    * Nota: data es una array númerica (iterativa)
    */
    private function createSensorFromDatabase($data) {
        // Creamos un nuevo sensor
        $sensor = parent::createEntity('Sensors');
        // Asignamos las propiedades del objeto sensor a enviar
        $sensor->setId($data[0]->id);
        $sensor->setMail($data[0]->mail);
        $sensor->setType($data[0]->type);
        $sensor->setActivationKey($data[0]->activation_key);
        $sensor->setState($data[0]->state);
        return $sensor;
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
        return $usersModel->isTheRegistrationCodeValid($params['reg_code_mail'], $params['reg_code']);
    }

}
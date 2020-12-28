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
        $model = parent::loadModel("Users");
        
        echo 'Estoy en el get de auth';

        // Cargamos la vista seleccionada
        //$view = parent::loadView($request->format);
        // Parseamos la respuesta a JSON
        //$view->render($result);
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

    public function putAction($request) {

    }

    public function deleteAction($request) {

    }
}
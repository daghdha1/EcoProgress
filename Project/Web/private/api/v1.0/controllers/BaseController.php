<?php

class BaseController{
	
	private $adapter;

	/* Constructor
	* 	
	*					__construct() -->
	* <-- DbConnection 
	*/
	public function __construct() {
		$this->adapter = DbConnection::getConnection();
	}

	/* Carga el modelo de datos solicitado
	*
	* Texto -->
	*					loadModel() <--
	* <-- <Class T> 
	*/
	protected function loadModel($resource) {
		// Obtenemos nombre del modelo (ej -> usersModel -> UsersModel)
        $modelName = $resource . 'Model';
		// Si no existe el modelo solicitado, llama a myAutoloader() para incluirlo
        if (class_exists($modelName)) {
        	// Creamos y devolvemos el modelo
            return new $modelName($resource, $this->adapter);
        }
	}

	/* Carga el tipo de vista solicitada
	*
	* Texto -->
	*					loadView() <--
	* <-- <Class T> 
	*/
	protected function loadView($format) {
		// Obtenemos el nombre de la vista (controlador de salida) (ej -> JsonView)
	    $viewName = $format . 'View';
	    // Si no existe la vista solicitada, llama a myAutoloader() para incluirla
	    if(class_exists($viewName)) {
	    	// Creamos y devolvemos la vista
	        return new $viewName();
	    }
	}

	/* Crea la entidad de datos solicitada
	*
	* Texto -->
	*					createEntity() <--
	* <-- <Class T> 
	*/
	protected function createEntity($resource) {
		// Obtenemos nombre formateado de la entidad (ej -> measuresEntity -> MeasureEntity)
		$entityName = formatStrEntity($resource) . 'Entity';
		// Si no existe la entidad solicitada, llama a myAutoloader() para incluirla
	    if(class_exists($entityName)) {
	    	// Creamos y devolvemos la entidad
	        return new $entityName($resource, $this->adapter);
	    }
	}

}
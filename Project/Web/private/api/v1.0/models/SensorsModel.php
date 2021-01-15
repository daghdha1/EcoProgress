<?php

class SensorsModel extends BaseModel {

	private $conn;

	/* Constructor
	* 
	* Texto, DbConnection -->
	*							__construct() --> 
	*/
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->conn = $adapter;
    }

    // Nota: Lo más seguro es crear sentencias preparadas pero por tiempo lo dejo con saneamiento de strings solo

	// ---------------------------------------------- GET ----------------------------------------------- //

    /* 
    * Obtiene el sensor de un usuario
    *
    * Texto -->
    *                   		getSensor() <--
    * <-- Sensor<stdClass>
    */
	public function getSensor($mail) {
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT * FROM Sensors as s WHERE s.mail = '$strMail' LIMIT 1";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Comprueba si el sensor está disponible (no registrado)
    *
    * Texto -->
    *               				 getAvailableSensorFromActivationKey() <--
    * <-- Lista<stdClass> | Nada
    */
	public function getAvailableSensorFromActivationKey($key) {
		$strKey = mysqli_real_escape_string($this->conn, $key);
		// Query
		$sql = "SELECT * FROM Sensors as s WHERE s.activation_key = '$strKey' AND s.state = 0";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}
/* 
    * Obtiene todos los usuarios registrados
    *
    *                   			getAllUsers() <--
    * <-- Lista<User<stdClass>>
    */
	public function getAllSensors() {
		// Respuesta
		$result = BaseEntity::getAll();
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Obtiene el sensor de un usuario en base a su clave de activación
    *
    * Texto -->
    *                   		getSensorFromActivationKey() <--
    * <-- Sensor<stdClass>
    */
	public function getSensorFromActivationKey($key) {
		$strKey = mysqli_real_escape_string($this->conn, $key);
		// Query
		$sql = "SELECT * FROM Sensors as s WHERE s.activation_key = '$strKey' LIMIT 1";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Obtiene todos los usuarios activos con sus sensors id
    *
    * Texto -->
    *                 				getAllUsersWithSensorIds() <--
    * <-- Lista<stdClass> | Nada
    */
	public function getAllUsersWithSensorIds() {
		// Query
		$sql = "SELECT u.name, u.mail, s.type FROM Users as u, Sensors as s WHERE u.mail = s.mail";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	// ----------------------------------------------- POST ------------------------------------------------ //

	/* 
    * Actualiza un sensor de un usuario en la base de datos
    *
    * SensorEntity -->
    *                    			updateUser() <--
    * <-- V | F
    */
	public function updateSensor($sensor) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->conn, $sensor->getMail());
		$strType = mysqli_real_escape_string($this->conn, $sensor->getType());
		$numState = $sensor->getState();
		$strActivationKey = mysqli_real_escape_string($this->conn, $sensor->getActivationKey());
		// Query
		$sql = "UPDATE Sensors as s SET s.mail = '$strMail', s.type = '$strType', s.state = $numState WHERE s.activation_key = '$strActivationKey'";
		// Devuelve true, si no ha podido actualizar el registro, devuelve false
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);
		return $result;
	}


	/* 
    * Actualiza un sensor de un usuario en la base de datos
    *
    * SensorEntity -->
    *                    updateUser() <--
    * <-- V | F
    */
	public function updateStatusSensor($sensor) {
		// Escapamos los carácteres especiales
		$strId = $sensor->getId();
		$numState = $sensor->getState();
		// Query
		$sql = "UPDATE Sensors as s SET s.state = $numState WHERE s.id = '$strId'";
		// Devuelve true, si no ha podido actualizar el registro, devuelve false
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);
		return $result;
	}

}
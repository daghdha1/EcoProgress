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
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	/* 
    * Obtiene el sensor de un usuario en base a su clave de activación
    *
    * Texto -->
    *                   		getSensorByActivationKey() <--
    * <-- Sensor<stdClass>
    */
	public function getSensorByActivationKey($key) {
		$strKey = mysqli_real_escape_string($this->conn, $key);
		// Query
		$sql = "SELECT * FROM Sensors as s WHERE s.activation_key = '$strKey' LIMIT 1";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	/* 
    * Obtiene el id del sensor del usuario activo
    *
    * Texto -->
    *                 			getSensorId() <--
    * <-- sensorID:N | Nada
    */
	public function getSensorId($mail) {
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT id FROM Sensors as s WHERE s.mail = '$strMail'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	// ----------------------------------------------- POST ------------------------------------------------ //

	/* 
    * Actualiza un sensor en la base de datos
    *
    * SensorEntity -->
    *                   updateUser() <--
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

	// ---------------------------------------------- CHECKS ----------------------------------------------- //

	/* 
    * Comprueba si el sensor está disponible (no registrado)
    *
    * Texto -->
    *               isTheSensorAvailable() <--
    * <-- V | F
    */
	public function isTheSensorAvailable($key) {
		$strKey = mysqli_real_escape_string($this->conn, $key);
		// Query
		$sql = "SELECT * FROM Sensors as s WHERE s.activation_key = '$strKey' AND s.state = 0";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve verdadero, si no ha encontrado ninguna coincidencia, devuelve falso
		if (!is_null($result)) return true;
		return false;
	}

}
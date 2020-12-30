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
    * Obtiene el id del sensor del usuario activo
    *
    * Texto -->
    *                 			getSensorIDOfUser() <--
    * <-- sensorID:N, Nada
    */
	public function getSensorIDOfUser($userID) {
		$strUserID = mysqli_real_escape_string($this->conn, $userID);
		// Query
		$sql = "SELECT id FROM Sensors as s WHERE s.mail = '$strUserID'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	// ---------------------------------------------- CHECKS ----------------------------------------------- //

	/* 
    * Comprueba si el sensor está disponible (no registrado)
    *
    * Texto -->
    *                   isTheSensorAvailable() <--
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
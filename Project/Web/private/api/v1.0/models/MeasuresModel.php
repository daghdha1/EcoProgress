<?php

class MeasuresModel extends BaseModel {
	
	private $conn;

	/* Constructor
	* 
	* Text, DbConnection -->
	*							__construct() --> 
	*/
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->conn = $adapter;
    }

	/* 
    * Obtiene todas las medidas disponibles
    *
    *                   			getAllMeasures() <--
    * <-- Lista<MeasuresEntity>
    */
	public function getAllMeasures() {
		// Respuesta
		$result = BaseEntity::getAll();
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	/* 
    * Inserta una medida en la base de datos
    *
    * Lista<Texto> -->
    *                      postMeasure() <--
    * <-- MeasureEntity
    */
	public function postMeasure($parameters) {
		$strValue = mysqli_real_escape_string($this->conn, $parameters['value']);
		$strTimestamp = mysqli_real_escape_string($this->conn, $parameters['timestamp']);
		$strLocation = mysqli_real_escape_string($this->conn, $parameters['location']);
		$strSensorID = mysqli_real_escape_string($this->conn, $parameters['sensorID']);
		// Query
		$sql = "INSERT INTO Measures (value, timestamp, location, sensorID) values ('$strValue', '$strTimestamp', '$strLocation', '$strSensorID')";
		// Respuesta
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		if ($result) {
			return $parameters;
		}
		return null;
	}


	/* 
    * Obtiene el id del sensor del usuario activo
    *
    * Texto -->
    *                 			getSensorIDFromUser() <--
    * <-- sensorID:N, Nada
    */
	public function getSensorIDFromUser($userID) {
		$strUserID = mysqli_real_escape_string($this->conn, $userID);
		// Query
		$sql = "SELECT id FROM Sensors as s WHERE s.mail = '$strUserID'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	/* 
    * Obtiene la última medida tomada del usuario activo
    *
    * Texto -->
    *                      getLastMeasure() <--
    * <-- MeasureEntity
    */
	public function getLastMeasure($sensorID) {
		$strSensorID = mysqli_real_escape_string($this->conn, $sensorID);
		// Query
		$sql = "SELECT * FROM Measures as m WHERE m.sensorID = '2' ORDER BY timestamp DESC LIMIT 1";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	/* 
    * Obtiene las medidas del usuario desde el instante solicitado
    *
    * timestamp:N, Texto -->
    *                      						 getMeasuresFromTimestamp() <--
    * <-- Lista<MeasureEntity> | MeasureEntity
    */
	public function getMeasuresFromTimestamp($t, $sensorID) {
		$strT = mysqli_real_escape_string($this->conn, $t);
		$strSensorID = mysqli_real_escape_string($this->conn, $sensorID);
		// Query
		$sql = "SELECT * FROM Measures as m WHERE m.sensorID = '$strSensorID' AND m.timestamp >= '$strT'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	/* 
    * Obtiene las medidas del usuario del periodo personalizado solicitado
    *
    * timestamp:N, timestamp:N, Texto -->
    *                      						 getMeasuresFromTimestamp() <--
    * <-- Lista<MeasureEntity> | MeasureEntity
    */
	public function getMeasuresFromTwoTimestamp($t1, $t2, $sensorID) {
		$strT1 = mysqli_real_escape_string($this->conn, $t1);
		$strT2 = mysqli_real_escape_string($this->conn, $t2);
		$strSensorID = mysqli_real_escape_string($this->conn, $sensorID);
		// Query
		$sql = "SELECT * FROM Measures as m WHERE m.sensorID = '$strSensorID' AND m.timestamp >= '$strT1' AND m.timestamp <= '$strT2'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

}
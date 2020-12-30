<?php

class MeasuresModel extends BaseModel {
	
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
    * Obtiene todas las medidas disponibles
    *
    *                   							getAllMeasures() <--
    * <-- Lista<MeasuresEntity> | MeasureEntity
    */
	public function getAllMeasures() {
		// Respuesta
		$result = BaseEntity::getAll();
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	/* 
    * Obtiene todas las medidas del usuario activo
    *
    * Texto -->
    *                   							getAllMeasuresOfUser() <--
    * <-- Lista<MeasuresEntity> | MeasureEntity
    */
	public function getAllMeasuresOfUser($userID) {
		$strUserID = mysqli_real_escape_string($this->conn, $userID);
		// Query
		$sql = "SELECT m.* FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strUserID'";
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
	public function getLastMeasure($userID) {
		$strUserID = mysqli_real_escape_string($this->conn, $userID);
		// Query
		$sql = "SELECT m.* FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strUserID' ORDER BY timestamp DESC LIMIT 1";
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
	public function getMeasuresFromTimestamp($t, $userID) {
		$strT = mysqli_real_escape_string($this->conn, $t);
		$strUserID = mysqli_real_escape_string($this->conn, $userID);
		// Query
		$sql = "SELECT m.* FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strUserID' AND m.timestamp >= '$strT'";
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
	public function getMeasuresFromTwoTimestamp($t1, $t2, $userID) {
		$strT1 = mysqli_real_escape_string($this->conn, $t1);
		$strT2 = mysqli_real_escape_string($this->conn, $t2);
		$strUserID = mysqli_real_escape_string($this->conn, $userID);
		// Query
		$sql = "SELECT m.* FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strUserID' AND m.timestamp >= '$strT1' AND m.timestamp <= '$strT2'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	// ---------------------------------------------- POST ----------------------------------------------- //

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
		$sql = "INSERT INTO Measures (value, timestamp, location, sensorID) VALUES ('$strValue', '$strTimestamp', '$strLocation', '$strSensorID')";
		// Respuesta
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

}
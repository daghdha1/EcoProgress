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
    * <-- Lista<Measure<stdClass>>  | Nada
    */
	public function getAllMeasures() {
		// Respuesta
		$sql = "SELECT * FROM Measures ORDER BY timestamp DESC";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Obtiene todas las medidas del usuario activo
    *
    * Texto -->
    *                   						getAllMeasuresOfUser() <--
    * <-- Lista<Measure<stdClass>> | Nada
    */
	public function getAllMeasuresOfUser($mail) {
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT m.* FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strMail' ORDER BY timestamp ASC";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Obtiene la última medida tomada del usuario activo
    *
    * Texto -->
    *                      						getLastMeasure() <--
    * <-- Lista<Measure<stdClass>> | Nada    
    */
	public function getLastMeasure($mail) {
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT m.* FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strMail' ORDER BY timestamp DESC LIMIT 1";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Obtiene las medidas del usuario desde el instante solicitado
    *
    * timestamp:N, Texto -->
    *                      							getMeasuresFromTimestamp() <--
    * <-- Lista<Measure<stdClass>>  | Nada
    */
	public function getMeasuresFromTimestamp($t, $mail) {
		$strT = mysqli_real_escape_string($this->conn, $t);
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT m.* FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strMail' AND m.timestamp >= '$strT'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Obtiene las medidas del usuario del periodo personalizado solicitado
    *
    * timestamp:N, timestamp:N, Texto -->
    *                      						 getMeasuresFromTwoTimestamp() <--
    * <-- Lista<Measure<stdClass>> | Nada
    */
	public function getMeasuresFromTwoTimestamp($t1, $t2, $mail) {
		$strT1 = mysqli_real_escape_string($this->conn, $t1);
		$strT2 = mysqli_real_escape_string($this->conn, $t2);
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT m.* FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strMail' AND m.timestamp >= '$strT1' AND m.timestamp <= '$strT2'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	// ---------------------------------------------- POST ----------------------------------------------- //

	/* 
    * Inserta una medida en la base de datos
    *
    * Lista<Texto> -->
    *                      postMeasure() <--
    * <-- V | F
    */
	public function postMeasure($params) {
		$strValue = mysqli_real_escape_string($this->conn, $params['value']);
		$strTimestamp = mysqli_real_escape_string($this->conn, $params['timestamp']);
		$strLocation = mysqli_real_escape_string($this->conn, $params['location']);
		$strSensorID = mysqli_real_escape_string($this->conn, $params['sensorID']);
		// Query
		$sql = "INSERT INTO Measures (value, timestamp, location, sensorID) VALUES ('$strValue', '$strTimestamp', '$strLocation', '$strSensorID')";
		// Respuesta
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);
		// Devuelve true, si no es posible insertar el registro devuelve false
		return $result;
	}

}
<?php

class MeasuresModel extends BaseModel {
	
	private $conn;

	// Constructor
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->conn = $adapter;
    }

	// getMeasures()
	public function getMeasures() {
		// Query
		$sql = "SELECT * FROM Measures";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	// postMeasure()
	public function postMeasure($parameters) {
		// Escapamos los carácteres especiales
		//echo "------------> " . $parameters;
		//print_R($parameters);
		$strValue = mysqli_real_escape_string($this->conn, $parameters['value']);
		$strtimestamp = mysqli_real_escape_string($this->conn, $parameters['timestamp']);
		$strLocation = mysqli_real_escape_string($this->conn, $parameters['location']);
		$strSensorID = mysqli_real_escape_string($this->conn, $parameters['sensorID']);
		// Query
		$sql = "INSERT INTO Measures (value, timestamp, location, sensorID) values ('$strValue', '$strtimestamp', '$strLocation', '$strSensorID')";
		// Respuesta
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		if ($result) return $parameters;
		return null;
	}
	
}
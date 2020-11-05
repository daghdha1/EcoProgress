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
		$strValue = mysqli_real_escape_string($this->adapter, $parameters->value);
		$strtimestamp = mysqli_real_escape_string($this->adapter, $parameters->timestamp);
		$strLocation = mysqli_real_escape_string($this->adapter, $parameters->location);
		$strSensorID = mysqli_real_escape_string($this->adapter, $parameters->sensorID);
		// Query
		$sql = "INSERT INTO Measures (value, timestamp, location, sensorID) values ('$parameters->value', '$parameters->timestamp', '$parameters->location', '$parameters->sensorID')";
		// Respuesta
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		if ($result == true) {
			return $parameters;
		}
		return null;
	}
	
}
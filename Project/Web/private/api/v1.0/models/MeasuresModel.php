<?php

class MeasuresModel extends BaseModel {
	
	private $table;
	private $conn;

	/* Constructor
	* 
	* Text, DbConnection -->
	*							__construct() --> 
	*/
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->table= (string)$table;
        $this->conn = $adapter;
    }

	/* 
    * Obtiene todas las medidas disponibles
    *
    *                   			getMeasures() <--
    * <-- Lista<MeasuresEntity>
    */
	public function getMeasures() {
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
		$sql = "INSERT INTO $this->table (value, timestamp, location, sensorID) values ('$strValue', '$strTimestamp', '$strLocation', '$strSensorID')";
		// Respuesta
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		if ($result) {
			return $parameters;
		}
		return null;
	}
	
	/* 
    * Obtiene las medidas desde el primer instante del periodo solicitado
    *
    * N -->
    *                      						 getMeasuresFromTimestamp() <--
    * <-- Lista<MeasureEntity> | MeasureEntity
    */
	public function getMeasuresFromTimestamp($timestamp) {
		$strTimestamp = mysqli_real_escape_string($this->conn, $timestamp);
		// Query
		$sql = "SELECT * FROM $this->table WHERE timestamp >= '$strTimestamp'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

}
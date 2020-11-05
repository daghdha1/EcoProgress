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
		$result = BaseEntity::executeSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		echo '<br>';
		echo 'count measures received--> ' . count($result);
		return $result;
	}
	
}
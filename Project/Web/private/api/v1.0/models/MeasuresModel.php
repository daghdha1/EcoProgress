<?php
class MeasuresModel extends BaseModel {
	
	private $adapter;
	// Constructor
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->adapter = $adapter;
    }
	// getMeasures()
	public function getMeasures() {
		// Query
		$sql = "SELECT * FROM Measures";
		// Respuesta
		$result = MyEntity::executeSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}
	
}
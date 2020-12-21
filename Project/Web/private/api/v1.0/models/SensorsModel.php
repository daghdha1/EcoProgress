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

}
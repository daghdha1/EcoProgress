<?php

class UsersModel extends BaseModel {
	
	private $adapter;

	// Constructor
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->adapter = $adapter;
    }

	/* 
    * Obtiene todos los usuarios disponibles
    *
    *                   			getAllUsers() <--
    * <-- Lista<UserEntity>
    */
	public function getAllUsers() {
		// Query
		$sql = "SELECT * FROM Users";
		// Respuesta
		$result = MyEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}
	
	/* 
    * Obtiene el usuario activo
    *
    * userID:Texto -->
    *                   getUser() <--
    * <-- UserEntity
    */
	public function getUser($mail) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->adapter, $mail);
		// Query
		$sql = "SELECT * FROM Users WHERE mail = '$strMail' LIMIT 1";
		// Respuesta
		$result = MyEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}
	
	/* 
    * Obtiene el tiempo total del usuario activo
    *
    * N, N -->
    *                 			getActiveUser() <--
    * <-- Active time:N, Nada
    */
	public function getActiveTimeUser($sensorID, $time) {
		$strSensorID = mysqli_real_escape_string($this->conn, $sensorID);
		$strTime = mysqli_real_escape_string($this->conn, $time);
		// Query
		/* Queremos que nos devuelva el resultado, es decir, la suma del tiempo activo que ha estado un usuario mandando datos */
		$sql = "SELECT timestamp FROM Measures as m WHERE '$strSensorID' ORDER BY timestamp DESC;";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		$res = 0;
		$resultado = 0;
		for($i = 0; $i < count($result); $i++){
			$res = $result[$i] - $result[$i+1];
			if($res <= $strTime){
				$resultado = $resultado + $res;
			}
		}
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $resultado;
	}
}
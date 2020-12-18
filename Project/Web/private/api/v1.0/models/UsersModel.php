<?php

class UsersModel extends BaseModel {
	
	private $conn;

	// Constructor
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->conn = $adapter;
    }

	/* 
    * Obtiene todos los usuarios registrados
    *
    *                   			getAllUsers() <--
    * <-- Lista<UserEntity>
    */
	public function getAllUsers() {
		// Respuesta
		$result = BaseEntity::getAll();
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
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT * FROM Users WHERE mail = '$strMail' LIMIT 1";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}

	/* 
    * Obtiene el tiempo total del usuario activo
    *
    * Texto, N -->
    *                 			getActiveUser() <--
    * <-- Active time:N, Nada
    */
	public function getActiveTimeUser($mail, $time) {
		$strMail = mysqli_real_escape_string($this->conn, $mail);

		$sql = "SELECT m.timestamp FROM Measures as m, Sensors s WHERE m.sensorID = s.id AND s.mail = '$strMail' ORDER BY timestamp DESC";
		
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		$res = 0;
		$resultado = 0;
		for($i = 0; $i < count($result); $i++){
			$res = $result[$i]->timestamp - $result[$i+1]->timestamp;
			if($res <= $time) {
				$resultado = $resultado + $res;
			}
		}
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $resultado;
	}
	/* 
    * Obtiene la distancia total recorrida del usuario activo
    *
    * N, N -->
    *                 			getActiveUser() <--
    * <-- Active time:N, Nada
    */
	public function getTraveledDistance($mail) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT * FROM Measures m, Sensors s WHERE m.sensorID = s.id AND s.mail = '$strMail'";
		// Respuesta
		$result = MyEntity::executeSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}


}
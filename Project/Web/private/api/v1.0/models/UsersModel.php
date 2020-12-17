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
	
	public function getTraveledDistance($mail) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->adapter, $mail);
		// Query
		$sql = "SELECT * FROM Measures m, Sensors s where m.sensorID = s.id and s.mail = '$strMail'";
		// Respuesta
		$result = MyEntity::executeSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}


}
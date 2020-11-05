<?php

class UsersModel extends BaseModel {
	
	private $adapter;

	// Constructor
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->adapter = $adapter;
    }

	// getUsers()
	public function getUsers() {
		// Query
		$sql = "SELECT * FROM Users";
		// Respuesta
		$result = MyEntity::executeSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}
	
	// getUser()
	public function getUser($mail) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->adapter, $mail);
		// Query
		$sql = "SELECT * FROM Users WHERE mail = '$strMail' LIMIT 1";
		// Respuesta
		$result = MyEntity::executeSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $result;
	}
	
}
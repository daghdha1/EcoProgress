<?php

class UsersModel extends BaseModel {
	
	private $conn;

	// Constructor
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->conn = $adapter;
    }

    // Nota: Lo más seguro es crear sentencias preparadas pero por tiempo lo dejo con saneamiento de strings solo

    // ---------------------------------------------- GET ----------------------------------------------- //

	/* 
    * Obtiene todos los usuarios registrados
    *
    *                   			getAllUsers() <--
    * <-- Lista<User<stdClass>>
    */
	public function getAllUsers() {
		// Respuesta
		$result = BaseEntity::getAll();
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}
	
	/* 
    * Obtiene el usuario activo
    *
    * userID:Texto -->
    *                   					getUser() <--
    * <-- Lista<User<stdClass>> | Nada
    */
	public function getUser($mail) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT * FROM Users WHERE mail = '$strMail' LIMIT 1";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Comprueba si el código de activación de registro del usuario es válido
    *
    * Texto, N -->
    *                 						getUserFromMailAndRegCode() <--
    * <-- Lista<User<stdClass>> | Nada
    */
	public function getUserFromMailAndRegCode($mail, $regCode) {
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		$numRegCode = (int)$regCode;
		// Query
		$sql = "SELECT * FROM Users as u WHERE u.mail = '$strMail' AND u.secret_code = $numRegCode";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

	/* 
    * Obtiene las medidas de tiempo de usuario activo
    *
    * Texto -->
    *                 			getActiveTimeOfUser() <--
    * <-- Lista<N> | Nada
    */
	public function getActiveTimeOfUser($mail) {
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		$sql = "SELECT m.timestamp FROM Measures as m, Sensors as s WHERE m.sensorID = s.id AND s.mail = '$strMail' ORDER BY timestamp DESC";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		return $result;
	}

	/* 
    * Obtiene la distancia total recorrida del usuario activo
    *
    * Texto -->
    *                 		getTraveledDistanceOfUser() <--
    * <-- Lista<N>, Nada
    */
	public function getTraveledDistanceOfUser($mail) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->conn, $mail);
		// Query
		$sql = "SELECT m.* FROM Measures m, Sensors s WHERE m.sensorID = s.id AND s.mail = '$strMail'";
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve una lista vacía; si hay algún fallo, devuelve null
		return $result;
	}

    // ---------------------------------------------- POST ----------------------------------------------- //

	/* 
    * Crea un usuario en la base de datos
    *
    * UserEntity -->
    *                   insertUser() <--
    * <-- V | F
    */
	public function insertUser($user) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->conn, $user->getMail());
		$strName = mysqli_real_escape_string($this->conn, $user->getName());
		$strSurnames = mysqli_real_escape_string($this->conn, $user->getSurnames());
		$strPassword = $user->getPassword();
		$numSecretCode = (int)$user->getSecretCode();
		$numRegDate = (int)$user->getRegDate();
		$strRole = mysqli_real_escape_string($this->conn, $user->getRole());
		$strAccountStatus = mysqli_real_escape_string($this->conn, $user->getAccountStatus());

		// Query
		$sql = "INSERT INTO Users (mail, name, surnames, password, secret_code, reg_date, role, account_status) VALUES ('$strMail', '$strName', '$strSurnames', '$strPassword', $numSecretCode, $numRegDate, '$strRole', '$strAccountStatus')";
		
		// Devuelve true, si no ha podido insertar el registro, devuelve false
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);

		return $result;
	}

	/* 
    * Actualiza un usuario en la base de datos
    *
    * UserEntity -->
    *                   updateUser() <--
    * <-- V | F
    */
	public function updateUser($user) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->conn, $user->getMail());
		$strName = mysqli_real_escape_string($this->conn, $user->getName());
		$strSurnames = mysqli_real_escape_string($this->conn, $user->getSurnames());
		$numLastConn = $user->getLastConn();
		$strAccountStatus = mysqli_real_escape_string($this->conn, $user->getAccountStatus());

		// Query
		if (is_null($numLastConn)) {
			$sql = "UPDATE Users as u SET u.name = '$strName', u.surnames = '$strSurnames', u.last_conn = NULL, u.account_status = '$strAccountStatus' WHERE u.mail = '$strMail'";
		} else {
			$sql = "UPDATE Users as u SET u.name = '$strName', u.surnames = '$strSurnames', u.last_conn = $numLastConn, u.account_status = '$strAccountStatus' WHERE u.mail = '$strMail'";
		}
		
		// Devuelve true, si no ha podido actualizar el registro, devuelve false
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);

		return $result;
	}

	/* 
    * Borra un usuario de la base de datos
    *
    * Texto -->
    *                   deleteUser() <--
    * <-- V | F
    */
	public function deleteUser($mail) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->conn, $mail);

		// Query
		$sql = "DELETE FROM Users WHERE Users.mail = '$strMail'";
		
		// Devuelve true, si no ha podido insertar el registro, devuelve false
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);

		return $result;
	}

}
<?php

class UsersModel extends BaseModel {
	
	private $conn;

	// Constructor
	public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
        $this->conn = $adapter;
    }

    // ---------------------------------------------- GET ----------------------------------------------- //

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
    *                 			getActiveTimeOfUser() <--
    * <-- Active range:N, Nada
    */
	public function getActiveTimeOfUser($mail, $range) {
		$strMail = mysqli_real_escape_string($this->conn, $mail);

		$sql = "SELECT m.timestamp FROM Measures as m, Sensors s WHERE m.sensorID = s.id AND s.mail = '$strMail' ORDER BY timestamp DESC";
		
		// Respuesta
		$result = BaseEntity::executeSelectSql($sql);
		$res = 0;
		$resultado = 0;
		for($i = 0; $i < count($result); $i++){
			$res = $result[$i]->timestamp - $result[$i+1]->timestamp;
			if($res <= $range) {
				$resultado = $resultado + $res;
			}
		}
		// Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
		return $resultado;
	}

	/* 
    * Obtiene la distancia total recorrida del usuario activo
    *
    * Texto -->
    *                 			getActiveUser() <--
    * <-- N, Nada
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

    // ---------------------------------------------- POST ----------------------------------------------- //

	/* 
    * Crea un usuario en la base de datos
    *
    * Lista<Texto> -->
    *                   createUser() <--
    * <-- UserEntity
    *
    * Nota: Lo más seguro es crear sentencias preparadas pero por tiempo lo dejo con saneamiento de strings solo
    */
	public function createUser($data) {
		// Escapamos los carácteres especiales
		$strMail = mysqli_real_escape_string($this->conn, $data->getMail());
		$strName = mysqli_real_escape_string($this->conn, $data->getName());
		$strSurnames = mysqli_real_escape_string($this->conn, $data->getSurnames());
		$strPassword = $data->getPassword();
		$strSecretCode = (int)$data->getSecretCode();
		$strRegDate = (int)$data->getRegDate();
		$strRole = mysqli_real_escape_string($this->conn, $data->getRole());
		$strAccountStatus = mysqli_real_escape_string($this->conn, $data->getAccountStatus());

		// Query
		$sql = "INSERT INTO Users (mail, name, surnames, password, secret_code, reg_date, role, account_status) VALUES ('$strMail', '$strName', '$strSurnames', '$strPassword', $strSecretCode, $strRegDate, '$strRole', '$strAccountStatus');";
		
		// Devuelve true, si no ha podido insertar el registro, devuelve false
		$result = BaseEntity::executeInsertUpdateDeleteSql($sql);

		return $result;
	}

}
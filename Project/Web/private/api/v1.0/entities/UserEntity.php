<?php
class UserEntity extends BaseEntity {
	private $mail;
    private $name;
    private $surnames;
    private $password;
    private $secretCode;
    private $lastConn;
    private $regDate;
    private $role;
    private $accountStatus;
	
	// Constructor
    public function __construct() {}

	// Getters
	public function getMail() {
        return $this->mail;
    }
	public function getName() {
        return $this->name;
    }
	public function getSurnames() {
        return $this->surnames;
    }
	public function getPassword() {
        return $this->password;
    }
    public function getSecretCode() {
        return $this->secretCode;
    }
    public function getLastConn() {
        return $this->lastConn;
    }
    public function getRegDate() {
        return $this->regDate;
    }
    public function getRole() {
        return $this->role;
    }
    public function getAccountStatus() {
        return $this->accountStatus;
    }

	
	// Setters
	public function setMail($mail) {
        $this->mail = $mail;
    }
	public function setName($name) {
        $this->name = $name;
    }
	public function setSurnames($surnames) {
        $this->surnames = $surnames;
    }
	public function setPassword($password) {
        $this->password = $password;
    }
    public function setSecretCode($secretCode) {
        $this->secretCode = $secretCode;
    }
    public function setLastConn($lastConn) {
        $this->lastConn = $lastConn;
    }
    public function setRegDate($regDate) {
        $this->regDate = $regDate;
    }
    public function setRole($role) {
        $this->role = $role;
    }
    public function setAccountStatus($accountStatus) {
        $this->accountStatus = $accountStatus;
    }
	
	public function toARRAY() {
        return array(
            'mail' => $this->mail,
            'name' => $this->name,
            'surnames' => $this->surnames,
            'password' => $this->password,
            'secretCode' => $this->secretCode,
            'lastConn' => $this->lastConn,
            'regDate' => $this->regDate,
            'role' => $this->role,
            'accountStatus' => $this->accountStatus
        );
    }

    /* 
    * Crea un objeto User (UserEntity) recibido desde los parámetros de un form (FormData)
    *
    * Lista<Texto> -->
    *                    createUserFromParams() <--
    * <-- UserEntity
    * 
    * Nota: params es una array asociativa (clave-valor)
    */
    public function createUserFromParams($params) {
        $this->setMail($params['reg_mail']);
        $this->setName($params['reg_name']);
        $this->setSurnames($params['reg_surnames']);
        $this->setPassword(generatePasswordHash($params['reg_password']));
        $this->setSecretCode(generateSecretCode());
        $this->setLastConn(NULL);
        $this->setRegDate(time());
        $this->setRole('user');
        $this->setAccountStatus('pending');
        return $this;
    }

    /* 
    * Crea un objeto User (UserEntity) recibido desde un lista de objetos <stdClass> de la base de datos (Database)
    *
    * Lista<stdClass>, iterator:N -->
    *                                    createUserFromDatabase() <--
    * <-- UserEntity
    *
    * Nota: dataList es una array númerica (iterativa)
    */
    public function createUserFromDatabase($dataList, $i=0) {
        $this->setMail($dataList[$i]->mail);
        $this->setName($dataList[$i]->name);
        $this->setSurnames($dataList[$i]->surnames);
        $this->setPassword($dataList[$i]->password);
        $this->setSecretCode($dataList[$i]->secret_code);
        $this->setLastConn($dataList[$i]->last_conn);
        $this->setRegDate($dataList[$i]->reg_date);
        $this->setRole($dataList[$i]->role);
        $this->setAccountStatus($dataList[$i]->account_status);
        return $this;
    }

    /*
    * Crea un array asociativo de objetos Users (UserEntity) desde un objeto User (UserEntity) (TO SEND WITH RESPONSE)
    * 
    * UserEntity -->
    *                           parseUserToArrayUsers() <--
    * <-- Lista<UserEntity>
    */
    public function parseUserToAssocArrayUsers() {
        $result = array(); 
        array_push($result, $this->toArray());
        return $result;
    }

}
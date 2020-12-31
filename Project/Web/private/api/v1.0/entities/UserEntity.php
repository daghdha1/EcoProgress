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
}
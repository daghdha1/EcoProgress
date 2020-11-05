<?php
class UserEntity extends BaseEntity {
	private $mail;
    private $name;
    private $surnames;
    private $password;
	
	// Constructor
    public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
    }
	// getters
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
	
	public function toARRAY() {
        return array(
            'mail' => $this->mail,
            'name' => $this->name,
            'surnames' => $this->surnames,
            'password' => $this->password
        );
}
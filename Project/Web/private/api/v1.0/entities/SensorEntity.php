<?php
class SensorEntity extends BaseEntity {
	private $id;
    private $mail;
    private $type;
    private $activationKey;
    private $state;
	
	// Constructor
    public function __construct() {}

	// Getters
	public function getId() {
        return $this->id;
    }
	public function getMail() {
        return $this->mail;
    }
	public function getType() {
        return $this->type;
    }
	public function getActivationKey() {
        return $this->activationKey;
    }
    public function getState() {
        return $this->state;
    }

	
	// Setters
	public function setId($id) {
        $this->id = $id;
    }
	public function setMail($mail) {
        $this->mail = $mail;
    }
	public function setType($type) {
        $this->type = $type;
    }
	public function setActivationKey($activationKey) {
        $this->activationKey = $activationKey;
    }
    public function setState($state) {
        $this->state = $state;
    }
	
	public function toARRAY() {
        return array(
            'id' => $this->id,
            'mail' => $this->mail,
            'type' => $this->type,
            'activationKey' => $this->activationKey,
            'state' => $this->state
        );
    }
}
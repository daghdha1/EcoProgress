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

    /* 
    * Crea un objeto Sensor (SensorEntity) recibido desde un lista de objetos <stdClass> de la base de datos (Database)
    *
    * Lista<stdClass>, iterator:N -->
    *                                    createSensorFromDatabase() <--
    * <-- SensorEntity
    *
    * Nota: dataList es una array númerica (iterativa)
    */
    public function createSensorFromDatabase($dataList, $i=0) {
        $this->setId($dataList[$i]->id);
        $this->setMail($dataList[$i]->mail);
        $this->setType($dataList[$i]->type);
        $this->setActivationKey($dataList[$i]->activation_key);
        $this->setState($dataList[$i]->state);
        return $this;
    }
}
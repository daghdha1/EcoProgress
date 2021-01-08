<?php
class MeasureEntity extends BaseEntity {
	private $value;
    private $timestamp;
    private $location;
    private $sensorID;
    
    // Constructor
    public function __construct() {}
    
    // Getters
	public function getValue() {
        return $this->value;
    }
	
	 public function getTimestamp() {
        return $this->timestamp;
    }
	
	public function getLocation() {
        return $this->location;
    }
	
    public function getSensorID() {
        return $this->sensorID;
    }

	// Setters
	public function setValue($value) {
        $this->value = $value;
    }

    public function setTimestamp($timestamp) {
        $this->timestamp = $timestamp;
    }

	public function setLocation($location) {
        $coor = explode(',', $location);
        $this->location = array(
            'latitude' => $coor[0], 
            'longitude' => $coor[1]
        );
    }

	public function setSensorID($sensorID) {
        $this->sensorID = $sensorID;
    }
	
    public function toARRAY() {
        return array(
            'value' => $this->value,
            'timestamp' => $this->timestamp,
            'location' => $this->location,
            'sensorID' => $this->sensorID
        );
    }

    /* 
    * Crea un objeto Measure (MeasureEntity) recibido desde los parámetros de un form (FormData)
    *
    * Lista<Texto> -->
    *                    createMeasureFromParams() <--
    * <-- MeasureEntity
    * 
    * Nota: params es una array asociativa (clave-valor)
    */
    public function createMeasureFromParams($params) {
        $this->setValue($params['value']);
        $this->setTimestamp($params['timestamp']);
        $this->setLocation($params['location']);
        $this->setSensorID($params['sensorID']);
        return $this;
    }

    /* 
    * Crea un objeto Measure (MeasureEntity) recibido desde un lista de objetos <stdClass> de la base de datos (Database)
    *
    * Lista<stdClass>, iterator:N -->
    *                                    createMeasureFromDatabase() <--
    * <-- MeasureEntity
    *
    * Nota: dataList es una array númerica (iterativa)
    */
    public function createMeasureFromDatabase($dataList, $i=0) {
        $this->setValue($dataList[$i]->value);
        $this->setTimestamp($dataList[$i]->timestamp);
        $this->setLocation($dataList[$i]->location);
        $this->setSensorID($dataList[$i]->sensorID);
        return $this;
    }

    /*
    * Crea un array asociativo de objetos Measure (MeasureEntity) desde un objeto Measure (MeasureEntity) (TO SEND WITH RESPONSE)
    * 
    * MeasureEntity -->
    *                               parseMeasureToAssocArrayMeasures() <--
    * <-- Lista<MeasureEntity>
    */
    public function parseMeasureToAssocArrayMeasures() {
        $result = array(); 
        array_push($result, $this->toArray());
        return $result;
    }
            
}
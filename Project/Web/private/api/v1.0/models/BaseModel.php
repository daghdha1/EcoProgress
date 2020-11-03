<?php
class BaseModel extends BaseEntity {
	// Constructor     
    public function __construct($table, $adapter) {
        parent::__construct($table, $adapter);
    }
}
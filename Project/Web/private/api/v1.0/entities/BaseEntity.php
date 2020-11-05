<?php
class BaseEntity {
	
	private $table;
    private $conn;

    // Constructor
    public function __construct($table, $adapter) {
        $this->table= (string)$table;
        $this->conn = $adapter;
    }
    
    public function getTable() {
        return $this->table;
    }

    public function getConn() {
        return $this->conn;
    }

    public function getAll() {
        // Query
        $sql = "SELECT * FROM $this->table"; // no podemos ordenar por ningun campo
        // Respuesta
        $result = $this->executeSelectSql($sql);
        // Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
        return $result;
    }
     
    public function getById($id) {
        // Escapamos los carácteres especiales
        $strId = mysqli_real_escape_string($id);
        // Query
        $sql = "SELECT * FROM $this->table WHERE id = '$strId'";
        // Respuesta
        $result = $this->executeSelectSql($sql);
        // Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
        return $result;
    }
    
    public function getBy($column, $value) {
        // Escapamos los carácteres especiales
        $strColumn = mysqli_real_escape_string($column);
        $strValue = mysqli_real_escape_string($value);
        // Query
        $sql = "SELECT * FROM $this->table WHERE '$strColumn' = '$strValue'";
        // Respuesta
        $result = $this->executeSelectSql($sql);
        // Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
        return $result;
    }
     
    
    public function executeSelectSql($sql) {
        // Si hay Respuesta
        if ($data = $this->conn->query($sql)) {
            // Si hay más de un resultado
            if ($data->num_rows > 1) {
                // Creamos un array de objetos stdClass
                while ($obj = $data->fetch_object()) {
                    $result[] = $obj;
                }
                return $result;
            // Sino, si solo hay un resultado 
            } elseif ($data->num_rows == 1) {
                // Creamos un objeto stdClass
                $result = $data->fetch_object();
                return $result;
            }
        }
        return null;
    }

    // Funcion hecha porque el update/insert/delete no devuelve rows y executeSql no sirve
    public function executeInsertUpdateDeleteSql($sql) {
        // Si hay Respuesta
        $data = $this->conn->query($sql))
        return $data;
    }
}
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

    /* Consulta todos los datos de la tabla solicitada
    *
    *                         getAll() <--
    * <-- T | Lista<Object>
    */
    public function getAll() {
        // Query
        $sql = "SELECT * FROM $this->table";
        // Respuesta
        $result = $this->executeSelectSql($sql);
        // Devuelve el resultado, si no ha encontrado ninguna coincidencia, devuelve null
        return $result;
    }
    
    /* Consulta todos los datos de la tabla solicitada, filtrados por la colunna id
    *
    * Texto -->
    *                         getById() <--
    * <-- T | Lista<Object>
    */
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
    
    /* Consulta todos los datos de la tabla solicitada, filtrados por la columna y el valor indicado
    *
    * Texto, Texto -->
    *                         getBy() <--
    * <-- T | Lista<Object>
    */
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
     
    /* Ejecuta la consulta get solicitada contra la base de datos
    *
    * Texto -->
    *                           executeSelectSql() <--
    * <-- Lista<T> | Nada
    */
    public function executeSelectSql($sql) {
        // Si hay Respuesta
        if ($data = $this->conn->query($sql)) {
            // Si hay algún resultado
            if ($data->num_rows > 0) {
                // Creamos un array de objetos stdClass
                while ($obj = $data->fetch_object()) {
                    $result[] = $obj;
                }
                return $result;
            } else {
                return array();
            }
        }
        return NULL;
    }

    /* Acciones Update/Insert/Delete contra la base de datos
    *
    * Texto -->
    *             executeInsertUpdateDeleteSql() <--
    * <-- V | F
    */
    public function executeInsertUpdateDeleteSql($sql) {
        return $this->conn->query($sql);
    }
}
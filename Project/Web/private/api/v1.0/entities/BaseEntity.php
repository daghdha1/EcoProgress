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
    * <-- T | Lista<Object>
    */
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

    /* Acciones Update/Insert/Delete contra la base de datos
    *
    * Texto -->
    *             executeInsertUpdateDeleteSql() <--
    * <-- T
    */
    public function executeInsertUpdateDeleteSql($sql) {
        // Si hay Respuesta
        $data = $this->conn->query($sql);
        return $data;
    }
}
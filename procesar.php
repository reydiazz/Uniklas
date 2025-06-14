<?php
// Conexión con la base de datos (host, usuario, contraseña, nombre de la base de datos)
$conexion = new mysqli("localhost", "root", "", "BD_Uniklas");

// Verificar si hubo error de conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Obtener los datos enviados desde el formulario con POST
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['mensaje'];

// Preparar la consulta SQL para insertar los datos
$sql = "INSERT INTO mensajes (nombre, correo, asunto, mensaje)
        VALUES ('$nombre', '$correo', '$asunto', '$mensaje')";

// Ejecutar la consulta y mostrar el resultado
if ($conexion->query($sql) === TRUE) {
    echo "Mensaje enviado correctamente.";
} else {
    echo "Error al enviar el mensaje: " . $conexion->error;
}

// Cerrar la conexión con la base de datos
$conexion->close();
?>

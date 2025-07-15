<?php
session_start();
$limite_tiempo = 3600; // Tiempo límite en segundos

// Inicializa el contador y el tiempo si no existen
if (!isset($_SESSION['envios'])) {
    $_SESSION['envios'] = 0;
    $_SESSION['envios_inicio'] = time();
}
// Si ya pasó el tiempo límite, reinicia el contador
if (time() - $_SESSION['envios_inicio'] > $limite_tiempo) {
    $_SESSION['envios'] = 0;
    $_SESSION['envios_inicio'] = time();
}

// Verifica el límite de envíos
if ($_SESSION['envios'] >= 3) {
    echo "Has alcanzado el límite de envíos desde este navegador. Intenta nuevamente más tarde.";
    exit;
}

// Conexión con la base de datos (host, usuario, contraseña, nombre de la base de datos)
$conexion = new mysqli("localhost", "root", "", "bd_uniklas");

// Verificar si hubo error de conexión
if ($conexion->connect_error) {
    die("Conexión fallida. Por favor, inténtelo más tarde.");
}

// Obtener y sanitizar los datos enviados desde el formulario con POST
$nombre = htmlspecialchars(strip_tags($_POST['nombre']));
$correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);
$asunto = htmlspecialchars(strip_tags($_POST['asunto']));
$mensaje = htmlspecialchars(strip_tags($_POST['mensaje']));

// Validar que el nombre y el asunto solo contengan letras
if (!preg_match("/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u", $nombre)) {
    echo "El nombre solo puede contener letras.";
    exit;
}
if (!preg_match("/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u", $asunto)) {
    echo "El asunto solo puede contener letras.";
    exit;
}

if (empty($nombre) || empty($correo) || empty($asunto) || empty($mensaje)) {
    echo "Todos los campos son obligatorios.";
    exit;
}

// Preparar la consulta SQL para insertar los datos
$stmt = $conexion->prepare("INSERT INTO mensajes (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $correo, $asunto, $mensaje);

// Ejecutar la consulta y mostrar el resultado
if ($stmt->execute()) {
    $_SESSION['envios']++; // Suma un envío
    // --- ENVÍO DE CORREO ---
    $destinatario = "fortegaquispe0@gmail.com"; // Cambia por el correo que desees
    $asuntoCorreo = "Nuevo mensaje de contacto: $asunto";
    $contenido = "Nombre: $nombre\nCorreo: $correo\nAsunto: $asunto\nMensaje: $mensaje";
    $cabeceras = "From: $correo\r\nReply-To: $correo\r\n";
    mail($destinatario, $asuntoCorreo, $contenido, $cabeceras);

    echo "Mensaje enviado correctamente.";
} else {
    echo "Hubo un problema al enviar el mensaje. Por favor, inténtelo más tarde.";
}

$stmt->close();
$conexion->close();
?>
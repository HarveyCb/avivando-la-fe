<?php
// Archivo donde guardamos el último PDF descargado
$logFile = "log.txt";
$baseURL = "https://www.avivandolafe.org/wp-content/uploads/cartas/";
$year = date("y"); // Últimos dos dígitos del año actual

// Leer el último archivo descargado
$lastNumber = 5; // Valor por defecto
if (file_exists($logFile)) {
    $lastNumber = (int)file_get_contents($logFile);
}

// Intentamos con el siguiente número
$newNumber = $lastNumber + 1;
$newPDF = sprintf("%03d-%03d.pdf", $newNumber, $year);
$urlNewPDF = $baseURL . $newPDF;

// Verificar si el nuevo archivo existe
$headers = @get_headers($urlNewPDF);
if ($headers && strpos($headers[0], '200') !== false) {
    // Si existe, actualizamos el log y descargamos el nuevo PDF
    file_put_contents($logFile, $newNumber);
    header("Content-Type: application/pdf");
    header("Content-Disposition: attachment; filename=\"$newPDF\"");
    readfile($urlNewPDF);
} else {
    // Si no existe, descargamos el último válido
    $lastPDF = sprintf("%03d-%03d.pdf", $lastNumber, $year);
    $urlLastPDF = $baseURL . $lastPDF;
    
    header("Content-Type: application/pdf");
    header("Content-Disposition: attachment; filename=\"$lastPDF\"");
    readfile($urlLastPDF);
}
?>

<?php
session_start();

// Destruir la sesión
session_destroy();
setcookie("token", "", time()-1 ,"/"); // reset
setcookie("token", "", time()-1 ,"/"); 
setcookie("id", "", time()-1 ,"/"); 
setcookie("usu", "", time()-1 ,"/"); 
setcookie("Nombre", "", time()-1 ,"/"); 
setcookie("apellidos", "", time()-1 ,"/"); 
setcookie("dpi", "", time()-1 ,"/"); 
setcookie("puesto", "", time()-1 ,"/"); 
setcookie("id_agencia", "", time()-1 ,"/"); 
setcookie("Email", "", time()-1 ,"/"); 

unset($_SESSION["token"]);

header("Location: index.php");
exit();
?>

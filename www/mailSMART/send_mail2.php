<?php

require('phpmailer/PHPMailerAutoload.php');

$mail = new PHPMailer();

$mail->Host = 'ssl://smtp.mail.ru';
$mail->SMTPAuth = true;
$mail->Username = 'planer@formarosta.ru'; // логин от вашей почты
$mail->Password = 'FRlarvij1015'; // пароль от почтового ящика
$mail->SMTPSecure = 'SSL';
$mail->Port = '465';
$mail->CharSet = 'UTF-8';
$mail->From = $_POST['mailMeil']; // адрес почты, с которой идет отправка
$mail->FromName = 'Формароста'; // имя отправителя
$mail->addaddress($_POST['mailmy'], 'Anton');

$mail->Send();

$rezult='ok  ot<'.$_POST['mailMeil'].' yshlo na >>'.$_POST['mailmy'];
echo $rezult;

?>

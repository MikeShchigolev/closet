<?php

require('phpmailer/class.phpmailer.php');


$email = new PHPMailer();
$file_to_attach = 'info.pdf';

$email->From      = 'xz@gmail.com';//от кого
$email->FromName  = 'Your Name';
$email->Subject   = 'Message Subject';
$email->Body      = 'xxxxxxxw8 prosto xz@gmail.com link=='.$file_to_attach;
$email->AddAddress('vorodis2@gmail.com');//куда


$email->AddAttachment( $file_to_attach , 'info.pdf');

$email->Send();/**/

echo '$email '.$file_to_attach;
//echo $email;

/*
sdfgh sdgf dsgf dsgf dsf gsdgf dsg ds gf
$email = new PHPMailer();
$email->CharSet = 'UTF-8';
$email->From      = $_POST['mailmy'];
$email->FromName  = '«Тэкс»';
$email->Subject   = 'Ваша новая кухня почти готова.';
$email->Body      = $_POST['mailText'];
$email->AddAddress( $_POST['mailMeil']);

// $file_to_attach = $_SERVER['DOCUMENT_ROOT'].'/resources/pdf';

// $email->AddAttachment( $file_to_attach , 'new_pdf_5a0016ffe1077.pdf' ,  $encoding = 'base64', $type = 'application/pdf');
// $email->AddAttachment('path_to_pdf', $name = 'Name_for_pdf',  $encoding = 'base64', $type = 'application/pdf');
//$email->AddAttachment($_SERVER['DOCUMENT_ROOT'].'/resources/pdf/'.$_POST['fileName'], $name = 'test',  $encoding = 'base64', $type = 'application/pdf');

$em=$_POST['fileName'];
$email->addStringAttachment(file_get_contents($em), 'specification.pdf');
$email->Send();

echo $em;
*/

?>
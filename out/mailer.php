<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions

try {
    //Server settings
	//    $mail->SMTPDebug = 2;

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.yandex.ru';                          // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'site@dprus.com';                 // SMTP username
	$mail->Password = '89040905777';                            // SMTP password
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;                                   // TCP port to connect to

    //Recipients
    $mail->CharSet = 'UTF-8';
	$mail->setFrom('site@dprus.com', 'Заявка с сайта по продаже тахографов');
    $mail->addAddress('site@dprus.com', 'ТрансНавигатор');     // Add a recipient

    //Content
    $name = 'Вася';
    $phone = $_POST['phone'];
    // $email = $_POST['email'];
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Заявка с сайта по продаже тахографов';
    $mail->Body    = $name. "<br>" .$phone. "<br>" .$email;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent'.$name.$phone;

} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
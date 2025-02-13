<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    //  $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'mail.cogniperf.com ';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'contact@cogniperf.com';                     // SMTP username
    $mail->Password   = '$cogni20trzkp&';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 26;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above


    $tar = explode(',',$_POST['text']);
    $nom =  htmlspecialchars($tar[0]);    
    $prenom = htmlspecialchars($tar[1]);    
    $mail_address = htmlspecialchars($tar[2]);    
    $password = htmlspecialchars($tar[3]);
    //Recipients
    $mail->setFrom( $mail_address, 'Code de comfirmation d\'inscription');
    $mail->addAddress( $mail_address, $nom.' '.$prenom);     // Add a recipient
  //  $mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo('contact@cogniperf.com', 'Code de comfirmation');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');
    
    $mail->From = 'contact@cogniperf.com';
    $mail->Sender = 'contact@cogniperf.com';

    // Attachments
   // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
   // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Cogniperf';
    $mail->Body    = '   <h1 style="text-align:center;margin:0;width:100%;height:10vh;background-color: aqua;line-height: 9.5vh;color:white;font-family: calibri;">Cogniperf</h1><br /><br />Bonjour '.$prenom.',<br /><br />Merci pour votre inscription Veuillez utiliser le code suivant pour terminer la vérification : <b> '.$password.'</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

   $mail->CharSet = 'UTF-8';
   $mail->send();
 
 echo json_encode('ok');
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
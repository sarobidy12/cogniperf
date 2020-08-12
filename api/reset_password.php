<?php

          
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';
require 'bdd.php';
 
if(isset($_POST['text'])){ 
      $mail_address =htmlspecialchars($_POST['text']);    
    
   //   verification 

      $t = $database->prepare("SELECT * FROM membre WHERE addres_mail=?");
      $t->execute(array($mail_address));

       if($t->rowCount() ==  1){

              $a = $t->fetch();

           $name= $a['prenom'];
           $id= $a['id'];
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
               
             
                //Recipients
                $mail->setFrom( $mail_address, 'réinitialisation du mot de passe');
                $mail->addAddress( $mail_address, $name);     // Add a recipient
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
                $mail->Body    = ' <h1 style="text-align:center;margin:0;width:100%;height:10vh;background-color: aqua;line-height: 9.5vh;color:white;font-family: calibri;">Cogniperf</h1> 
                                        <p style="color:black">
                                            Bonjour '.$name.',<br /> 
                                            Nous avons reçu une demande pour réinitialiser le mot de passe de votre compte.<br /> 
                                            Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant :<br />  
                                        </p>
                                            <a href="https://www.Cogniperf.com/account/password-reset/'.$id.'"  style="display:block;width:30vh;height:5vh; background-color: red;color: white;text-decoration: none;font-size: 2vh;font-family: calibri; line-height: 5vh;text-align: center;border-radius: 1vh;">réinitialiser votre mot de passe</a>
                                                                             <br /><br /> 
                                        <b style="color:#aaa;font-size:1vh">
                                            si vous n\'êtes pas à l\'origine de cette demande, veuillez ignorer ce message. <br />
                                            Si vous n\'avez pas demandé cette réinitialisation, vous pouvez ignorer ce message.
                                        </b>
                
               ';
                $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            
               $mail->CharSet = 'UTF-8';
                $mail->send();
             
             echo json_encode('ok');
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
            
            
       }else{
               echo json_encode('address mail n\'existe pas ');
       }

}
   
    
    


?>
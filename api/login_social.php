<?php

require 'bdd.php';
 
if(isset($_POST['text'])){

      $tar = explode(',',$_POST['text']);
      $name = htmlspecialchars($tar[0]);    
      $secondName = htmlspecialchars($tar[1]);    
      $mail = htmlspecialchars($tar[2]);    
      $password = sha1('facebook');    

      //verification 

       $t = $database->prepare("SELECT * FROM membre WHERE addres_mail=?");
       $t->execute(array($mail));

        if($t->rowCount() ==  1){

            echo json_encode('login'); 

        }else{
      
            echo json_encode("vous n'êtes pas encore membre, inscrivez-vous");   

        }

}


?>
<?php

require 'bdd.php';
 
if(isset($_POST['text'])){

     $tar = explode(',',$_POST['text']);
      $mail = htmlspecialchars($tar[0]);    

   //   verification 

      $t = $database->prepare("SELECT * FROM membre WHERE addres_mail=?");
      $t->execute(array($mail));

       if($t->rowCount() ==  1){

            $a = $t->fetch();

            echo json_encode([$a['id'],$a['nom'],$a['prenom']]);

       }

}
   
    
    


?>
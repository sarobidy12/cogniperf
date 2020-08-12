<?php

require 'bdd.php';
 
if(isset($_POST['text'])){
 
      $mail = htmlspecialchars($_POST['text']);    

      //verification 

      $t = $database->prepare("SELECT * FROM membre WHERE addres_mail=?");
      $t->execute(array($mail));

       if($t->rowCount() ==  1){

            $a = $t->fetch();
    
                 $b = $database->prepare("UPDATE membre SET comfirm=1 WHERE id=?");
                 $b->execute(array($a['id']));
                 echo json_encode([$a['id'],$a['nom'],$a['prenom']]);

       }

}
   
?>
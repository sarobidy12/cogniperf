<?php

require 'bdd.php';
 
if(isset($_POST['text'])){


   //   verification 

      $t = $database->prepare("SELECT * FROM categorie WHERE nom_categorie=?");
      $t->execute(array(urldecode($_POST['text'])));

       if($t->rowCount() ==  1){

            $a = $t->fetch();
            echo json_encode($a['id']);
       }
 
}
   
    
    


?>
<?php

require 'bdd.php';
 
if(isset($_POST['text'])){
    $tar = explode(',',$_POST['text']);
      $id = htmlspecialchars($tar[0]);   
      $passwords = htmlspecialchars($tar[1]); 
     
      //verification 

      $t = $database->prepare("SELECT * FROM membre WHERE id=?");
      $t->execute(array($id));

       if($t->rowCount() ==  1){

            $a = $t->fetch();
            $b = $database->prepare("UPDATE membre SET passwords=? WHERE id=?");
            $b->execute(array($passwords,$id));
            
            echo json_encode($a['addres_mail']);
 
           
       }

}
   
?>
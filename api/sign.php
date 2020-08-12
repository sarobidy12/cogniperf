<?php

require 'bdd.php';
 
if(isset($_POST['text'])){

    $tar = explode(',',$_POST['text']);
    $nom =  htmlspecialchars($tar[0]);    
    $prenom = htmlspecialchars($tar[1]);    
    $mail = htmlspecialchars($tar[2]);    
    $password = htmlspecialchars($tar[3]);

    // verification 

    $t = $database->prepare("SELECT * FROM membre WHERE addres_mail=?");
    $t->execute(array($mail));

     if($t->rowCount() ==  0){

         $a = $database->prepare("INSERT INTO membre(nom,prenom,addres_mail,passwords) VALUE(?,?,?,?)");
         $a->execute(array($nom,$prenom,$mail,$password));
    
         if($a){
             echo json_encode('add');
         }else{
             echo json_encode("@/fdv343ggdf./h");
         }
        
     }else{
             echo json_encode('address mail existe deja ');
     }

}
   
    
    


?>
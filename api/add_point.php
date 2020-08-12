<?php

require 'bdd.php';
 
if(isset($_POST['text'])){

    $tar = explode(',',$_POST['text']);
    $id =  htmlspecialchars($tar[0]);    
    $point =  htmlspecialchars($tar[1]);    
    $categorie = htmlspecialchars($tar[2]);    

    // verification 

    $t = $database->prepare("SELECT * FROM point WHERE id_users=? AND categorie=?");
    $t->execute(array($id,$categorie));

     if($t->rowCount() ==  0){

         $a = $database->prepare("INSERT INTO point(id_users,points,categorie) VALUE(?,?,?)");
         $a->execute(array($id,$point,$categorie));
    
         if($a){

            echo json_encode('add');

         }
                 
     }else{

        $a = $database->prepare("UPDATE point SET points=? WHERE id_users=? AND categorie=?");
        $a->execute(array($point,$id,$categorie));
   
        if($a){
            echo json_encode('update');
        }
     }

}
   

?>
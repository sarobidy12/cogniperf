<?php

require 'bdd.php';
 
if(isset($_POST['text'])){

    $tar = explode(',',$_POST['text']);
      $mail = htmlspecialchars($tar[0]);    
      $password = htmlspecialchars($tar[1]);

   //   verification 

      $t = $database->prepare("SELECT * FROM membre WHERE addres_mail=?");
      $t->execute(array($mail));

       if($t->rowCount() ==  1){

            $a = $t->fetch();

            if($a['passwords'] == $password){
                
              $b=$a['comfirm'];
       
                
                  if($b == 1){
                    
        
                     echo json_encode('login');
                
                }else{
                    
        
                    echo json_encode('comfirme');
                
                }
            
            }else{
                
                echo json_encode('mot de passe incorrect');
                
            }
            
            
       }else{
               echo json_encode('address mail n\'existe pas ');
       }

}
   
    
    


?>
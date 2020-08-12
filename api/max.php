<?php
require 'bdd.php'; 


$b=array();

if($_POST['text']){
     
     $f=$_POST['text'];

     foreach($bdd= $database->query("SELECT * FROM  point WHERE categorie=$f ")->fetchall(PDO::FETCH_OBJ) AS $a):

          array_push($b,$a->points);
          
     endforeach;
     
     echo  json_encode($b);
}




?>
<?php
require 'bdd.php';

$tableau =[];

class app{

    public  $x;
    public  $y;
  
    public function add($a,$b){
       $this->y= $a;
       $this->x= $b;
    }

 }
       for($i=0;$i< 19;$i++){

            $bdd= $database->query("SELECT COUNT(*) AS NameCount FROM point WHERE points=$i AND categorie=1  ");
            $a= $bdd->fetchall();
            $c= new app;
            $c->add($a[0]['NameCount'],$i);
            array_push($tableau,$c);

        }
     echo  json_encode($tableau);
?>
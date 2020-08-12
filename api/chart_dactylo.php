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

 
        
       
            $bdd= $database->query("SELECT COUNT(*) AS NameCount FROM point WHERE points=0 AND categorie=4");
            $a= $bdd->fetchall();
            $c= new app;
            $c->add($a[0]['NameCount'],0);
            array_push($tableau,$c);
            
            $a=0;
            $b=20;
            
        for($i=0;$i< 9;$i++){
       
            $bdd= $database->query("SELECT COUNT(*) AS NameCount FROM point WHERE points BETWEEN ($a +1) + 0  AND ($b -1) +0  AND categorie=4 ");
            $r= $bdd->fetchall();
            $c= new app;
            $c->add(round($r[0]['NameCount'],0),($a+10));
            array_push($tableau,$c);

            $a=$b;
            $b=$b+20;
        }
        
        
            $bdd= $database->query("SELECT COUNT(*) AS NameCount FROM point WHERE points=180 AND categorie=4");
            $a= $bdd->fetchall();
            $c= new app;
            $c->add($a[0]['NameCount'],180);
            array_push($tableau,$c);
        
     echo  json_encode($tableau);
?>
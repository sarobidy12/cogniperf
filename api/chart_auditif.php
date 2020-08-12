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

 $a=0;
 $b=1000;
        
        $c= new app;
        $c->add(0,0);
        array_push($tableau,$c);

       for($i=0;$i< 20;$i++){
       
            $bdd= $database->query("SELECT COUNT(*) AS NameCount FROM point WHERE points BETWEEN ($a + 1) + 0  AND ($b - 1) +0  AND categorie=6 ");
            $r= $bdd->fetchall();
            $c= new app;
            $c->add($r[0]['NameCount'],($a+500));
            array_push($tableau,$c);

            $a=$b;
            $b=$b+1000;

        }
        
        $c= new app;
        $c->add(0,20000);

      array_push($tableau,$c);

     echo  json_encode($tableau);
?>
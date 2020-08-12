<?php
    $file = explode('<br />',nl2br(file_get_contents('words.txt','r')));

    $tableau =[];

    
    for($i=0;$i <200;$i++){
        
        array_push($tableau,$file[rand(10,336450)]);

    }

    echo json_encode($tableau);
?>
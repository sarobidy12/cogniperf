<?php


	$tar = explode(',',$_POST['text']);
	$nom =  htmlspecialchars($tar[0]);    
	$prenom = htmlspecialchars($tar[1]);    
	$mail = htmlspecialchars($tar[2]);    
	$tags = htmlspecialchars($tar[3]);
	require_once("includes/ActiveCampaign.class.php");

	$ac = new ActiveCampaign("https://webshark.api-us1.com", "9a136177d13a49735935b56fb8d62cc660d86f6988ffd4f345267b6781f61362392f0404");
    	/*
	 * ADD OR EDIT CONTACT (TO THE NEW LIST CREATED ABOVE).
	 */

    $list_id =31;

	$contact = array(
		"email"              => $mail,
		"first_name"         => $nom,
		"last_name"          => $prenom,
		"rgpd"               => true,
		"tags"               => $tags,
		"p[{$list_id}]"      => $list_id,
		"status[{$list_id}]" => 1, // "Active" status
	);

	$contact_sync = $ac->api("contact/sync", $contact);

	if (!(int)$contact_sync->success) {
		// request failed
		echo json_encode("<p>Syncing contact failed. Error returned: " . $contact_sync->error . "</p>");
		exit();
	}
        
        // successful request
        echo json_encode("activeCampaign");

	 

	 
?>
 

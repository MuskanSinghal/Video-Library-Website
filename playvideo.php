<?php
	extract($_GET);  // php reads the path to play video and returns it to player.html
	$file=fopen("writeVideoLink.txt","r");
	$data=fgets($file);
	$dat=trim($data);
	echo $dat;
?>
	
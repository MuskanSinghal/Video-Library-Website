<?php
	extract($_GET);
	$file=fopen("VideoSLink.txt","r");
	while(($data_from_file=fgets($file))!==false)//gets the data line by line
	{
		$line=trim($data_from_file); //trim
		$value=explode(";",$line); //get one line and separate it by ;
		if($search==$value[0]) //if the card_id matches with the entry in the file then open 
								//one more file and write the path into that file.
		{
			$dataa=$value[1];
			file_put_contents("writeVideoLink.txt",$dataa);		
		}
	}
?>
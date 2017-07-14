<?php
	extract($_GET);
	
	$data=$_GET['id']; //data has the value of id as card1
	
	$file=fopen("VideoLink.txt","r");
	$file1=fopen("text.txt","r");
	$arr1=array();
	while (($datafromfile = fgets($file1)) !== false)
	{
		$line1=trim($datafromfile);
		$lin1=$line1.PHP_EOL;
		$arr1[]=$lin1;
	}
	for($i=0;$i<sizeof($arr1);$i++)
	{
		$a=explode(";",$arr1[$i]);
		if($a[0]==$view)
		{
			$temp=(int)$a[2];
			$temp++;
			echo $a[2];
			$arr1[$i]=$view.";".$a[1].";".$temp.PHP_EOL;
			echo $arr1[$i];
			break;
		}
	}
	file_put_contents("text.txt",$arr1);	
	while(($data_from_file=fgets($file))!==false)//gets the data line by line
	{
		$line=trim($data_from_file); //trim
		$value=explode(";",$line); //get one line and separate it by ;
		if($data==$value[0]) //if the card_id matches with the entry in the file then open 
								//one more file and write the path into that file.
		{
			$dataa=$value[1];
			file_put_contents("writeVideoLink.txt",$dataa);		
		}
	}
	//echo $dataa;
?>
<?php
extract($_GET);
$file=fopen("search.txt","r");
$ret=array();
while($line=fgets($file))
{
	$lin=trim($line);
	if(stripos($lin,$movie)!==false)
	{
		$ret[]=$lin;
	}
}
echo json_encode($ret);
?>

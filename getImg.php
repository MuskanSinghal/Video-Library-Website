<?php
	extract($_GET);
	$data=file("img.txt");
	$ret=array();
	for($i=$count;$i<$count+18 && $i<36;$i++)
	{
		$ret[]=trim($data[$i]);
	}
	if($ret!=null)
	echo json_encode($ret);


?>
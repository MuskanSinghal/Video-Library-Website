<?php
	extract($_GET);
	$data=file("text.txt");
	for($i=$count;$i<$count+18 && $i<36;$i++)
	{
		$ret[]=trim($data[$i]);
	}
	
	echo json_encode($ret);

?>
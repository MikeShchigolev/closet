<?php
	if($_REQUEST['tip'] == "saveJSON") {//Сохронения конфигурации проекта		
		$mytext = stripslashes($_REQUEST['text']);	
		$fp2 = fopen ($_REQUEST['link'], "w");  
		fwrite($fp2,$mytext);  
		fclose($fp2);		
		echo "ok:".$_REQUEST['tip'];
		return;
	}

	if($_REQUEST['tip'] == "mkdir") {//Создание директории    			
		mkdir($_REQUEST['dir']);		
		echo "ok:".$_REQUEST['tip'];			
		return;
    }
    echo "eror:".$_REQUEST['tip'];	
?>

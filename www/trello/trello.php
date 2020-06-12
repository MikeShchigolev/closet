<?php



require_once 'trello/Trello/Client.php';


use Trello\Client;

$api_key='b2f93a6ccc664a9f1395532a47b6868a';
$returned_token='fad945f0a7cd1bb869cccbea0312f04e6dee570c6e5441df0c719a5273387d04';






$client = new Client($api_key);
$client->authenticate($api_key, $returned_token, Client::AUTH_URL_CLIENT_ID);
     // Get list boards

//$service = new Trello\Service($client);

echo "Okclient";
/*
$service->addListener(Events::CARD_COMMENT, function (CardCommentEvent $event) {
    echo "Okclient";
});


$boards = $client->api('member')->boards()->all("me", array());
$boardNUM = 0;
$boardID = "";
$listID = "";


$client = new \Trello\Client($api_key);
$client->setAccessToken($returned_token);
 



$fff='11111';
if($client)$fff='2222';



$board_id = 'znrW9DA6';*/





//$board = new \Trello\Model\Board($client);
//$board->setId($board_id);





//$board = $client->getBoard($board_id);

/*

$board = $client->getBoard($board_id);


$card_id = '1';
$card = $board->getCard($card_id);
echo $card->name . '<br />';
  
$card->name = $card->name . '-1';
$card->save();*/


/*
//Почта получателя
$mailTo = $_POST['mailmy'];
//Почта отпровителя
$mailFrom = $_POST['mailMeil'];
//Заголовок письма
$mailTitle = $_POST['mailTitle'];
//Текст письма
$mailText = $_POST['mailText'];
//Путь к папке для файлов
$mailDirect = $_POST['mailDirect'];

function xLog($msg){
    global $mailTo, $fileName;
    $res = date("d.m.y H:i") ."; To: $mailTo; pic: $fileName" . "; $msg";
    $log = fopen("uplog.log", "a");
    fwrite($log, "\n$res");
    fclose($log);
    
    return $res;
}

require_once 'lib/libmail.php';
$m = new Mail("UTF-8");
$m->From($mailFrom);
$m->To($mailTo);
$m->Subject($mailTitle);
$m->Body($mailText);

if($m->Send() === true){
    echo xLog("Libmail Successn");
}
else {
    echo xLog("Libmail Failure");
}
*/

//echo "Okclient".$fff;

?>

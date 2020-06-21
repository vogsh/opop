<?php
$email = Trim(stripslashes($_POST["email"]));
$domain = Trim(stripslashes($_POST["domain"]));
$userMessage = Trim(stripslashes($_POST["message"]));

$to = "email@gmail.com";
$subject = "Feedback";
$subject = "=?UTF-8?B?" . base64_encode($subject) . "?=" . PHP_EOL;
$message = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">" .
           "<tr><td align=\"right\">Имя:</td><td>&nbsp;<b>".$email."</b></td></tr>".
           "<tr><td align=\"right\">Домен:</td><td>&nbsp;<b>".$domain."</b></td></tr>".
           "<tr><td align=\"right\">Сообщение:</td><td>&nbsp;<b>".$userMessage."</b></td></tr>".
           "</table>";
$from = 'robot';
$headers = "From: $from" . PHP_EOL . "Reply-To: $from" . PHP_EOL . "Content-Type: text/html; charset=UTF-8" . PHP_EOL . "MIME-Version: 1.0" . PHP_EOL . "Content-Transfer-Encoding: 8bit " . PHP_EOL;

$mail = mail($to, $subject, $message, $headers);

if ($mail) {
    echo json_encode([
    	'status' => 'ok',
    	'message' => 'Added to db'
    ]);
} else {
    header('HTTP/1.1 400 Bad Request');
    json_encode([
    	'status' => 'error',
    	'message' => 'Some error message', 
    	'code' => 400
    ]);
}
?>
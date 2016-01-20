<?php 
$title='Chatta'; 
$css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css"><link rel="stylesheet" type="text/css" href="../../base/css/chat.css">';
include(__DIR__ . '/../../base/header.php');
?>

<div id='flash' class='text-window'>
	<h1>En chatt-klient kopplad till en broadcast-server</h1>
	<p>Välj connection och ett chattnamn</p>
	<input placeholder='Välj ett namn för att gå in i chattrummet'  type='text' id='alias'>
	<button id='dbwebb' value='ws://dbwebb.se:1337'>Anslut till dbwebb (mos server)</button>
	<button id='localhost' value='ws://nodejs1.student.bth.se:8004'>Anslut till nodejs1 på port 8004 (min server)</button>
	<div id='chat'></div>
	<form>
		<input placeholder='Skriv ditt meddelande här' type='text' id='message'>
		<input type='submit' id='send-message' value='Skicka'>
	</form>

</div>

<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
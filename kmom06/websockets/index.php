<?php 
$title='Testa websockets'; 
$css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css"><link rel="stylesheet" type="text/css" href="../../base/css/chat.css">';
include(__DIR__ . '/../../base/header.php');
?>

<div id='flash' class='text-window'>
	<h1>Test HTML5 websockets - Server with two protocols</h1>
	<p>Open up firebug and see the output in the console. If you connect with the broadcast protocol you can open up various connections and in the console you'll se the messages from all connections</p>
	<input type='text' id='url' value='ws://dbwebb.se:1337'/>
	<button id='connect-echo'>Connect with echo-protocol</button>
	<button id='connect-broadcast'>Connect with broadcast-protocol</button>
	<button id='send'>Send message "Hello World"</button>
</div>

<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
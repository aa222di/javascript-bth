<?php 
$title='Breakout'; 
$css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css"><link rel="stylesheet" type="text/css" href="../../base/css/canvas.css">';
include(__DIR__ . '/../../base/header.php');
?>


<canvas id="game" class='breakout' width="800" height="400">
	<p>Your browser doesn't support the canvas element</p>
</canvas>
<audio src="TheForestAwakes.ogg" loop id='soundtrack'>
  Your browser does not support the <code>audio</code> element.
</audio>


<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
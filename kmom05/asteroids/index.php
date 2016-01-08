<?php 
$title='Asteroids'; 
$css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css"><link rel="stylesheet" type="text/css" href="../../base/css/canvas.css">';
include(__DIR__ . '/../../base/header.php');
?>


<canvas id="game" class='asteroids' width="600" height="300">
	<p>Your browser doesn't support the canvas element</p>
</canvas>


<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
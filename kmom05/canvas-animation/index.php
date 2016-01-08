<?php 
$title='Canvas tutorial'; 
$css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css"><link rel="stylesheet" type="text/css" href="../../base/css/canvas.css">';
include(__DIR__ . '/../../base/header.php');
?>

<h2>Draw stars 10 times</h2>
<canvas id="tutorial1" width="600" height="300">
	<p>Your browser doesn't support the canvas element</p>
</canvas>
<h2>Clock from MDN</h2>
<canvas id="tutorial2" width="600" height="300">
	<p>Your browser doesn't support the canvas element</p>
</canvas>
<h2>Hover on ball to move it, click to release</h2>
<canvas id="tutorial3" width="600" height="300">
	<p>Your browser doesn't support the canvas element</p>
</canvas>

<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
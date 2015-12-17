<?php $title='Objekt - My ball'; $css='<link rel="stylesheet" type="text/css" href="../../base/css/ball.css">'; include(__DIR__ . '/../../base/header.php'); ?>
 
<div id='flash' class='text-window'>
<p id='text' class='red'>Hi this text should be replaced when page and DOM is loaded.</p>
<div id='ball'></div>
</div>
 
<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
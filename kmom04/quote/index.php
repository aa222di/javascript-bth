<?php $title='Citatmaskin'; $css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css">'; include(__DIR__ . '/../../base/header.php'); ?>
 
<div id='flash' class='text-window'>
<h1>Get a quote from Marvin's wisdom</h1>
<p><a href=# id="ajax">Get a quote using jquery <code>.ajax()</code></a>.</p>
<p><a href=# id="get">Get a quote using the shorthand method <code>.getJSON()</code></a>.</p>
<p id="quote"></p>
</div>
 
<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
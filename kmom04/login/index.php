<?php $title='Inloggning'; $css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css">'; include(__DIR__ . '/../../base/header.php'); ?>
 
<div id='flash' class='text-window'>
<form id="form1" method=post>
  <p><label>Login:<br><input type='text' name='user'></label></p>
  <p><label>Password:<br><input type='password' name='password'></label></p>
  <p>
    <input id="login" type='button' name='login' value='Login'>
    <input id="logout" type='button' name='logout' value='Logout'>
    <input id="status" type='button' name='status' value='Status'>
  </p>
  <p><output id="output"></output></p>
</div>
 
<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
<?php 
$title='Checkout'; 
$css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css"><link rel="stylesheet" type="text/css" href="../../base/css/shop.css">';
include(__DIR__ . '/../../base/header.php');
include(__DIR__ . '/checkout-form.php'); 

$status = $form->Check();

$output = null;
$outputClass = null;
if($status === true) {
  // Form processed and callback returned true. Redirect to resultpage.
  //$_SESSION['output'] = "The payment transaction was successful. The money was withdrawn from you account.";
  //$_SESSION['outputClass'] = 'success';
  //header("Location: {$_SERVER['PHP_SELF']}");
  //exit;
  $output = "The payment transaction was successful. However, the payment can only be done through our excellent ajax interface.";
  $outputClass = 'success-payment';
}
else if($status === false){
  // Form processed and callback returned false. Redirect to formpage again.
  //header("Location: http://dbwebb.se/javascript/lekplats/one-page-checkout-using-ajax/");
  //exit();
  //$_SESSION['output'] = "The form contains invalid values. Correct them and try again.";
  //$_SESSION['outputClass'] = 'error';
  //header("Location: {$_SERVER['PHP_SELF']}");
  //exit;
  $output = "The form contains invalid values. Correct them and try again.";
  $outputClass = 'error-payment';
}


  $html = $form->GetHTML(array('id' => 'form1', 'columns' => 2));

?>

<div id='flash' class='text-window'>
	<div class='shop'>
		<h1>The Sticker Shop</h1>
		<h2>Checkout</h2>
			<span class='<?= $outputClass ?>'><?= $output ?></span>
		 <?= $html ?>
	</div>

</div>
 
<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
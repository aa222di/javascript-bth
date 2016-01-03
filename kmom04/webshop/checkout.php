<?php 
// Create the session
session_name(preg_replace('/[^a-z\d]/i', '', __DIR__));
session_start();
$title='Checkout'; 
$css='<link rel="stylesheet" type="text/css" href="../../base/css/mall.css"><link rel="stylesheet" type="text/css" href="../../base/css/shop.css">';
include(__DIR__ . '/../../base/header.php');
include(__DIR__ . '/checkout-form.php'); 
include(__DIR__ . '/CShop.php'); 




?>

<div id='flash' class='text-window'>
	<div class='shop'>
		<h1>The Sticker Shop</h1>
		<h2>Checkout</h2>
    <div id='checkout-form'>

    </div>
	</div>

</div>
 
<?php $path=__DIR__; include(__DIR__ . '/../../base/footer.php'); ?>
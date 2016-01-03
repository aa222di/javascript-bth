<?php
include(__DIR__ . '/CShop.php'); 
include(__DIR__ . '/products.php'); 
include(__DIR__ . '/checkout-form.php'); 

// Create the session
session_name(preg_replace('/[^a-z\d]/i', '', __DIR__));
session_start();

$Shop = new \toeswade\CShop($products);



// Get incoming on what to do
$action = isset($_GET['shop']) ? $_GET['shop'] : null;

switch ($action) {
  case 'cart':
    $output = $Shop->getCart();
    break;

  case 'add':
    reset($_POST);
    $Shop->addToCart(key($_POST));
    $output = $Shop->getCart();
    break;

  case 'clear':
    $Shop->clearCart();
    $output = $Shop->getCart();
    break;

  case 'form':
    //reset($_POST);
    $Shop->setCheckoutForm($form);
    $output = $Shop->getCheckoutForm('form1');
    break;

  case 'pay':
    //reset($_POST);
    sleep(4);
   $Shop->setCheckoutForm($form);
    $output = $Shop->getCheckoutForm('form1', true);
    break;
  
  default:
    # code...
    break;
}


// Deliver the response, as a JSON object containing the name of the user.
header('Content-type: application/json');
echo json_encode($output);
<?php
include(__DIR__ . '/CShop.php'); 
include(__DIR__ . '/products.php'); 

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
  
  default:
    # code...
    break;
}


// Deliver the response, as a JSON object containing the name of the user.
header('Content-type: application/json');
echo json_encode($output);
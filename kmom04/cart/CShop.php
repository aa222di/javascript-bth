<?php
namespace toeswade;

/**
 * A class with useful shop and cart methods
 *
 */
class CShop
{

    private $products;
    private $sum = 0;
    private $items = array();

    // Session vars
    private static $sessionCartItems= 'CShop::cartItems';
    private static $sessionCartSum= 'CShop::cartSum';


    public function __construct($arrayOfProducts) {
    	assert(isset($_SESSION));
    	// TODO: Add error handling
    	$this->products = $arrayOfProducts;

    	if(isset($_SESSION[self::$sessionCartItems])) {
    		$this->items = $_SESSION[self::$sessionCartItems];
    	}
    	if(isset($_SESSION[self::$sessionCartSum])) {
    		$this->sum = $_SESSION[self::$sessionCartSum];
		}

		//$_SESSION = array();

    }

    public function getCart() {
    	return array('items' => $this->items, 'sum' => $this->sum);
    }

    public function addToCart($id) {
    	$product = $this->products[$id];
    	// TODO Add error handling

    	if(isset($this->items[$id])) {
    		$this->items[$id]['quantity'] += 1;
    		$this->items[$id]['sum'] += $product['price'];
    	}
    	else {
    		$this->items[$id] = ['name' => $product['name'], 'quantity' => 1, 'sum' => $product['price']];
    	}

    	//var_dump($this->items);

    	if(empty($this->items)) {
    		$this->items[$id] = ['name' => $product['name'], 'quantity' => 1, 'sum' => $product['price']];
    	}
    	//var_dump($this->items);

    	// Add to total sum
    	$this->sum += $product['price'];

    	// Save in session
    	$_SESSION[self::$sessionCartSum] = $this->sum;
    	$_SESSION[self::$sessionCartItems] = $this->items;
    }


}
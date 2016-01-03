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
    private $checkoutForm;
    private $formResponse = '';

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

    public function setCheckoutForm( \CForm $form ) {
        $this->checkoutForm = $form;
    }

    public function getCheckoutForm($formId=null, $pay=false) {

        $this->formResponse = "<span id='output-message' class='info-payment'>Please fill in you credit card information. We will charge you <b>" . $this->sum . " €</b> for the stickers you have bougth.</span>";

        if($pay) {
            $_POST['doPay'] = true;
        }


        $status = $this->checkoutForm->Check();
        if($status === true) {
          $this->formResponse = "<span id='output-message' class='success-payment'>The payment transaction was successful. We have charged " . $this->sum . " from your credit card. Now please go back and shop some more! :)</span>";
        }
        else if($status === false){
          $this->formResponse = "<span id='output-message' class='error-payment'>The form contains invalid values. Correct them and try again.</span>";
        }

        return array('form' => $this->checkoutForm->GetHTML(array('id' => $formId, 'columns' => 2)), 'response' => $this->formResponse);
    }

    public function getCart() {
    	return array('items' => $this->items, 'sum' => $this->sum);
    }

    public function clearCart() {
                // Save in session
        $_SESSION[self::$sessionCartSum] = $this->sum = 0;
        $_SESSION[self::$sessionCartItems] = $this->items = array();
        return array('items' => array(), 'sum' => 0);
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
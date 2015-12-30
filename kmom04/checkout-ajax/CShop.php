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

        if($pay) {
            $_POST['doPay'] = true;
        }


        $status = $this->checkoutForm->Check();
        if($status === true) {
          $this->formResponse = "<span class='success-payment'>The payment transaction was successful. However, the payment can only be done through our excellent ajax interface.</span>";
        }
        else if($status === false){
          $this->formResponse = "<span class='error-payment'>The form contains invalid values. Correct them and try again.</span>";
        }

        return array('form' => $this->checkoutForm->GetHTML(array('id' => $formId, 'columns' => 2)), 'response' => $this->formResponse);
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
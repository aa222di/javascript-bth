/**
 * Place your JS-code here.
 */
$(document).ready(function(){
  'use strict';

  var Shop = {};

  Shop.productTable = $('#products');
  Shop.cartDiv = $('#cart');
  Shop.checkoutForm = $('#checkout-form');

  Shop.getCart = function() {
    console.log('Getting cart data');
    $.ajax({
      url: 'shop.php?shop=cart',
      dataType: 'json',
      success: Shop.updateCart
    }); 
  };

  Shop.clearCart = function() {
    console.log('Clearing cart');
    $.ajax({
      url: 'shop.php?shop=clear',
      dataType: 'json',
      success: Shop.updateCart
    }); 
  };

  Shop.getCheckoutForm = function() {
    console.log('Getting checkout form');
    $.ajax({
      url: 'shop.php?shop=form',
      dataType: 'json',
      success: Shop.insertForm
    }); 
  };

  Shop.updateCheckoutForm = function() {
    console.log('Updating checkout form');

    $('<p class="loader"><img src="../../base/img/loader.gif">Your payment is being processed, don&apos;t reload the page</p>').prependTo(Shop.checkoutForm);

    $.ajax({
      type: 'post',
      url: 'shop.php?shop=pay',
      data: $('#form1').serialize(),
      dataType: 'json',
      success: Shop.insertForm
    }); 
  };

  Shop.insertForm = function(data) {
    $(Shop.checkoutForm).html(data.response + data.form);

    $('#form-element-doPay').click(function(event) {
      event.preventDefault();
      console.log('Clicked');
      Shop.updateCheckoutForm();
    });
  };

  Shop.updateCart = function(data) {
    var i = 0, keys, id;
    var addRow = function(row) {
      $(row).appendTo(Shop.cartBody);
    };

    var updateRow = function(row, id) {
      $(id).html(row);
    };

    console.log('Updating cart with data: ' + data);

    if(data !== null) {
      
        keys = Object.keys(data.items);

        if(keys.length) {
          console.log('Updating cart with products: ' + keys);
          for ( i = 0; i < keys.length; i+=1) {
             id = keys[i];

             // Check if productrow exists
             if($('#cart' + id).length) {
              console.log('Updating');
              updateRow($('<td>' + data.items[id].name + '</td><td>' + data.items[id].quantity + '</td><td>' + data.items[id].sum + '</td>'), $('#cart' + id));
             }

             else {
              console.log('Adding');
              addRow($('<tr id="cart' + id + '"><td>' + data.items[id].name + '</td><td>' + data.items[id].quantity + '</td><td>' + data.items[id].sum + '</td></tr>'));
             }
          }
        }
        else {
          // Empty the cart, there's no products in cart
          $(Shop.cartBody).html('');
        }


    }



    $(Shop.cartSum).html(data.sum);
  };

  Shop.createCart = function() {
    console.log('Creating the cart');
    var table = document.createElement('table');
    $('<thead><tr><th>Item</th><th>Quantity</th><th>Sum</th></thead>').appendTo(table);
    $('<tfoot><tr><td colspan="2">Total sum</td><td id="total-sum"></td></tr></tfoot>').appendTo(table);
    $('<tbody></tbody>').appendTo(table);

    this.cartBody = $(table).find('tbody');
    this.cartSum = $(table).find('#total-sum');

    $(table).appendTo(this.cartDiv);
  };

  Shop.addItem = function(id) {
    console.log('Adding item with id: ' + id);
    $.ajax({
      type: 'post',
      url: 'shop.php?shop=add',
      data: id,
      dataType: 'json',
      success: Shop.updateCart
    }); 
  };

  Shop.createCart();
  Shop.getCart();
  Shop.getCheckoutForm();

  $('.buy').click(function() {
    Shop.addItem(this.id);
  });

  $('#clear-cart').click(function() {
    Shop.clearCart();
  });




  console.log('Everything is ready.');
});
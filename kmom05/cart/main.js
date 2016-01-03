/**
 * Place your JS-code here.
 */
$(document).ready(function(){
  'use strict';

  var Shop = {};

  Shop.productTable = $('#products');
  Shop.cartDiv = $('#cart');

  Shop.getCart = function() {
    console.log('Getting cart data');
    $.ajax({
      url: 'shop.php?shop=cart',
      dataType: 'json',
      success: Shop.updateCart
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
        console.log(keys);
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

  $('.buy').click(function() {
    Shop.addItem(this.id);
  });




  console.log('Everything is ready.');
});
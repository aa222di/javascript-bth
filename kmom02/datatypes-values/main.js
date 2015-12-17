/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
  var list, table, i,
    rows = '',
    element = document.getElementById('text'),
    numbers = [42, 4.2, 12100, 0.0112, 16711935];

  console.log('Starting');
  element.className = 'black';
  element.innerHTML = '<b>Numbers - datatypes and values</b>';
  
  // Create list for constants
  list = document.createElement('ul');
  rows += '<li><b>Eulers constans E </b>&equals; ' + Math.E +  '</li>';
  rows += '<li><b>PI </b>&equals; ' + Math.PI +  '</li>';
  rows += '<li><b>Largest number possible </b>&equals; ' + Number.MAX_VALUE +  '</li>';
  rows += '<li><b>Positive infinity </b>&equals; ' + Number.POSITIVE_INFINITY +  '</li>';
  
  list.innerHTML = rows;
  element.parentElement.appendChild(list);


  
  
  // Create table
  table = document.createElement('table');
  rows = '';
  rows += '<thead><tr><th>Function</th>';

  for ( i = 0; i<numbers.length; i++) {
    rows += '<th>' + numbers[i] + '</th>';
  };
  rows += '</tr></thead><tbody>';

  // Exponential form
  rows += '<tr><td>Exponential form</td>';
  for ( i = 0; i<numbers.length; i++) {
    rows += '<td>' + numbers[i].toExponential() + '</td>';
  };
  rows += '</tr>';

  // Fixed form
  rows += '<tr><td>Fixed form, three decimals</td>';
  for ( i = 0; i<numbers.length; i++) {
    rows += '<td>' + numbers[i].toFixed(3) + '</td>';
  };
  rows += '</tr>';

  // Round
  rows += '<tr><td>Round to closest integer</td>';
  for ( i = 0; i<numbers.length; i++) {
    rows += '<td>' + Math.round(numbers[i]) + '</td>';
  };
  rows += '</tr>';

  // Square root
  rows += '<tr><td>Square root</td>';
  for ( i = 0; i<numbers.length; i++) {
    rows += '<td>' + Math.sqrt(numbers[i]).toFixed(5) + '</td>';
  };
  rows += '</tr>';

  // Sinus value
  rows += '<tr><td>Sinus value</td>';
  for ( i = 0; i<numbers.length; i++) {
    rows += '<td>' + Math.sin(numbers[i]).toFixed(5) + '</td>';
  };
  rows += '</tr></tbody>';

  
  table.innerHTML = rows;
  element.parentElement.appendChild(table);


  
  console.log('Ready');
});

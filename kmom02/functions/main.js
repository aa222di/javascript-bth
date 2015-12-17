/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
  var random,
    rollDice,
    getAvg,
    gameArray,
    i,
    avg,
    element = document.getElementById('text');


  random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getAvg = function(arrayOfNumbers, decimals) {
    var sum = 0;
    decimals = decimals || 0;

    for( i=0; i<arrayOfNumbers.length; i++ ) {
      sum += arrayOfNumbers[i]
    }

    return (sum/arrayOfNumbers.length).toFixed(decimals);
  }

  rollDice = function(times) {
    var rolls = [];

    for( i=0; i<times; i++ ) {
      rolls.push(random(1,6));
    }

    return rolls;

  }

  element.className = 'black';
  element.innerHTML = '<h1>Functions - Dice Game </h1><br>';
  
  // Throw dice 6 times
  element.innerHTML += '<h3>Throw a serie of 6 with a dice</h3>';
  gameArray = rollDice(6);
  avg = getAvg(gameArray, 1);
  element.innerHTML += '<b>Average: </b>' + avg + ' <b>Serie: </b>';
  // Loop out the serie
  for( i=0; i<gameArray.length; i++ ) {
      element.innerHTML +=  gameArray[i] + ', ';
  }

  // Throw dice 12 times
  element.innerHTML += '<br><br><h3>Throw a serie of 6 with a dice</h3>';
  gameArray = rollDice(12);
  avg = getAvg(gameArray, 1);
  element.innerHTML += '<b>Average: </b>' + avg + ' <b>Serie: </b>';
  // Loop out the serie
  for( i=0; i<gameArray.length; i++ ) {
      element.innerHTML +=  gameArray[i] + ', ';
  }

  // Throw dice 100 times
  element.innerHTML += '<br><br><h3>Throw a serie of 6 with a dice</h3>';
  gameArray = rollDice(100);
  avg = getAvg(gameArray, 1);
  element.innerHTML += '<b>Average: </b>' + avg + ' <b>Serie: </b>';
  // Loop out the serie
  for( i=0; i<gameArray.length; i++ ) {
      element.innerHTML +=  gameArray[i] + ', ';
  }




  
  
  console.log('Ready');
});

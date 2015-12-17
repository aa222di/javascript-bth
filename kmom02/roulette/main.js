/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
  var container = document.getElementById('flash'),
      form = document.createElement('form'),
      gameTable = document.createElement('div'),
      redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
      blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
      createGameTable,
      random,
      getColor,
      play,
      bankRoll = 100,
      bet = 10;

  createGameTable = function() {
    var i, color, 
    allNumbers = '';
    
    for( i = 0; i < 37; i+=1 ) {   
      // Determine if red, black or green number
      color = getColor(i);
      // Create div
      allNumbers += '<div id="' + i + '" class="' + color + '">' + i + "</div>";
    };

    return allNumbers;
  }

  getColor = function(number) {
    var color, j;
    // Determine if red, black or green number
    color = 'green';
    // Red
    for ( j = 0; j < redNumbers.length; j+=1 ) {
      if(redNumbers[j] === parseInt(number)) {
        color = 'red';
      }
    }
    // Black  
    for ( j = 0; j < blackNumbers.length; j+=1 ) {
      if(blackNumbers[j] === parseInt(number)) {
       color = 'black';
      }
    }
    return color;
  }

  random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  play = function(color, bet) {
    console.log('playing ' + color);
    var num, brick, 
    times = 0,
    max = random(1,10),
    chosen = document.getElementsByClassName('chosen'),
    info = document.createElement('p');

    container.appendChild(info);

    if(chosen[0]) {
          console.log(getColor(chosen[0].id) + ' id: ' + chosen[0].id);
      chosen[0].className = getColor(chosen[0].id);
    }

    function chooseNumber() {
      num = random(0, 36);
      brick = document.getElementById(num);
      brick.className =  getColor(num) + ' chosen';
      if(num && times !== max) {
        window.setTimeout(resetNumber, 500, num); 
      }

      if( times<max ) {
        window.setTimeout(chooseNumber, 500); 
        times++;
      }
      else {
        info.innerHTML = 'The chosen number is ' + num + '. The color is ' + getColor(num);
        if(getColor(num) === color) {
          adjustBankroll(true);
          info.innerHTML += '... That means you won!!!';
        }
        else {
          adjustBankroll(false);
          info.innerHTML += '... Sorry, you lost!';
        }
      }
    }

    function resetNumber(number) {
      var color = getColor(number);
      brick.className = color;
    }

    function adjustBankroll(won) {
      if(won) {
        bankRoll += bet*2;
        
      }
      else {
        bankRoll -= bet;
        console.log(bankRoll);
      }
      document.getElementById('bankRoll').value = bankRoll;
    }

    info.innerHTML = 'Playing...';
    chooseNumber();
  }

      gameTable.innerHTML = createGameTable();
      gameTable.className = 'roulette';
      container.appendChild(gameTable);

      form.innerHTML = "<label for='bankRoll'>Bankroll</label><input id='bankRoll' type='number' value='" + bankRoll + "'>";
      form.innerHTML += "<label for='bet'>Bet</label><input id='bet' type='number' value='" + bet + "'>";
      form.innerHTML += "<label for='color-input'>Choose color</label><select id='color-input'><option value='green'>Green</option><option value='black'>Black</option><option value='red'>Red</option></select>";
      form.innerHTML += "<input id='play' type='button' value='Play'>";
      form.className = 'game-controls';

      container.appendChild(form);

  var button = document.getElementById('play');




  button.addEventListener('click', function() {
    var color;
    color = document.getElementById('color-input');
    color = color.options[color.selectedIndex].value;
    bet = document.getElementById('bet').value;
    play(color, bet);

  });
  
  console.log('Ready');
});

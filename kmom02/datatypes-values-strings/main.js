/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
  var output,
    output2,
    element = document.getElementById('text'),
    str = 'Copyright \u00A9 by XXX';

  output = function(element, string) {
    element.innerHTML += '<br>' + string + ' (' + string.length + ')';
  }

  output2 = function(element, string) {
    element.innerHTML += '<br>' + string + ' (typeof &equals; ' + typeof(string) + ')';
  }

  console.log('Starting');
  element.className = 'black';
  element.innerHTML = '<b>Strings - datatypes and values</b>';

  output(element ,str);

  str += ' Mumintrollet';
  output(element ,str);

  str += ' 1942';
  output(element ,str);

  str += '.';
  output(element ,str);

  str = str.substr(0, str.indexOf('X')) + str.substr((str.lastIndexOf('X') + 1), str.length);
  output(element ,str);

  str = "19" + "42";
  output2(element ,str);

  str = "19" + 42;
  output2(element ,str);

  str = 19 + 42;
  output2(element ,str);

  str = 19 + "42";
  output2(element ,str);



  
  
  console.log('Ready');
});

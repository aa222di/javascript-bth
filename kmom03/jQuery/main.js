/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
  var boxHeight = $('.box').width();
  var createPaletteColor;
  var Img = {};

  createPaletteColor = function(color, parentElement) {

    console.log('Adding color to palette');
    // Add an element and add handler to remove the element on click
    $('<div class="palette-color"></div>')
      .appendTo(parentElement)
      .css('background-color', color)
      .click(function() {
        console.log('Removing: ' + this)
        $(this).remove();
      });
  }

  Eden.createSquare($('.box'));

  $('.box-content').children().hide();

  $('.minimize').click(function() {
    var box = $(this).parent();

    if($(box).hasClass('show')) {
      $(box).removeClass('show');
      $(box).find('.box-content').children().hide();
      $(box).height(boxHeight);
      console.log('Closed box');
    }

    else {
      $(box).addClass('show');
      $(box).find('.box-content').children().show();
      $(box).height('auto');
      console.log('Opened box: ' + this.id);
    }
  });

  // BOX 1 - hide, show and toggle class
  $('#box1').find('.box-content').on('click', '*', function() {
    console.log('Item in Box 1 was clicked:' + this);
    $(this).toggleClass('clicked');
  });

  // BOX 2 - eventPropagation
  $('#box2').find('.box-content').on('click', 'article', function() {
    console.log('Article in box 2 was clicked:' + this);
    $(this).toggleClass('inverted-color');
  });

  $('#box2').find('.box-content').on('click', '#sleepyCat', function( event ) {
     event.stopPropagation();
    console.log('The sleepy kitten in box 2 was clicked:' + this);
    $(this).toggleClass('rotate');
  });

  $('#box2').find('.box-content').on('click', '#playfulCat', function( event ) {
    console.log('The playful kitten in box 2 was clicked:' + this);
    $(this).toggleClass('rotate');
  });

    // BOX 3 - Adding and removing objects
  $('#box3').find('#addColor').click(function() {
    var color = $(this).parent().find('#colorPicker').val();
    console.log('Add color in box 3 was clicked:' + this);
    console.log('Selected color is: ' + color);
    createPaletteColor(color, $('#palette'));
  });

  // Add to the image objects
  Img.create = function(element) {
    this.element = element;
    this.width = $(this.element).width();
    this.height = $(this.element).height();
    console.log('Created new Img obj:' + this);
    console.log('Dimensions are set to:' + this.width + ' x ' + this.height);
  }

  Img.changeDimensions = function(width, height) {
    width += this.width;
    height += this.height;

    $(this.element).width(width);
    $(this.element).height(height);

    console.log('Changed size of image from: ' + this.width + ' x ' + this.height + ' to: ' + width + ' x ' + height);
    this.width = width;
    this.height = height;
    console.log('New dimensions are set to:' + this.width + ' x ' + this.height);
    document.getElementById('image-dimensions').innerHTML = 'Bildens aktuella dimension: ' + Img.width + ' x ' + Img.height;
  }

  Img.create($('#happyCat'));


  // BOX 4 - Adding and removing objects
  $('#box4').find('#addWidth').click(function() {
    Img.changeDimensions(10,0);
  });
  $('#box4').find('#removeWidth').click(function() {
    Img.changeDimensions(-10,0);
  });
  $('#box4').find('#addHeight').click(function() {
    Img.changeDimensions(0, 10);
  });
  $('#box4').find('#removeHeight').click(function() {
    Img.changeDimensions(0, -10);
  });
  Img.changeDimensions(0, 0);




  console.log('Ready');
});

/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
  var boxHeight = $('.box').width();
  var createPaletteColor;
  var Img = {};
  var galleryInit;
  var slideshow;

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

    // BOX 5 - Animation

  $('#box5').find('#cat1').click(function() {
    var cat = $('#brownCat');
    console.log('Brun katt är vald: ' + cat);
    $(cat).fadeToggle( 3000, "swing" );
  });

  $('#box5').find('#cat2').click(function() {
    var cat = $('#disappearingCat');
    console.log(this + ' is being clicked');
    $(cat).animate({
    opacity: 0.5,
    height: 'toggle',
    width: 'toggle',
    }, 2500, function() {
      console.log('Cat 2 disappeared');
    });
  });



  $('#box5').find('#cat3').click(function() {
    var cat = $('#cuteCat');
    console.log(this + ' is being clicked');
    $(cat).slideToggle();
  });

  // BOX 6 - Lightbox

  $('#box6').find('.lightbox').click(function() {
        console.log('Clicked on lightbox image: ' + this.currentSrc );
    var fullsizeImage = $('<img src="' + this.currentSrc + '">');
    var body = $('body');
    var overlay = $('<div class="lightbox-overlay"></div>');
    var lightbox = $('<div id="lightbox1"></div>');
    $(fullsizeImage).css({'visibility':'hidden'}).appendTo(lightbox);
    $(overlay).css({
                      'position':'fixed',
                      'top': '0',
                      'left': '0',
                      'right': '0',
                      'bottom': '0',
                      'background-color': 'rgb(0,0,0)',
                      'opacity': '0',
                      'z-index': '90' })
    .animate({'opacity' : '0.5'}, 'slow')
    .appendTo(body);

    $(lightbox).appendTo(body);

    $(fullsizeImage).load(function () {
      var w = $(window).width() - $(fullsizeImage).width();
      var h = $(window).height() - $(fullsizeImage).height();
      $(lightbox).css({'position': 'fixed', 'top': h/2, 'left': w/2, 'z-index': '91'});
      $(fullsizeImage).css({'visibility':'visible'});
    });

    $(overlay).click(function() {
      $(this).remove();
      $(lightbox).remove();
    });
  });

  // BOX 7 - Image gallery

  galleryInit = function () {
    var container = $('.image-gallery');
    $('<div class="fullsize-image"></div>').prependTo(container);

    $(container).find('img').each(function() {
      $(this).wrap('<div class="thumbnail"></div>');

      $(this).click(function() {
        $(this).toggleClass('selected-image');
        var selected  = $('.fullsize-image img');
        if(!selected.length) {
          $('<img src="' + this.currentSrc + '">').appendTo('.fullsize-image').fadeIn();
        }
        else {
          $(selected).replaceWith('<img src="' + this.currentSrc + '">');
        }
      });
    });

    $(container).find('img').first().trigger('click');
  }

  galleryInit();

  // BOX 8 - Slideshow
  slideshow = function() {
    var container = $('.slideshow');
    var images = $(container).find('img');
    var counter = 1;
    var changeImage;
    var loadCounter =1;
    $(images).css({'z-index' : '5'}).fadeOut();
    $(images).first().css({'z-index': '6'}).fadeIn('slow');



    changeImage = function() {
      console.log('Changing image');
      if(counter === 0) {
        $(images).eq(images.length-1).css({'z-index': '5'}).fadeOut('slow');
      }
      else {
        $(images).eq(counter-1).css({'z-index': '5'}).fadeOut('slow');
      }

      $(images).eq(counter).css({'z-index': '6'}).fadeIn('slow');

      
      if(counter >= images.length -1) {
        counter = 0;
      }
      else {
        counter += 1;
      }

    }


    $(images).on('load', function() {
        loadCounter +=1 ;
        if (loadCounter > images.length) {
          console.log('All images are loaded, begin slidshow')
          window.setInterval(changeImage, 2500);
        }
    }).each(function() {
      if(this.complete) $(this).load();
    });
  }

  slideshow();



    (function($) {
   
    $.fn.edenGallery = function() {

      var edenLightbox = function(element) {
          var fullsizeImage = $('<img src="' + element.currentSrc + '">');
          var body = $('body');
          var overlay = $('<div class="eden-lightbox-overlay"></div>');
          var lightbox = $('<div id="eden-lightbox"></div>');
          $(fullsizeImage).css({'visibility':'hidden'}).appendTo(lightbox);
          $(overlay).css({
                        'position':'fixed',
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'background-color': 'rgb(0,0,0)',
                        'opacity': '0',
                        'z-index': '90' })
          .animate({'opacity' : '0.5'}, 'slow')
          .appendTo(body);

          $(lightbox).appendTo(body);

          $(fullsizeImage).load(function () {
            var w = $(window).width() - $(fullsizeImage).width();
            var h = $(window).height() - $(fullsizeImage).height();
            $(lightbox).css({'position': 'fixed', 'top': h/2, 'left': w/2, 'z-index': '91'});
            $(fullsizeImage).css({'visibility':'visible'});
          });

          $(overlay).click(function() {
            $(this).remove();
            $(lightbox).remove();
          });
        }



      return this.each(function() {
            $(this).find('img').each(function() {
            $(this).wrap('<div class="thumbnail"></div>');
            // Add click trigger to each thumbnail
            $(this).click(function() {
              $(this).toggleClass('selected-image');
                $('.fullsize-image img').replaceWith('<img src="' + this.currentSrc + '">');
                $('.fullsize-image img').click(function() {
                  console.log('Clicked selected image');
                  edenLightbox(this);
                });
            });
          });

          $('<div class="fullsize-image"><img src="' + $(this).find('img').first().attr('src') + '"></div>').prependTo(this);
          $('.fullsize-image img').click(function() {
            console.log('Clicked selected image');
            edenLightbox(this);
          }); 
        });

      };
  }) (jQuery);

  $('.image-gallery-nr2').edenGallery();



  console.log('Ready');
});

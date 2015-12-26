/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
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
            $(this).addClass('eden-gallery-lightbox');
            $(this).find('img').each(function() {
            $(this).wrap('<div class="thumbnail"></div>');
            // Add click trigger to each thumbnail
            $(this).click(function() {
              $('.selected-image').removeClass('selected-image');
              $(this).addClass('selected-image');
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

  $('.gallery').edenGallery();



  console.log('Ready');
});

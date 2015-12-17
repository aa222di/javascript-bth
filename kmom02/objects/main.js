/**
 * Print out literals and their type.
 */
$(document).ready(function(){
  'use strict';
  var random,
    myBall = {},
    element = document.getElementById('text');

  myBall.image = 'http://dbwebb.se/img/black_ball_64_64.png';
  myBall.position = {x:10, y:10};
  myBall.HTMLelement = document.getElementById('ball');
  myBall.canvas = document.getElementById('flash');
  myBall.canvas.style.height = '400px';
  myBall.canvas.style.width = '600px';
  console.log(myBall.position.x);

  element.innerHTML = 'Click the ball to push it around';

  myBall.draw = function () {
    // Get image size 
    var img = new Image();
    var ball = this;
    img.src = this.image;

    // Wait for image to be loaded
    img.onload = function() {
      ball.HTMLelement.style.backgroundImage = 'url(' + ball.image + ')';
      ball.HTMLelement.style.height = this.height + 'px';
      ball.HTMLelement.style.width = this.width + 'px';
      ball.HTMLelement.style.top = ball.position.y + 'px';
      ball.HTMLelement.style.left = ball.position.x + 'px';

      // Set image dimensions
      ball.dimensions = {height: this.height, width: this.width};
      console.log('Drawing ball.');
      myBall.center();
    }
  }

  myBall.moveIt = function (xPos, yPos) {
    if(this.dimensions.height && this.dimensions.width) {
      var left = (this.dimensions.width/2) - xPos;
      var top = (this.dimensions.height/2) - yPos;
      this.position.y += top*10;
      this.position.x += left*10;
      // Make sure ball can't go outside canvas
      if(this.position.y < 0) {
        this.position.y = 0;
      }
      if(this.position.x < 0) {
        this.position.x = 0;
      }
      if(this.position.y > parseInt(this.canvas.style.height) - this.dimensions.height) {
        this.position.y = parseInt(this.canvas.style.height) - this.dimensions.height;
      }
      if(this.position.x > parseInt(this.canvas.style.width) - this.dimensions.width) {
        this.position.x = parseInt(this.canvas.style.width) - this.dimensions.width;
      }

      this.HTMLelement.style.top = this.position.y + 'px';
      this.HTMLelement.style.left = this.position.x  + 'px';
    }
    else {
      console.log('The ball has to be drawn before it can be moved');
    }

  }

  myBall.center = function () {
    if(this.dimensions.height && this.dimensions.width) {
      this.position.y = (parseInt(this.canvas.style.height)/2) - (this.dimensions.height/2);
      this.position.x = (parseInt(this.canvas.style.width)/2) - (this.dimensions.width/2);

      this.HTMLelement.style.top = this.position.y + 'px';
      this.HTMLelement.style.left = this.position.x  + 'px';
      console.log('Centered ball');
      console.log(myBall.position.x);
    }

    else {
      console.log('The ball has to be drawn before it can be centered');
    }

  }

  myBall.draw();

  myBall.HTMLelement.addEventListener('click', function (event) {
    console.log('Clicked on: ' + event.offsetX + ' x ' + event.offsetY);
    console.log(event);
    myBall.moveIt(event.offsetX, event.offsetY);
  });
  
  
  console.log('Ready');
});

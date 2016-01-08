/**
 * Place your JS-code here.
 */
$(document).ready(function(){
  'use strict';
  var i =0;
  var draw = function () {
    console.log('Calling function draw()');
    i++;
    // Get the canvas element
    var canvas = document.getElementById('tutorial1');
    var ctx;

    // Check if browser supports canvas
    if (canvas.getContext){
      ctx = canvas.getContext('2d'); // Global variable?

      // draw stars
      for (var j=1;j<500;j++){
        ctx.save();
        ctx.rotate((Math.PI/180)*(360*Math.random()));
        var s= Math.random()*5;
        ctx.scale(s, s);
        if (j<30) {
          ctx.fillStyle = 'rgba(100,0,0,0.5)';
        }
        else {
          ctx.fillStyle = 'rgba(0,0,200,0.5)';
        }

        ctx.translate(Math.floor(Math.random()*600),
                      Math.floor(Math.random()*600));

        drawStar(ctx,Math.floor(Math.random()*4)+20);
        ctx.restore();
      }
      if (i<10) {
              window.requestAnimationFrame(draw);
      }


    // drawing code here
    } else {
        // canvas-unsupported code here
    }
  }


      
      var clock = function (){
      var canvas = document.getElementById('tutorial2');
    // Check if browser supports canvas
   
      var ctx = canvas.getContext('2d'); // Global variable?
      var now = new Date();
      ctx.save();
      ctx.clearRect(0,0,600,300);
      ctx.translate(300,150);
      ctx.scale(0.4,0.4);
      ctx.rotate(-Math.PI/2);
      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";

      // Hour marks
      ctx.save();
      for (var i=0;i<12;i++){
        ctx.beginPath();
        ctx.moveTo(100,0);
        ctx.lineTo(120,0);
        ctx.rotate(Math.PI/6);
        ctx.stroke();
      }
      ctx.restore();

      // Minute marks
      ctx.save();
      ctx.lineWidth = 5;
      for (i=0;i<60;i++){
        if (i%5!=0) {
          ctx.beginPath();
          ctx.moveTo(117,0);
          ctx.lineTo(120,0);
          ctx.stroke();
        }
        ctx.rotate(Math.PI/30);
      }
      ctx.restore();
     
      var sec = now.getSeconds();
      var min = now.getMinutes();
      var hr  = now.getHours();
      hr = hr>=12 ? hr-12 : hr;

      ctx.fillStyle = "black";

      // write Hours
      ctx.save();
      ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(-20,0);
      ctx.lineTo(80,0);
      ctx.stroke();
      ctx.restore();

      // write Minutes
      ctx.save();
      ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(-28,0);
      ctx.lineTo(112,0);
      ctx.stroke();
      ctx.restore();
     
      // Write seconds
      ctx.save();
      ctx.rotate(sec * Math.PI/30);
      ctx.strokeStyle = "#D40000";
      ctx.fillStyle = "#D40000";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-30,0);
      ctx.lineTo(83,0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0,0,10,0,Math.PI*2,true);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(95,0,10,0,Math.PI*2,true);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.arc(0,0,3,0,Math.PI*2,true);
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#325FA2';
      ctx.arc(0,0,142,0,Math.PI*2,true);
      ctx.stroke();

      ctx.restore();

      window.requestAnimationFrame(clock);
    }


// Ball object for animation
var ball = {
  x: 100,
  y: 100,
  radius: 25,
  color: 'blue',
  vx: 15,
  vy: 10,
  ctx: document.getElementById('tutorial3').getContext('2d'),
  draw: function() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
};

// A utility function to draw a rectangle with rounded corners.

function roundedRect(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.arcTo(x,y+height,x+radius,y+height,radius);
  ctx.lineTo(x+width-radius,y+height);
  ctx.arcTo(x+width,y+height,x+width,y+height-radius,radius);
  ctx.lineTo(x+width,y+radius);
  ctx.arcTo(x+width,y,x+width-radius,y,radius);
  ctx.lineTo(x+radius,y);
  ctx.arcTo(x,y,x,y+radius,radius);
  ctx.stroke();
}

function drawStar(ctx,r){
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r,0);
  for (var i=0;i<9;i++){
    ctx.rotate(Math.PI/5);
    if(i%2 === 0) {
      ctx.lineTo((r/0.525731)*0.200811,0);
    } else {
      ctx.lineTo(r,0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawBall() {
clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vy *= .99;
  ball.vx *= .99;
  ball.vy += .25;
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
  ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  raf = window.requestAnimationFrame(drawBall);
}

function clear() {
  ball.ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ball.ctx.fillRect(0,0,canvas.width,canvas.height);
}

var raf;
var running = false;
var canvas = document.getElementById('tutorial3');
canvas.addEventListener('click', function(e){
  if (!running) {
  raf = window.requestAnimationFrame(drawBall);
  running = true;
}
});

canvas.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf);
  running = false;
});

canvas.addEventListener('mousemove', function(e){
  if (!running) {
    clear();
        var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    ball.x =  mouseX;
    ball.y =  mouseY;
    ball.draw();
  }
});



  console.log('Everything is ready.');
  draw();
  clock();
  ball.draw();

});
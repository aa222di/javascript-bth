/**
 * Place your JS-code here.
 */
$(document).ready(function(){
  'use strict';
  var draw = function () {
    console.log('Calling function draw()');

    // Get the canvas element
    var canvas = document.getElementById('tutorial1');
    var ctx;

    // Check if browser supports canvas
    if (canvas.getContext){
      ctx = canvas.getContext('2d'); // Global variable?


    // drawing code here

    ctx.fillStyle = "rgba(200,0,0, 0.5)";
    ctx.fillRect (0, 0, 150, 150);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "rgba(0,0,0, 0.5)";
    ctx.fillRect (100, 100, 100, 100);

    ctx.strokeStyle = "rgba(0, 0, 200, 0.8)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(193,240,89, 1)";
    ctx.strokeRect(50, 50, 75, 75);

    ctx.shadowBlur = 0;
    ctx.shadowColor = "rgba(0,0,0, 0)";
    ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
    ctx.fillRect(225,25,100,100);
    ctx.clearRect(245,45,60,60);
    ctx.strokeStyle = "rgba(0, 200, 0, 0.5)";
    ctx.strokeRect(250,50,50,50);

    ctx.fillStyle = "rgba(200, 200, 100, 0.5)";
    ctx.beginPath();
    ctx.moveTo(200,300);
    ctx.lineTo(700,300);
    ctx.lineTo(300,125);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();
    //ctx.moveTo(500,75);
    ctx.arc(500,75,50,0,(Math.PI/180)*360,false); // Outer circle
    ctx.moveTo(465,75);
    ctx.arc(500,75,35,0,Math.PI,false);  // Mouth (clockwise)
    ctx.moveTo(480,55);
    ctx.arc(475,55,5,0,Math.PI*2,true);  // Left eye
    ctx.moveTo(530,55);
    ctx.arc(525,55,5,0,Math.PI*2,true);  // Right eye
    ctx.stroke();

        // Filled triangle
    ctx.beginPath();
    ctx.moveTo(40,250);
    ctx.lineTo(40,150);
    ctx.lineTo(140,150);
    ctx.fill();

    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(150,250);
    ctx.lineTo(50,250);
    ctx.lineTo(150,150);
    ctx.closePath();
    ctx.stroke();


    } else {
      // canvas-unsupported code here
    }
  

  canvas = document.getElementById('tutorial2');
  // Check if browser supports canvas
  if (canvas.getContext){
    ctx = canvas.getContext('2d'); // Global variable?

    for(var i=0;i<4;i++){
      for(var j=0;j<3;j++){
        ctx.beginPath();
        var x = 25+j*50; // x coordinate
        var y = 25+i*50; // y coordinate
        var radius = 20; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = Math.PI+(Math.PI*j)/2; // End point on circle
        var anticlockwise = i%2==0 ? false : true; // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1){
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  
      // Quadratric curves example
    ctx.beginPath();
    ctx.moveTo(75,25);
    ctx.quadraticCurveTo(25,25,25,62.5);
    ctx.quadraticCurveTo(25,100,50,100);
    ctx.quadraticCurveTo(50,120,30,125);
    ctx.quadraticCurveTo(60,120,65,100);
    ctx.quadraticCurveTo(125,100,125,62.5);
    ctx.quadraticCurveTo(125,25,75,25);
    ctx.fillStyle = "rgba(200,0,0, 0.5)";
    ctx.fill();

        // Quadratric curves example
    ctx.beginPath();
    ctx.moveTo(75,40);
    ctx.bezierCurveTo(75,37,70,25,50,25);
    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
    ctx.bezierCurveTo(20,80,40,102,75,120);
    ctx.bezierCurveTo(110,102,130,80,130,62.5);
    ctx.bezierCurveTo(130,62.5,130,25,100,25);
    ctx.bezierCurveTo(85,25,75,37,75,40);
    ctx.fillStyle = "rgba(0,0,200, 0.5)";
    ctx.fill();


  } else {
      // canvas-unsupported code here
  }


  canvas = document.getElementById('tutorial3');
  // Check if browser supports canvas
  if (canvas.getContext){
    ctx = canvas.getContext('2d'); // Global variable?
     var ctx = canvas.getContext('2d');

    roundedRect(ctx,12,12,150,150,15);
    roundedRect(ctx,19,19,150,150,9);
    roundedRect(ctx,53,53,49,33,10);
    roundedRect(ctx,53,119,49,16,6);
    roundedRect(ctx,135,53,49,33,10);
    roundedRect(ctx,135,119,25,49,10);

    ctx.beginPath();
    ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
    ctx.lineTo(31,37);
    ctx.fill();

    for(var i=0;i<8;i++){
      ctx.fillRect(51+i*16,35,4,4);
    }

    for(i=0;i<6;i++){
      ctx.fillRect(115,51+i*16,4,4);
    }

    for(i=0;i<8;i++){
      ctx.fillRect(51+i*16,99,4,4);
    }

    ctx.beginPath();
    ctx.moveTo(83,116);
    ctx.lineTo(83,102);
    ctx.bezierCurveTo(83,94,89,88,97,88);
    ctx.bezierCurveTo(105,88,111,94,111,102);
    ctx.lineTo(111,116);
    ctx.lineTo(106.333,111.333);
    ctx.lineTo(101.666,116);
    ctx.lineTo(97,111.333);
    ctx.lineTo(92.333,116);
    ctx.lineTo(87.666,111.333);
    ctx.lineTo(83,116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91,96);
    ctx.bezierCurveTo(88,96,87,99,87,101);
    ctx.bezierCurveTo(87,103,88,106,91,106);
    ctx.bezierCurveTo(94,106,95,103,95,101);
    ctx.bezierCurveTo(95,99,94,96,91,96);
    ctx.moveTo(103,96);
    ctx.bezierCurveTo(100,96,99,99,99,101);
    ctx.bezierCurveTo(99,103,100,106,103,106);
    ctx.bezierCurveTo(106,106,107,103,107,101);
    ctx.bezierCurveTo(107,99,106,96,103,96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101,102,2,0,Math.PI*2,true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89,102,2,0,Math.PI*2,true);
    ctx.fill();
  
  } else {
      // canvas-unsupported code here
  }

  canvas = document.getElementById('tutorial4');
  // Check if browser supports canvas
  if (canvas.getContext){
    ctx = canvas.getContext('2d'); // Global variable?

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);


  } else {
      // canvas-unsupported code here
  }


}

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




  console.log('Everything is ready.');
  draw();
});
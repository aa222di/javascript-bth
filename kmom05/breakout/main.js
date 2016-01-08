/**
 * All objects are Vectors
 */
function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector.prototype = {
  muls:  function (scalar) { return new Vector( this.x * scalar, this.y * scalar); }, // Multiply with scalar
  imuls: function (scalar) { this.x *= scalar; this.y *= scalar; return this; },      // Multiply itself with scalar
  adds:  function (scalar) { return new Vector( this.x + scalar, this.y + scalar); }, // Add with scalar
  iadd:  function (vector) { this.x += vector.x; this.y += vector.y; return this; }   // Add itself with Vector
}



/**
 * The forces around us.
 */
function Forces() {
  this.all = {};
}

Forces.prototype = {

  createAcceleration: function(vector) {
    return function(velocity, td) {
      velocity.iadd(vector.muls(td));
    }
  },

  createDamping: function(damping) {
    return function(velocity, td) {
      velocity.imuls(damping);
    }
  },

  createWind: function(vector) {
    return function(velocity, td) {
      velocity.iadd(vector.adds(td));
    }
  },  

  addAcceleration:  function(name, vector)  { this.all[name] = this.createAcceleration(vector); },
  addDamping:       function(name, damping) { this.all[name] = this.createDamping(damping); },
  addWind:          function(name, vector)  { this.all[name] = this.createWind(vector); },

  update: function(object, td) {
    for(var force in this.all) {
      if (this.all.hasOwnProperty(force)) {
        this.all[force](object, td);
      }
    }
  }

}

window.Forces = new Forces();
window.Forces.addAcceleration('gravity', new Vector(0, 9.82));
window.Forces.addDamping('drag', 0.97);
window.Forces.addWind('wind', new Vector(0.5, 0));

/**
 * A ball as an object.
 */
function Brick(width, height, color, position, life) {
  this.height     = height    || 20;
  this.width      = width     || 80;
  this.color      = color     || 'rgba(0,200,0, 1 )';
  this.position   = position  || new Vector();
  this.life       = life      || 1;
  this.opacity    = 1;
  this.initalLife = this.life;


}

Brick.prototype = {

  sound: new Audio('brick.ogg'),

  draw: function(ct) {
    ct.save();
    ct.globalAlpha = this.opacity;
    ct.fillStyle = this.color;
    ct.fillRect(this.position.x, this.position.y, this.width, this.height);
    ct.restore();
  },

  detectCollision: function(ball) {
    var collision = false;
    if(ball.position.y + ball.radius > this.position.y && ball.position.y - ball.radius < this.position.y + this.height) {
      if(ball.position.x + ball.radius > this.position.x && ball.position.x - ball.radius < this.position.x + this.width) {
        this.opacity
        this.life -= 1;
        collision = true;
        this.opacity = (1/this.initalLife) * this.life;
        ball.bounce();
        this.sound.play();
      } 
    }
    return collision;
  }
}


/**
 * A ball as an object.
 */
function Ball(radius, position, speed, color) {
  this.radius     = radius    || 10;
  this.position   = position  || new Vector();
  this.speed      = speed     || 1;
  this.color      = color     || 'rgba(0,0,200,1)';
  this.velocity   = new Vector(0, 1);
  this.direction  = new Vector(1, -1);

}

Ball.prototype = {

  draw: function(ct) {
    ct.save();
    ct.beginPath();
    ct.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
    ct.fillStyle = this.color;
    ct.fill();
    ct.closePath();
    ct.restore();
  },


  moveForward: function(td) {
    //this.dampForce(this.speed, td);
    this.position.x += this.speed * td * this.velocity.x * this.direction.x;
    this.position.y += this.speed * td * this.velocity.y * this.direction.y;
    this.position.iadd(this.velocity.muls(td));
  },

  update: function(td, width, height, paddle) {
    paddle = paddle || false;
    this.moveForward(td);
    this.detectCollision(width, height, paddle);
  },

  bounce: function() {
    this.direction.y = -this.direction.y;
  },

  detectCollision: function(width, height, paddle) {
    var leftArea, rightArea;
    // If bouncing floor
    if(this.position.y + this.radius  > height) {
      //console.log('Floor');
      // Change direction
      this.direction.y = -this.direction.y;
      // Bounce
      this.position.y = height - this.radius + 1;
    } 

    // If bouncing right wall
    if(this.position.x + this.radius  > width) {
      this.direction.x = -this.direction.x;
      this.position.x = width - this.radius + 1;
    } 

    // If bouncing ceiling
    if(this.position.y - this.radius  < 0) {
      this.direction.y = -this.direction.y;
      this.position.y = 0 + this.radius - 1;
    }   
   
    // If bouncing left wall
    if(this.position.x - this.radius  < 0) {
      this.direction.x = -this.direction.x;
      this.position.x = 0 + this.radius - 1;
    } 


    // If bouncing paddle
    if(paddle) {
      leftArea = { x1: paddle.position.x, x2: paddle.position.x + paddle.width/2};
      rightArea = { x1: paddle.position.x + paddle.width/2, x2: paddle.position.x + paddle.width};
        if(this.position.y + this.radius  >= height - paddle.height && this.position.y + this.radius <= height - paddle.height/4 && this.direction.y > 0) {
          //console.log('1 .Ball is at paddle height');
        if(this.position.x >= paddle.position.x &&  this.position.x <= paddle.position.x + paddle.width) {
          //console.log('2 .Ball is at paddle area');
          this.bounce();
          this.position.y -= 1;

          if(this.position.x >= leftArea.x1 && this.position.x <= leftArea.x2) { // If it hits the left side
            //console.log('hit left side');
            if(this.position.x >= leftArea.x1 && this.position.x <= leftArea.x2 - paddle.width/4) {
              this.direction.x = -1;

              if(this.velocity.x > 4) {
                this.velocity.x = 4;
              }
              else {
                this.velocity.x += 1;
              }
              
              //console.log('hit outer left area');
            }

            else if(this.position.x >= leftArea.x1 + paddle.width/4 && this.position.x <= leftArea.x2) {
              if(this.velocity.x < 1) {
                this.velocity.x = 0;
              }
              else {
                this.velocity.x -= 1;
              }
               //console.log('hit inner left area');
            }
          }

          if(this.position.x >= rightArea.x1 && this.position.x <= rightArea.x2) { // If it hits the right side
             //console.log('hit right side');
            if(this.position.x >= rightArea.x1 + paddle.width/4 && this.position.x <= rightArea.x2) {
              this.direction.x = 1;
              if(this.velocity.x > 4) {
                this.velocity.x = 4;
              }
              else {
                this.velocity.x += 1;
              }
              //console.log('hit outer right area');
            }

            else if(this.position.x >= rightArea.x1 && this.position.x <= rightArea.x2 - paddle.width/4) {
              if(this.velocity.x < 1) {
                this.velocity.x = 0;
              }
              else {
                this.velocity.x -= 1;
                this.velocity.y += 1;
              }
              //console.log('hit inner right area');
            }
          }
        }
      } 
    }

  },
}




/**
 * A Paddle as an object.
 */
function Paddle(width, height, color, position, speed) {
  this.height     = height    || 20;
  this.width      = width     || 80;
  this.color      = color     || 'rgba(100, 100, 0, 1 )';
  this.position   = position  || new Vector();
  this.speed      = speed     || 100;

  //this.direction  = direction || 0;
}

Paddle.prototype = {

  draw: function(ct) {
    ct.save();
    ct.fillStyle = this.color;
    ct.fillRect(this.position.x, this.position.y, this.width, this.height);
    ct.restore();
  },

  moveLeft:  function(td) { this.position.x -= this.speed * td; },
  moveRight: function(td) { this.position.x += this.speed * td; },

  update: function(td, width, height) {
    if (Key.isDown(Key.LEFT, Key.A))   this.moveLeft(td);
    if (Key.isDown(Key.RIGHT, Key.D))  this.moveRight(td);
    this.stayInArea(width, height);
  },

  stayInArea: function(width, height) {
    if(this.position.x > width - this.width) this.position.x = width - this.width;
    if(this.position.x < 0 )     this.position.x = 0;
  }
}



/**
 * Breakout, the Game
 */
window.Breakout = (function(){
  var canvas, ct, ball, lastGameTick, textString, textWidth, paddle, bricks, playing, width, height, td, lives, score, gameEnd;

  // Start game and set game params
  var init = function(canvas, soundtrack) {
    canvas = document.getElementById(canvas);
    soundtrack = new Audio(soundtrack);
    soundtrack.loop = true;
    ct = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    ct.lineWidth = 1;
    ct.strokeStyle = 'rgba(255,255,255,1)';
    paddle = new Paddle(140, 20, 'rgba(0, 0, 100, 1)', new Vector((width-140)/2, height-20), 300 );
    ball = new Ball(10, new Vector(width/2, height - (paddle.height +30)), 150, '#0095DD');
    bricks = initGameboard();
    playing = false;
    gameEnd = false;
    lives = 3;
    score = 0;

    ball.draw(ct);
    paddle.draw(ct);
    drawGameInfo();
    drawInitText();

    console.log('Init the game');
  };

  var initGameboard = function() {
    var brickCols = 5,
        brickRows = 3,
        margin = 10,
        colPos = margin,
        rowPos = margin,
        bricks = [],

        brickWidth = (width-(brickCols+1)*margin)/brickCols,
        brickHeight = 20,
        c =0, r = 0;

    for(c=0; c<brickCols; c+=1) {
      bricks[c] = [];
      for(r=0; r<brickRows; r+=1) {
          bricks[c][r] = new Brick(brickWidth, brickHeight, 'rgba(' + (255/brickRows)*r + ', 0, ' + (255/brickRows)*r + ', 1)', new Vector(colPos, rowPos), brickRows-r);
          bricks[c][r].draw(ct);
          rowPos += brickHeight + margin;
      }
      colPos += brickWidth + margin;
      rowPos = margin;
    }

    return bricks;
  }

  var drawBricks = function() {
    for(var c=0; c<bricks.length; c+=1) {
      for(var r=0; r<bricks[c].length; r+=1) {
        if(bricks[c][r].life > 0) {
          bricks[c][r].draw(ct);
        }
      }
    }
  }

  var updateGameboard = function() {
    var bricksLeft = 0;
    for(var c=0; c<bricks.length; c+=1) {
      for(var r=0; r<bricks[c].length; r+=1) {
        if(bricks[c][r].life > 0) {
          if(bricks[c][r].detectCollision(ball)) {
            score +=1;
          }
          if(bricks[c][r].life < 1) {
            console.log('Brick destroyed');
            score +=1;
            bricks[c].splice(r, 1);
          }
        }
      }
      bricksLeft += bricks[c].length;
    }

    if(bricksLeft < 1) {
      bricks = [];
    }
  }

  // Update game logic
  var update = function(td) {
    paddle.update(td, width, height);
    ball.update(td, width, height, paddle);
    updateGameboard();
  };


  var gameOver = function() {
      ct.save();
      ct.fillStyle = 'rgba(200, 0, 0 ,0.2)';
      ct.fillRect(0,0,width,height);
      ct.fillStyle = 'rgba(0,0,0,1)';
      ct.font = "48px monospace";
      textString = 'Game over';
      textWidth = ct.measureText(textString).width;
      ct.fillText(textString, (width - textWidth)/2, height*0.4);
      ct.fillStyle = 'rgba(200,0,0,1)';
      ct.fill();
      ct.restore();

      playing = false;
  };


  var gameWon = function() {
      ct.save();
      ct.fillStyle = 'rgba(0, 200, 0 ,0.2)';
      ct.fillRect(0,0,width,height);
      ct.fillStyle = 'rgba(0,0,0,1)';
      ct.font = "48px monospace";
      textString = 'You won!';
      textWidth = ct.measureText(textString).width;
      ct.fillText(textString, (width - textWidth)/2, height*0.4);
      ct.fillStyle = 'rgba(0,200,0,1)';
      ct.fill();
      ct.restore();

      playing = false;
  };


  var drawGameInfo = function() {
      ct.save();
      ct.fillStyle = 'rgba(0,0,0,1)';
      ct.font = "16px monospace";
      
      textString = 'Lives: ' + lives;
      textWidth = ct.measureText(textString).width;
      ct.fillText(textString, width - (textWidth + 30), height-48);

      textString = 'Score: ' + score;
      textWidth = ct.measureText(textString).width;
      ct.fillText(textString, width - (textWidth + 30), height-24);

      ct.restore();
  };

  var drawInitText = function() {
      ct.save();
      ct.fillStyle = 'rgba(0,0,0,1)';
      ct.font = "48px monospace";
      
      textString = 'Breakout';
      textWidth = ct.measureText(textString).width;
      ct.fillText(textString, (width - textWidth)/2, height*0.4);

      ct.font = "16px monospace";
      textString = 'Press spacebar to launch ball';
      textWidth = ct.measureText(textString).width;
      ct.fillText(textString, (width - textWidth)/2, height*0.5);

      ct.restore();
  };

  // Render drawing on canvas
  var render = function() {

    // Clear canvas and set background
    ct.save();
    ct.fillStyle = 'rgba(255,255,255,0.9)';
    ct.fillRect(0,0,width,height);
    ct.restore();
    // Draw objects  
    // If ball hit the floor game over
    if(ball.position.y >= height - ball.radius) {
      lives -=1;
      stopGame();
      if(lives < 1) {
        gameOver();
      }
      else {
        drawInitText();
        ball.draw(ct);
      }
    }
    else if(!bricks.length) {
      gameWon();
    }
    else {
      ball.draw(ct);
    }
    
    paddle.draw(ct);
    drawBricks();
    drawGameInfo();
  };

  var gameLoop = function() {
    var now = Date.now();
    td = (now - (lastGameTick || now)) / 1000; // Timediff since last frame / gametick
    lastGameTick = now;
    if(playing) {
      requestAnimFrame(gameLoop);
      update(td);
      render();
    }

  };

  var startGame = function() {
    if(!playing) {
      playing = true;
      soundtrack.play();
      requestAnimFrame(gameLoop);
    }
  };

  var stopGame = function() {
    playing = false;
    soundtrack.pause();
    paddle.position.x = (width-paddle.width)/2;
    ball.position = new Vector(width/2, height - (paddle.height +30));
    ball.velocity = new Vector(0,1);
    ball.direction = new Vector(1, -1);
  };

  return {
    'init': init,
    'gameLoop': gameLoop,
    'startGame' : startGame
  }
})();



// On ready
$(function(){
  'use strict';

  Breakout.init('game', document.getElementById('soundtrack').src);

  window.addEventListener('keydown', function(event) {  if(event.keyCode == 32) Breakout.startGame();}, false);

  console.log('Ready to play.');  
});

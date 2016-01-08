/**
 * Place your JS-code here.
 */
$(document).ready(function(){
  'use strict';

  // KEY
  var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    
    isDown: function(keyCode) {
      return this._pressed[keyCode];
    },
    
    onKeydown: function(event) {
      this._pressed[event.keyCode] = true;
    },
    
    onKeyup: function(event) {
      delete this._pressed[event.keyCode];
    }
  };

  // GAME
  var Game = {};

  Game.start = function(canvas) {
    Game.canvas = canvas;
    Game.ctx = Game.canvas.getContext('2d');
    Game.player = new Player();
  
  };

  Game.draw = function() { 
    
    Game.ctx.save();
    Game.ctx.fillStyle = 'rgba(255,255,255,0.9)';
    Game.ctx.fillRect(0,0,Game.canvas.width,Game.canvas.height);
    Game.ctx.restore();

    Game.update();
    Game.player.draw(Game.ctx);
    window.requestAnimFrame(Game.draw);

  };

  Game.update = function() { 
      Game.player.update();
      Game.player.stayInArea(Game.canvas.width, Game.canvas.height);
  };

  // PLAYER
  function Player() {
    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 32;
  }

  Player.prototype.draw = function(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  };

  Player.prototype.moveLeft = function() {
    this.x -= 1;
  };

  Player.prototype.moveRight = function() {
    this.x += 1;
  };

  Player.prototype.moveUp = function() {
    this.y -= 1;
  };

  Player.prototype.moveDown = function() {
    this.y += 1;
  };

  Player.prototype.update = function() {
    if (Key.isDown(Key.UP)) this.moveUp();
    if (Key.isDown(Key.LEFT)) this.moveLeft();
    if (Key.isDown(Key.DOWN)) this.moveDown();
    if (Key.isDown(Key.RIGHT)) this.moveRight();
  };

  Player.prototype.stayInArea = function(width, height) {
  if(this.y < 0)            this.y = 0;
  if(this.y > height-this.height) this.y = height-this.height;
  if(this.x > width-this.width)        this.x = width-this.width;
  if(this.x < 0)            this.x = 0;
};

  Game.start(document.getElementById('game'));
  Game.draw();
  Game.update();
      window.requestAnimFrame(Game.draw);

  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
  console.log('Everything is ready.');


});
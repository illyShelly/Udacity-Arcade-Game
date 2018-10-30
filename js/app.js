// Enemies our player must avoid
var score = 0;
var life = 5;

class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a TIME DELTA between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    this.x = this.x + this.speed * dt;
    if(this.x >= 500) {
      this.x = -50;
    // speed starts on 100 per mile :)
      this.speed = 100 + Math.floor(Math.random() * 180);
    }

  // Collisions between Guy and Enemies
    var enemyFromLeft = this.x - 80;
    var enemyFromRight = this.x + 80;
    var enemyFromUp = this.y - 30;
    var enemyFromDown = this.y + 30;

    // horizontal/vertical position
    if((enemyFromLeft <= player.x && player.x <= enemyFromRight) && (enemyFromUp <= player.y && player.y <= enemyFromDown)) {
      // not while it runs everything at once
      if (life > 1 ) {
        life -= 1;
        var survive = document.querySelector("#lives");
        survive.textContent = life;
        player.x = 205; //right
        player.y = 410; //down
      }
      else {
        alert("Game Is Over!");
        document.write("To continue refresh the page!!!");
      }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write YOUR OWN PLAYER CLASS
// This class requires an update(), render() and
// a handleInput() method.

var boy = document.querySelector('#boy');
var catish = document.querySelector('#cat');
var hornish = document.querySelector('#horn');
var pinkish = document.querySelector('#pink');
var princessa = document.querySelector('#princess');

// default setup before changing character by click
var chosenCharacter = 'images/char-horn-girl.png';

  boy.addEventListener('click', function() {
      // var link = boy.src;
      // console.log(link);
      chosenCharacter = 'images/char-boy.png';
      // console.log(chosenCharacter);
      player.guy = chosenCharacter;
    });
  catish.addEventListener('click', function() {
      chosenCharacter = 'images/char-cat-girl.png';
      player.guy = chosenCharacter;
    });
  hornish.addEventListener('click', function() {
      chosenCharacter = 'images/char-horn-girl.png';
      player.guy = chosenCharacter;
    });
  pinkish.addEventListener('click', function() {
        chosenCharacter = 'images/char-pink-girl.png';
        player.guy = chosenCharacter;
      });
  princessa.addEventListener('click', function() {
      chosenCharacter = 'images/char-princess-girl.png';
      player.guy = chosenCharacter;
    });

class PlayerGuy {
  constructor(baseX, baseY, chosenCharacter) {
    this.guy = chosenCharacter;
    this.x = baseX;
    this.y = baseY;
  }
};

PlayerGuy.prototype.update = function(dt) {
}

// done
PlayerGuy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.guy), this.x, this.y);
};

PlayerGuy.prototype.handleInput = function(key) {
  // canvas 505 x 606
  // jump over approx. 1 stone
  // x axis - better x > 80 (does not desapear from gameboard)
  if(key == 'left' && this.x > 80) {
    // move close to y-axis; actual position + 100px
    this.x = this.x - 100;
  }
  if(key == 'right' && this.x < 400) {
    this.x = this.x + 100;
  }
  if(key == 'up' && this.y > 0) {
    this.y = this.y - 90;
  }
  if(key == 'down' && this.y < 400) {
    this.y = this.y + 90;
  }
  // if player is behind the waterfall - default position
  // var score = 0;
  if(this.y < 0) {
    // increase score when touching waterfall and update html
    score = score + 1;
    var result = document.querySelector("#score");
    result.innerText = score;
    // wait when return back to basic position
    setTimeout(() => {
      player.x = 205; //right
      player.y = 410; //down
    }, 300);
  }
  // console.log(score);

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var axisY = [60, 150, 225];


for (var i = 0; i < axisY.length; i++) {
  // the best takes array then multiply i * 110 e.x.
  allEnemies.push(new Enemy(0, axisY[i], 100));
}
  // new object created and SET player's base POSITION
var player = new PlayerGuy(205,420, chosenCharacter);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

  player.handleInput(allowedKeys[e.keyCode]);
});

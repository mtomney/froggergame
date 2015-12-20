//Clone of classic frogger game built on HTML5 Canvas and Javascript

//Random generator used for creating random mathmatical variables inside game
var random = function (min, max) {
	return Math.floor(Math.random()*(max-min)+min);
};
var life = '<img src = "images/Heart.png">';
// Enemies our player must avoid
var Enemy = function() {;
	this.x = 0;
	this.y = Math.floor((Math.random()*300)+1);
	this.sprite = 'images/enemy-bug.png';
	this.speed = (Math.random()*100)+100;
};
//Update the enemy's position, required method for game
//Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x +=this.speed*dt;
//Allow for continued enemey generation per given level
	var length = allEnemies.length;
	for (var enemy = 0; enemy < length; enemy ++) {
		if (allEnemies[enemy].x > 505) {
			allEnemies.splice(enemy, 1, new Enemy());
		}
	}
//Add an additional enemy to the array every 3rd level to increase difficulty
	if (length < 4 + Math.floor(player.level / 3)) {
		allEnemies.push(new Enemy());
	}
//Provides original number of enemies after a reset.
	else if (length > 4 + Math.floor(player.level / 5)) {
		allEnemies.pop();
	}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Populate an array with new enemies for level
var allEnemies = [new Enemy(), new Enemy(), new Enemy, new Enemy];
//Details of player object
var Player = function() {
	this.x = 100;
	this.y = 400;
	this.sprite = 'images/char-boy.png';
	this.level = 1;
	this.score = 0;
	this.lives = [life, life, life];
};
//Update the player object, including lives and score, check for collisions
Player.prototype.update = function() {
//Run check on enemy collision
	var length = allEnemies.length;
	for (var enemy = 0; enemy < length; enemy ++) {
		if (Math.abs(allEnemies[enemy].x - this.x) < 30 &&
			Math.abs(allEnemies[enemy].y - this.y) < 30) {
			this.lives.pop();
			this.reset();
		}
	}
//Check for player hitting goal, increase level
	if (this.y < 50) {
		this.level++;
		this.score = (this.score+100)*2;
		this.reset();
	}
};

//Draw the player object on the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Handling input from player keyboard to move player object towards goal
Player.prototype.handleInput = function(key){
	if (key === 'up') {
		this.y -= 50;
	}
	else if(key === 'down' && this.y !=400) {
		this.y += 50;
	}
	else if (key === 'left' && this.x > 0) {
		this.x -= 50;
	}
	else if (key === 'right'&& this.x != 400) {
		this.x += 50;
	}
};
//Initiate an instance of the player
var player = new Player();
//Ability to reset the game due to reaching goal or hitting an enemy
Player.prototype.reset = function() {
	if (this.lives.length === 0) {
		alert("Sorry game over! Click OK to reload game!")
		location.reload(true);
	}
	player.x = 100;
	player.y = 400;
};
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

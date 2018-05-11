// Board game size parameters
let nrows, ncols, start_x, start_y, board_right, board_bottom;
let nEnemies = 3;
let nTreasures;
let safe_distance = 41; // Safe x-distance to enemy
let level = 1; // Starting difficulty level
let mLives = 3; // Player lives
// Image tile dimensions
const tile_width = 101;
const tile_height = 83;
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');

// Updates global variables
function generateLevel() {
	levelDisplay.innerHTML = `Level ${level}`;
	if (level < 5) {
		nrows = 6;
		ncols = 8;
	} else if (level < 10) {
		nrows = 7;
		ncols = 7;
	} else if (level < 15) {
		nrows = 8;
		ncols = 6;
	} else {
		nrows = 9;
		ncols = 5;
	}
	nEnemies += 1;
	nTreasures = Math.floor(nEnemies / 3);
	allEnemies.length = 0;
	allTreasures.length = 0;
	for (let i = 0; i < nEnemies; i++) {
		let enemy = new Enemy();
		allEnemies.push(enemy);
	}
	for (let i = 0; i < nTreasures; i++) {
		let treasure = new Treasure();
		allTreasures.push(treasure);
	}
	// Engine.main;
	// Player start point
	start_x = Math.floor(ncols / 2) * tile_width;
	start_y = (nrows - 1) * tile_height - tile_height / 2;

	// Board-game extremes
	board_right = tile_width * (ncols - 1);
	board_bottom = tile_height * (nrows - 2);
};

const starElement = document.getElementById('stars');
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var start;
var totalSeconds;
const modal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0];
const playBtn = document.getElementById('play');
const modalScore = document.getElementById("modalScore");
const modalMin = document.getElementById("totmin");
const modalSec = document.getElementById("totsec");

// Enemies our player must avoid
var Enemy = function() {
	// Slot is the row where stone tiles will be
	// eRow, a randomly selected stone tile row
	const eRow = Math.floor(Math.random() * (nrows - 3) + 1);
	let slot = eRow * tile_height - tile_height / 2;
	let location = -10 * Math.random() * tile_width;
	this.x = location;
	this.y = slot;
	// The enemy image, this uses
	// reources.js to load cached images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
// ensures the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt) {
	this.x += 101 * dt;
	if (this.x > board_right + tile_width) {
		this.x = -10 * Math.random() * tile_width;
	}
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Treasure extends Enemy {
	constructor(slot, location) {
		super(slot, location);
		let sprite_options = [
      "images/Gem-Blue.png",
      "images/Gem-Green.png",
      "images/Gem-Orange.png"]
		let indx = Math.floor(Math.random() * 10 / (sprite_options.length + 1));
		this.sprite = sprite_options[indx];
		this.id = Math.random().toString(36).slice(-10);
	}
	update(dt) {
		super.update(dt);
	}
	render() {
		super.render();
	}
}

// Player class
class Player {
	constructor(lives = mLives, score = 0, x = start_x, y = start_y) {
		this.lives = lives;
		this.score = score;
		this.x = x;
		// this.start_x = x;
		this.y = y;
		// this.start_y = y;
		this.sprite = 'images/char-boy.png';
	}
	update(collide = false, replay = false) {
		// Return player to start point upon collison or win!
		if (collide) {
			this.x = start_x;
			this.y = start_y;
			this.lives--;
			console.log(this.lives);
			if (this.lives > 0) {
				starElement.removeChild(starElement.getElementsByTagName('li')[0]);
			}

		} else if (replay) {
			this.x = start_x;
			this.y = start_y;
			this.lives = mLives;
			this.score = 0;
			generateLevel();

		} else if (this.y < 10) { // Win.
			level++;
			generateLevel();
			this.score += 1;
			this.x = start_x;
			this.y = start_y;
		}
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	handleInput(direction) {
		switch (direction) {
			case 'left':
				if (this.x > 0) {
					this.x -= tile_width;
				}
				break;
			case 'right':
				if (this.x < board_right) {
					this.x += tile_width;
				}
				break;
			case 'up':
				if (this.y > 0) {
					this.y -= tile_height;
				}
				break;
			case 'down':
				if (this.y < board_bottom) {
					this.y += tile_height;
				}
				break;

			default:
				null;
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let allTreasures = [];
generateLevel();
const player = new Player();

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
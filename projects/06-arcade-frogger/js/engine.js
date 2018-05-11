/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
	// var Engine = function(global) {
	/* Predefine the variables we'll be using within this scope,
	 * create the canvas element, grab the 2D context for that canvas
	 * set the canvas elements height/width and add it to the DOM.
	 */
	var doc = global.document,
		win = global.window,
		canvas = doc.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		lastTime, animationID;

	var frame = doc.getElementById("frame");
	frame.appendChild(canvas);

	/*
	 * Moved drawing canvas to render() level change.
	 */

	// doc.body.appendChild(canvas);
	const restart = doc.getElementById('restart');
	restart.addEventListener('click', init);

	/* This function is the kickoff point and re-draws the scree, creating
	     the game loop animation,
		 * and handles properly calling the update and render methods.
		 */
	function main() {
		/* Get our time delta information which is required if your game
		 * requires smooth animation. Because everyone's computer processes
		 * instructions at different speeds we need a constant value that
		 * would be the same for everyone (regardless of how fast their
		 * computer is) - hurray time!
		 */

		var now = Date.now(),
			dt = (now - lastTime) / 1000.0;

		/* Call our update/render functions, pass along the time delta to
		 * our update function since it may be used for smooth animation.
		 */
		update(dt);
		render(nrows, ncols);

		/* Set our lastTime variable which is used to determine the time delta
		 * for the next time this function is called.
		 */
		lastTime = now;

		/* Use the browser's requestAnimationFrame function to call this
		 * function again as soon as the browser is able to draw another frame.
		 */
		animationID = win.requestAnimationFrame(main); // <- recursive, callback function: main
		if (player.lives === 0) {
			endGame();
			win.cancelAnimationFrame(animationID);
		}
	}

	/* This function does some initial setup that should only occur once,
	 * particularly setting the lastTime variable that is required for the
	 * game loop.
	 */
	function init() {
		modal.style.display = "none";
		reset();
		lastTime = Date.now();
		main();
	}

	/* This function is called by main (our game loop) and itself calls all
	 * of the functions which may need to update entity's data. Based on how
	 * you implement your collision detection (when two entities occupy the
	 * same space, for instance when your character should die), you may find
	 * the need to add an additional function call here. For now, we've left
	 * it commented out - you may or may not want to implement this
	 * functionality this way (you could just implement collision detection
	 * on the entities themselves within your app.js file).
	 */
	function update(dt) {
		updateEntities(dt);
		checkCollisions();
	}

	/* This is called by the update function and loops through all of the
	 * objects within your allEnemies array as defined in app.js and calls
	 * their update() methods. It will then call the update function for your
	 * player object. These update methods should focus purely on updating
	 * the data/properties related to the object. Do your drawing in your
	 * render methods.
	 */
	function updateEntities(dt) {
		allEnemies.forEach(function(enemy) {
			enemy.update(dt);
		});
		allTreasures.forEach(function(treasure) {
			treasure.update(dt);
		})
		player.update();
	}

	function checkCatch(obj) {
		if (player.y === obj.y) {
			if ((player.x >= obj.x) &&
				(player.x - obj.x < safe_distance)) {
				return true;
			}
		}
	}

	function checkCollisions() {
		allEnemies.forEach(function(enemy) {
			if (enemy.y == player.y) {
				if ((player.x >= enemy.x) && (player.x - enemy.x < safe_distance)) {
					player.update(collide = true);
				}
			}
		});

		let newTreasure = allTreasures.filter(checkCatch);

		// Update Treasures available
		if (newTreasure.length > 0) {
			allTreasures = allTreasures.filter(el => {
				// same as: allTreasures.filter(function(el) {
				return el.id !== newTreasure[0].id;
			});
			updateBounty(newTreasure);
			newTreasure.length = 0;
		}
	}

	function updateBounty(newTreasureArr = []) {
		if (newTreasureArr.length > 0) {
			player.score += 10;
		} else {
			player.score = 0;
		}

	}

	/* This function initially draws the "game level", it will then call
	 * the renderEntities function. Remember, this function is called every
	 * game tick (or loop of the game engine) because that's how games work -
	 * they are flipbooks creating the illusion of animation but in reality
	 * they are just drawing the entire screen over and over.
	 */
	function render(numRows, numCols) {
		/* This array holds the relative URL to the image used
		 * for that particular row of the game level.
		 */
		canvas.width = tile_width * numCols;
		canvas.height = tile_height * (numRows - 1) + 171; //606;
		frame.style.width = canvas.width;
		frame.style.height = canvas.height;
		scoreDisplay.innerHTML = `Your score is: ${player.score} pts.`

		var rowImages = [],
			// numRows = r,
			// numCols = c,
			row, col;
		for (let i = 0; i <= numRows; i++) {
			if (i === 0) {
				rowImages.push('images/water-block.png') // Top row is water
			} else if (i > numRows - 3) {
				rowImages.push('images/grass-block.png') // Bottom rows of grass
			} else {
				rowImages.push('images/stone-block.png') // Middle rows of stone
			}
		}

		// Before drawing, clear existing canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		/* Loop through the number of rows and columns we've defined above
		 * and, using the rowImages array, draw the correct image for that
		 * portion of the "grid"
		 */
		for (row = 0; row < numRows; row++) {
			for (col = 0; col < numCols; col++) {
				/* The drawImage function of the canvas' context element
				 * requires 3 parameters: the image to draw, the x coordinate
				 * to start drawing and the y coordinate to start drawing.
				 * We're using our Resources helpers to refer to our images
				 * so that we get the benefits of caching these images, since
				 * we're using them over and over.
				 */
				ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
				// 101 x 83 = width x height-cropped of png
			}
		}
		renderEntities();
	}

	/* This function is called by the render function and is called on each game
	 * tick. Its purpose is to then call the render functions you have defined
	 * on your enemy and player entities within app.js
	 */
	function renderEntities() {
		/* Loop through all of the objects within the allEnemies array and call
		 * the render function you have defined.
		 */
		allEnemies.forEach(function(enemy) {
			enemy.render();
		});
		allTreasures.forEach(function(treasure) {
			treasure.render();
		});
		player.render();
	}

	function reset() {
		updateBounty();
		endTimer();
		level = 1;
		nEnemies = 3;
		nrows = 6;
		ncols = 8;
		levelDisplay.innerHTML = `Level ${level}`;
		// Insert missing stars
		while (starElement.getElementsByTagName('li').length < mLives) {
			let star = document.createElement("LI");
			let icon = document.createElement("I");
			icon.classList.add('fa', 'fa-star');
			star.appendChild(icon);
			starElement.appendChild(star);
		}
		totalSeconds = 0;
		secondsLabel.innerHTML = digitalClock(totalSeconds % 60);
		minutesLabel.innerHTML = digitalClock(parseInt(totalSeconds / 60));
		player.update(collide = false, replay = true);
		startTimer();
	}

	function digitalClock(val) {
		let valString = val + "";
		if (valString.length < 2) {
			return "0" + valString;
		} else {
			return valString;
		}
	}

	function endTimer() {
		clearInterval(start);
	}

	function startTimer() {
		// Timer, adapted from https://stackoverflow.com/a/5517836/5118344
		start = setInterval(setTime, 1000); // Call function every 1s

		function setTime() {
			++totalSeconds;
			secondsLabel.innerHTML = digitalClock(totalSeconds % 60);
			minutesLabel.innerHTML = digitalClock(parseInt(totalSeconds / 60));
		}

	}

	function endGame() {
		endTimer();
		modal.style.display = 'flex';
		modalScore.innerHTML = `${player.score}`;

		// When the user clicks on <span> (x), close the modal
		close.onclick = function() {
			modal.style.display = "none";
		};
		playBtn.addEventListener('click', init);

		// When the user clicks anywhere outside of the modal, close it
		win.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		};
	}

	/* Go ahead and load all of the images we know we're going to need to
	 * draw our game level. Then set init as the callback method, so that when
	 * all of these images are properly loaded our game will start.
	 */
	Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        "images/Gem-Blue.png",
        "images/Gem-Green.png",
        "images/Gem-Orange.png"
    ]);
	Resources.onReady(init);

	/* Assign the canvas' context object to the global variable (the window
	 * object when run in a browser) so that developers can use it more easily
	 * from within their app.js files.
	 */
	global.ctx = ctx;
})(this);
// }
// Engine(this);
/*
 * Create a list that holds all of your cards
 */
let icons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
  "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb",
  "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
  "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb"
  ];

// Global tracking variables
let score;
let moves;
let matchedCards;
let cardChoice;
let pairs;
let delay = (function() {
	let timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();
const moveElement = document.getElementById('moves');
const starElement = document.getElementById('stars');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
startGame();
const restart = document.getElementById('restart');
restart.addEventListener('click', startGame);

function startGame() {
	resetGame();
	// Dont shuffle for debug
	icons = shuffle(icons);
	const deck = document.getElementById("deck");
	while (deck.firstChild) {
		deck.removeChild(deck.firstChild);
	}
	for (const icon of icons) {
		// Build Prototype Card
		const card = document.createElement("li");
		card.classList.toggle("card");
		const i = document.createElement("i");
		i.classList.toggle("fa");
		i.classList.toggle(icon);

		card.appendChild(i);
		deck.appendChild(card);
	}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		// Math.random = range(0,1]
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// Event delegation
// Use ".target" (bubbling up) to conect to each card
deck.addEventListener('click', function flipCard(e) {
	if (e.target.nodeName === 'LI' && pairs.length < 2) {
		cardChoice = e.target;
		let cardClass = e.target.querySelector('i').className;
		pairs.push(cardClass);

		cardChoice.classList.add('open');

		if (pairs.length === 2) {
			incrementMove();
			if (pairs[0] === pairs[1]) {
				addMatchToScore();
				pairs.length = 0; // Clear array

			} else {
				delay(function(cardChoice) {
					let incorrectPair = deck.getElementsByClassName('open');
					incorrectPair[1].classList.remove('open');
					incorrectPair[0].classList.remove('open');
					pairs.length = 0; // Clear array
				}, 1000);

			}
		}

	}
});

function addMatchToScore() {
	let correctElementPair = deck.getElementsByClassName('open');
	++matchedCards;
	score = matchedCards / 2;
	correctElementPair[0].classList.add('match');
	correctElementPair[1].classList.add('match');
	correctElementPair[1].classList.remove('open');
	correctElementPair[0].classList.remove('open');
	checkWin();
}


moveElement.textContent = moves.toString();

function incrementMove() {
	// increment the move counter and display it on the page
	moves += 1;
	moveElement.textContent = moves.toString();

	if (moves === 10) {
		starElement.removeChild(starElement.getElementsByTagName('li')[0]);
	} else if (moves === 17) {
		starElement.removeChild(starElement.getElementsByTagName('li')[0]);
	} else if (moves === 25) {
		starElement.removeChild(starElement.getElementsByTagName('li')[0]);
	}
}


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var start;
var totalSeconds;
var modalMin = document.getElementById("totmin");
var modalSec = document.getElementById("totsec");

function resetGame() {
	endTimer();
	moves = 0;
	moveElement.textContent = moves.toString();
	// Insert missing stars
	while (starElement.getElementsByTagName('li').length < 3) {
		let star = document.createElement("LI");
		let icon = document.createElement("I");
		icon.classList.add('fa', 'fa-star');
		star.appendChild(icon);
		starElement.appendChild(star);
	}
	score = 0;
	matchedCards = 0;
	pairs = [];
	startTimer();

}

function startTimer() {
	// Timer, adapted from https://stackoverflow.com/a/5517836/5118344
	totalSeconds = 0;
	start = setInterval(setTime, 1000); // Call function every 1s

	function setTime() {
		++totalSeconds;
		secondsLabel.innerHTML = digitalClock(totalSeconds % 60);
		minutesLabel.innerHTML = digitalClock(parseInt(totalSeconds / 60));
	}
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

function checkWin() {
	console.log(matchedCards);
	if (matchedCards === 8) {
		// Display win message with the final score
		const finalScore = (matchedCards * 2 *
			starElement.getElementsByTagName('li').length);

		let score = document.getElementById("score");
		score.textContent = finalScore.toString();

		modalSec.innerHTML = digitalClock(totalSeconds % 60);
		modalMin.innerHTML = digitalClock(parseInt(totalSeconds / 60));
		endTimer();

		// Get the modal
		// https://www.w3schools.com/howto/howto_css_modals.asp
		let modal = document.getElementById('myModal');
		// Get the <span> and <buttton> element that closes the modal and/or restart game.
		let close = document.getElementsByClassName("close")[0];

		let playBtn = document.getElementById('play');


		modal.style.display = "flex";

		// When the user clicks on <span> (x), close the modal
		close.onclick = function() {
			modal.style.display = "none";
		}
		playBtn.onclick = function() {
			modal.style.display = "none";
			startGame();

		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}

	}
}
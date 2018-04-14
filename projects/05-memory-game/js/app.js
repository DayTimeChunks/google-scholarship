/*
 * Create a list that holds all of your cards
 */
let icons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
  "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb",
  "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
  "fa-cube", "fa-bicycle", "fa-leaf", "fa-bomb"
  ];

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
	// Dont flush for debug
	// icons = shuffle(icons);
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
let score = 0;
let moves = 0;
let matchedCards = [];
let cardChoice;
let pairs = [];
let delay = (function() {
	let timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

// Event delegation
// Use ".target" to conect to each card
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
				checkWin();
				pairs.length = 0; // Clear array
				console.log("pairs: " + pairs);

			} else {
				delay(function(cardChoice) {
					let incorrectPair = deck.getElementsByClassName('open');
					incorrectPair[1].classList.remove('open');
					incorrectPair[0].classList.remove('open');
				}, 1000);
				pairs.length = 0; // Clear array
			}
		}

	}
});

function addMatchToScore() {
	let correctElementPair = deck.getElementsByClassName('open');
	Array.prototype.forEach.call(correctElementPair, element => {
		element.classList.add('match');
		matchedCards.push(element.classList);
		score = matchedCards.legth / 2;
	});
	Array.prototype.forEach.call(correctElementPair, element => {
		element.classList.remove('open');
	});
}

const moveElement = document.getElementById('moves');
moveElement.textContent = moves.toString();

function incrementMove() {
	moves += 1;
	moveElement.textContent = moves.toString();

	// increment the move counter and display it on the page
}

// TODO: follow Modal link to prepare a modal message!
function checkWin() {
	if (matchedCards.length === 16) {
		// Display win message with the final score
		// https://www.w3schools.com/howto/howto_css_modals.asp
	}
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/*
 * Create a list that holds all of your cards
 */
var array = [
	'<i class="fas fa-bug"></i>', 
	'<i class="fas fa-bug"></i>', 
	'<i class="fab fa-css3"></i>', 
	'<i class="fab fa-css3"></i>', 
	'<i class="fab fa-html5"></i>', 
	'<i class="fab fa-html5"></i>',
	'<i class="fab fa-js"></i>',
	'<i class="fab fa-js"></i>',
	'<i class="fab fa-python"></i>',
	'<i class="fab fa-python"></i>',
	'<i class="fas fa-database"></i>',
	'<i class="fas fa-database"></i>',
	'<i class="fas fa-terminal"></i>',
	'<i class="fas fa-terminal"></i>',
	'<i class="fab fa-github"></i>',
	'<i class="fab fa-github"></i>'
	]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
var shuffledArray = function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var shuffledCards = function cardsShuffled(array) {
	for (var i = 0; i < array.length; i++) {
		var card = document.querySelectorAll(".card");
		card[i].innerHTML = array[i];
		}
		return card;
}

cardsShuffled(array);
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

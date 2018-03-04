var array = [
	'<i class="fas fa-bug fa-lg"></i>',
	'<i class="fas fa-bug fa-lg"></i>',
	'<i class="fab fa-css3 fa-lg"></i>',
	'<i class="fab fa-css3 fa-lg"></i>',
	'<i class="fab fa-html5 fa-lg"></i>',
	'<i class="fab fa-html5 fa-lg"></i>',
	'<i class="fab fa-js fa-lg"></i>',
	'<i class="fab fa-js fa-lg"></i>',
	'<i class="fab fa-python fa-lg"></i>',
	'<i class="fab fa-python fa-lg"></i>',
	'<i class="fas fa-database fa-lg"></i>',
	'<i class="fas fa-database fa-lg"></i>',
	'<i class="fas fa-terminal fa-lg"></i>',
	'<i class="fas fa-terminal fa-lg"></i>',
	'<i class="fab fa-github fa-lg"></i>',
	'<i class="fab fa-github fa-lg"></i>'
	];

var openCards = [];
var matchedCards = [];
var errorSound = new Audio('sounds/error.wav');
var correctSound = new Audio('sounds/correct.wav');
var gameOver = new Audio ('sounds/game-over.wav');
var shuffleSound = new Audio ('sounds/shuffle.wav');

/*************************************
 FUNCTION TO SHUFFLE THE ARRAY ELEMENTS
*************************************/
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {	//function declaration
    var currentIndex = array.length, temporaryValue, randomIndex; //var declaration

    while (currentIndex !== 0) { //while array is not at zero, function will run
        randomIndex = Math.floor(Math.random() * currentIndex); //random index is defined with the built in javascript function to randomize something multiplied by the current index value
        currentIndex -= 1; //decrements the current index value, so as to avoid an infinite loop
        temporaryValue = array[currentIndex]; //defines temporary value as updated current index value
        array[currentIndex] = array[randomIndex]; //resassigns current index value to that of the random array index value
        array[randomIndex] = temporaryValue; //reassigns the random index value to the value of the temporary value
    }
    return array;
}

 var array = shuffle(array);


/*************************************
 FUNCTION TO BIND ELEMENTS TO DOM
*************************************/

function cardShuffled(array) { 
	var i = 0;		
	var card = document.querySelectorAll(".card");  
	while(i < array.length) { 	
		card[i] = array[i];	
		card[i].innerHTML = array[i]; 
		i = i + 1; 
	} return card;
}

 var shuffledArray = cardShuffled(array); 

/*************************************************
 CLICK EVENT TO TRIGGER FUNCTION TO TURN CARD OVER
*************************************************/

function cardFlip() {
	var shuffle = cardShuffled(array);
	var i = 0;
	var cardClicked;
	while (i < array.length) {
		shuffle[i].addEventListener('click', cardClick); 
		i = i + 1;
	}
	return cardClicked;
}

/*************************************************
 FUNCTION TO CLICK IMAGE
*************************************************/

function cardClick ( event ) {
    this.classList.add('open', 'show');
    openCards.push(this);
    compareValues();
}

/*************************************************
 FUNCTION TO COMPARE CARD VALUES
*************************************************/

function compareValues () {
    if (openCards.length === 2) {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            compareMatchedCards();
            openCards = [];
        } else {
            hideCardValues(openCards);
            openCards = [];
        }
    }
}

function hideCardValues(openCards) {
    setTimeout(function(){
	    let i = 1;
	    while( i >= 0) {
	        openCards[i].classList.remove('show');
	        i = i - 1;
	    }
	}, 500);
	errorSound.play();
}


function compareMatchedCards() {
    if(document.getElementsByClassName("show").length !== array.length) {
    	correctSound.play();
    } else {
        console.log("game over!")
        gameOver.play();
    }
}

function mulligan() {
	var redo = document.querySelector('.restart');
	redo.addEventListener('click', function(){
	var cardShow = document.getElementsByClassName('show');
	let i = cardShow.length - 1;
	while (i >= 0) {
		cardShow[i].classList.remove('show');
		i = i - 1;
	}
	openCards = [];
	shuffle(array);
	shuffleSound.play();
	return cardShuffled(array);
	});
}


function gameTime () {
	while (matchedCards.length !== array.length) {
		cardFlip();
		mulligan();
		break;
	}
}

gameTime();


/*
--------------
CODE PURGATORY
--------------
*/

// for (var i = 0; i < array.length; i++) {
// 		var mulligan = cardShuffled(array);
// 		var resetCard = document.getElementsByClassName('show)');
// 		shuffle(array)
// 		openCards = [];
// 		matchedCards = [];
// 		resetCard[i].classList.remove('show');
// 	}
// 	return mulligan;

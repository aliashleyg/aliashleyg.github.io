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
var moveCounter = 0;
var starCount = 0;

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
	this.classList.remove('close');
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
            compareMatchedCards(openCards);
            openCards = [];
            moveCount();
        } else {
            hideCardValues(openCards);
            openCards = [];
            moveCount();
        }
    }
}

/*************************************************
 FUNCTION TO HIDE CARDS AFTER WRONG CHOICE
*************************************************/

function hideCardValues(openCards) {
    setTimeout(function(){
	    let i = 1;
	    while( i >= 0) {
	        openCards[i].classList.toggle('close');
	        openCards[i].classList.remove('show');
	        i = i - 1;
	    }
	}, 900);
	errorSound.play();
	stars();
}

/*************************************************
 FUNCTION FOR DETERMINING IF GAME IS OVER
*************************************************/

function compareMatchedCards(openCards) {
	let i = 1;
	while (i >=0) {
		openCards[i].classList.add('match');
		i = i - 1;
	}
    if(document.getElementsByClassName("show").length !== array.length) {
    	correctSound.play();
    } else {
        gameOver.play();
    }
}

/*************************************************
 FUNCTION FOR RESTART BUTTON
*************************************************/

function mulligan() {
	var redo = document.querySelector('.restart');
	redo.addEventListener('click', function(){
	var cardShow = document.getElementsByClassName('show');
	var moves = document.querySelector('.moves');
	let i = cardShow.length - 1;
	while (i >= 0) {
		cardShow[i].classList.remove('show','match');
		i = i - 1;
	}
	openCards = [];
	starCount = 0;
	starReset();
	moveCounter = 0;
	moves.textContent = "";
	shuffle(array);
	shuffleSound.play();
	return cardShuffled(array);
	});
}

/*************************************************
 				SCORING SECTION
*************************************************/

function moveCount() {
	moves = document.querySelector('.moves');
	moveCounter = moveCounter + 1;
	if (moveCounter < 2) {
		moves.textContent = moveCounter + " Move";
	} else {
		moves.textContent = moveCounter + " Moves";
	}
}

/* I FEEL LIKE THERE IS A WAY THIS COULD BE REFACTORED AS THERE IS A LOT OF REPEATED CODE, BUT I AM NOT SURE HOW */

function stars() {
	starCount = starCount + 1;
	if (starCount <= 3) {
		if (starCount == 2) {
			document.querySelector('#starFive').classList.add('blink');
			
		} else if (starCount == 3) {
			document.querySelector('#starFive').classList.add('hide');
			document.querySelector('#starFive').classList.remove('blink');
			
		}
	} else if (starCount > 3 && starCount <= 6) {
		if (starCount == 5) {
			document.querySelector('#starFour').classList.add('blink');
			
		} else if (starCount == 6) {
			document.querySelector('#starFour').classList.add('hide');
			document.querySelector('#starFour').classList.remove('blink');
			
		}
	} else if (starCount > 6 && starCount <= 9){
		if (starCount == 8) {
			document.querySelector('#starThree').classList.add('blink');
			
		} else if (starCount == 9) {
			document.querySelector('#starThree').classList.add('hide');
			document.querySelector('#starThree').classList.remove('blink');
			
		}
	} else if (starCount > 9 && starCount <= 12){
		if (starCount == 11) {
			document.querySelector('#starTwo').classList.add('blink');
			
		} else if (starCount == 12) {
			document.querySelector('#starTwo').classList.add('hide');
			document.querySelector('#starTwo').classList.remove('blink');
		}	
	} else {
		if (starCount == 14) {
			document.querySelector('#starOne').classList.add('blink');
			
		} else if (starCount >=15) {
			document.querySelector('#starOne').classList.add('hide');
			document.querySelector('#starOne').classList.remove('blink');	
		}	
	}
	return starCount;
}


function starReset() {
	star = document.querySelectorAll('.star');
	let i = 0;
	while (i < star.length) {
		if (star[i].classList.contains('hide')) {
			star[i].classList.remove('hide');
		} else if (star[i].classList.contains('blink')) {
			star[i].classList.remove('blink');
		}
		i = i + 1;
	}

}

// function endGame() {
// 	// var gameOverMessage = window.open("", "_self", "width=400, height=400");
// 	// return gameOverMessage;
// 	}




















/*************************************************
 FUNCTION HOUSING OTHER FUNCTIONS TO RUN GAME
*************************************************/

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
TODO LIST
--------------
*/

/*
X Disable card after clicked on, so it doesn't count twice
Figure out how to reset stars 
Thanks for playing message at the end of game with option to play again
*/


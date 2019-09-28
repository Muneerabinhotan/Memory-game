//Create a list that holds all of my cards
const icons = ["fa fa-heart", "fa fa-hourglass-end", "fa fa-key", "fa fa-birthday-cake",
    "fa fa-cube", "fa fa-diamond", "fa fa-rocket", "fa fa-puzzle-piece",
    "fa fa-heart", "fa fa-hourglass-end", "fa fa-key", "fa fa-birthday-cake",
    "fa fa-cube", "fa fa-diamond", "fa fa-rocket", "fa fa-puzzle-piece"
];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// cards board
const cardsBoard = document.querySelector('#cards-board');

createCardsBoard();

// Deck Creation and adding EventListener
function createCardsBoard() {

    // To clear the old card board
    cardsBoard.innerHTML = "";
    // create new ul element to append it to "cardsBoard" and add class deck to it
    const myNewDeck = document.createElement('ul');
    myNewDeck.classList.add('deck');

    // shuffle the icons list
    let shuffleIcons = shuffle(icons);
    for (let i = 0; i < shuffleIcons.length; i++) {
        const newLi = document.createElement('li');
        newLi.classList.add('card');
        newLi.innerHTML = `<i class="${shuffleIcons[i]}"></i>`;
        myNewDeck.appendChild(newLi);
    }

    cardsBoard.append(myNewDeck);
    // add event listener to the cards board
    cardsBoard.addEventListener('click', openCards);
}

//Cards Arrays
let checkCards = [];
let matchedCards = [];

//Open cards function
function openCards(e) {

    let selectedCard = e.target;
    // to make sure that the clicked target is a card & not an opened or matched card
    if (selectedCard.classList.contains("card") &&
        !selectedCard.classList.contains("open", "show", "match")) {
        // to start the timer once
        if (timerOn === false) {
            startTimer();
            timerOn = true;
        }
        //Add classes open and show to the selected card
        selectedCard.classList.add("open", "show");
        //Add the selected card to checkCards array to check if it's like the next selected card or not
        checkCards.push(selectedCard);
    }
    //Check the two cards
    if (checkCards.length === 2) {
        //To prevent opening more than two cards
        cardsBoard.classList.add("stop-event");
        //counting the moves
        movesNum();
        //If the cards are matched call the matched function
        if (checkCards[0].innerHTML === checkCards[1].innerHTML) {
            matched();
        } else {
            //If they are  unmatched call the notMatched function
            setTimeout(notMatched, 800);
        }
        youWon();
    }
}

//If the cards are matched
function matched() {
    //Add class match to both cards
    checkCards[0].classList.add("match");
    checkCards[1].classList.add("match");
    //Push both cards to the matchedCards array
    matchedCards.push(checkCards[0]);
    matchedCards.push(checkCards[1]);
    //Remove cards from checkCards array
    checkCards = [];
    //To allow opening and checking two cards again
    cardsBoard.classList.remove("stop-event");
}
//If the cards are not matched
function notMatched() {
    //Remove open and show classes from both cards
    checkCards[0].classList.remove("open", "show");
    checkCards[1].classList.remove("open", "show");
    //Remove cards from checkCards array
    checkCards = [];
    //To allow opening and checking two cards again
    cardsBoard.classList.remove("stop-event");
}

// Moves
let moves = 0;
const movesCounter = document.querySelector(".moves");

//Moves function
function movesNum() {
    // to increment moves number after opening two cards
    moves++;
    if (moves === 1) {
        movesCounter.innerHTML = `1  Move`;
    } else {
        movesCounter.innerHTML = `${moves}  Moves`;
    }
    starsRating();
}

//Stars rating
const stars = document.querySelector('.stars').childNodes;
const starsForRate = document.querySelector('.stars');

//Stars Rating function
function starsRating() {
    // if the moves number is between 10 and 19
    if (moves === 10) {
        // change the color of the third star to grey
        stars[5].classList.add('grey');
        // if the moves number is 20 or more
    } else if (moves === 20) {
        // change the color of the second star to grey
        stars[3].classList.add('grey');
    }
}

// Timer
let seconds = 0;
let minutes = 0;
let hours = 0;

const timer = document.querySelector(".timer");

const hourTimer = document.querySelector(".hour");
const minuteTimer = document.querySelector(".minute");
const secondsTimer = document.querySelector(".seconds");

let timeCounter;
let timerOn = false;

//Timer function

//To fix timer by adding zero if the number is less than ten
function fix(x, y) {
    if (x < 10) {
        return (y.innerHTML = ` 0${x}`);
    } else {
        return (y.innerHTML = ` ${x}`);
    }
}

//Start timer
function startTimer() {
    //To start the timer to avoid delay
    if (seconds == 0) {
        seconds++;
    }

    timeCounter = setInterval(function() {

        hourTimer.innerHTML = `${hours}`;
        minuteTimer.innerHTML = ` ${minutes} `;
        secondsTimer.innerHTML = ` ${seconds} `;
        // fix each part of the timer
        fix(seconds, secondsTimer);
        fix(minutes, minuteTimer);
        fix(hours, hourTimer);

        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } else if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}

// Restart
const restart = document.querySelector(".restart");

//Restart function

function restartGame() {
    //Set it to false
    timerOn = false;
    //Reset the moves to zero
    moves = 0;
    movesCounter.innerHTML = `0 Moves`;
    //Empty the arrays
    matchedCards = [];
    checkCards = [];
    // to clear the old board, create a new
    createCardsBoard();
    //To stop the timer
    clearInterval(timeCounter);
    //Reset the timer to zero
    seconds = 0;
    minutes = 0;
    hours = 0;
    secondsTimer.innerText = "00";
    minuteTimer.innerText = " 00";
    hourTimer.innerText = "00";
    // reset the color of the stars
    stars[5].classList.remove('grey');
    stars[3].classList.remove('grey');
}
//To restart  the game when the player click on the restart icon
restart.addEventListener('click', restartGame);

// Modal
const modal = document.querySelector('.modal');
const timeModal = document.querySelector('.time-modal');
const ratingModal = document.querySelector('.rating-modal');
const movesModal = document.querySelector('.moves-modal');
const btnModal = document.querySelector('.btn-modal');

//Modal Function
function youWon() {
    //when the player finish the game
    if (matchedCards.length === 16) {
        // Add them to the modal
        timeModal.innerText = timer.innerText;
        ratingModal.innerHTML = starsForRate.innerHTML;
        movesModal.innerHTML = movesCounter.innerHTML.slice(0, 3);
        //stop the timer and show the modal
        clearInterval(timeCounter);
        modal.style.display = 'block';
    }
}

btnModal.addEventListener('click', function() {
    // to close the modal and restart the game
    modal.style.display = 'none';
    restartGame();
    timerOn = false;
})

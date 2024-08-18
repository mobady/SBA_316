
const cardValues = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
let gameBoard = document.getElementById("game-board");
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Game introduction
const GameInto = document.querySelector("#game-container");
const DocFrag = document.createDocumentFragment();
const title = document.createElement("h1");
title.textContent="Memory Game Overview:";
DocFrag.appendChild(title);
DocFrag.insertBefore(title,DocFrag.firstElementChild);
title.style.textAlign="center";title.style.fontFamily="Arial"
title.style.justifyContent="center";title.style.color="white";title.style.padding="20px"
title.style.backgroundColor="#b0bec5";title.style.borderRadius="5px"
const howToPlay = document.createElement("pre");
howToPlay.textContent="The goal of the game is to find all the \nmatching pairs of cards on the game board";
DocFrag.appendChild(howToPlay);
DocFrag.insertBefore(howToPlay,title.nextElementSibling);
howToPlay.style.textAlign="center";howToPlay.style.fontFamily="Arial";howToPlay.style.fontSize="20px";
howToPlay.style.justifyContent="center";howToPlay.style.color="white";howToPlay.style.padding="20px"
howToPlay.style.backgroundColor="#b0bec5";howToPlay.style.borderRadius="5px";
GameInto.prepend(DocFrag);


// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
    
// Initialize game board
function initializeGame() {
    shuffle(cardValues);
    gameBoard.innerHTML = "";
    cards = [];
        
    for (let value of cardValues) {
        let card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.value = value;
        card.innerText = value;  // Keep hidden initially
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }
}
    
// Flip card function
function flipCard() {
    if (lockBoard || this === firstCard) return;
        
    this.classList.remove("hidden");
        
    if (!firstCard) {
        firstCard = this;
        return;
    }
        
    secondCard = this;
    lockBoard = true;
        
    checkForMatch();
}
    
// Check if two cards match
function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;
        
    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}
    
// Disable cards if they match
function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
}
    
// Unflip cards if they don't match
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.add("hidden");
        secondCard.classList.add("hidden");
        resetBoard();
    }, 1000);
}
    
// Reset board after each turn
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
    
// Reset game
document.getElementById("reset-button").addEventListener("click", initializeGame);

// Login Page
let myWindow;
function newWindow() {
    myWindow = window.open("./login.html","Login Page","width=800, height=400, resizable=yes, scrollbars=yes, location=yes");
    myWindow.focus();
}
document.getElementById("login").addEventListener("click", newWindow);

// Start the game for the first time
initializeGame();
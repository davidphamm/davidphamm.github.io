// General //
var dealerSum = 0;
var playerSum = 0;
var dealerAceCount = 0;
var playerAceCount = 0;
var hidden;
var deck;
var canHit = true; // allows the player to draw while playerSum <=  21

// DOM Manipulation //
var dealerCards = document.getElementById('dealerCards');
var dealerSumEl = document.getElementById('dealerSum');
var playerCards = document.getElementById('playerCards');
var playerSumEl = document.getElementById('playerSum');
var results = document.getElementById('results');
var hitButton = document.getElementById('hitButton');
var standButton = document.getElementById('standButton');
var gameButton = document.getElementById('gameButton');
var restartButton = document.getElementById('restartButton');

// Sounds //
const hitSound = new Audio('./assets/sounds/swish.m4a');
const winSound = new Audio('./assets/sounds/cash.mp3');

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

// Cards Properties //
function buildDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); // this will get [values - types ]
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 = (0-51.99999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Game Properties // 
function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden)

    while (dealerSum < 16) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/cards/" + card + ".png ";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        dealerCards.append(cardImg)
    };

    for (let i = 0; i < 2; i ++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./assets/cards/" + card + ".png ";
        playerSum += getValue(card);
        playerAceCount += checkAce(card);
        playerCards.append(cardImg)
        playerSumEl.innerText = playerSum;
    };

    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);
}

// Buttons Properties //
function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/cards/" + card + ".png ";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    playerCards.append(cardImg);
    playerSumEl.innerText = playerSum;
    hitSound.play()

    if (reduceAce(playerSum, playerAceCount) >= 21) {
        canHit = false;
    }
}

function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById('hidden').src = "./assets/cards/" + hidden + ".png";

    let message = "";
    restartButton.style.display = "inline";
    hitButton.style.display = "none";
    standButton.style.display = "none";

    if (playerSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You Win!";
        winSound.play();
    }
    else if (playerSum == dealerSum) {
        message = "Tie!";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
        winSound.play();
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
    }

    dealerSumEl.innerText = dealerSum;
    playerSumEl.innerText = playerSum;
    results.innerText = message;

}


// Ace Card Properties //
function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {   
        if (value == "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
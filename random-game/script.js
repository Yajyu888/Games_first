const suits = ["♠", "♥", "♦", "♣"];
const values = [
    {name: "2", rank: 2}, {name: "3", rank: 3}, {name: "4", rank: 4},
    {name: "5", rank: 5}, {name: "6", rank: 6}, {name: "7", rank: 7},
    {name: "8", rank: 8}, {name: "9", rank: 9}, {name: "10", rank: 10},
    {name: "J", rank: 11}, {name: "Q", rank: 12}, {name: "K", rank: 13},
    {name: "A", rank: 14} // Ace high
];

let deck = [];
let currentCard = null;
let score = 0;
let lives = 3;

const currentCardEl = document.getElementById("current-card");
const hintEl = document.getElementById("hint");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const statusEl = document.getElementById("status");

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ ...value, suit });
        }
    }
    shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    createDeck();
    score = 0;
    lives = 3;
    scoreEl.textContent = "Score: " + score;
    livesEl.textContent = "Lives: " + lives;
    statusEl.textContent = "";
    currentCard = deck.pop();
    renderCard();
}

function renderCard() {
    currentCardEl.textContent = `${currentCard.name}${currentCard.suit}`;
    hintEl.textContent = "Guess if next card is Higher or Lower";
}

function guess(higher) {
    if (deck.length === 0) {
        statusEl.textContent = "Deck finished! Final score: " + score;
        return;
    }
    const nextCard = deck.pop();
    let correct = false;

    if (higher && nextCard.rank > currentCard.rank) correct = true;
    if (!higher && nextCard.rank < currentCard.rank) correct = true;

    if (correct) {
        score++;
        statusEl.textContent = `Correct! It was ${nextCard.name}${nextCard.suit}`;
    } else {
        lives--;
        statusEl.textContent = `Wrong! It was ${nextCard.name}${nextCard.suit}`;
    }

    scoreEl.textContent = "Score: " + score;
    livesEl.textContent = "Lives: " + lives;
    currentCard = nextCard;
    renderCard();

    if (lives <= 0) {
        statusEl.textContent += " — Game Over!";
    }
}

document.getElementById("higher-btn").addEventListener("click", () => guess(true));
document.getElementById("lower-btn").addEventListener("click", () => guess(false));
document.getElementById("new-game").addEventListener("click", startGame);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") guess(true);
    if (e.key === "ArrowDown") guess(false);
});

startGame();

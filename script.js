const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const resetButton = document.getElementById('resetButton');
const reviewButton = document.getElementById('reviewButton');
const backButton = document.getElementById('backButton');

const mainPage = document.getElementById('mainPage');
const gamePage = document.getElementById('gamePage');
const reviewPage = document.getElementById('reviewPage');
const cardDisplay = document.getElementById('cardDisplay');
const miniatures = document.getElementById('miniatures');
const historyDisplay = document.createElement('div');

historyDisplay.className = 'history';
gamePage.insertBefore(historyDisplay, cardDisplay);

let deck = [];
let drawnCards = [];
let historyCards = [];

function initializeDeck() {
    deck = Array.from({ length: 54 }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpg`);
    drawnCards = [];
    historyCards = [];
    updateHistory();
}

function drawCard() {
    if (deck.length === 0) {
        alert('No hay más cartas en la baraja.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    drawnCards.push(card);
    updateHistory();
    cardDisplay.innerHTML = `<img src="images/${card}" alt="Card">`;
}

function updateHistory() {
    historyCards = drawnCards.slice(-5);
    historyDisplay.innerHTML = historyCards
        .map(card => `<img src="images/${card}" alt="Card">`)
        .join('');
}

function showMainPage() {
    mainPage.classList.remove('hidden');
    gamePage.classList.add('hidden');
    reviewPage.classList.add('hidden');
}

function showGamePage() {
    mainPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    reviewPage.classList.add('hidden');
}

function showReviewPage() {
    miniatures.innerHTML = drawnCards
        .map(card => `<img src="images/${card}" alt="Card">`)
        .join('');
    mainPage.classList.add('hidden');
    gamePage.classList.add('hidden');
    reviewPage.classList.remove('hidden');
}

startButton.addEventListener('click', () => {
    initializeDeck();
    showGamePage();
    drawCard();
});

nextButton.addEventListener('click', drawCard);

resetButton.addEventListener('click', () => {
    if (confirm('¿Estás seguro de resetear el barajeo de cartas?')) {
        initializeDeck();
        drawCard();
    }
});

reviewButton.addEventListener('click', showReviewPage);

backButton.addEventListener('click', showGamePage);

// Initialize the deck on page load
initializeDeck();

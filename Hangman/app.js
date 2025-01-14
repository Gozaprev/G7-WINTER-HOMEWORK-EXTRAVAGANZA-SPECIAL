const words = [
    { word: "javascript", hint: "A popular programming language" },
    { word: "hangman", hint: "The game you're playing" },
    { word: "developer", hint: "Someone who writes code" },
    { word: "computer", hint: "An electronic device" },
    { word: "programming", hint: "The act of writing code" }
];

const maxLives = 6;
let selectedWord = {};
let guessedLetters = [];
let lives = maxLives;

const wordDisplay = document.getElementById('word');
const lettersDisplay = document.getElementById('letters');
const livesDisplay = document.getElementById('lives');
const statusDisplay = document.getElementById('status');
const hangmanCanvas = document.getElementById('hangman-canvas');
const ctx = hangmanCanvas.getContext('2d');
const hintButton = document.getElementById('hintButton');
const playAgainButton = document.getElementById('playAgainButton');

function startGame() {
    resetCanvas();
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex];
    guessedLetters = [];
    lives = maxLives;

    wordDisplay.innerHTML = selectedWord.word.split('').map(() => '_').join(' ');
    livesDisplay.textContent = `Lives: ${lives}`;
    statusDisplay.textContent = '';
    statusDisplay.className = 'status';

    hintButton.disabled = false;
    hintButton.classList.remove('disabled');

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    lettersDisplay.innerHTML = alphabet.split('').map(letter => {
        return `<button class="letter" onclick="guessLetter('${letter}')">${letter}</button>`;
    }).join('');
}

function guessLetter(letter) {
    const button = document.querySelector(`.letter[onclick="guessLetter('${letter}')"]`);
    if (button) {
        button.classList.add('guessed');
        button.disabled = true;
    }

    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);

        if (selectedWord.word.includes(letter)) {
            updateWordDisplay();
        } else {
            lives--;
            updateLives();
            drawHangman(lives);
        }
    }
}

function updateWordDisplay() {
    const displayedWord = selectedWord.word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    wordDisplay.textContent = displayedWord;

    if (!displayedWord.includes('_')) {
        endGame('Congratulations! You won!', 'won');
    }
}

function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`;
    if (lives < maxLives) {
        livesDisplay.style.color = 'red';
    }
    if (lives === 0) {
        endGame(`Game Over! The word was "${selectedWord.word}".`, 'lost');
    }
}

function endGame(message, status) {
    statusDisplay.textContent = message;
    statusDisplay.classList.add(status);

    document.querySelectorAll('.letter').forEach(button => button.disabled = true);

    hintButton.disabled = true;
    hintButton.classList.add('disabled');
}

function resetCanvas() {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
}

function drawHangman(lives) {
    switch (lives) {
        case 5: drawHead(); break;
        case 4: drawBody(); break;
        case 3: drawLeftArm(); break;
        case 2: drawRightArm(); break;
        case 1: drawLeftLeg(); break;
        case 0: drawRightLeg(); break;
    }
}

function drawHead() {
    ctx.beginPath();
    ctx.arc(100, 50, 20, 0, Math.PI * 2);
    ctx.stroke();
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(100, 70);
    ctx.lineTo(100, 120);
    ctx.stroke();
}

function drawLeftArm() {
    ctx.beginPath();
    ctx.moveTo(100, 80);
    ctx.lineTo(70, 100);
    ctx.stroke();
}

function drawRightArm() {
    ctx.beginPath();
    ctx.moveTo(100, 80);
    ctx.lineTo(130, 100);
    ctx.stroke();
}

function drawLeftLeg() {
    ctx.beginPath();
    ctx.moveTo(100, 120);
    ctx.lineTo(70, 150);
    ctx.stroke();
}

function drawRightLeg() {
    ctx.beginPath();
    ctx.moveTo(100, 120);
    ctx.lineTo(130, 150);
    ctx.stroke();
}

hintButton.addEventListener('click', () => {
    alert(selectedWord.hint);
});

playAgainButton.addEventListener('click', startGame);

startGame();

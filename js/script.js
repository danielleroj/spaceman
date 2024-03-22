/*----- constants -----*/
const WORDS = [
  "cake",
  "pecan pie",
  "croissant",
  "tiramisu",
  "coffee",
  "apple crisp",
  "cappuccino",
  "mocha",
  "baguette",
  "scone",
  "cheesecake",
  "cupcake",
  "macaron",
  "donut",
  "biscotti",
  "brioche",
  "danish",
  "chocolate cake",
  "eclair",
  "muffin",
  "biscuit",
  "pancake",
];
const MAX_GUESSES = 6;
const completeWordImgs = [
  "imgs/pusheen-cookie.gif",
  "imgs/pusheen-bun.gif",
  "imgs/pusheen-reeses.gif",
  "imgs/pusheen-cooking.gif",
  "imgs/pusheen-donuts.gif",
  "imgs/pusheen-flan.gif",
  "imgs/pusheen-wafer.gif",
];

/*----- app's state (variables) -----*/
let currentWordIdx = 0;
let guessedLetters = [];
let completedWords = 0;
let wrongGuesses;
let word;

// /*----- cached element references -----*/
const gameStatusMsg = document.querySelector("#game-status-message");
const wordEl = document.querySelector("#mystery-word");
const resetBtn = document.querySelector("#reset");
const continueBtn = document.querySelector("#continue");
const letterBtns = document.querySelectorAll(".letters");
const progressImg = document.querySelector("#progress-img");
const startupImg = document.querySelector("#starting-img");
const wrongGuessesEl = document.querySelector("#wrong-guesses");
const completedWordsEl = document.querySelector("#completed-words");
const completedWordImg = document.querySelector("#word-complete-img");

/*----- event listeners -----*/
resetBtn.addEventListener("click", resetGame);
continueBtn.addEventListener("click", continueGame);

/*----- functions -----*/
init();

function init() {
  hideBtnsImgs();
  guessedLetters = [];
  renderKeyboard();
  wrongGuesses = 0;
  word = getNextWord();
  wordPlaceholder(word);
}

function renderSpacecatImg() {
  progressImg.src = `imgs/cat-${wrongGuesses}.png`;
}

function randomImgs() {
  let randomImg = Math.floor(Math.random() * completeWordImgs.length);
  completedWordImg.src = completeWordImgs[randomImg];
  completedWordImg.classList.remove("hidden");
}

function renderKeyboard() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  letterBtns.forEach((button, idx) => {
    const letter = alphabet[idx];
    button.addEventListener("click", () => {
      guessedLetters.push(letter);
      if (!word.includes(letter)) {
        wrongGuesses++;
        if (wrongGuesses === MAX_GUESSES) {
          loseGame();
        }
      }
      progressImg.classList.remove("hidden");
      startupImg.classList.add("hidden");
      wordPlaceholder(word);
      renderSpacecatImg();
      button.disabled = true;
    });
  });
}

function wordPlaceholder(word) {
  const placeholder = "🧁";
  let mysteryWord = word.split("").map((letter) => {
    if (letter === " ") {
      return " ";
    }
    return guessedLetters.includes(letter) ? letter : placeholder;
  });
  wordEl.innerText = mysteryWord.join("");
  if (!mysteryWord.includes(placeholder)) {
    checkWin();
  }
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
}

function getNextWord() {
  word = WORDS.sort((a, b) => a.length - b.length)[0];
  if (currentWordIdx < WORDS.length) {
    return WORDS[currentWordIdx++];
  } else {
    finalWin();
  }
}

function checkWin() {
  completedWords++;
  randomImgs();
  gameStatusMsg.innerText = `You did it!`;
  progressImg.classList.add("hidden");
  resetBtn.classList.remove("hidden");
  continueBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
  completedWordsEl.innerText = `Completed Words: ${completedWords}`;
  confetti();
}

function finalWin() {
  completedWordImg.src = "imgs/pusheen-dancing.gif";
  wordEl.innerHTML = `CONGRATULATIONS!<br>You won the game!`;
  confetti2();
}

function continueGame() {
  guessedLetters = [];
  wrongGuesses = 0;
  word = getNextWord();
  renderSpacecatImg();
  wordPlaceholder(word);
  gameStatusMsg.innerText = "";
  letterBtns.forEach((button) => {
    button.disabled = false;
  });
  progressImg.classList.remove("hidden");
  completedWordImg.classList.add("hidden");
  resetBtn.classList.add("hidden");
  continueBtn.classList.add("hidden");
}

function resetGame() {
  currentWordIdx = 0;
  guessedLetters = [];
  wrongGuesses = 0;
  completedWords = 0;
  word = getNextWord();
  wordPlaceholder(word);
  renderSpacecatImg();
  gameStatusMsg.innerText = "";
  letterBtns.forEach((button) => {
    button.disabled = false;
  });
  hideBtnsImgs();
  startupImg.classList.remove("hidden");
  completedWordsEl.innerText = `Completed words: ${completedWords}`;
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
  // gameStatusMsg.innerText = "";
}

function loseGame() {
  gameStatusMsg.innerText = `Better luck next time!`;
  resetBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
}

function hideBtnsImgs() {
  completedWordImg.classList.add("hidden");
  progressImg.classList.add("hidden");
  resetBtn.classList.add("hidden");
  continueBtn.classList.add("hidden");
}

// confetti from tsParticles - used for end of game confetti
function confetti2() {
  const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

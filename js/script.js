/*----- constants -----*/
const WORDS = ["cake", "espresso", "croissant", "tiramisu"];
const MAX_GUESSES = 6;
const SPACECAT_IMGS = [
  "imgs/spacecat-0.png",
  "imgs/spacecat-1.png",
  "imgs/spacecat-2.png",
  "imgs/spacecat-3.png",
  "imgs/spacecat-4.png",
  "imgs/spacecat-5.png",
  "imgs/spacecat-6.png",
];

/*----- app's state (variables) -----*/
let currentWordIdx = 0;
let guessedLetters = [];
let wrongGuesses;
let word;

// /*----- cached element references -----*/
const messageEl = document.querySelector("#message");
const gameStatusMsg = document.querySelector("#game-status-message");
const wordEl = document.querySelector("#mystery-word");
const resetBtn = document.querySelector("#reset");
const continueBtn = document.querySelector("#continue");
const letterBtns = document.querySelectorAll(".letters");
const spacecat = document.querySelector("#spacecat");
const wrongGuessesEl = document.querySelector("#wrong-guesses");

/*----- event listeners -----*/
resetBtn.addEventListener("click", resetGame);
continueBtn.addEventListener("click", continueGame);
// letterBtns.addEventListener("click", renderKeyboard);

/*----- functions -----*/
init();

function init() {
  resetBtn.classList.add("hidden");
  continueBtn.classList.add("hidden");
  guessedLetters = [];
  renderKeyboard();
  wrongGuesses = 0;
  renderSpacecatImg();
  word = getNextWord();
  wordPlaceholder(word);

}

function renderSpacecatImg() {
  spacecat.src = `imgs/spacecat-${wrongGuesses}.png`;
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
      wordPlaceholder(word);
      renderSpacecatImg();
    });
  });
}

function wordPlaceholder(word) {
  const placeholder = "🧁";
  let mysteryWord = word.split("").map((letter) => guessedLetters.includes(letter) ? letter : placeholder);
  wordEl.innerText = mysteryWord.join("");
  if (!mysteryWord.includes(placeholder)) {
    checkWin();
  }
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
}

function checkWin(){
  gameStatusMsg.innerText =  `You did it!`;
  resetBtn.classList.remove("hidden");
  continueBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
  // guessedLetters = [];
  // getNextWord();
}

function getNextWord() {
  if (currentWordIdx < WORDS.length) {
    return WORDS[currentWordIdx++];
  } else {
    return null;
  }
}

function continueGame() {
  guessedLetters = [];
  wrongGuesses = 0;
  word = getNextWord();
  renderSpacecatImg();
  wordPlaceholder(word);
  gameStatusMsg.innerText = "";
  // playBtn.classList.add("hidden");
  letterBtns.forEach((button) => {
    button.disabled = false;
  });
  resetBtn.classList.add("hidden");
  continueBtn.classList.add("hidden");
  // wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
}

function resetGame() {
  currentWordIdx = 0;
  guessedLetters = [];
  wrongGuesses = 0;
  word = getNextWord();
  wordPlaceholder(word);
  gameStatusMsg.innerText = "";
  letterBtns.forEach((button) => {
    button.disabled = false;
  });
  resetBtn.classList.add("hidden");
  continueBtn.classList.add("hidden");
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
  gameStatusMsg.innerText = "";
  renderSpacecatImg();

}

function loseGame() {
  gameStatusMsg.innerText =  `Better luck next time!`;
  resetBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
}

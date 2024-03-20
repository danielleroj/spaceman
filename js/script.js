/*----- constants -----*/
const WORDS = ["cake", "espresso", "croissant", "tiramisu", "coffee", "latte", 
"cappuccino", "mocha", "baguette", "scone", "pastry", "cupcake", "macaron", "donut",
"biscotti", "brioche", "danish", "tart", "eclair", "muffin", "biscuit", "pancake"];
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
let completedWords = 0;
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
const completedWordsEl = document.querySelector("#completed-words");

/*----- event listeners -----*/
resetBtn.addEventListener("click", resetGame);
continueBtn.addEventListener("click", continueGame);

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

function getNextWord() {
  word = WORDS.sort((a, b) => a.length - b.length)[0];
  if (currentWordIdx < WORDS.length) {
    return WORDS[currentWordIdx++];
  } else {
    return null;
  }
}

function checkWin(){
  completedWords++;
  gameStatusMsg.innerText =  `You did it!`;
  resetBtn.classList.remove("hidden");
  continueBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
  completedWordsEl.innerText = `Completed words: ${completedWords}`;
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
  resetBtn.classList.add("hidden");
  continueBtn.classList.add("hidden");
  completedWordsEl.innerText = `Completed words: ${completedWords}`;
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
  gameStatusMsg.innerText = "";

}

function loseGame() {
  gameStatusMsg.innerText =  `Better luck next time!`;
  resetBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
}

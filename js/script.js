/*----- constants -----*/
const WORDS = ["espresso", "croissant", "tiramisu"];
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
const word = "espresso";

/*----- app's state (variables) -----*/
// let currentWordIdx = 0;
let guessedLetters = [];
let wrongGuesses;

// /*----- cached element references -----*/
const messageEl = document.querySelector("#message");
const gameStatusMsg = document.querySelector("#game-status-message");
const wordEl = document.querySelector("#mystery-word");
const playBtn = document.querySelector("#game-btn");
const letterBtns = document.querySelectorAll(".letters");
const spacecat = document.querySelector("#spacecat");
const wrongGuessesEl = document.querySelector("#wrong-guesses");
const keyboard = document.querySelector(".keyboard");

/*----- event listeners -----*/
playBtn.addEventListener("click", resetGame);
// letterBtns.addEventListener("click", renderKeyboard);

/*----- functions -----*/
init();

function init() {
  playBtn.classList.add("hidden");
  guessedLetters = [];
  renderKeyboard();
  wrongGuesses = 0;
  renderSpacecatImg();
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
  playBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
  guessedLetters = [];
}


function loseGame() {
  gameStatusMsg.innerText =  `Better luck next time!`;
  playBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
}

function resetGame() {
  // playBtn.classList.add("hidden");
  letterBtns.forEach((button) => {
    button.disabled = false;
  });
  guessedLetters = [];
  wrongGuesses = 0;
  wordPlaceholder(word);
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
  gameStatusMsg.innerText = "";
  renderSpacecatImg();
}


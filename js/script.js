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
const wordEl = document.querySelector("#mystery-word");
const playBtn = document.querySelector("#game-btn");
const letterBtns = document.querySelectorAll(".letters");
const spacecat = document.querySelector("#spacecat");
const wrongGuessesEl = document.querySelector("#wrong-guesses");

/*----- event listeners -----*/
playBtn.addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
  guessedLetters = [];
  renderKeyboard();
  wrongGuesses = 0;
  renderSpacecatImg(wrongGuesses);
  wordPlaceholder(word);
  render();
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
          endGame();
        }
      }
      wordPlaceholder(word, guessedLetters);
      renderSpacecatImg();
    });
  });
}

function wordPlaceholder(word) {
  const letters = word.split("");
  const placeholder = "🧁";
  let hideWord = word.split("").map((letter) => guessedLetters.includes(letter) ? letter : placeholder);
  wordEl.innerText = hideWord.join("");
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
  console.log("wrongGuesses:", wrongGuesses);
}

function endGame() {
  playBtn.classList.remove("hidden");
  letterBtns.forEach((button) => {
    button.disabled = true;
  });
}

function resetGame() {
  console.log("Resetting game...");
  guessedLetters = [];
  wrongGuesses = 0;
  letterBtns.forEach((button) => {
    button.disabled = false;
  });
  playBtn.classList.add("hidden");
}

function render() {
  resetGame();
}

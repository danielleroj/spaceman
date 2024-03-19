/*----- constants -----*/
const WORDS = ["espresso", "croissant", "tiramisu"];
const MAX_GUESSES = 6;
// const SPACECAT_IMG = [
//   "imgs/image_part_000.PNG",
//   "imgs/image_part_001.png",
//   "imgs/image_part_002.png",
//   "imgs/image_part_003.png",
//   "imgs/image_part_004.png",
//   "imgs/image_part_005.png",
//   "imgs/image_part_006.png",
// ];
const word = "espresso";

/*----- app's state (variables) -----*/
let correctAnswer = " ";
let currentWord = null;
let guessedLetters = [];
let wrongGuesses = 0;
// let levels;
let gameStatus;

// /*----- cached element references -----*/
const messageEl = document.querySelector("#message");
const wordEl = document.querySelector("#mystery-word");
const playEl = document.querySelector("#game-btn");
const letterBtns = document.querySelectorAll(".letters");
const spacecat = document.querySelector("#left-img");

/*----- event listeners -----*/
// game-btn.addEventListener('click', init);

/*----- functions -----*/
init();

function renderKeyboard() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  letterBtns.forEach((button, idx) => {
    const letter = alphabet[idx];
    button.addEventListener("click", () => {
      //   console.log(`${letter} was clicked.`);
      guessedLetters.push(letter);
      wordPlaceholder(word, guessedLetters);
    });
  });
}

function wordPlaceholder(word) {
  const letters = word.split("");
  const placeholder = "🧁";
  let hideWord = letters.map((letter) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return placeholder;
    }
  });
  wordEl.innerText = hideWord.join("");
}

function init() {
  //   wordStatus = currentWord.map();
  //   gameStatus = null;
  guessedLetters = [];
  wordPlaceholder(word);
  renderKeyboard();
  render();
}

// function renderMessage() {
//     if (gameStatus === 'W') {
//         messageEl.innerText = 'You did it! On to the next round';
//     } else if (gameStatus === 'L') {
//         messageEl.innerText = `Hmm, that's not right. The answer was ${wordEl}.`
//     }
// }

function render() {
  spacecat.src = `imgs/image_part_0${wrongGuesses}.png`;
  //   renderMessage;
}

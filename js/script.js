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
let correctAnswer = " ";
let currentWord = null;
let guessedLetters = [];
let wrongGuesses;
// let levels;
let gameStatus;

// /*----- cached element references -----*/
const messageEl = document.querySelector("#message");
const wordEl = document.querySelector("#mystery-word");
const playEl = document.querySelector("#game-btn");
const letterBtns = document.querySelectorAll(".letters");
const spacecat = document.querySelector("#spacecat");
const wrongGuessesEl = document.querySelector("#wrong-guesses");
/*----- event listeners -----*/
// game-btn.addEventListener('click', init);

/*----- functions -----*/
init();


function init() {
  //   wordStatus = currentWord.map();
  //   gameStatus = null;
  wrongGuesses = 0;
  guessedLetters = [];
  renderKeyboard();
  renderSpacecatImg(wrongGuesses);
  wordPlaceholder(word);
  render();

function renderSpacecatImg(wrongGuesses) {
    spacecat.src = `imgs/spacecat-${wrongGuesses}.png`;
}

function renderKeyboard() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  letterBtns.forEach((button, idx) => {
    const letter = alphabet[idx];
    button.addEventListener("click", () => {
      guessedLetters.push(letter);
      if (wrongGuesses < 6 && !word.includes(letter)) {
        wrongGuesses++;
        if (wrongGuesses === 6) {
          letterBtns.forEach((button) => {
            button.disabled = true;
          });
          return (wrongGuessesEl.innerText = "Better luck next time");
        }
      }
      wordPlaceholder(word, guessedLetters);
      renderSpacecatImg(wrongGuesses);
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
  wrongGuessesEl.innerText = `Wrong Guesses: ${wrongGuesses}/6`;
}

}

// function renderMessage() {
//     if (gameStatus === 'W') {
//         messageEl.innerText = 'You did it! On to the next round';
//     } else if (gameStatus === 'L') {
//         messageEl.innerText = `Hmm, that's not right. The answer was ${wordEl}.`
//     }
// }

function render() {
  //   renderMessage;
}

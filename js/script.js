/*----- constants -----*/
const BACKGROUND_AUDIO = new Audio('Morning-Routine-Lofi-Study-Music(chosic.com).mp3');
const WORDS = ['espresso', 'croissant', 'tiramisu'];
const MAX_GUESSES = 6;
const SPACECAT_IMG = [
    'imgs/image_part_000.PNG',
    'imgs/image_part_001.png',
    'imgs/image_part_002.png',
    'imgs/image_part_003.png',
    'imgs/image_part_004.png',
    'imgs/image_part_005.png',
    'imgs/image_part_006.png'
];

/*----- app's state (variables) -----*/
let currentWord = 0;
let incorrectGuesses = []; 
// let levels;
let wordStatus = null;
let gameStatus;

// /*----- cached element references -----*/
const messageEl = document.getElementById('message');
const wordEl = document.getElementById('mystery-word');
const playEl = document.getElementById('game-btn');
const lettersEl = document.getElementById('letters');
const spacecat = document.querySelector(".left-column img");
// const levels = [
//     {

//     }];

/*----- event listeners -----*/
game-btn.addEventListener('click', init);
document.querySelector(.keyboard).addEventListener('click', handleClick);


/*----- functions -----*/
init()

function handleClick() {

}

function init() {
    currentWord = WORDS[0].split('');
    incorrectGuesses = [];
    // wordStatus = currentWord.map();
    gameStatus = null;
    render();
 }

 function renderGameStatus() {

 }
    
function renderMessage() {
         if (gameStatus === 'W') {
             messageEl.innerText = 'You did it! On to the next round';
         } else if (gameStatus === 'L') {
             messageEl.innerText = `Hmm, that's not right. The answer was ${wordEl}.`
         }
     }

function render() {
    wordEl.innerText = wordStatus.join("");
    spacecat.src  = 'imgs/image_part_00${wrongGuesses.length}.png';
    renderMessage;
}


/**
 * red indicator --> good color at the righrt place
 * white indicator --> good color at tre wrong place
 */

// Get all the piece of the game
const bluePiece = document.getElementById('blue-piece')!;
const redPiece = document.getElementById('red-piece')!;
const greenPiece = document.getElementById('green-piece')!;
const yellowPiece = document.getElementById('yellow-piece')!;
const orangePiece = document.getElementById('orange-piece')!;
const blackPiece = document.getElementById('black-piece')!;
const whitePiece = document.getElementById('white-piece')!;
const marronPiece = document.getElementById('maroon-piece')!;

const pieces = [
  bluePiece,
  redPiece,
  greenPiece,
  yellowPiece,
  orangePiece,
  blackPiece,
  whitePiece,
  marronPiece,
];

// All the color available in the game based on the pieces available
const COLORS = pieces.map((piece) => piece.id.split('-')[0]);

// The button to verrify the current combination
const verifyButton = document.getElementById('verify')!;

// current game round
// min : 1 | max : 12
let currentRound: number;

// var for current targets and indicators
let currentLine: HTMLElement;
let currentTargets: NodeListOf<Element>;
let currentRedIndicatorsContainer: Element;
let currentWhiteIndicatorsContainer: Element;

// var for the game combination

let gameCombination: string[];

/**
 * @description Set the data transfer to the color of the piece
 * @param e
 * @param color
 */
function dragstart_handler(e: DragEvent, color: string) {
  e.dataTransfer?.setData('text/plain', color);
  e.dataTransfer!.effectAllowed = 'move';
}

/**
 * @description listener function on drag over event
 * @param e
 */
function dragover_handler(e: DragEvent) {
  e.preventDefault();
  e.dataTransfer!.dropEffect = 'move';
}

/**
 * @description get the color of the drag item and change the target background to this color
 * @param e
 * @param target
 */
function drop_handler(e: DragEvent, target: Element) {
  e.preventDefault();
  const color = e.dataTransfer!.getData('text/plain');
  target.classList.remove(...COLORS);
  target.classList.add(color);
}

/**
 * @returns a combination of 4 colors
 */
function generateCombination() {
  return [...Array(4)].map(
    () => COLORS[Math.floor(Math.random() * COLORS.length)]
  );
}

/**
 * @description Reset all game variable and HTML and start the game
 */
function startNewGame() {
  // Reset current round
  currentRound = 1;

  // Reset game combination
  gameCombination = generateCombination();

  // reset HTML here
  const gameContainer = document.getElementById('game-container')!;
  gameContainer.innerHTML = `
      <div class="line" id="line-${currentRound}">
        <div class="red-indicator-container"></div>
        <div class="targets-container">
          <div class="target"></div>
          <div class="target"></div>
          <div class="target"></div>
          <div class="target"></div>
        </div>
        <div class="white-indicator-container"></div>
      </div>
      `;

  // Reset currentTarget and indicators
  currentLine = document.getElementById(`line-${currentRound}`)!;
  currentTargets = currentLine.querySelectorAll(
    `div.targets-container > div.target`
  )!;
  currentRedIndicatorsContainer = currentLine.querySelector(
    'div.red-indicator-container'
  )!;
  currentWhiteIndicatorsContainer = currentLine.querySelector(
    'div.white-indicator-container'
  )!;

  // Add drag event listener for each piece and setting the
  // data Transfer to the corresponding color
  pieces.forEach((piece) =>
    piece?.addEventListener('dragstart', (e) => {
      dragstart_handler(e, piece.id.split('-')[0]);
    })
  );

  // Add drag event for every current targets
  for (let i = 0; i < currentTargets.length; i++) {
    currentTargets[i].addEventListener('dragover', (e) => {
      dragover_handler(e as DragEvent);
    });

    currentTargets[i].addEventListener('drop', (e) =>
      drop_handler(e as DragEvent, currentTargets[i])
    );
  }
}

function verifyCurrentCombination() {
  let goodPlacement = 0;
  let wrongPLacement = 0;

  // Get the current combination
  const currentCombination = [];
  for (let i = 0; i < currentTargets.length; i++) {
    const color = currentTargets[i].className
      .split(' ')
      .filter((e) => COLORS.includes(e))[0];
    currentCombination.push(color);
  }

  currentCombination.forEach((color, index) => {
    if (gameCombination[index] === color) {
      console.log(
        `the color ${color} at the place ${index + 1} is at the good place`
      );
      goodPlacement++;
      return;
    }
    if (gameCombination.includes(color)) {
      console.log(
        `the color ${color} at the place ${index + 1} is not at the good place`
      );

      wrongPLacement++;
      return;
    }
    console.log(`the color ${color} is not in the final combination`);
  });

  // Add indicator to the current line
  for (let j = 0; j < goodPlacement; j++) {
    console.log('pass red');
    const redIndicator = document.createElement('div');
    redIndicator.classList.add('red-indicator');
    currentRedIndicatorsContainer.appendChild(redIndicator);
  }

  for (let k = 0; k < wrongPLacement; k++) {
    console.log('pass white');
    const whiteIndicator = document.createElement('div');
    whiteIndicator.classList.add('white-indicator');
    currentWhiteIndicatorsContainer.appendChild(whiteIndicator);
  }
}

// Add the verify event
verifyButton.onclick = verifyCurrentCombination;

startNewGame();

/**
 * red indicator --> good color at the righrt place
 * white indicator --> good color at tre wrong place
 */

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

const COLORS = pieces.map((piece) => piece.id.split('-')[0]);

const targets = document.getElementsByClassName('target')!;

const verifyButton = document.getElementById('verify')!;

const redIndicatorContainer = document.getElementsByClassName(
  'red-indicator-container'
)[0];
const whiteIndicatorContainer = document.getElementsByClassName(
  'white-indicator-container'
)[0];

// Define the combination of the current game
const combination = [...Array(4)].map(
  () => COLORS[Math.floor(Math.random() * COLORS.length)]
);
console.log(combination);

// Add drag event listener for each piece and setting the
// data Transfer to the corresponding color
pieces.forEach((piece) =>
  piece?.addEventListener('dragstart', (e) => {
    dragstart_handler(e, piece.id.split('-')[0]);
  })
);

// Add drag event for every targets
for (let i = 0; i < targets.length; i++) {
  targets[i].addEventListener('dragover', (e) => {
    dragover_handler(e as DragEvent);
  });

  targets[i].addEventListener('drop', (e) =>
    drop_handler(e as DragEvent, targets[i])
  );
}

function dragstart_handler(e: DragEvent, color: string) {
  e.dataTransfer?.setData('text/plain', color);
  e.dataTransfer!.effectAllowed = 'move';
}

function dragover_handler(e: DragEvent) {
  e.preventDefault();
  e.dataTransfer!.dropEffect = 'move';
}

function drop_handler(e: DragEvent, target: Element) {
  e.preventDefault();
  const color = e.dataTransfer!.getData('text/plain');
  target.classList.remove(...COLORS);
  target.classList.add(color);
}

let goodPlacement = 0;
let wrongPLacement = 0;

function verifyCurrentCombination() {
  // Reset placement variables values
  goodPlacement = 0;
  wrongPLacement = 0;

  // Get the current combination
  const currentCombination = [];
  for (let i = 0; i < targets.length; i++) {
    const color = targets[i].className
      .split(' ')
      .filter((e) => COLORS.includes(e))[0];
    currentCombination.push(color);
  }

  // Analyse the combination and determine good and bad placement
  currentCombination.forEach((color, index) => {
    if (combination.includes(color)) {
      console.log(`the color ${color} is not in the final combination`);
      return;
    }
    if (combination[index] === color) {
      console.log(
        `the color ${color} at the place ${index + 1} is at the good place`
      );
      goodPlacement++;
      return;
    }

    console.log(
      `the color ${color} at the place ${index + 1} is not at the good place`
    );

    wrongPLacement++;
  });

  // Add indicator to the current line
  for (let j = 0; j < goodPlacement; j++) {
    console.log('pass red');
    const redIndicator = document.createElement('div');
    redIndicator.classList.add('red-indicator');
    redIndicatorContainer.appendChild(redIndicator);
  }

  for (let k = 0; k < wrongPLacement; k++) {
    console.log('pass white');
    const whiteIndicator = document.createElement('div');
    whiteIndicator.classList.add('white-indicator');
    whiteIndicatorContainer.appendChild(whiteIndicator);
  }
}

// Add the verify event
verifyButton.onclick = verifyCurrentCombination;

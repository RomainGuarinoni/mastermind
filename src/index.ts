import {
  getCurrentCombination,
  getCombinationPlacement,
  generateCombination,
} from './combination';

import {
  setPieceDragData,
  addTargetListener,
  removeTargetListener,
} from './listeners';

import { addNewGameLine, addIndicators, Indicators } from './dom-manipulation';

// get the game container
const gameContainer = document.getElementById('game-container')!;

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

// Add drag event listener for each piece and setting the
// data Transfer to the corresponding color
window.addEventListener('DOMContentLoaded', () => {
  pieces.forEach((piece) =>
    piece.addEventListener('dragstart', setPieceDragData),
  );
});

//Get all Popup
const parametersPopup = document.getElementById('parametersPopup')!;
const winPopup = document.getElementById('win')!;
const loosePopup = document.getElementById('loose')!;

// All the color available in the game based on the pieces id available
const COLORS = pieces.map((piece) => piece.id.split('-')[0]);

// The button of the game
const applyButton = document.getElementById('applyParameters')!;
const cancelButton = document.getElementById('cancelParameters')!;
const verifyButton = document.getElementById('verify')!;
const restartButton = document.getElementById('restart')!;
const winRestartButton = document.getElementById('win-restart')!;
const looseRestartButton = document.getElementById('loose-restart')!;
const parameters = document.getElementById('parameters')!;

// Parameters Popup value from the DOM
const duplicateCheckBox = <HTMLInputElement>(
  document.getElementById('duplicateCheck')!
);
const nbColorsValue = <HTMLInputElement>(
  document.getElementById('nbColorsValue')!
);
const nbTurnsValue = <HTMLInputElement>document.getElementById('nbTurnsValue')!;
const nbPossibilitiesValue = <HTMLInputElement>(
  document.getElementById('nbPossibilitiesValue')!
);

// current game round
// min : 1 | max : nbTurns
let currentRound: number;

// DOM elements of the game
let currentLine: HTMLElement;
let currentTargets: NodeListOf<Element>;
let currentRedIndicatorsContainer: Element;
let currentWhiteIndicatorsContainer: Element;

// Game variable
let gameCombination: string[];

// Game params
let duplicate = duplicateCheckBox.checked;
let nbTurns = nbTurnsValue.valueAsNumber;
let nbColors = nbColorsValue.valueAsNumber;
let nbPossibilities = nbPossibilitiesValue.valueAsNumber;

/**
 * @description Reset all game variable and HTML and start a new game
 */
function startNewGame() {
  if (duplicate === true) {
    duplicateCheckBox.checked = true;
  } else {
    duplicateCheckBox.checked = false;
  }
  nbColorsValue.valueAsNumber = nbColors;
  nbTurnsValue.valueAsNumber = nbTurns;
  nbPossibilitiesValue.valueAsNumber = nbPossibilities;
  // Reset current round
  currentRound = 1;

  // Reset game combination
  gameCombination = generateCombination(COLORS, nbPossibilities, duplicate);
  // reset HTML here
  gameContainer.innerHTML = '';
  addNewGameLine(currentRound, gameContainer, nbPossibilities);

  // Reset currentTarget and indicators
  currentLine = document.getElementById(`line-${currentRound}`)!;
  currentTargets = currentLine.querySelectorAll(
    `div.targets-container > div.target`,
  )!;
  currentRedIndicatorsContainer = currentLine.querySelector(
    'div.red-indicator-container',
  )!;
  currentWhiteIndicatorsContainer = currentLine.querySelector(
    'div.white-indicator-container',
  )!;

  addTargetListener(currentTargets, COLORS);
}

function verifyCurrentCombination() {
  // Get the current combination
  let currentCombination: string[];

  try {
    currentCombination = getCurrentCombination(currentTargets, COLORS);
  } catch (err) {
    alert('Mettez des pions dans chaque emplacement de la ligne');
    return;
  }

  const { goodPlacement, wrongPlacement } = getCombinationPlacement(
    currentCombination,
    gameCombination,
  );

  addIndicators(Indicators.red, currentRedIndicatorsContainer, goodPlacement);

  addIndicators(
    Indicators.white,
    currentWhiteIndicatorsContainer,
    wrongPlacement,
  );

  if (goodPlacement === nbPossibilities) {
    // win
    document.getElementById(
      'nb-round',
    )!.innerHTML = `Tu as trouvé la combinaison en ${currentRound} tours`;
    winPopup.style.display = 'flex';
    return;
  }

  if (currentRound === nbTurns) {
    // loose
    const solutionCombinaison = document.getElementById(
      'solution-combination',
    )!;
    for (let i = 0; i < gameCombination.length; i++) {
      const div = document.createElement('div');
      div.classList.add('piece', gameCombination[i]);
      solutionCombinaison.appendChild(div);
    }
    loosePopup.style.display = 'flex';
    return;
  }

  // Add a new line to the game
  removeTargetListener(currentTargets);
  currentRound++;
  addNewGameLine(currentRound, gameContainer, nbPossibilities);
  currentLine = document.getElementById(`line-${currentRound}`)!;
  currentTargets = currentLine.querySelectorAll(
    `div.targets-container > div.target`,
  )!;
  currentRedIndicatorsContainer = currentLine.querySelector(
    'div.red-indicator-container',
  )!;
  currentWhiteIndicatorsContainer = currentLine.querySelector(
    'div.white-indicator-container',
  )!;
  addTargetListener(currentTargets, COLORS);
}

/**
 * @description Set the params value and check if a new game can start with these params
 */
function applyParameters() {
  duplicate = duplicateCheckBox.checked;
  nbColors = nbColorsValue.valueAsNumber;
  nbTurns = nbTurnsValue.valueAsNumber;
  nbPossibilities = nbPossibilitiesValue.valueAsNumber;
  if (duplicate === false && nbColors < nbPossibilities) {
    alert(
      `Attention, autorisez les doublons ou mettez un nombre de couleurs supérieur ou égal au nombre de possibilités par ligne`,
    );
    return;
  }
  parametersPopup.style.display = 'none';
  startNewGame();
}

// Add the verify event
verifyButton.onclick = verifyCurrentCombination;

// add restart event
restartButton.onclick = () => {
  startNewGame();
};

//add apply parameters event
applyButton.onclick = applyParameters;

//add cancel parameters event
cancelButton.onclick = () => {
  parametersPopup.style.display = 'none';
};

//add show parametersPopup event
parameters.onclick = () => {
  parametersPopup.style.display = 'flex';
};

winRestartButton.onclick = (e) => {
  e.preventDefault();
  winPopup.style.display = 'none';
  startNewGame();
};

looseRestartButton.onclick = (e) => {
  e.preventDefault();
  loosePopup.style.display = 'none';
  startNewGame();
};

startNewGame();

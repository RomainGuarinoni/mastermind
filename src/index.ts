import {
  getCurrentCombination,
  getCombinationPlacement,
  generateCombination,
  getAvailableColors,
} from './combination';

import {
  setPieceDragData,
  addTargetListener,
  removeTargetListener,
} from './listeners';

import {
  addNewGameLine,
  addIndicators,
  Indicators,
  hideUnwantedColor,
  getGameDomElements,
} from './dom-manipulation';

// get the game container
const gameContainer = document.getElementById(
  'game-container',
) as HTMLDivElement;

// Get all the piece of the game
const bluePiece = document.getElementById('blue-piece') as HTMLDivElement;
const redPiece = document.getElementById('red-piece') as HTMLDivElement;
const greenPiece = document.getElementById('green-piece') as HTMLDivElement;
const yellowPiece = document.getElementById('yellow-piece') as HTMLDivElement;
const orangePiece = document.getElementById('orange-piece') as HTMLDivElement;
const blackPiece = document.getElementById('black-piece') as HTMLDivElement;
const whitePiece = document.getElementById('white-piece') as HTMLDivElement;
const marronPiece = document.getElementById('maroon-piece') as HTMLDivElement;
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
const parametersPopup = document.getElementById(
  'parametersPopup',
) as HTMLDivElement;
const winPopup = document.getElementById('win') as HTMLDivElement;
const loosePopup = document.getElementById('loose') as HTMLDivElement;

// All the color available in the game based on the pieces id available
const COLORS = pieces.map((piece) => piece.id.split('-')[0]);

// The button of the game
const applyButton = document.getElementById(
  'applyParameters',
) as HTMLButtonElement;
const cancelButton = document.getElementById(
  'cancelParameters',
) as HTMLButtonElement;
const verifyButton = document.getElementById('verify') as HTMLButtonElement;
const restartButton = document.getElementById('restart') as HTMLButtonElement;
const winRestartButton = document.getElementById(
  'win-restart',
) as HTMLButtonElement;
const looseRestartButton = document.getElementById(
  'loose-restart',
) as HTMLButtonElement;
const parametersButton = document.getElementById(
  'parameters',
) as HTMLButtonElement;

// Parameters Popup value from the DOM
const duplicateCheckBox = document.getElementById(
  'duplicateCheck',
) as HTMLInputElement;
const nbColorsValue = document.getElementById(
  'nbColorsValue',
) as HTMLInputElement;
const nbTurnsValue = document.getElementById(
  'nbTurnsValue',
) as HTMLInputElement;
const nbPossibilitiesValue = document.getElementById(
  'nbPossibilitiesValue',
) as HTMLInputElement;

// current game round
// min : 1 | max : nbTurns
let currentRound: number;

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
 * @description Set parametersPopup innerHtml
 */
function startNewGame() {
  currentRound = 1;

  const colorsAvailable = getAvailableColors(COLORS, nbColors);

  gameCombination = generateCombination(
    colorsAvailable,
    nbPossibilities,
    duplicate,
  );

  hideUnwantedColor(COLORS, colorsAvailable);

  // reset HTML here
  gameContainer.innerHTML = '';
  addNewGameLine(currentRound, gameContainer, nbPossibilities);

  // Reset currentTarget and indicators
  const { targets, redIndicatorsContainer, whiteIndicatorsContainer } =
    getGameDomElements(currentRound);

  currentTargets = targets;
  currentRedIndicatorsContainer = redIndicatorsContainer;
  currentWhiteIndicatorsContainer = whiteIndicatorsContainer;
  addTargetListener(currentTargets, COLORS);
}

/**
 * @description remove all events of the previous line, create a new line with the current index,
 *  update the game DOM variables and add eventListeners to them
 */
function createNewRound() {
  removeTargetListener(currentTargets);
  currentRound++;
  addNewGameLine(currentRound, gameContainer, nbPossibilities);
  const { targets, redIndicatorsContainer, whiteIndicatorsContainer } =
    getGameDomElements(currentRound);

  currentTargets = targets;
  currentRedIndicatorsContainer = redIndicatorsContainer;
  currentWhiteIndicatorsContainer = whiteIndicatorsContainer;
  addTargetListener(currentTargets, COLORS);
}

/**
 * @description Add nbRound to win popup and display it
 */
function displayWinPopup() {
  (
    document.getElementById('nb-round') as HTMLParagraphElement
  ).innerHTML = `Tu as trouvé la combinaison en ${currentRound} tours`;
  winPopup.style.display = 'flex';
}

/**
 * @description Add game combination to loose popup and display it
 */
function displayLoosePopup() {
  const solutionCombinaison = document.getElementById(
    'solution-combination',
  ) as HTMLDivElement;

  // reset previous solution
  solutionCombinaison.innerHTML = '';

  for (let i = 0; i < gameCombination.length; i++) {
    const div = document.createElement('div');
    div.classList.add('piece', gameCombination[i]);
    solutionCombinaison.appendChild(div);
  }
  loosePopup.style.display = 'flex';
}

/**
 * @description verify the current combination, add indicators and a new line
 */
function verifyCurrentCombination() {
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
    displayWinPopup();
    return;
  }

  if (currentRound === nbTurns) {
    displayLoosePopup();
    return;
  }

  createNewRound();
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
restartButton.onclick = startNewGame;

//add apply parameters event
applyButton.onclick = applyParameters;

//add cancel parameters event
cancelButton.onclick = () => {
  parametersPopup.style.display = 'none';
};

//add show parametersPopup event
parametersButton.onclick = () => {
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

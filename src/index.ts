import {
  getCurrentCombination,
  getCombinationPlacement,
  generateCombination,
  getAvailableColors,
} from './combination';

import {
  addTargetListener,
  removeTargetListener,
  setDragListenerOnPieces,
  addReducePopUpListener,
  addFormEvent,
  onClickOutside,
} from './listeners';

import {
  addNewGameLine,
  addIndicators,
  Indicators,
  hideUnwantedColor,
  getGameDomElements,
  updateTooltip,
  changeVerifyContent,
  displayPreviousRecord,
  displayNewRecord,
} from './dom-manipulation';

import handleRun, { getRecord, Run } from './record';

import { getDateDifference } from './time';

import GameState from './game-state';

// get the game container
const gameContainer = document.getElementById(
  'game-container',
) as HTMLDivElement;

// Get all the pieces of the game
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

setDragListenerOnPieces(pieces);

// All the color available in the game based on the pieces id available
const COLORS = pieces.map((piece) => piece.id.split('-')[0]);

// Get all Popup
const parametersPopup = document.getElementById(
  'parametersPopup',
) as HTMLFormElement;
const winPopup = document.getElementById('win') as HTMLDivElement;
const losePopup = document.getElementById('lose') as HTMLDivElement;

addFormEvent(parametersPopup, applyParameters);

// The button of the game
const cancelParametersButton = document.getElementById(
  'cancelParameters',
) as HTMLButtonElement;
const verifyButton = document.getElementById('verify') as HTMLButtonElement;
const restartButton = document.getElementById('restart') as HTMLButtonElement;
const winRestartButton = document.getElementById(
  'win-restart',
) as HTMLButtonElement;
const loseRestartButton = document.getElementById(
  'lose-restart',
) as HTMLButtonElement;
const parametersButton = document.getElementById(
  'parameters',
) as HTMLButtonElement;
const reduceButtons = document.getElementsByClassName(
  'reduce-popUp',
) as HTMLCollectionOf<HTMLButtonElement>;

addReducePopUpListener(reduceButtons);

// The tooltip of the verify button
const verifyTooltip = document.getElementById('tooltip') as HTMLDivElement;

// Parameters value from the DOM Popup
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

// Current game round
// min : 1 | max : nbTurns
let currentRound: number;

// Game DOM variables
let currentTargets: NodeListOf<HTMLDivElement>;
let currentRedIndicatorsContainer: HTMLDivElement;
let currentWhiteIndicatorsContainer: HTMLDivElement;

let gameCombination: string[];

let gameState: GameState;

// Game run date
let runStart: Date;
let runEnd: Date;

// Game params

/**
 * A boolean that indicates whether the combination can have
 * duplicate colors or not
 **/
let duplicate = duplicateCheckBox.checked;

/**
 * The number of turns in the game
 */
let nbTurns = nbTurnsValue.valueAsNumber;

/**
 * The number of colors available for the player
 */
let nbColors = nbColorsValue.valueAsNumber;

/**
 * The number of colors in a line
 */
let nbPossibilities = nbPossibilitiesValue.valueAsNumber;

/**
 * @description Reset all the HTML of the game container and start a new game
 * by generating a new combination and reset game DOM variables
 */
function startNewGame() {
  gameState = GameState.running;

  currentRound = 1;
  updateTooltip(verifyTooltip, currentRound, nbTurns);
  const colorsAvailable = getAvailableColors(COLORS, nbColors);

  hideUnwantedColor(COLORS, colorsAvailable);

  gameCombination = generateCombination(
    colorsAvailable,
    nbPossibilities,
    duplicate,
  );

  console.log(gameCombination);

  gameContainer.innerHTML = '';
  addNewGameLine(currentRound, gameContainer, nbPossibilities);

  const { targets, redIndicatorsContainer, whiteIndicatorsContainer } =
    getGameDomElements(currentRound);

  currentTargets = targets;
  currentRedIndicatorsContainer = redIndicatorsContainer;
  currentWhiteIndicatorsContainer = whiteIndicatorsContainer;
  addTargetListener(currentTargets, COLORS);

  changeVerifyContent(verifyButton, gameState);

  runStart = new Date();
}

/**
 * @description Remove all the events of the previous line, create a new line with the current index,
 * update the game DOM variables and add eventListeners to them
 */
function createNewRound() {
  removeTargetListener(currentTargets);

  currentRound++;

  updateTooltip(verifyTooltip, currentRound, nbTurns);

  addNewGameLine(currentRound, gameContainer, nbPossibilities);
  const { targets, redIndicatorsContainer, whiteIndicatorsContainer } =
    getGameDomElements(currentRound);

  currentTargets = targets;
  currentRedIndicatorsContainer = redIndicatorsContainer;
  currentWhiteIndicatorsContainer = whiteIndicatorsContainer;
  addTargetListener(currentTargets, COLORS);
}

/**
 * @description Add the nbRound value to the win popup and display it
 */
function displayWinPopup() {
  (
    document.getElementById('nb-round') as HTMLParagraphElement
  ).innerHTML = `Tu as trouv?? la combinaison en ${currentRound} tours`;
  winPopup.style.display = 'flex';
}

/**
 * @description Add the game combination to the lose popup and display it
 */
function displaylosePopup() {
  const solutionCombinaison = document.getElementById(
    'solution-combination',
  ) as HTMLDivElement;

  // Reset previous solution
  solutionCombinaison.innerHTML = '';

  for (let i = 0; i < gameCombination.length; i++) {
    const div = document.createElement('div');
    div.classList.add('piece', gameCombination[i]);
    solutionCombinaison.appendChild(div);
  }
  losePopup.style.display = 'flex';
}

/**
 * @description Update the tooltip and the verify content and display the corresponding end game popUp. It also
 * get the record of the caategory and display a message accroding to if the currentRun is a new record in the
 * category or not
 * @param {EndGameStatus} status The end game status, either win or lose
 */
function handleEndGame() {
  runEnd = new Date();

  changeVerifyContent(verifyButton, gameState);

  // We set currentRound+1 so that the tooltip display 0 round left
  updateTooltip(verifyTooltip, currentRound + 1, nbTurns);

  const currentRun: Run = {
    category: {
      nbTurns,
      nbColors,
      nbPossibilities,
      duplicate,
    },
    time: getDateDifference(runStart, runEnd),
    date: new Date(),
  };

  if (gameState === GameState.win) {
    const p = document.querySelector('#win-record p') as HTMLParagraphElement;

    const { isNew, record, previousRecord } = handleRun(currentRun);
    if (isNew) {
      displayNewRecord(p, record, previousRecord);
    } else {
      displayPreviousRecord(p, record, currentRun, gameState);
    }

    displayWinPopup();
    return;
  }

  const p = document.querySelector('#lose-record p') as HTMLParagraphElement;

  displayPreviousRecord(
    p,
    getRecord(currentRun.category),
    currentRun,
    gameState,
  );

  displaylosePopup();
}

/**
 * @description Verify the current combination. It can either:
 *  - display an error if the currentCombination is not complete
 *  - add indicators to the current line and add a new line
 *  - display win popup if the player find the gameCombination
 *  - display lose popup if the player failed to find the gameCombination
 */
function verifyCurrentCombination() {
  let currentCombination: string[];

  try {
    currentCombination = getCurrentCombination(currentTargets, COLORS);
  } catch (err) {
    return;
  }

  const { goodPlacement, wrongPlacement } = getCombinationPlacement(
    currentCombination,
    gameCombination,
  );

  // Add the indicators only if the game is not finish
  if (gameState === GameState.running) {
    addIndicators(Indicators.red, currentRedIndicatorsContainer, goodPlacement);

    addIndicators(
      Indicators.white,
      currentWhiteIndicatorsContainer,
      wrongPlacement,
    );
  }

  if (goodPlacement === nbPossibilities) {
    gameState = GameState.win;

    handleEndGame();

    return;
  }

  if (currentRound === nbTurns) {
    gameState = GameState.lose;

    handleEndGame();

    return;
  }

  createNewRound();
}

/**
 * @description Set the params value and check if a new game can start with these params. If not,
 * it display an error
 */
function applyParameters() {
  duplicate = duplicateCheckBox.checked;
  nbColors = nbColorsValue.valueAsNumber;
  nbTurns = nbTurnsValue.valueAsNumber;
  nbPossibilities = nbPossibilitiesValue.valueAsNumber;
  if (duplicate === false && nbColors < nbPossibilities) {
    alert(
      `Attention, autorisez les doublons ou mettez un nombre de couleurs sup??rieur ou ??gal au nombre de possibilit??s par ligne`,
    );
    return;
  }
  parametersPopup.style.display = 'none';
  startNewGame();
}

verifyButton.onclick = (e) => {
  e.preventDefault();
  if (gameState === GameState.running) {
    verifyCurrentCombination();
    return;
  }

  if (gameState === GameState.win) {
    displayWinPopup();
    return;
  }

  displaylosePopup();
};

restartButton.onclick = startNewGame;

// add cancel parameters event
cancelParametersButton.onclick = () => {
  parametersPopup.style.display = 'none';
};

parametersButton.onclick = () => {
  parametersPopup.style.display = 'flex';
};

onClickOutside(
  [
    parametersPopup.querySelector('#paramsPopUp') as HTMLDivElement,
    parametersButton,
  ],
  () => {
    parametersPopup.style.display = 'none';
  },
);

winRestartButton.onclick = (e) => {
  e.preventDefault();
  winPopup.style.display = 'none';
  startNewGame();
};

loseRestartButton.onclick = (e) => {
  e.preventDefault();
  losePopup.style.display = 'none';
  startNewGame();
};

startNewGame();

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

//Get all Popup
const parametersPopup = document.getElementById('parametersPopup')!;

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
pieces.forEach((piece) =>
  piece.addEventListener('dragstart', setPieceDragData),
);

// All the color available in the game based on the pieces id available
const COLORS = pieces.map((piece) => piece.id.split('-')[0]);

let duplicate = true;
let nbTurns = 7;
let nbColors = 8;
let nbPossibilities = 6;

// The button of the game
const applyButton = document.getElementById('apply')!;
const cancelButton = document.getElementById('cancel')!;
const verifyButton = document.getElementById('verify')!;
const restartButton = document.getElementById('restart')!;
const winRestartButton = document.getElementById('win-restart')!;
const looseRestartButton = document.getElementById('loose-restart')!;
const parameters = document.getElementById('parameters')!;

const winPopup = document.getElementById('win')!;
const loosePopup = document.getElementById('loose')!;

// Parameters Popup value from the DOM
const duplicateCheckBox = <HTMLInputElement> document.getElementById('duplicateCheck');
const nbColorsValue = <HTMLInputElement> document.getElementById('nbColorsValue');
const nbTurnsValue = <HTMLInputElement> document.getElementById('nbTurnsValue');
const nbPossibilitiesValue = <HTMLInputElement> document.getElementById('nbPossibilitiesValue');

// current game round
// min : 1 | max : nbTurns
let currentRound: number;

let currentLine: HTMLElement;
let currentTargets: NodeListOf<Element>;
let currentRedIndicatorsContainer: Element;
let currentWhiteIndicatorsContainer: Element;

let gameCombination: string[];


/**
 * @description Set parametersPopup innerHtml
 * @param duplicate 
 * @param nbTurns
 * @param nbColors
 * @param nbPossibilities
 */
function setParametersHtml(duplicate: boolean, nbTurns: number, nbColors:number, nbPossibilities:number){
  if (duplicate==true) {duplicateCheckBox.checked=true;}
  else {duplicateCheckBox.checked=false;}
  nbColorsValue.valueAsNumber=nbColors;
  nbTurnsValue.valueAsNumber=nbTurns;
  nbPossibilitiesValue.valueAsNumber=nbPossibilities;
}

/**
 * @description Reset all game variable and HTML and start the game
 * @param duplicate boolean, true if there are duplicate in the game
 * @param nbColors boolean, true if there is blank in combination
 * @param nbTurns number of turn before you lose
 * @param nbPossibilities number of color by line
 */
function startNewGame(duplicate: boolean, nbTurns: number, nbColors:number, nbPossibilities:number){
  setParametersHtml(duplicate,nbTurns,nbColors,nbPossibilities);
  // Reset current round
  currentRound = 1;

  // Reset game combination
  gameCombination = generateCombination(COLORS,nbPossibilities);

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
  addNewGameLine(currentRound,gameContainer,nbPossibilities);
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

function cancelPopup(){
  parametersPopup.style.display = "none";
  parameters.style.display = "flex";
}

function showPopup(){
  parametersPopup.style.display = "flex";
  parameters.style.display = "none";
}

function applyParameters(){
  parametersPopup.style.display = "none";
  parameters.style.display = "flex";
  duplicate = duplicateCheckBox.checked;
  nbColors = nbColorsValue.valueAsNumber;
  nbTurns = nbTurnsValue.valueAsNumber;
  nbPossibilities = nbPossibilitiesValue.valueAsNumber;
  startNewGame(duplicate,nbTurns,nbColors,nbPossibilities); 
}

// Add the verify event
verifyButton.onclick = verifyCurrentCombination;

// add restart event
restartButton.onclick = () => {startNewGame(duplicate,nbTurns,nbColors,nbPossibilities)};

//add apply parameters event
applyButton.onclick = applyParameters;

//add cancel parameters event
cancelButton.onclick = cancelPopup;

//add show parametersPopup event
parameters.onclick = showPopup;

winRestartButton.onclick = (e) => {
  e.preventDefault();
  winPopup.style.display = 'none';
  startNewGame(duplicate,nbTurns,nbColors,nbPossibilities);
};

looseRestartButton.onclick = (e) => {
  e.preventDefault();
  loosePopup.style.display = 'none';
  startNewGame(duplicate,nbTurns,nbColors,nbPossibilities);
};

startNewGame(duplicate,nbTurns,nbColors,nbPossibilities);

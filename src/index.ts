/**
 * red indicator --> good color at the righrt place
 * white indicator --> good color at tre wrong place
 */

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
pieces.forEach((piece) =>
  piece?.addEventListener('dragstart', (e) => {
    dragstart_handler(e, piece.id.split('-')[0]);
  })
);

// All the color available in the game based on the pieces available
const COLORS = pieces.map((piece) => piece.id.split('-')[0]);

// The button of the game
const verifyButton = document.getElementById('verify')!;
const restartButton = document.getElementById('restart')!;
const winRestartButton = document.getElementById('win-restart')!;
const looseRestartButton = document.getElementById('loose-restart')!;

// Pop up

const winPopup = document.getElementById('win')!;
const loosePopup = document.getElementById('loose')!;

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
function dragover_handler(e: Event) {
  e.preventDefault();
  (e as DragEvent).dataTransfer!.dropEffect = 'move';
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
function generateCombination(colors: string[]) {
  return [...Array(4)].map(
    () => colors[Math.floor(Math.random() * colors.length)]
  );
}

/**
 * @description Add a new line to the game container
 * @param index the index for the line id
 */
function addNewGameLine(round: number) {
  const line = document.createElement('div');
  line.classList.add('line');
  line.id = `line-${round}`;

  const redIndicatorContainer = document.createElement('div');
  redIndicatorContainer.classList.add('red-indicator-container');

  const targetContainer = document.createElement('div');
  targetContainer.classList.add('targets-container');

  for (let i = 0; i < 4; i++) {
    const target = document.createElement('div');
    target.classList.add('target');
    targetContainer.appendChild(target);
  }

  const whiteIndicatorContainer = document.createElement('div');
  whiteIndicatorContainer.classList.add('white-indicator-container');

  line.appendChild(redIndicatorContainer);
  line.appendChild(targetContainer);
  line.appendChild(whiteIndicatorContainer);

  gameContainer.appendChild(line);
}

/**
 * @description Add the drag event listener of the targets
 * @param target
 */
function addTargetListener(targets: NodeListOf<Element>) {
  for (let i = 0; i < targets.length; i++) {
    targets[i].addEventListener('dragover', dragover_handler, true);

    targets[i].addEventListener('drop', (e) =>
      drop_handler(e as DragEvent, targets[i])
    ),
      true;
  }
}

/**
 * @description Remove the drag event listener of the targets
 * @param target
 */
function removeTargetListener(targets: NodeListOf<Element>) {
  for (let i = 0; i < targets.length; i++) {
    targets[i].removeEventListener('dragover', dragover_handler, true);
  }
}

/**
 *
 * @returns the current combination
 */
function getCurrentCombination(): Array<string | undefined> {
  return Array.from(currentTargets).map(
    (item) => item.className.split(' ').filter((e) => COLORS.includes(e))[0]
  );
}

/**
 *
 * @param combination
 * @param color
 * @returns the number of time a color appear in a combination
 */
function getColorApparition(combination: string[], color: string) {
  return combination.filter((e) => e === color).length;
}

/**
 * @description Reset all game variable and HTML and start the game
 */
function startNewGame() {
  // Reset current round
  currentRound = 1;

  // Reset game combination
  gameCombination = generateCombination(COLORS);

  // reset HTML here
  gameContainer.innerHTML = '';
  addNewGameLine(currentRound);

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

  addTargetListener(currentTargets);
}

function verifyCurrentCombination() {
  let goodPlacement: string[] = [];
  let wrongPLacement: string[] = [];

  // Get the current combination
  const currentCombination = getCurrentCombination();

  if (currentCombination.includes(undefined)) {
    alert('Mettez des pions dans chaque emplacement de la ligne');
    return;
  }

  currentCombination.forEach((color, index) => {
    if (gameCombination[index] === color) {
      console.log(
        `the color ${color} at the place ${index + 1} is at the good place`
      );

      goodPlacement.push(color);

      /**
       * remove the color from the wrong emplacement if we already
       * have all the good placement, it delete the duplicates
       * indicator. see https://github.com/RomainGuarinoni/mastermind/issues/8
       */
      if (
        goodPlacement.filter((e) => e === color).length ===
        getColorApparition(gameCombination, color as string)
      ) {
        wrongPLacement = wrongPLacement.filter((e) => e !== color);
      }

      return;
    }

    if (
      gameCombination.includes(color as string) &&
      [...goodPlacement, ...wrongPLacement].filter((e) => e === color).length <
        getColorApparition(gameCombination, color as string)
    ) {
      console.log(
        `the color ${color} at the place ${index + 1} is not at the good place`
      );

      wrongPLacement.push(color as string);
      return;
    }
  });

  // Add indicator to the current line
  for (let j = 0; j < goodPlacement.length; j++) {
    const redIndicator = document.createElement('div');
    redIndicator.classList.add('red-indicator');
    currentRedIndicatorsContainer.appendChild(redIndicator);
  }

  for (let k = 0; k < wrongPLacement.length; k++) {
    const whiteIndicator = document.createElement('div');
    whiteIndicator.classList.add('white-indicator');
    currentWhiteIndicatorsContainer.appendChild(whiteIndicator);
  }

  if (goodPlacement.length === 4) {
    // win
    document.getElementById(
      'nb-round'
    )!.innerHTML = `Tu as trouvé la combinaison en ${currentRound} tours`;
    winPopup.style.display = 'flex';
    return;
  }

  if (currentRound === 12) {
    // loose
    const solutionCombinaison = document.getElementById(
      'solution-combination'
    )!;
    for (let i = 0; i < gameCombination.length; i++) {
      const div = document.createElement('div');
      div.classList.add(...['piece', gameCombination[i]]);
      solutionCombinaison.appendChild(div);
    }
    loosePopup.style.display = 'flex';
    return;
  }

  // Add a new line to the game
  removeTargetListener(currentTargets);
  currentRound++;
  addNewGameLine(currentRound);
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
  addTargetListener(currentTargets);
}

// Add the verify event
verifyButton.onclick = verifyCurrentCombination;

// add restart event
restartButton.onclick = startNewGame;

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

export enum Indicators {
  'white',
  'red',
}

type Display = 'block' | 'flex' | 'none' | 'inline';

/**
 * @description Add a new line to the game container
 * @param {number} index the index for the line id
 * @param {HTMLDivElement} gameContainer the game container element wich contains the lines
 * @param {number} nbPossibilities the number of possibilities by line
 */
export function addNewGameLine(
  round: number,
  gameContainer: HTMLDivElement,
  nbPossibilities: number,
) {
  const line = document.createElement('div');
  line.classList.add('line');
  line.id = `line-${round}`;

  const redIndicatorContainer = document.createElement('div');
  redIndicatorContainer.classList.add('red-indicator-container');

  const whiteIndicatorContainer = document.createElement('div');
  whiteIndicatorContainer.classList.add('white-indicator-container');

  const targetContainer = document.createElement('div');
  targetContainer.classList.add('targets-container');

  for (let i = 0; i < nbPossibilities; i++) {
    const target = document.createElement('div');
    target.classList.add('target');

    const targetPiece = document.createElement('div');
    targetPiece.classList.add('target-piece');

    target.appendChild(targetPiece);
    targetContainer.appendChild(target);
  }

  whiteIndicatorContainer.style.width = `${nbPossibilities * 30}px`;
  redIndicatorContainer.style.width = `${nbPossibilities * 30}px`;

  line.appendChild(redIndicatorContainer);
  line.appendChild(targetContainer);
  line.appendChild(whiteIndicatorContainer);

  gameContainer.appendChild(line);
}

/**
 * @description Add indicators to the game
 * @param {Indicators} type the type of indicators
 * @param {HTMLDivElement} container the container where to put indicators
 * @param {number} number the number of indicators to add
 */
export function addIndicators(
  type: Indicators,
  container: HTMLDivElement,
  number: number,
) {
  for (let i = 0; i < number; i++) {
    const indicator = document.createElement('div');

    switch (type) {
      case Indicators.red:
        indicator.classList.add('red-indicator');
        break;
      case Indicators.white:
        indicator.classList.add('white-indicator');
        break;
    }

    container.appendChild(indicator);
  }
}

/**
 * @description change the display of a specify piece
 * @param {string} color the color of the piece
 * @param {Display} display the style of display to apply
 */
export function changePieceDisplay(color: string, display: Display) {
  const piece = document.getElementById(`${color}-piece`) as HTMLDivElement;
  piece.style.display = display;
}

/**
 *
 * @param {string[]} colors an array of all the colors
 * @param {string[]} finalColors an array of wanted colors
 */
export function hideUnwantedColor(colors: string[], finalColors: string[]) {
  colors.forEach((color) => {
    if (finalColors.includes(color)) {
      changePieceDisplay(color, 'block');
    } else {
      changePieceDisplay(color, 'none');
    }
  });
}

/**
 *
 * @param {number} round the current round index needed to find DOM elements
 * @returns {{targets:NodeListOf<HTMLDivElement>,
 * redIndicatorsContainer:HTMLDivElement,
 * whiteIndicatorsContainer:HTMLDivElement}}  An object containing the DOM elements of the game
 */
export function getGameDomElements(round: number) {
  const line = document.getElementById(`line-${round}`);

  if (!line) {
    throw new Error('Line does not exist');
  }

  const targets = line.querySelectorAll(
    `div.targets-container > div.target`,
  ) as NodeListOf<HTMLDivElement>;
  const redIndicatorsContainer = line.querySelector(
    'div.red-indicator-container',
  ) as HTMLDivElement;
  const whiteIndicatorsContainer = line.querySelector(
    'div.white-indicator-container',
  ) as HTMLDivElement;

  return {
    targets,
    redIndicatorsContainer,
    whiteIndicatorsContainer,
  };
}

/**
 * @description Update the value and the color of the tooltip when we hover the verify button
 * @param tooltip the DOM tooltip wich contains a <p> with a <span> inside
 * @param roundLeft the number of rounds left in the game
 */
export function updateTooltip(
  tooltip: HTMLDivElement,
  currentRound: number,
  nbTurns: number,
) {
  const span = tooltip.querySelector('span');

  const roundLeft = nbTurns + 1 - currentRound;

  if (!span) {
    throw new Error('No span found in the tooltip');
  }

  span.innerHTML = `${roundLeft}`;

  if (roundLeft <= Math.floor(nbTurns / 3)) {
    span.style.color = 'red';
    return;
  }

  if (roundLeft <= Math.floor(nbTurns / 3) * 2) {
    span.style.color = 'orange';
    return;
  }

  span.style.color = 'green';
}

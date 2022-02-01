export enum Indicators {
  'white',
  'red',
}

/**
 * @description Add a new line to the game container
 * @param index the index for the line id
 * @param gameContainer the game container element wich contains the lines
 */
export function addNewGameLine(round: number, gameContainer: Element) {
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
 * @description Add indicators to the game
 * @param type the type of indicators
 * @param container the container where to put indicators
 * @param number the number of indicators to add
 */
export function addIndicators(
  type: Indicators,
  container: Element,
  number: number
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

/**
 * @param {string[]} colors the available colors of the game
 * @param {number} nbPossibilities the number of possibilities by line choose by the player
 * @param {boolean} duplicate boolean that indicate if there are duplicate colors in the combination
 * @returns {string[]} a combination of X colors, where X is the number of possibilities by line
 */
export function generateCombination(
  colors: string[],
  nbPossibilities: number,
  duplicate: boolean,
) {
  if (!duplicate && nbPossibilities > colors.length) {
    throw new Error('Impossible to create a combination');
  }

  if (duplicate === false) {
    const shuffleColors = colors.sort(() => 0.5 - Math.random());

    return Array.from(new Set(shuffleColors)).slice(0, nbPossibilities);
  }

  return [...Array(nbPossibilities)].map(
    () => colors[Math.floor(Math.random() * colors.length)],
  );
}

/**
 *
 * @param {NodeListOf<HTMLDivElement>} currentTargets the targets which contains the current combination
 * @param {string[]} colors the available colors of the game
 * @returns {string[]} an array containing the actual combination of colors or an error if the combination is not complete
 */
export function getCurrentCombination(
  currentTargets: NodeListOf<HTMLDivElement>,
  colors: string[],
) {
  const combination: string[] = [];

  // remove all alert class
  for (let i = 0; i < currentTargets.length; i++) {
    const currentTargetPiece = currentTargets[i].querySelector(
      'div.target-piece',
    ) as HTMLDivElement;
    currentTargetPiece.classList.remove('alert');
  }

  for (let i = 0; i < currentTargets.length; i++) {
    const currentTargetPiece = currentTargets[i].querySelector(
      'div.target-piece',
    ) as HTMLDivElement;

    const color = currentTargetPiece.className
      .split(' ')
      .filter((e) => colors.includes(e))[0];

    if (!color) {
      setTimeout(() => {
        currentTargetPiece.classList.add('alert');
      }, 1);
    } else {
      combination.push(color);
    }
  }

  if (combination.length !== currentTargets.length) {
    throw new Error('Combination is not complete');
  }
  return combination;
}

/**
 *
 * @param {string[]} currentCombination the current combination of colors
 * @param {string[]} finalCombination the combination of colors to refer to
 * @returns {{goodPlacement : number, wrongPlacement:number}} an object containing the number of goodEmplament and wrongEmplacement of the current combination
 */
export function getCombinationPlacement(
  currentCombination: string[],
  finalCombination: string[],
): { goodPlacement: number; wrongPlacement: number } {
  const goodPlacement: string[] = [];
  let wrongPlacement: string[] = [];

  currentCombination.forEach((color, index) => {
    if (finalCombination[index] === color) {
      goodPlacement.push(color);

      /**
       * remove the color from the wrong emplacement if we already
       * have all the good placement. This verification allow to delete
       * the duplicates indicators.
       * see https://github.com/RomainGuarinoni/mastermind/issues/8
       */
      if (
        goodPlacement.filter((e) => e === color).length ===
        getColorApparition(finalCombination, color)
      ) {
        wrongPlacement = wrongPlacement.filter((e) => e !== color);
      }

      return;
    }

    if (
      finalCombination.includes(color) &&
      [...goodPlacement, ...wrongPlacement].filter((e) => e === color).length <
        getColorApparition(finalCombination, color)
    ) {
      wrongPlacement.push(color);
      return;
    }
  });

  return {
    goodPlacement: goodPlacement.length,
    wrongPlacement: wrongPlacement.length,
  };
}

/**
 *
 * @param {string[]} combination a combination of colors
 * @param {string} color the available colors of the game
 * @returns {number} the number of time a color appear in a combination
 */
export function getColorApparition(combination: string[], color: string) {
  return combination.filter((e) => e === color).length;
}

/**
 * @description Return an array with only the number of colors wanted
 * @param colors the initial array of colors
 * @param nbColors number of colors wanted by the player
 */
export function getAvailableColors(colors: string[], nbColors: number) {
  const shuffleArray = colors.sort(() => 0.5 - Math.random());
  return shuffleArray.slice(0, nbColors);
}

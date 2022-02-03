/**
 * @param colors the available colors of the game
 * @param nbPossibilities the number of possibilities by line choose by the player
 * @param duplicate boolean that indicate if there are duplicate colors in the combination
 * @returns a combination of X colors, where X is the number of possibilities by line
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
 * @param currentTargets the targets which contains the current combination
 * @param colors the available colors of the game
 * @returns an array containing the actual combination of colors or an error if the combination is not complete
 */
export function getCurrentCombination(
  currentTargets: NodeListOf<Element>,
  colors: string[],
) {
  const combination = Array.from(currentTargets).map((item) => {
    const color = item.className
      .split(' ')
      .filter((e) => colors.includes(e))[0];
    if (!color) {
      throw new Error('Combination is not complete');
    }

    return color;
  });

  return combination;
}

/**
 *
 * @param currentCombination the current combination of colors
 * @param finalCombination the combination of colors to refer to
 * @returns an object containing the number of goodEmplament and wrongEmplacement of the current combination
 */
export function getCombinationPlacement(
  currentCombination: string[],
  finalCombination: string[],
) {
  let goodPlacement: string[] = [];
  let wrongPlacement: string[] = [];

  currentCombination.forEach((color, index) => {
    if (finalCombination[index] === color) {
      goodPlacement.push(color);

      /**
       * remove the color from the wrong emplacement if we already
       * have all the good placement, it delete the duplicates
       * indicator. see https://github.com/RomainGuarinoni/mastermind/issues/8
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
 * @param combination a combination of colors
 * @param color the available colors of the game
 * @returns the number of time a color appear in a combination
 */
export function getColorApparition(combination: string[], color: string) {
  return combination.filter((e) => e === color).length;
}

/**
 * @description Return array with only the number of colors wanted
 * @param colors the initial array of colors
 * @param nbColors number of colors wanted by the player
 */
export function getAvailableColors(colors: string[], nbColors: number) {
  const shuffleArray = colors.sort(() => 0.5 - Math.random());
  return shuffleArray.slice(0, nbColors);
}

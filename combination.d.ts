/**
 * @param {string[]} colors the available colors of the game
 * @param {number} nbPossibilities the number of possibilities by line choose by the player
 * @param {boolean} duplicate boolean that indicate if there are duplicate colors in the combination
 * @returns {string[]} a combination of X colors, where X is the number of possibilities by line
 */
export declare function generateCombination(colors: string[], nbPossibilities: number, duplicate: boolean): string[];
/**
 *
 * @param {NodeListOf<HTMLDivElement>} currentTargets the targets which contains the current combination
 * @param {string[]} colors the available colors of the game
 * @returns {string[]} an array containing the actual combination of colors or an error if the combination is not complete
 */
export declare function getCurrentCombination(currentTargets: NodeListOf<HTMLDivElement>, colors: string[]): string[];
/**
 *
 * @param {string[]} currentCombination the current combination of colors
 * @param {string[]} finalCombination the combination of colors to refer to
 * @returns {{goodPlacement : number, wrongPlacement:number}} an object containing the number of goodEmplament and wrongEmplacement of the current combination
 */
export declare function getCombinationPlacement(currentCombination: string[], finalCombination: string[]): {
    goodPlacement: number;
    wrongPlacement: number;
};
/**
 *
 * @param {string[]} combination a combination of colors
 * @param {string} color the available colors of the game
 * @returns {number} the number of time a color appear in a combination
 */
export declare function getColorApparition(combination: string[], color: string): number;
/**
 * @description Return an array with only the number of colors wanted
 * @param colors the initial array of colors
 * @param nbColors number of colors wanted by the player
 */
export declare function getAvailableColors(colors: string[], nbColors: number): string[];

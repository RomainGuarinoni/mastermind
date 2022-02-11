/**
 * @param colors the available colors of the game
 * @param nbPossibilities the number of possibilities by line choose by the player
 * @param duplicate boolean that indicate if there are duplicate colors in the combination
 * @returns a combination of X colors, where X is the number of possibilities by line
 */
export declare function generateCombination(colors: string[], nbPossibilities: number, duplicate: boolean): string[];
/**
 *
 * @param currentTargets the targets which contains the current combination
 * @param colors the available colors of the game
 * @returns an array containing the actual combination of colors or an error if the combination is not complete
 */
export declare function getCurrentCombination(currentTargets: NodeListOf<Element>, colors: string[]): string[];
/**
 *
 * @param currentCombination the current combination of colors
 * @param finalCombination the combination of colors to refer to
 * @returns an object containing the number of goodEmplament and wrongEmplacement of the current combination
 */
export declare function getCombinationPlacement(currentCombination: string[], finalCombination: string[]): {
    goodPlacement: number;
    wrongPlacement: number;
};
/**
 *
 * @param combination a combination of colors
 * @param color the available colors of the game
 * @returns the number of time a color appear in a combination
 */
export declare function getColorApparition(combination: string[], color: string): number;
/**
 * @description Return an array with only the number of colors wanted
 * @param colors the initial array of colors
 * @param nbColors number of colors wanted by the player
 */
export declare function getAvailableColors(colors: string[], nbColors: number): string[];

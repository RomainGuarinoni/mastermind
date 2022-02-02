/**
 *
 * @param colors the available colors of the game
 * @returns a combination of 4 colors
 */
export declare function generateCombination(colors: string[]): string[];
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

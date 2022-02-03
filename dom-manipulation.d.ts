export declare enum Indicators {
    'white' = 0,
    'red' = 1
}
declare type Display = 'block' | 'flex' | 'none' | 'inline';
/**
 * @description Add a new line to the game container
 * @param index the index for the line id
 * @param gameContainer the game container element wich contains the lines
 * @param nbPossibilities the number of possibilities by line
 */
export declare function addNewGameLine(round: number, gameContainer: Element, nbPossibilities: number): void;
/**
 * @description Add indicators to the game
 * @param type the type of indicators
 * @param container the container where to put indicators
 * @param number the number of indicators to add
 */
export declare function addIndicators(type: Indicators, container: Element, number: number): void;
/**
 * @description change the display of a specify piece
 * @param color the color of the piece
 * @param display the style of display to apply
 */
export declare function changePieceDisplay(color: string, display: Display): void;
export {};

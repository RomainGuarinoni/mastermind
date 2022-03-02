import { Run } from './record';
import GameState from './game-state';
export declare enum Indicators {
    'white' = 0,
    'red' = 1
}
declare type Display = 'block' | 'flex' | 'none' | 'inline';
/**
 * @description Add a new line to the game container
 * @param {number} index the index for the line id
 * @param {HTMLDivElement} gameContainer the game container element wich contains the lines
 * @param {number} nbPossibilities the number of possibilities by line
 */
export declare function addNewGameLine(round: number, gameContainer: HTMLDivElement, nbPossibilities: number): void;
/**
 * @description Add indicators to the game
 * @param {Indicators} type the type of indicators
 * @param {HTMLDivElement} container the container where to put indicators
 * @param {number} number the number of indicators to add
 */
export declare function addIndicators(type: Indicators, container: HTMLDivElement, number: number): void;
/**
 * @description change the display of a specify piece
 * @param {string} color the color of the piece
 * @param {Display} display the style of display to apply
 */
export declare function changePieceDisplay(color: string, display: Display): void;
/**
 * @description Pick the colors available and make disappear the others
 * @param {string[]} colors an array of all the colors
 * @param {string[]} finalColors an array of wanted colors
 */
export declare function hideUnwantedColor(colors: string[], finalColors: string[]): void;
/**
 *
 * @param {number} round the current round index needed to find DOM elements
 * @returns {{targets:NodeListOf<HTMLDivElement>,
 * redIndicatorsContainer:HTMLDivElement,
 * whiteIndicatorsContainer:HTMLDivElement}}  An object containing the DOM elements of the game
 */
export declare function getGameDomElements(round: number): {
    targets: NodeListOf<HTMLDivElement>;
    redIndicatorsContainer: HTMLDivElement;
    whiteIndicatorsContainer: HTMLDivElement;
};
/**
 * @description Update the value and the color of the tooltip when we hover the verify button
 * @param {HTMLDivElement} tooltip the DOM tooltip wich contains a <p> with a <span> inside
 * @param {number} currentRound The current round of the game
 * @param {number} nbTurns The total of turn possible in the current run
 */
export declare function updateTooltip(tooltip: HTMLDivElement, currentRound: number, nbTurns: number): void;
/**
 *
 * @returns {number} the index of the last game line
 */
export declare function getCurrentNumbersOfLine(): number;
/**
 * @description Change the content of the verify button
 * @param {HTMLButtonElement} verifyButton
 * @param {'Verify' | 'result'} content
 */
export declare function changeVerifyContent(verifyButton: HTMLButtonElement, gameState: GameState): void;
/**
 * @description Add to the p pass in param the description of the previousRecord and the comparaison to the currentRun.
 * The useCase of this function is to be called when the user loose a game or win a game without beating his record
 * and the win / loose popUp has to show what is the current record in this category
 * @param p The p element to add the record description
 * @param record The record of the category
 * @param run The current run in the same category
 * @param endGameStatus The game status, if set to win, we display the diff of time between run and record, otherwise not
 */
export declare function displayPreviousRecord(p: HTMLParagraphElement, record: Run | null, run: Run, gameState: GameState): void;
/**
 * @description Add to the p pass in param the description of the new Record that the user just made in the current Run.
 * If there is a previous record, it will show the differencee.
 * @param p The p element to add the record description
 * @param newRecord The new record of the category, the current run
 * @param previousRecord The previous recorrd of this category
 *
 */
export declare function displayNewRecord(p: HTMLParagraphElement, newRecord: Run, previousRecord: Run | null): void;
export {};

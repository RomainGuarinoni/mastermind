export declare enum Indicators {
    'white' = 0,
    'red' = 1
}
export declare enum GameStatus {
    running = "V\u00E9rifier",
    finish = "Voir le r\u00E9sultat"
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
export declare function changeGameStatus(verifyButton: HTMLButtonElement, status: GameStatus): void;
/**
 * @description Return true if the game is finish
 * @param {HTMLButtonElement} verifyButton the verify button of the game
 * @returns {boolean} return a boolean that indict weither the game is finish or not
 */
export declare function isGameFinish(verifyButton: HTMLButtonElement): boolean;
export {};

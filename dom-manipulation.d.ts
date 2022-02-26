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
 *
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
 * @param tooltip the DOM tooltip wich contains a <p> with a <span> inside
 * @param roundLeft the number of rounds left in the game
 */
export declare function updateTooltip(tooltip: HTMLDivElement, currentRound: number, nbTurns: number): void;
export {};

/**
 * @description Add the drag event listeners of the targets
 * @param {NodeListOf<HTMLDivElement>} targets the targets to add eventListeners
 * @param {string[]} colors the colors available in the game
 */
export declare function addTargetListener(targets: NodeListOf<HTMLDivElement>, colors: string[]): void;
/**
 * @description Remove the drag event listener of the targets
 * @param {NodeListOf<HTMLDivElement>} target The targets to remove eventListeners
 */
export declare function removeTargetListener(targets: NodeListOf<HTMLDivElement>): void;
/**
 * @description Add dragStart events on game pieces
 * @param {Array<HTMLDivElement>} pieces All the pieces of the game
 */
export declare function setDragListenerOnPieces(pieces: Array<HTMLDivElement>): void;
/**
 * @description Add a listener to reduce the popUp when it's reduce button is clicked
 * @param {HTMLCollectionOf<HTMLButtonElement>} buttons The list of all the reducePopUp button
 */
export declare function addReducePopUpListener(buttons: HTMLCollectionOf<HTMLButtonElement>): void;

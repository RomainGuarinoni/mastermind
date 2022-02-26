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

/**
 * @description Add the drag event listeners of the targets
 * @param targets the targets to add eventListeners
 * @param colors the colors available in the game
 */
export declare function addTargetListener(targets: NodeListOf<Element>, colors: string[]): void;
/**
 * @description Remove the drag event listener of the targets
 * @param target The targets to remove eventListeners
 */
export declare function removeTargetListener(targets: NodeListOf<Element>): void;
/**
 * @description Add dragStart events on game pieces
 * @param pieces All the pieces of the game
 */
export declare function setDragListenerOnPieces(pieces: Array<HTMLDivElement>): void;

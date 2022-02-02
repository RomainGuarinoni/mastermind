/**
 * @description Set the piece data transfer to its color
 * @param e the drag event of the listener
 */
export declare function setPieceDragData(e: DragEvent): void;
/**
 * @description Add the drag event listeners of the targets
 * @param targets the targets to add eventListeners
 * @param colors the colors available in the game
 */
export declare function addTargetListener(targets: NodeListOf<Element>, colors: string[]): void;
/**
 * @description Remove the drag event listener of the targets
 * @param target
 */
export declare function removeTargetListener(targets: NodeListOf<Element>): void;

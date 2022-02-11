/**
 * @description Set the piece data transfer to its color
 * @param e the drag event of the listener
 */
function setPieceDragData(e: DragEvent) {
  const color = (e.target as Element).id.split('-')[0];
  e.dataTransfer?.setData('text/plain', color);
  (e.dataTransfer as DataTransfer).effectAllowed = 'move';
}

/**
 * @description listener function on drag over event
 * @param e the event of the listener
 */
function setTargetDropEffect(e: Event) {
  e.preventDefault();
  ((e as DragEvent).dataTransfer as DataTransfer).dropEffect = 'move';
}

/**
 * @description get the color of the drag item and change the target background to this color
 * @param e the drag event of the listener
 * @param colors the colors available in the game
 */
function setTargetBackgroundColor(e: DragEvent, colors: string[]) {
  e.preventDefault();
  const color = (e.dataTransfer as DataTransfer).getData('text/plain');
  (e.target as Element).classList.remove(...colors);
  (e.target as Element).classList.add(color, 'current-target');
}

/**
 * @description remove the color of a target if the target is clicked
 * @param e
 */
function removeColorFromTarget(e: Event) {
  (e.target as Element).classList.remove(
    ...(e.target as Element).classList.value.split(' '),
  );
  (e.target as Element).classList.add('target');
}

/**
 * @description Add the drag event listeners of the targets
 * @param targets the targets to add eventListeners
 * @param colors the colors available in the game
 */
export function addTargetListener(
  targets: NodeListOf<Element>,
  colors: string[],
) {
  for (let i = 0; i < targets.length; i++) {
    targets[i].addEventListener('dragover', setTargetDropEffect, true);

    targets[i].addEventListener('drop', (e) =>
      setTargetBackgroundColor(e as DragEvent, colors),
    ),
      true;

    targets[i].addEventListener('mousedown', removeColorFromTarget);
  }
}

/**
 * @description Remove the drag event listener of the targets
 * @param target The targets to remove eventListeners
 */
export function removeTargetListener(targets: NodeListOf<Element>) {
  for (let i = 0; i < targets.length; i++) {
    targets[i].removeEventListener('dragover', setTargetDropEffect, true);
    targets[i].removeEventListener('mousedown', removeColorFromTarget);
    targets[i].classList.remove('current-target');
  }
}

/**
 * @description Add dragStart events on game pieces
 * @param pieces All the pieces of the game
 */
export function setDragListenerOnPieces(pieces: Array<HTMLDivElement>) {
  window.addEventListener('DOMContentLoaded', () => {
    pieces.forEach((piece) =>
      piece.addEventListener('dragstart', setPieceDragData),
    );
  });
}

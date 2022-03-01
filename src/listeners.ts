import {
  getCurrentNumbersOfLine,
  getGameDomElements,
} from './dom-manipulation';

/**
 * @description Set the piece data transfer to its color
 * @param {DragEvent} e the drag event of the listener
 */
function setPieceDragData(e: DragEvent) {
  const color = (e.target as Element).id.split('-')[0];
  e.dataTransfer?.setData('text/plain', color);
  (e.dataTransfer as DataTransfer).effectAllowed = 'move';
}

/**
 * @description listener function on drag over event
 * @param {Event} e the event of the listener
 */
function setTargetDropEffect(e: Event) {
  e.preventDefault();
  ((e as DragEvent).dataTransfer as DataTransfer).dropEffect = 'move';
}

/**
 * @description get the color of the drag item and change the target piece
 *  background to this color
 * @param {DragEvent} e the drag event of the listener
 * @param {string[]} colors the colors available in the game
 */
function setTargetBackgroundColor(e: DragEvent, colors: string[]) {
  e.preventDefault();
  const color = (e.dataTransfer as DataTransfer).getData('text/plain');
  const targetPiece = (e.currentTarget as Element).querySelector(
    'div.target-piece',
  ) as HTMLDivElement;

  targetPiece.classList.remove(...colors);
  targetPiece.classList.add(color, 'current-target-piece');
}

/**
 * @description remove the color of a target piece if the target is clicked
 * @param {Event} e
 */
function removeColorFromTarget(e: Event) {
  const targetPiece = (e.currentTarget as Element).querySelector(
    'div.target-piece',
  ) as HTMLDivElement;

  targetPiece.classList.remove(...targetPiece.classList.value.split(' '));
  targetPiece.classList.add('target-piece');
}

/**
 * @description Add the drag event listeners of the targets
 * @param {NodeListOf<HTMLDivElement>} targets the targets to add eventListeners
 * @param {string[]} colors the colors available in the game
 */
export function addTargetListener(
  targets: NodeListOf<HTMLDivElement>,
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
 * @param {NodeListOf<HTMLDivElement>} target The targets to remove eventListeners
 */
export function removeTargetListener(targets: NodeListOf<HTMLDivElement>) {
  for (let i = 0; i < targets.length; i++) {
    targets[i].removeEventListener('dragover', setTargetDropEffect, true);
    targets[i].removeEventListener('mousedown', removeColorFromTarget);
    targets[i].classList.remove('current-target');
  }
}

/**
 * @description Add dragStart events on game pieces
 * @param {Array<HTMLDivElement>} pieces All the pieces of the game
 */
export function setDragListenerOnPieces(pieces: Array<HTMLDivElement>) {
  window.addEventListener('DOMContentLoaded', () => {
    pieces.forEach((piece) =>
      piece.addEventListener('dragstart', setPieceDragData),
    );
  });
}

/**
 *
 * @param {MouseEvent} e  The event thats created when tu user click on a reducePopup button
 */
function reduceButtonPopUp(e: MouseEvent) {
  // Remove the target listeners of the last line
  const { targets } = getGameDomElements(getCurrentNumbersOfLine());
  removeTargetListener(targets);

  const popUp = (e.target as HTMLButtonElement).closest(
    '.popup',
  ) as HTMLDivElement;
  popUp.style.display = 'none';
}

/**
 * @description Add a listener to reduce the popUp when it's reduce button is clicked
 * @param {HTMLCollectionOf<HTMLButtonElement>} buttons The list of all the reducePopUp button
 */
export function addReducePopUpListener(
  buttons: HTMLCollectionOf<HTMLButtonElement>,
) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', reduceButtonPopUp);
  }
}

export function addFormEvent(form: HTMLFormElement, action: void) {
  form.addEventListener('submit', (e) => {
    e.preventDefault;
    action;
  });
}

type Category = {
  duplicate: boolean;
  nbTurns: number;
  nbColors: number;
  nbPossibilities: number;
};

export type Run = {
  category: Category;
  time: number; // time in second to complete the game
};

/**
 *
 * @param {Category} category the category of a run
 * @returns the string key representation of the category :
 *  "duplicate-nbTurns-nbColros-nbPossibilities" with the respective
 *  category value
 */
export function generateKey({
  nbPossibilities,
  nbColors,
  nbTurns,
  duplicate,
}: Category): string {
  return `${duplicate}-${nbTurns}-${nbColors}-${nbPossibilities}`;
}

/**
 * @description Save the record in the local storage with this configuration :
 *  - key : duplicate-nbTurns-nbColors-nbPossibilities
 *  - value : the number in seconds
 * @param {Run} record the new record
 */
export function setRecord({ category, time }: Run) {
  localStorage.setItem(generateKey(category), time.toString());
}

/**
 *
 * @param {Category} category the category of the records
 * @returns {Run | null} Return the record of the category or null if no record has been set
 */
export function getRecord(category: Category): Run | null {
  const key = generateKey(category);

  const time = localStorage.getItem(key);

  if (!time) {
    return null;
  }

  return {
    time: parseInt(time),
    category,
  };
}

/**
 *
 * @param {Run} run The user run
 * @returns return a boolean that indicates whether the run is a new record or not
 */
export function isNewRecord(run: Run): boolean {
  const previousRecord = getRecord(run.category);

  if (!previousRecord) {
    return true;
  }

  if (run.time < previousRecord.time) {
    return true;
  }

  return false;
}

/**
 * @description Take the user run and determine if it is a new Record for the category. If yes,
 *              the record is saved
 * @param {Run} run the user run
 */
export default function handleRun(run: Run) {
  if (!isNewRecord(run)) {
    return;
  }

  setRecord(run);
}

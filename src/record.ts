type Category = {
  duplicate: boolean;
  nbTurns: number;
  nbColors: number;
  nbPossibilities: number;
};

export type Run = {
  category: Category;
  date: Date;
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
export function setRecord({ category, time, date }: Run) {
  localStorage.setItem(generateKey(category), JSON.stringify({ time, date }));
}

/**
 *
 * @param {Category} category the category of the records
 * @returns {number | null} Return the record of the category or null if no record has been set
 */
export function getRecord(category: Category): Run | null {
  const key = generateKey(category);

  const recordJson = localStorage.getItem(key);

  if (!recordJson) {
    return null;
  }

  const record = JSON.parse(recordJson);

  return { time: record.time, date: new Date(record.date), category };
}

/**
 *
 * @param {Run} run The user run
 * @returns Compare the run pass in param to the actual record of the categort and return true
 * if the run pass in param is better. If no record is set, it return true too.
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
 *
 * @param {Run} run the user run
 * @returns {{isNew : boolean, record : Run,previousRecord?: Run | null}} return an object thats says if the run is a new record or not and return the actual record for the category
 */
export default function handleRun(run: Run): {
  isNew: boolean;
  record: Run;
  previousRecord?: Run | null;
} {
  const response: { isNew: boolean; record: Run; previousRecord?: Run | null } =
    {
      isNew: true,
      record: run,
    };

  if (isNewRecord(run)) {
    response.previousRecord = getRecord(run.category);
    setRecord(run);
  } else {
    response.isNew = false;
    response.record = getRecord(run.category) as Run;
  }

  return response;
}

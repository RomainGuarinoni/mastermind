export declare type Category = {
    duplicate: boolean;
    nbTurns: number;
    nbColors: number;
    nbPossibilities: number;
};
export declare type Run = {
    category: Category;
    date: Date;
    time: number;
};
/**
 *
 * @param {Category} category the category of a run
 * @returns the string key representation of the category :
 *  "duplicate-nbTurns-nbColros-nbPossibilities" with the respective
 *  category value
 */
export declare function generateKey({ nbPossibilities, nbColors, nbTurns, duplicate, }: Category): string;
/**
 * @description Save the record in the local storage with this configuration :
 *  - key : duplicate-nbTurns-nbColors-nbPossibilities
 *  - value : the number in seconds
 * @param {Run} record the new record
 */
export declare function setRecord({ category, time, date }: Run): void;
/**
 *
 * @param {Category} category the category of the records
 * @returns {number | null} Return the record of the category or null if no record has been set
 */
export declare function getRecord(category: Category): Run | null;
/**
 *
 * @param {Run} run The user run
 * @returns Compare the run pass in param to the actual record of the categort and return true
 * if the run pass in param is better. If no record is set, it return true too.
 */
export declare function isNewRecord(run: Run): boolean;
/**
 *
 * @param {Run} run the user run
 * @returns {{isNew : boolean, record : Run}} return an object thats says if the run is a new record or not and return the actual record for the category
 */
export default function handleRun(run: Run): {
    isNew: boolean;
    record: Run;
    previousRecord: Run | null;
};

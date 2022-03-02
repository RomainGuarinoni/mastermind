export declare type Time = {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
};
/**
 *
 * @param {Date} runStart the date start of the run
 * @param {Date} runEnd the date end of the run
 * @returns Return the number of milliseconds the run took
 */
export declare function getDateDifference(runStart: Date, runEnd: Date): number;
/**
 *
 * @param {number} duration A duration in ms
 * @returns an object containing the number of ms,s,m,h
 */
export declare function convertMsToTime(duration: number): Time;
export declare function convertTimeToMs(time: Partial<Time>): number;
export declare function convertTimeToString(time: Time): string;

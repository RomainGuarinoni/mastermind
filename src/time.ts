export type Time = {
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
export function getDateDifference(runStart: Date, runEnd: Date): number {
  if (runEnd < runStart) {
    throw new Error('runStart should be before runEnd');
  }

  return runEnd.getTime() - runStart.getTime();
}

/**
 *
 * @param {number} duration A duration in ms
 * @returns an object containing the number of ms,s,m,h
 */
export function convertMsToTime(duration: number): Time {
  const milliseconds = Math.floor(duration % 1000),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return { milliseconds, seconds, minutes, hours };
}

export function convertTimeToMs(time: Partial<Time>) {
  let result = 0;

  if (time.hours) result += time.hours * 60 * 60 * 1000;
  if (time.minutes) result += time.minutes * 60 * 1000;
  if (time.seconds) result += time.seconds * 1000;
  if (time.milliseconds) result += time.milliseconds;
  return result;
}

export function convertTimeToString(time: Time) {
  let result = '';
  if (time.hours) {
    result += `${time.hours}h `;
  }
  if (time.minutes) {
    result += `${time.minutes}m `;
  }
  if (time.seconds) {
    result += `${time.seconds}s `;
  }
  if (time.milliseconds) {
    result += `${time.milliseconds}ms `;
  } else {
    if (result == '') {
      result += '0ms ';
    }
  }
  return result;
}

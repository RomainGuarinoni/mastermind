import {
  getDateDifference,
  convertMsToTime,
  convertTimeToString,
} from '../src/time';
import type { Time } from '../src/time';

describe('Get run duration', () => {
  let runStart: Date;
  let runEnd: Date;
  beforeEach(() => {
    runStart = new Date('December 19, 1995 03:24:00');
    runEnd = new Date('December 19, 1995 03:24:00');
  });

  it('Return 50000', () => {
    runEnd.setSeconds(runEnd.getSeconds() + 60);
    expect(getDateDifference(runStart, runEnd)).toStrictEqual(60 * 1000);
  });

  it('Return 200000', () => {
    runEnd.setSeconds(runEnd.getSeconds() + 200);
    expect(getDateDifference(runStart, runEnd)).toStrictEqual(200 * 1000);
  });

  it('throws an error', () => {
    runEnd.setSeconds(runEnd.getSeconds() + 200);

    expect(() => {
      getDateDifference(runEnd, runStart);
    }).toThrow(Error);

    expect(() => {
      getDateDifference(runEnd, runStart);
    }).toThrow('runStart should be before runEnd');
  });
});

describe('Convert ms to time', () => {
  it('return 59 s', () => {
    const duration = 59 * 1000;
    expect(convertMsToTime(duration)).toStrictEqual({
      milliseconds: 0,
      seconds: 59,
      minutes: 0,
      hours: 0,
    });
  });

  it('return 1h 29m 40s 150ms', () => {
    const duration = 60 * 60 * 1000 + 29 * 60 * 1000 + 40 * 1000 + 150;
    expect(convertMsToTime(duration)).toStrictEqual({
      milliseconds: 150,
      seconds: 40,
      minutes: 29,
      hours: 1,
    });
  });

  describe('Convert time to string', () => {
    it('convert a full time to string', () => {
      const time: Time = {
        hours: 2,
        minutes: 54,
        seconds: 23,
        milliseconds: 500,
      };

      expect(convertTimeToString(time)).toStrictEqual('2h 54m 23s 500ms');
    });

    it('convert a partial time to string', () => {
      const time: Time = {
        hours: 0,
        minutes: 52,
        seconds: 0,
        milliseconds: 50,
      };

      expect(convertTimeToString(time)).toStrictEqual('52m 50ms');
    });

    it('convert a null time to string', () => {
      const time: Time = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };

      expect(convertTimeToString(time)).toStrictEqual('0ms');
    });
  });
});

import handleRun, {
  generateKey,
  getRecord,
  getDateDifference,
  isNewRecord,
  setRecord,
  convertMsToTime,
} from '../src/record';
import localStorageMock from './mock/LocalStorageMock';
import type { Run } from '../src/record';

describe('Record', () => {
  beforeAll(() => {
    global.localStorage = new localStorageMock() as unknown as Storage;
  });

  const run: Run = {
    category: {
      duplicate: false,
      nbTurns: 10,
      nbColors: 5,
      nbPossibilities: 6,
    },
    date: new Date('December 17, 1995 03:24:00'),
    time: 254120,
  };

  describe('Generate key', () => {
    it('generate a key', () => {
      expect(generateKey(run.category)).toStrictEqual('false-10-5-6');
    });
  });

  describe('Set record', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Set a record in the localStorage', () => {
      setRecord(run);

      const savedRecordJson = localStorage.getItem(generateKey(run.category));

      const savedRecord = JSON.parse(savedRecordJson);

      expect({
        time: savedRecord.time,
        date: new Date(savedRecord.date),
      }).toStrictEqual({
        date: run.date,
        time: run.time,
      });
    });

    it('Re write an old record', () => {
      localStorage.setItem(
        generateKey(run.category),
        JSON.stringify({
          time: run.time,
          date: run.date,
        }),
      );

      const newRecord = {
        ...run,
        date: new Date('December 19, 1995 03:24:00'),
        time: 800,
      };

      setRecord(newRecord);

      const savedRecordJson = localStorage.getItem(generateKey(run.category));

      const savedRecord = JSON.parse(savedRecordJson);

      expect({
        time: savedRecord.time,
        date: new Date(savedRecord.date),
      }).toStrictEqual({
        date: newRecord.date,
        time: newRecord.time,
      });
    });
  });

  describe('Get record', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Return null', () => {
      expect(getRecord(run.category)).toStrictEqual(null);
    });

    it('Return the record', () => {
      localStorage.setItem(
        generateKey(run.category),
        JSON.stringify({
          time: run.time,
          date: run.date,
        }),
      );

      expect(getRecord(run.category)).toStrictEqual(run);
    });
  });

  describe('Is new record', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('No record has been set yet', () => {
      expect(isNewRecord(run)).toStrictEqual(true);
    });

    it('The run is better than the record', () => {
      localStorage.setItem(
        generateKey(run.category),
        JSON.stringify({
          time: run.time,
          date: run.date,
        }),
      );

      expect(isNewRecord({ ...run, time: run.time - 50 })).toStrictEqual(true);
    });

    it('The run is worst than the record', () => {
      localStorage.setItem(
        generateKey(run.category),
        JSON.stringify({
          time: run.time,
          date: run.date,
        }),
      );

      expect(isNewRecord({ ...run, time: run.time + 50 })).toStrictEqual(false);
    });
  });

  describe('Handle run', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('It is a new record', () => {
      localStorage.setItem(
        generateKey(run.category),
        JSON.stringify({
          time: run.time,
          date: run.date,
        }),
      );

      expect(handleRun({ ...run, time: run.time - 50 })).toStrictEqual({
        isNew: true,
        record: { ...run, time: run.time - 50 },
      });
    });

    it('Is not a new record', () => {
      localStorage.setItem(
        generateKey(run.category),
        JSON.stringify({
          time: run.time,
          date: run.date,
        }),
      );

      handleRun({ ...run, time: run.time + 50 });

      expect(handleRun({ ...run, time: run.time + 50 })).toStrictEqual({
        isNew: false,
        record: run,
      });
    });
  });

  describe('Get run duration', () => {
    let runStart: Date;
    let runEnd: Date;
    beforeEach(() => {
      runStart = new Date('December 19, 1995 03:24:00');
      runEnd = new Date('December 19, 1995 03:24:00');
    });

    it('Return 50', () => {
      runEnd.setSeconds(runEnd.getSeconds() + 60);
      expect(getDateDifference(runStart, runEnd)).toStrictEqual(60);
    });

    it('Return 200', () => {
      runEnd.setSeconds(runEnd.getSeconds() + 200);
      expect(getDateDifference(runStart, runEnd)).toStrictEqual(200);
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
  });
});

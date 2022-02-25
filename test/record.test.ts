import handleRun, {
  generateKey,
  getRecord,
  isNewRecord,
  setRecord,
} from '../src/record';
import type { Run } from '../src/record';
import localStorageMock from './mock/LocalStorageMock';
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

      const savedRecord = localStorage.getItem(generateKey(run.category));

      expect(JSON.parse(savedRecord)).toStrictEqual(254120);
    });

    it('Re write an old record', () => {
      localStorage.setItem(generateKey(run.category), run.time.toString());

      const newRecord = {
        ...run,
        time: 800,
      };

      setRecord(newRecord);

      const savedRun = localStorage.getItem(generateKey(run.category));

      expect(JSON.parse(savedRun)).toStrictEqual(800);
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
      localStorage.setItem(generateKey(run.category), run.time.toString());

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
      localStorage.setItem(generateKey(run.category), run.time.toString());

      expect(isNewRecord({ ...run, time: run.time - 50 })).toStrictEqual(true);
    });

    it('The run is worst than the record', () => {
      localStorage.setItem(generateKey(run.category), run.time.toString());

      expect(isNewRecord({ ...run, time: run.time + 50 })).toStrictEqual(false);
    });
  });

  describe('Handle run', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('It is a new record', () => {
      localStorage.setItem(generateKey(run.category), run.time.toString());

      handleRun({ ...run, time: run.time - 50 });

      expect(
        parseInt(localStorage.getItem(generateKey(run.category))),
      ).toStrictEqual(run.time - 50);
    });

    it('Is not a new record', () => {
      localStorage.setItem(generateKey(run.category), run.time.toString());

      handleRun({ ...run, time: run.time + 50 });

      expect(
        parseInt(localStorage.getItem(generateKey(run.category))),
      ).toStrictEqual(run.time);
    });
  });
});

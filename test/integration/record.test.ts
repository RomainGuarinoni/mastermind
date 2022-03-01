/**
 * @jest-environment jsdom
 */

import LocalStorageMock from '../mock/LocalStorageMock';
import { Category, getRecord, Run } from '../../src/record';
import { convertTimeToMs } from '../../src/time';
import handleRun from '../../src/record';
import {
  displayNewRecord,
  displayPreviousRecord,
  EndGameStatus,
} from '../../src/dom-manipulation';

describe('Record integration test', () => {
  const date = new Date('2022-03-01T16:39:06.736Z');

  let p: HTMLParagraphElement;
  const category: Category = {
    duplicate: true,
    nbColors: 8,
    nbTurns: 142,
    nbPossibilities: 4,
  };
  const currentRun: Run = {
    date: date,
    category: category,
    time: 0,
  };
  let record: Run | null;
  let previousRecord: Run | null = null;

  beforeAll(() => {
    // Set up HTML
    document.body.innerHTML = '<p id="record"></p>';
    p = document.getElementById('record') as HTMLParagraphElement;

    // Set up localStorage
    global.localStorage = new LocalStorageMock() as unknown as Storage;
  });

  it("Set a run but don't win", () => {
    currentRun.time = convertTimeToMs({ minutes: 5 });

    record = getRecord(category);

    displayPreviousRecord(p, record, currentRun, EndGameStatus.lose);
    expect(p.innerHTML).toStrictEqual(
      "Vous n'avez pas encore de record dans cette catégorie.",
    );
  });

  it('Set a new record in the category because no record has been set yet', () => {
    currentRun.time = convertTimeToMs({ minutes: 2 });

    const {
      isNew,
      record: newRecord,
      previousRecord: newPreviousRecord,
    } = handleRun(currentRun);

    record = { ...newRecord };
    previousRecord = newPreviousRecord;

    expect(isNew).toStrictEqual(true);
    expect(record).toStrictEqual(currentRun);
    expect(previousRecord).toStrictEqual(null);
  });

  it('Display the new record in the p', () => {
    displayNewRecord(p, record, previousRecord);

    expect(p.innerHTML).toStrictEqual(
      'Bravo, vous venez de créer un nouveau record pour cette catégorie !<br>',
    );
  });

  it("Make a new run and win but don't beat the record of the category", () => {
    currentRun.time = convertTimeToMs({ minutes: 2, seconds: 10 });

    const {
      isNew,
      record: newRecord,
      previousRecord: newPreviousRecord,
    } = handleRun(currentRun);

    expect(isNew).toStrictEqual(false);
    expect(newRecord).toStrictEqual(record);
    expect(newPreviousRecord).toStrictEqual(null);
  });

  it('Display the previous record and the difference with the current run', () => {
    displayPreviousRecord(p, record, currentRun, EndGameStatus.win);
    expect(p.innerHTML).toStrictEqual(
      'Votre meilleur score dans cette catégorie est de :<br><strong>2m </strong> effectué le <strong>01/03/2022</strong> à <strong>17:39:06</strong><br>Vous avez mis <strong style="color:var(--red)">10s </strong> de plus',
    );
  });

  it('Make a new run but lose', () => {
    record = getRecord(category);

    displayPreviousRecord(p, record, currentRun, EndGameStatus.lose);

    expect(p.innerHTML).toStrictEqual(
      'Votre meilleur score dans cette catégorie est de :<br><strong>2m </strong> effectué le <strong>01/03/2022</strong> à <strong>17:39:06</strong><br>',
    );
  });

  it('Make a run and beat the previous record', () => {
    currentRun.time = convertTimeToMs({ minutes: 1, seconds: 50 });

    const {
      isNew,
      record: newRecord,
      previousRecord: newPreviousRecord,
    } = handleRun(currentRun);

    expect(isNew).toStrictEqual(true);
    expect(newRecord).toStrictEqual(currentRun);
    expect(newPreviousRecord).toStrictEqual(record);

    record = { ...newRecord };
    previousRecord = { ...newPreviousRecord };
  });

  it('Display the new Record', () => {
    displayNewRecord(p, record, previousRecord);

    expect(p.innerHTML).toStrictEqual(
      'Bravo, vous venez de créer un nouveau record pour cette catégorie !<br>Vous avez mis <strong style="color:var(--green)">10s </strong> de moins que votre précédent record',
    );
  });

  it('Change category and set a new record', () => {
    category.duplicate = false;
    currentRun.category = category;
    currentRun.time = convertTimeToMs({ minutes: 5 });

    const {
      isNew,
      record: newRecord,
      previousRecord: newPreviousRecord,
    } = handleRun(currentRun);

    expect(isNew).toStrictEqual(true);
    expect(newRecord).toStrictEqual(currentRun);
    expect(newPreviousRecord).toStrictEqual(null);

    record = { ...newRecord };
    previousRecord = null;
  });

  it('Display the new record', () => {
    displayNewRecord(p, record, previousRecord);
    expect(p.innerHTML).toStrictEqual(
      'Bravo, vous venez de créer un nouveau record pour cette catégorie !<br>',
    );
  });
});

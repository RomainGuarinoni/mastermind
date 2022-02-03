/**
 * @jest-environment jsdom
 */

import {
  addNewGameLine,
  addIndicators,
  Indicators,
} from '../src/dom-manipulation';

describe('Dom manipulation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Add new game line', () => {
    it('Add new game line with 1 target', () => {
      document.body.innerHTML = `
        <div id="game-container"></div>
        `;

      const gameContainer = document.getElementById('game-container');

      addNewGameLine(5, gameContainer, 1);

      expect(document.getElementById('line-5')).toBeInstanceOf(HTMLDivElement);
      expect(
        gameContainer.getElementsByClassName('red-indicator-container').length,
      ).toStrictEqual(1);
      expect(
        gameContainer.getElementsByClassName('white-indicator-container')
          .length,
      ).toStrictEqual(1);

      expect(
        gameContainer.getElementsByClassName('targets-container').length,
      ).toStrictEqual(1);

      expect(
        gameContainer.querySelectorAll(`div.targets-container > div.target`)
          .length,
      ).toStrictEqual(1);
    });

    it('Add new game line with 10 target', () => {
      document.body.innerHTML = `
        <div id="game-container"></div>
        `;

      const gameContainer = document.getElementById('game-container');

      addNewGameLine(5, gameContainer, 10);

      expect(document.getElementById('line-5')).toBeInstanceOf(HTMLDivElement);
      expect(
        gameContainer.getElementsByClassName('red-indicator-container').length,
      ).toStrictEqual(1);
      expect(
        gameContainer.getElementsByClassName('white-indicator-container')
          .length,
      ).toStrictEqual(1);

      expect(
        gameContainer.getElementsByClassName('targets-container').length,
      ).toStrictEqual(1);

      expect(
        gameContainer.querySelectorAll(`div.targets-container > div.target`)
          .length,
      ).toStrictEqual(10);
    });
  });

  describe('Add indicators', () => {
    document.body.innerHTML = `
      <div id="game-container">
        <div class="red-indicator-container"></div>
        <div class="targets-container"></div>
        <div class="white-indicator-container"></div>
      </div>
      `;
    const redContainer = document.getElementsByClassName(
      'red-indicator-container',
    )[0];

    const whiteContainer = document.getElementsByClassName(
      'white-indicator-container',
    )[0];

    it('Add 4 red indicators', () => {
      addIndicators(Indicators.red, redContainer, 4);

      expect(
        redContainer.getElementsByClassName('red-indicator').length,
      ).toStrictEqual(4);
    });

    it('Add 4 white indicators', () => {
      addIndicators(Indicators.white, whiteContainer, 4);

      expect(
        whiteContainer.getElementsByClassName('white-indicator').length,
      ).toStrictEqual(4);
    });
  });
});

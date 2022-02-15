/**
 * @jest-environment jsdom
 */

import {
  addNewGameLine,
  addIndicators,
  Indicators,
  changePieceDisplay,
  hideUnwantedColor,
  getGameDomElements,
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

      expect(
        gameContainer.querySelectorAll(
          `div.targets-container > div.target > div.target-piece`,
        ).length,
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

      expect(
        gameContainer.querySelectorAll(
          `div.targets-container > div.target > div.target-piece`,
        ).length,
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

  describe('change piece display', () => {
    it('change display to none', () => {
      document.body.innerHTML = `
      <div id="blue-piece"></div>
      `;

      const bluePiece = document.getElementById('blue-piece') as HTMLDivElement;
      changePieceDisplay('blue', 'none');
      expect(bluePiece.style.display).toStrictEqual('none');
    });

    it('change display to block', () => {
      document.body.innerHTML = `
      <div id="blue-piece"></div>
      `;

      const bluePiece = document.getElementById('blue-piece') as HTMLDivElement;
      changePieceDisplay('blue', 'block');
      expect(bluePiece.style.display).toStrictEqual('block');
    });
  });

  describe('Hide unwanted colors', () => {
    it('hide all the color', () => {
      document.body.innerHTML = `
      <div id="blue-piece"></div>
      <div id="red-piece"></div>
      <div id="yellow-piece"></div>
      <div id="green-piece"></div>
      `;
      const colors = ['blue', 'red', 'yellow', 'green'];
      hideUnwantedColor(colors, []);

      colors.forEach((color) => {
        const piece = document.getElementById(`${color}-piece`);
        expect(piece.style.display).toStrictEqual('none');
      });
    });

    it('hide unwanted color', () => {
      document.body.innerHTML = `
      <div id="blue-piece"></div>
      <div id="red-piece"></div>
      <div id="yellow-piece"></div>
      <div id="green-piece"></div>
      `;
      const colors = ['blue', 'red', 'yellow', 'green'];
      const availableColor = ['blue', 'red'];
      hideUnwantedColor(colors, availableColor);

      colors.forEach((color) => {
        const piece = document.getElementById(`${color}-piece`);
        if (availableColor.includes(color)) {
          expect(piece.style.display).toStrictEqual('block');
        } else {
          expect(piece.style.display).toStrictEqual('none');
        }
      });
    });
  });

  describe('Get DOM elements', () => {
    it('return the game DOM element', () => {
      document.body.innerHTML = `
      <div class="line" id="line-2">
        <div class="red-indicator-container"></div>
        <div class="targets-container">
          <div class="target"></div>
          <div class="target"></div>
          <div class="target"></div>
          <div class="target"></div>  
        </div>
        <div class="white-indicator-container"></div>
      </div>
      `;

      const round = 2;

      const { targets, redIndicatorsContainer, whiteIndicatorsContainer } =
        getGameDomElements(round);

      expect(redIndicatorsContainer).toBeInstanceOf(HTMLDivElement);
      expect(whiteIndicatorsContainer).toBeInstanceOf(HTMLDivElement);

      targets.forEach((element) => {
        expect(element).toBeInstanceOf(HTMLDivElement);
      });
    });

    it('return the right number of element', () => {
      document.body.innerHTML = `
      <div class="line" id="line-2">
        <div class="red-indicator-container"></div>
        <div class="targets-container">
          <div class="target"></div>
          <div class="target"></div>
          <div class="target"></div>
          <div class="target"></div>  
        </div>
        <div class="white-indicator-container"></div>
      </div>
      `;

      const round = 2;

      const { targets } = getGameDomElements(round);

      expect(targets.length).toStrictEqual(4);
    });

    it('return an errror because no line found', () => {
      document.body.innerHTML = `
      <div class="line" id="line-3">
        <div class="red-indicator-container"></div>
        <div class="targets-container">
          <div class="target"></div>
          <div class="target"></div>
          <div class="target"></div>
          <div class="target"></div>  
        </div>
        <div class="white-indicator-container"></div>
      </div>
      `;

      const round = 2;

      expect(() => {
        getGameDomElements(round);
      }).toThrowError(Error);

      expect(() => {
        getGameDomElements(round);
      }).toThrowError('Line does not exist');
    });
  });
});

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
  updateTooltip,
  changeVerifyContent,
  getCurrentNumbersOfLine,
  displayPreviousRecord,
  displayNewRecord,
} from '../src/dom-manipulation';

import GameState from '../src/game-state';
import { Run } from '../src/record';

describe('Dom manipulation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Add new game line', () => {
    let gameContainer: HTMLDivElement;
    beforeEach(() => {
      document.body.innerHTML = `
      <div id="game-container"></div>
      `;
      gameContainer = document.getElementById(
        'game-container',
      ) as HTMLDivElement;
    });

    it('Add new game line with 1 target', () => {
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

      expect(
        (
          gameContainer.getElementsByClassName(
            'white-indicator-container',
          )[0] as HTMLDivElement
        ).style.width,
      ).toStrictEqual('30px');

      expect(
        (
          gameContainer.getElementsByClassName(
            'red-indicator-container',
          )[0] as HTMLDivElement
        ).style.width,
      ).toStrictEqual('30px');
    });

    it('Add new game line with 10 target', () => {
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

      expect(
        (
          gameContainer.getElementsByClassName(
            'white-indicator-container',
          )[0] as HTMLDivElement
        ).style.width,
      ).toStrictEqual('300px');

      expect(
        (
          gameContainer.getElementsByClassName(
            'red-indicator-container',
          )[0] as HTMLDivElement
        ).style.width,
      ).toStrictEqual('300px');
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
    )[0] as HTMLDivElement;

    const whiteContainer = document.getElementsByClassName(
      'white-indicator-container',
    )[0] as HTMLDivElement;

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
    let bluePiece: HTMLDivElement;
    beforeEach(() => {
      document.body.innerHTML = `
      <div id="blue-piece"></div>
      `;

      bluePiece = document.getElementById('blue-piece') as HTMLDivElement;
    });

    it('change display to none', () => {
      changePieceDisplay('blue', 'none');
      expect(bluePiece.style.display).toStrictEqual('none');
    });

    it('change display to block', () => {
      changePieceDisplay('blue', 'block');
      expect(bluePiece.style.display).toStrictEqual('block');
    });
  });

  describe('Hide unwanted colors', () => {
    const colors = ['blue', 'red', 'yellow', 'green'];

    beforeEach(() => {
      document.body.innerHTML = `
      <div id="blue-piece"></div>
      <div id="red-piece"></div>
      <div id="yellow-piece"></div>
      <div id="green-piece"></div>
      `;
    });

    it('hide all the color', () => {
      hideUnwantedColor(colors, []);

      colors.forEach((color) => {
        const piece = document.getElementById(`${color}-piece`);
        expect(piece.style.display).toStrictEqual('none');
      });
    });

    it('hide unwanted color', () => {
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
    beforeEach(() => {
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
    });

    it('return the game DOM element', () => {
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
      const round = 2;

      const { targets } = getGameDomElements(round);

      expect(targets.length).toStrictEqual(4);
    });

    it('return an error because no line found', () => {
      const round = 3;

      expect(() => {
        getGameDomElements(round);
      }).toThrowError(Error);

      expect(() => {
        getGameDomElements(round);
      }).toThrowError('Line does not exist');
    });
  });

  describe('Update the tooltip', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="tooltip">
          <p>Il vous reste <span>11</span> tours</p>
        </div>
      `;
    });

    it('Update the tooltip to 11 rounds left with green color', () => {
      const nbTurns = 12;
      const currentRound = 2;
      const tooltip = document.getElementById('tooltip') as HTMLDivElement;
      updateTooltip(tooltip, currentRound, nbTurns);

      expect(tooltip.querySelector('span').innerHTML).toStrictEqual('11');
      expect(tooltip.querySelector('span').style.color).toStrictEqual('green');
    });

    it('Update the tooltip to 3 rounds left with orange color', () => {
      const nbTurns = 6;
      const currentRound = 4;
      const tooltip = document.getElementById('tooltip') as HTMLDivElement;
      updateTooltip(tooltip, currentRound, nbTurns);

      expect(tooltip.querySelector('span').innerHTML).toStrictEqual('3');
      expect(tooltip.querySelector('span').style.color).toStrictEqual('orange');
    });

    it('Update the tooltip to 5 rounds left with red color', () => {
      const nbTurns = 15;
      const currentRound = 11;
      const tooltip = document.getElementById('tooltip') as HTMLDivElement;
      updateTooltip(tooltip, currentRound, nbTurns);

      expect(tooltip.querySelector('span').innerHTML).toStrictEqual('5');
      expect(tooltip.querySelector('span').style.color).toStrictEqual('red');
    });

    it('Return an error because no span has been find', () => {
      document.body.innerHTML = `
        <div id="fake-tooltip">
          <p>Il vous reste  tours</p>
        </div>
      `;
      const nbTurns = 6;
      const currentRound = 5;
      const fakeTooltip = document.getElementById(
        'fake-tooltip',
      ) as HTMLDivElement;

      expect(() => {
        updateTooltip(fakeTooltip, currentRound, nbTurns);
      }).toThrow(Error);

      expect(() => {
        updateTooltip(fakeTooltip, currentRound, nbTurns);
      }).toThrow('No span found in the tooltip');
    });
  });

  describe('changeVerifyContent', () => {
    let verifyButton: HTMLButtonElement;
    beforeEach(() => {
      document.body.innerHTML = `
        <button id="verify"></button>
      `;
      verifyButton = document.getElementById('verify') as HTMLButtonElement;
    });

    it('change the content to Verify', () => {
      changeVerifyContent(verifyButton, GameState.running);

      expect(verifyButton.innerHTML).toStrictEqual('Vérifier');
    });

    it('change the content to result when lose', () => {
      changeVerifyContent(verifyButton, GameState.lose);

      expect(verifyButton.innerHTML).toStrictEqual('Voir le résultat');
    });

    it('change the content to result when win', () => {
      changeVerifyContent(verifyButton, GameState.win);

      expect(verifyButton.innerHTML).toStrictEqual('Voir le résultat');
    });
  });

  describe('Get current number of line', () => {
    it('return 0', () => {
      document.body.innerHTML = '';

      expect(getCurrentNumbersOfLine()).toStrictEqual(0);
    });

    it('return 10', () => {
      for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        document.body.appendChild(line);
      }

      expect(getCurrentNumbersOfLine()).toStrictEqual(10);
    });
  });

  describe('Display record', () => {
    let p: HTMLParagraphElement;
    const record: Run = {
      category: {
        duplicate: false,
        nbColors: 5,
        nbPossibilities: 10,
        nbTurns: 12,
      },
      time: 60 * 60 * 1000 + 60 * 1000 + 33 * 1000 + 582,
      date: new Date('2022-02-28T17:29:19'),
    };
    const run: Run = {
      category: {
        duplicate: false,
        nbColors: 5,
        nbPossibilities: 10,
        nbTurns: 12,
      },
      time: 60 * 60 * 1000 + 60 * 1000 + 40 * 1000 + 592,
      date: new Date('2022-02-28T17:29:19'),
    };

    beforeEach(() => {
      document.body.innerHTML = '';
      document.body.innerHTML = `<p id="record"></p>`;
      p = document.getElementById('record') as HTMLParagraphElement;
    });

    it('Display the record compare in win game', () => {
      displayPreviousRecord(p, record, run, GameState.win);
      expect(p.innerHTML).toStrictEqual(
        `Votre meilleur score dans cette catégorie est de :<br><strong>1h 1m 33s 582ms </strong> effectué le <strong>28/02/2022</strong> à <strong>17:29:19</strong><br>Vous avez mis <strong style="color:var(--red)">7s 10ms </strong> de plus`,
      );
    });

    it('Display the record compare in lose game', () => {
      displayPreviousRecord(p, record, run, GameState.lose);
      expect(p.innerHTML).toStrictEqual(
        `Votre meilleur score dans cette catégorie est de :<br><strong>1h 1m 33s 582ms </strong> effectué le <strong>28/02/2022</strong> à <strong>17:29:19</strong><br>`,
      );
    });

    it('No record set yet', () => {
      displayPreviousRecord(p, null, run, GameState.lose);
      expect(p.innerHTML).toStrictEqual(
        "Vous n'avez pas encore de record dans cette catégorie.",
      );
    });
  });

  describe('Display new record', () => {
    let p: HTMLParagraphElement;
    const previousRecord: Run = {
      category: {
        duplicate: false,
        nbColors: 5,
        nbPossibilities: 10,
        nbTurns: 12,
      },
      time: 60 * 60 * 1000 + 60 * 1000 + 40 * 1000 + 592,
      date: new Date('2022-02-28T17:29:19'),
    };
    const newRecord: Run = {
      category: {
        duplicate: false,
        nbColors: 5,
        nbPossibilities: 10,
        nbTurns: 12,
      },
      time: 60 * 60 * 1000 + 60 * 1000 + 33 * 1000 + 582,
      date: new Date('2022-02-28T17:29:19'),
    };

    beforeEach(() => {
      document.body.innerHTML = '';
      document.body.innerHTML = `<p id="record"></p>`;
      p = document.getElementById('record') as HTMLParagraphElement;
    });

    it('Display the new record with the diff of the previous one', () => {
      displayNewRecord(p, newRecord, previousRecord);

      expect(p.innerHTML).toStrictEqual(
        'Bravo, vous venez de créer un nouveau record pour cette catégorie !<br>Vous avez mis <strong style="color:var(--green)">7s 10ms </strong> de moins que votre précédent record',
      );
    });

    it('Display the new record without the diff of the previous one', () => {
      displayNewRecord(p, newRecord, null);

      expect(p.innerHTML).toStrictEqual(
        'Bravo, vous venez de créer un nouveau record pour cette catégorie !<br>',
      );
    });
  });
});

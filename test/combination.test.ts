/**
 * @jest-environment jsdom
 */

import {
  generateCombination,
  getAvailableColors,
  getColorApparition,
  getCombinationPlacement,
  getCurrentCombination,
} from '../src/combination';

describe('Combination', () => {
  describe('Generate combination', () => {
    const colors = ['red', 'blue', 'green', 'yellow'];

    it('Create a combination of 4 distinct colors', () => {
      const combination = generateCombination(colors, 4, false);

      const combinationSet = new Set(combination);

      expect(combination).toHaveLength(4);
      expect(combinationSet.size).toStrictEqual(4);
    });

    it('Create a combination of 4 with 2 distinct colors', () => {
      const combination = generateCombination(colors.slice(0, 2), 4, true);

      const combinationSet = new Set(combination);

      expect(combination).toHaveLength(4);
      expect(combinationSet.size <= 2).toStrictEqual(true);
    });

    it('throws error', () => {
      expect(() => {
        generateCombination(colors, 10, false);
      }).toThrow(Error);

      expect(() => {
        generateCombination(colors, 10, false);
      }).toThrow('Impossible to create a combination');
    });
  });

  describe('Combination placement', () => {
    const finalCombination = ['blue', 'red', 'white', 'green'];

    it('4 good placement', () => {
      const { goodPlacement, wrongPlacement } = getCombinationPlacement(
        finalCombination,
        finalCombination,
      );

      expect(goodPlacement).toStrictEqual(4);
      expect(wrongPlacement).toStrictEqual(0);
    });

    it('4 wrong placement', () => {
      const { goodPlacement, wrongPlacement } = getCombinationPlacement(
        ['green', 'white', 'red', 'blue'],
        finalCombination,
      );

      expect(goodPlacement).toStrictEqual(0);
      expect(wrongPlacement).toStrictEqual(4);
    });

    it('Only one good placement', () => {
      const { goodPlacement, wrongPlacement } = getCombinationPlacement(
        ['blue', 'blue', 'blue', 'blue'],
        finalCombination,
      );

      expect(goodPlacement).toStrictEqual(1);
      expect(wrongPlacement).toStrictEqual(0);
    });

    it('2 good 2 wrong', () => {
      const { goodPlacement, wrongPlacement } = getCombinationPlacement(
        ['blue', 'white', 'red', 'green'],
        finalCombination,
      );

      expect(goodPlacement).toStrictEqual(2);
      expect(wrongPlacement).toStrictEqual(2);
    });

    it('None of the color is in the final combination', () => {
      const { goodPlacement, wrongPlacement } = getCombinationPlacement(
        ['purple', 'yellow', 'maroon', 'black'],
        finalCombination,
      );

      expect(goodPlacement).toStrictEqual(0);
      expect(wrongPlacement).toStrictEqual(0);
    });
  });

  describe('Color Apparition', () => {
    it('Return 0', () => {
      const combination = ['blue', 'white', 'red', 'green'];
      expect(getColorApparition(combination, 'black')).toStrictEqual(0);
    });

    it('Return 1', () => {
      const combination = ['blue', 'white', 'red', 'green'];
      expect(getColorApparition(combination, 'white')).toStrictEqual(1);
    });

    it('Return 2', () => {
      const combination = ['blue', 'white', 'white', 'green'];
      expect(getColorApparition(combination, 'white')).toStrictEqual(2);
    });

    it('Return 3', () => {
      const combination = ['blue', 'white', 'white', 'white'];
      expect(getColorApparition(combination, 'white')).toStrictEqual(3);
    });

    it('Return 4', () => {
      const combination = ['white', 'white', 'white', 'white'];
      expect(getColorApparition(combination, 'white')).toStrictEqual(4);
    });
  });

  describe('Current Combination', () => {
    it('Return the current combination', () => {
      const colors = ['black', 'red', 'orange', 'yellow'];

      document.body.innerHTML = `
            <div class="targets-container">
                <div class="target black"></div>
                <div class="target red"></div>
                <div class="target orange"></div>
                <div class="target yellow"></div>
            </div>
          `;
      const targets = document.querySelectorAll(
        `div.targets-container > div.target`,
      ) as NodeListOf<Element>;

      const combination = getCurrentCombination(targets, colors);
      expect(combination).toBeInstanceOf(Array);
      expect(combination.length).toStrictEqual(4);

      combination.forEach((color, index) => {
        expect(color).toStrictEqual(colors[index]);
      });
    });

    it('Return an error', () => {
      const colors = ['black', 'red', 'orange', 'yellow'];

      document.body.innerHTML = `
            <div class="targets-container">
                <div class="target black"></div>
                <div class="target red"></div>
                <div class="target orange"></div>
                <div class="target"></div>
            </div>
          `;

      const targets = document.querySelectorAll(
        `div.targets-container > div.target`,
      ) as NodeListOf<Element>;

      expect(() => getCurrentCombination(targets, colors)).toThrow(Error);
      expect(() => getCurrentCombination(targets, colors)).toThrow(
        'Combination is not complete',
      );
    });
  });
  describe('get available colors', () => {
    it('return an array of 3 colors', () => {
      const colors = ['red', 'blue', 'yellow', 'maroon', 'green'];

      const finalArray = getAvailableColors(colors, 3);

      expect(new Set(finalArray).size).toStrictEqual(3);

      finalArray.forEach((color) => {
        expect(colors.includes(color)).toStrictEqual(true);
      });
    });
  });
});

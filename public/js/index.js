"use strict";
/**
 * red indicator --> good color at the righrt place
 * white indicator --> good color at tre wrong place
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Get all the piece of the game
var bluePiece = document.getElementById('blue-piece');
var redPiece = document.getElementById('red-piece');
var greenPiece = document.getElementById('green-piece');
var yellowPiece = document.getElementById('yellow-piece');
var orangePiece = document.getElementById('orange-piece');
var blackPiece = document.getElementById('black-piece');
var whitePiece = document.getElementById('white-piece');
var marronPiece = document.getElementById('maroon-piece');
var pieces = [
    bluePiece,
    redPiece,
    greenPiece,
    yellowPiece,
    orangePiece,
    blackPiece,
    whitePiece,
    marronPiece,
];
// All the color available in the game based on the pieces available
var COLORS = pieces.map(function (piece) { return piece.id.split('-')[0]; });
// The button to verrify the current combination
var verifyButton = document.getElementById('verify');
// current game round
// min : 1 | max : 12
var currentRound;
// var for current targets and indicators
var currentLine;
var currentTargets;
var currentRedIndicatorsContainer;
var currentWhiteIndicatorsContainer;
// var for the game combination
var gameCombination;
/**
 * @description Set the data transfer to the color of the piece
 * @param e
 * @param color
 */
function dragstart_handler(e, color) {
    var _a;
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', color);
    e.dataTransfer.effectAllowed = 'move';
}
/**
 * @description listener function on drag over event
 * @param e
 */
function dragover_handler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}
/**
 * @description get the color of the drag item and change the target background to this color
 * @param e
 * @param target
 */
function drop_handler(e, target) {
    var _a;
    e.preventDefault();
    var color = e.dataTransfer.getData('text/plain');
    (_a = target.classList).remove.apply(_a, COLORS);
    target.classList.add(color);
}
/**
 * @returns a combination of 4 colors
 */
function generateCombination() {
    return __spreadArray([], Array(4), true).map(function () { return COLORS[Math.floor(Math.random() * COLORS.length)]; });
}
/**
 * @description Reset all game variable and HTML and start the game
 */
function startNewGame() {
    // Reset current round
    currentRound = 1;
    // Reset game combination
    gameCombination = generateCombination();
    // reset HTML here
    var gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = "\n      <div class=\"line\" id=\"line-".concat(currentRound, "\">\n        <div class=\"red-indicator-container\"></div>\n        <div class=\"targets-container\">\n          <div class=\"target\"></div>\n          <div class=\"target\"></div>\n          <div class=\"target\"></div>\n          <div class=\"target\"></div>\n        </div>\n        <div class=\"white-indicator-container\"></div>\n      </div>\n      ");
    // Reset currentTarget and indicators
    currentLine = document.getElementById("line-".concat(currentRound));
    currentTargets = currentLine.querySelectorAll("div.targets-container > div.target");
    currentRedIndicatorsContainer = currentLine.querySelector('div.red-indicator-container');
    currentWhiteIndicatorsContainer = currentLine.querySelector('div.white-indicator-container');
    // Add drag event listener for each piece and setting the
    // data Transfer to the corresponding color
    pieces.forEach(function (piece) {
        return piece === null || piece === void 0 ? void 0 : piece.addEventListener('dragstart', function (e) {
            dragstart_handler(e, piece.id.split('-')[0]);
        });
    });
    var _loop_1 = function (i) {
        currentTargets[i].addEventListener('dragover', function (e) {
            dragover_handler(e);
        });
        currentTargets[i].addEventListener('drop', function (e) {
            return drop_handler(e, currentTargets[i]);
        });
    };
    // Add drag event for every current targets
    for (var i = 0; i < currentTargets.length; i++) {
        _loop_1(i);
    }
}
function verifyCurrentCombination() {
    var goodPlacement = 0;
    var wrongPLacement = 0;
    // Get the current combination
    var currentCombination = [];
    for (var i = 0; i < currentTargets.length; i++) {
        var color = currentTargets[i].className
            .split(' ')
            .filter(function (e) { return COLORS.includes(e); })[0];
        currentCombination.push(color);
    }
    currentCombination.forEach(function (color, index) {
        if (gameCombination[index] === color) {
            console.log("the color ".concat(color, " at the place ").concat(index + 1, " is at the good place"));
            goodPlacement++;
            return;
        }
        if (gameCombination.includes(color)) {
            console.log("the color ".concat(color, " at the place ").concat(index + 1, " is not at the good place"));
            wrongPLacement++;
            return;
        }
        console.log("the color ".concat(color, " is not in the final combination"));
    });
    // Add indicator to the current line
    for (var j = 0; j < goodPlacement; j++) {
        console.log('pass red');
        var redIndicator = document.createElement('div');
        redIndicator.classList.add('red-indicator');
        currentRedIndicatorsContainer.appendChild(redIndicator);
    }
    for (var k = 0; k < wrongPLacement; k++) {
        console.log('pass white');
        var whiteIndicator = document.createElement('div');
        whiteIndicator.classList.add('white-indicator');
        currentWhiteIndicatorsContainer.appendChild(whiteIndicator);
    }
}
// Add the verify event
verifyButton.onclick = verifyCurrentCombination;
startNewGame();

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
// get the game container
var gameContainer = document.getElementById('game-container');
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
// Add drag event listener for each piece and setting the
// data Transfer to the corresponding color
pieces.forEach(function (piece) {
    return piece === null || piece === void 0 ? void 0 : piece.addEventListener('dragstart', function (e) {
        dragstart_handler(e, piece.id.split('-')[0]);
    });
});
// All the color available in the game based on the pieces available
var COLORS = pieces.map(function (piece) { return piece.id.split('-')[0]; });
// The button of the game
var verifyButton = document.getElementById('verify');
var restartButton = document.getElementById('restart');
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
function generateCombination(colors) {
    return __spreadArray([], Array(4), true).map(function () { return colors[Math.floor(Math.random() * colors.length)]; });
}
/**
 * @description Add a new line to the game container
 * @param index the index for the line id
 */
function addNewGameLine(round) {
    var line = document.createElement('div');
    line.classList.add('line');
    line.id = "line-".concat(round);
    var redIndicatorContainer = document.createElement('div');
    redIndicatorContainer.classList.add('red-indicator-container');
    var targetContainer = document.createElement('div');
    targetContainer.classList.add('targets-container');
    for (var i = 0; i < 4; i++) {
        var target = document.createElement('div');
        target.classList.add('target');
        targetContainer.appendChild(target);
    }
    var whiteIndicatorContainer = document.createElement('div');
    whiteIndicatorContainer.classList.add('white-indicator-container');
    line.appendChild(redIndicatorContainer);
    line.appendChild(targetContainer);
    line.appendChild(whiteIndicatorContainer);
    gameContainer.appendChild(line);
}
/**
 * @description Add the drag event listener of the targets
 * @param target
 */
function addTargetListener(targets) {
    var _loop_1 = function (i) {
        targets[i].addEventListener('dragover', dragover_handler, true);
        targets[i].addEventListener('drop', function (e) {
            return drop_handler(e, targets[i]);
        }),
            true;
    };
    for (var i = 0; i < targets.length; i++) {
        _loop_1(i);
    }
}
/**
 * @description Remove the drag event listener of the targets
 * @param target
 */
function removeTargetListener(targets) {
    for (var i = 0; i < targets.length; i++) {
        targets[i].removeEventListener('dragover', dragover_handler, true);
    }
}
/**
 * @description Reset all game variable and HTML and start the game
 */
function startNewGame() {
    // Reset current round
    currentRound = 1;
    // Reset game combination
    gameCombination = generateCombination(COLORS);
    // reset HTML here
    gameContainer.innerHTML = '';
    addNewGameLine(currentRound);
    // Reset currentTarget and indicators
    currentLine = document.getElementById("line-".concat(currentRound));
    currentTargets = currentLine.querySelectorAll("div.targets-container > div.target");
    currentRedIndicatorsContainer = currentLine.querySelector('div.red-indicator-container');
    currentWhiteIndicatorsContainer = currentLine.querySelector('div.white-indicator-container');
    addTargetListener(currentTargets);
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
    if (currentCombination.includes(undefined)) {
        alert('Mettez des pions dans chaque emplacement de la ligne');
        return;
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
        var redIndicator = document.createElement('div');
        redIndicator.classList.add('red-indicator');
        currentRedIndicatorsContainer.appendChild(redIndicator);
    }
    for (var k = 0; k < wrongPLacement; k++) {
        var whiteIndicator = document.createElement('div');
        whiteIndicator.classList.add('white-indicator');
        currentWhiteIndicatorsContainer.appendChild(whiteIndicator);
    }
    // Add a new line to the game
    removeTargetListener(currentTargets);
    currentRound++;
    addNewGameLine(currentRound);
    currentLine = document.getElementById("line-".concat(currentRound));
    currentTargets = currentLine.querySelectorAll("div.targets-container > div.target");
    currentRedIndicatorsContainer = currentLine.querySelector('div.red-indicator-container');
    currentWhiteIndicatorsContainer = currentLine.querySelector('div.white-indicator-container');
    addTargetListener(currentTargets);
}
// Add the verify event
verifyButton.onclick = verifyCurrentCombination;
// add restart event
restartButton.onclick = startNewGame;
startNewGame();

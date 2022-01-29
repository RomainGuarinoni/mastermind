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
var COLORS = pieces.map(function (piece) { return piece.id.split('-')[0]; });
var targets = document.getElementsByClassName('target');
var verifyButton = document.getElementById('verify');
var redIndicatorContainer = document.getElementsByClassName('red-indicator-container')[0];
var whiteIndicatorContainer = document.getElementsByClassName('white-indicator-container')[0];
// Define the combination of the current game
var combination = __spreadArray([], Array(4), true).map(function () { return COLORS[Math.floor(Math.random() * COLORS.length)]; });
console.log(combination);
// Add drag event listener for each piece and setting the
// data Transfer to the corresponding color
pieces.forEach(function (piece) {
    return piece === null || piece === void 0 ? void 0 : piece.addEventListener('dragstart', function (e) {
        dragstart_handler(e, piece.id.split('-')[0]);
    });
});
var _loop_1 = function (i) {
    targets[i].addEventListener('dragover', function (e) {
        dragover_handler(e);
    });
    targets[i].addEventListener('drop', function (e) {
        return drop_handler(e, targets[i]);
    });
};
// Add drag event for every targets
for (var i = 0; i < targets.length; i++) {
    _loop_1(i);
}
function dragstart_handler(e, color) {
    var _a;
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', color);
    e.dataTransfer.effectAllowed = 'move';
}
function dragover_handler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}
function drop_handler(e, target) {
    var _a;
    e.preventDefault();
    var color = e.dataTransfer.getData('text/plain');
    (_a = target.classList).remove.apply(_a, COLORS);
    target.classList.add(color);
}
var goodPlacement = 0;
var wrongPLacement = 0;
function verifyCurrentCombination() {
    // Reset placement variables values
    goodPlacement = 0;
    wrongPLacement = 0;
    // Get the current combination
    var currentCombination = [];
    for (var i = 0; i < targets.length; i++) {
        var color = targets[i].className
            .split(' ')
            .filter(function (e) { return COLORS.includes(e); })[0];
        currentCombination.push(color);
    }
    // Analyse the combination and determine good and bad placement
    currentCombination.forEach(function (color, index) {
        if (combination.includes(color)) {
            console.log("the color ".concat(color, " is not in the final combination"));
            return;
        }
        if (combination[index] === color) {
            console.log("the color ".concat(color, " at the place ").concat(index + 1, " is at the good place"));
            goodPlacement++;
            return;
        }
        console.log("the color ".concat(color, " at the place ").concat(index + 1, " is not at the good place"));
        wrongPLacement++;
    });
    // Add indicator to the current line
    for (var j = 0; j < goodPlacement; j++) {
        console.log('pass red');
        var redIndicator = document.createElement('div');
        redIndicator.classList.add('red-indicator');
        redIndicatorContainer.appendChild(redIndicator);
    }
    for (var k = 0; k < wrongPLacement; k++) {
        console.log('pass white');
        var whiteIndicator = document.createElement('div');
        whiteIndicator.classList.add('white-indicator');
        whiteIndicatorContainer.appendChild(whiteIndicator);
    }
}
// Add the verify event
verifyButton.onclick = verifyCurrentCombination;

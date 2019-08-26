
$( document ).ready(setup);

var wordGridWidth = 20;
var wordGridHeight = 20;

var words = [
    "hello",
    "goodbye",
    "tree",
    "squirrel",
    "table",
    "dumpling",
    "mantisshrimp",
    "sudo",
    "nani",
    "word",
    "search",
    "waldo"


]

function setup() {
   buildEmptyGrid();
   fillInWordLetters();
   fillInRandomLetters();
}

function buildEmptyGrid(){
    for (var y = 0; y < wordGridHeight; y++) {
        $("table#wordgrid").append('<tr id="row' + y + '"></tr>');
        for (var x = 0; x < wordGridWidth;  x++) {
            $("tr#row" + y).append('<td id="row' + y +'_col' + x + '"></td>');
        }
    }  
}

function fillInWordLetters(){
    for (var i = 0; i < words.length; i++) {
        var word = words [i];
        var position = getPositionForWord(word);
        for (var j = 0; j < word.length; j++) {
            var letterXPosition = position.x + j;
            var letter = word.charAt(j).toUpperCase();
            var $cell = $("td#row" + position.y + "_col" + letterXPosition);
            $cell.append(letter);
            $cell.css("background-color", "#ff0000");
        }
    }
}

function fillInRandomLetters(){
    for (var y = 0; y < wordGridHeight; y++) {
        for (var x = 0; x < wordGridWidth;  x++) {
            var position = { "x" : x, "y" : y };
            var textInCell = getTextAtPosition(position);
            if (textInCell == "") {
                var letter = getRandomLetter();
                var $cell = $("td#row" + position.y + "_col" + position.x);
                $cell.append(letter);
            }
        }
    }
}

function getPositionForWord(word) {
    var position = getRandomPosition();
    while (!isLegalPosition(position, word)) {
        position = getRandomPosition(); 
    }
    return position;
}

function isLegalPosition(position, word){
    console.log(`checking position ${position.x}, ${position.y} for word: ${word}`)
    var lastLetterX = (position.x + word.length) - 1;
    // First,check to see if this word runs off the edge of the board.
    if (lastLetterX >= wordGridWidth) {
        return false;
    }

    // Next, check to see if this word overlaps another word. 
    for (var i = 0; i < word.length; i++) {
        var gridPositionX = position.x + i;
        var positionToCheck = {
            x: gridPositionX,
            y: position.y
        };
        var textAtPosition = getTextAtPosition(positionToCheck);
        if (textAtPosition != "") {
            var letter = word.charAt(i).toUpperCase();
            if (letter != textAtPosition) {
                return false;
            }
        }
    }
    return true;
}

function getTextAtPosition(position) {
    var $cell = $("td#row" + position.y + "_col" + position.x);
    var textInCell = $cell.text().trim();
    return textInCell;

}

function getRandomPosition(word) {
    var XPosition = getRandomInteger(wordGridWidth);
    var YPosition = getRandomInteger(wordGridHeight);
    return {
      x : XPosition,
      y : YPosition
    }
}

function getRandomLetter() {
    // list all of the letters to choose from 
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWQYZ";
    // count how many letters there are 
    var letterCount = letters.length;
    // get a random offset into the letter sequence and drop the fraction 
    var randomOffset = getRandomInteger(letterCount);
    // pick the letter at the random number 
    var randomLetter = letters.charAt(randomOffset);
    return randomLetter; 
}

function getRandomInteger(limit) {
    var randomNumber = Math.random();
    var randomOffset = limit * randomNumber;
    randomOffset = Math.floor(randomOffset);
    return randomOffset; 
}
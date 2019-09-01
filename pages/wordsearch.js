
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
    "waldo",
    "microsoft",
    "google",
    "cloudability",
    "portland",
    "porttownsend"



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
        var placement = getPlacementForWord(word);
        if (placement.direction == "horizontal") {
            for (var j = 0; j < word.length; j++) {
                var letterXPosition = placement.x + j;
                var letter = word.charAt(j).toUpperCase();
                var $cell = $("td#row" + placement.y + "_col" + letterXPosition);
                $cell.append(letter);
                $cell.css("background-color", "#ff0000");
            }
        } else if (placement.direction == "vertical") {
            for (var j = 0; j < word.length; j++) {
                var letterYPosition = placement.y + j;
                var letter = word.charAt(j).toUpperCase();
                var $cell = $("td#row" + letterYPosition + "_col" + placement.x);
                $cell.append(letter);
                $cell.css("background-color", "#ff0000");
            }
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

function getPlacementForWord(word) {
    var position = getRandomPlacement();
    while (!isLegalPlacement(position, word)) {
        position = getRandomPlacement(); 
    }
    return position;
}

function isLegalPlacement(placement, word){
    console.log(`checking position ${placement.x}, ${placement.y}, ${placement.direction} for word: ${word}`)
    if (placement.direction == "horizontal") {
        var lastLetterX = (placement.x + word.length) - 1;
        // First,check to see if this word runs off the edge of the board.
        if (lastLetterX >= wordGridWidth) {
            return false;
        }

        // Next, check to see if this word overlaps another word. 
        for (var i = 0; i < word.length; i++) {
            var gridPositionX = placement.x + i;
            var positionToCheck = {
                x: gridPositionX,
                y: placement.y
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
    } else if (placement.direction == "vertical" ) {
        var lastLetterY = (placement.y + word.length) - 1;
        // First, check to see if this word runs off the edge of the board.
        if (lastLetterY >= wordGridHeight) {
            return false;
        }

        // Next, check to see if this word overlaps another word. 
        for (var i = 0; i < word.length; i++) {
            var gridPositionY = placement.y + i;
            var positionToCheck = {
                x: placement.x,
                y: gridPositionY
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
    }  else {
        throw new Error ("unexpected direction:" + placement.direction);
    } 
}

function getTextAtPosition(position) {
    var $cell = $("td#row" + position.y + "_col" + position.x);
    var textInCell = $cell.text().trim();
    return textInCell;

}

function getRandomPlacement(word) {
    var direction = getRandomDirection();
    var XPosition = getRandomInteger(wordGridWidth);
    var YPosition = getRandomInteger(wordGridHeight);
    return {
        direction : direction,
        x : XPosition,
        y : YPosition
    };
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

function getRandomDirection() {
    var randomNumber = Math.random();
    if (randomNumber < 0.5) {
        return "horizontal";
    } else {
        return "vertical";
    }
}

function getRandomInteger(limit) {
    var randomNumber = Math.random();
    var randomOffset = limit * randomNumber;
    randomOffset = Math.floor(randomOffset);
    return randomOffset; 
}
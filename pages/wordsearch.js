
$( document ).ready(setup);

var wordGridWidth = 20;
var wordGridHeight = 20;

var words = [
    "hello",
    "goodbye"
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
        for (var j = 0; j < word.length; j++) {
            var letter = word.charAt(j).toUpperCase();
            $("td#row" + i + "_col" + j).append(letter);
        }
    }
}

function fillInRandomLetters(){
    for (var y = 0; y < wordGridHeight; y++) {
        for (var x = 0; x < wordGridWidth;  x++) {
            var $cell = $("td#row" + y + "_col" + x);
            var textInCell = $cell.text().trim();
            if (textInCell == "") {
                var letter = getRandomLetter();
                $cell.append(letter);
            }
        }
    }
}

function getRandomLetter() {
    // list all of the letters to choose from 
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWQYZ";
    // count how many letters there are 
    var letterCount = letters.length;
    // pick a random number between zero and one
    var randomNumber = Math.random();
    // get a random offset into the letter sequence and drop the fraction 
    var randomOffset = letterCount * randomNumber;
    randomOffset = Math.floor(randomOffset);
    // pick the letter at the random number 
    var randomLetter = letters.charAt(randomOffset);
    return randomLetter; 
}

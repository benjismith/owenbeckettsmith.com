
$( document ).ready(setup);

function setup() {
    var wordGridWidth = 20;
    var wordGridHeight = 20;

    for (var y = 0; y < wordGridHeight; y++) {
        $("table#wordgrid").append("<tr></tr>");
        for (var x = 0; x < wordGridWidth;  x++) {
            var letter = getRandomLetter();
            $("tr").last().append("<td>" + letter + "</td>");
        }

    }
    console.log("done with all rows!!!!!!!!!!!!!!!!!!!!!")
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

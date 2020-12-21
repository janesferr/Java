let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess.").toUpperCase();
// note the switch toUpperCase(), we want to always work in upper case letters to avoid confusing 'a' and 'A' as unequal.
let revealedLetters = new Array(word.length); 
// creates an array with as many elements as word has characters. Each index of revealedLetters will correspond to a character in word, and if revealedLetters[n] is truthy, then word[n] has been correctly guessed.
revealedLetters.fill(false);

const maxStrikes = 6; 
let strikes = 0; // the number of incorrect guesses made so far
let strikeLetters = new Array(maxStrikes); // this will contain every letter that has been incorrectly guessed.

drawWordProgress(); // run this now, to draw the empty word at the start of the game.
generateButtons(); //generate button form bootstrap to the screen
// Manipulates the DOM to write all the strike letters to the appropriate section in hangman.html
function drawStrikeLetters() {
    // your DOM manipulation code here
    // should create a String from strikeLetters and put that into the content of some element.
    // 1 make a variable named strikeStatus and set the value = "";
    // 2 set strikeStatus to the join(",") on variable strikeLetters
    // 3 set the DOM innerHTML for elem id=strike to strikeStatus
    var strikeStatus = "";
    strikeStatus = strikeLetters.join(" ");
    document.getElementById("strike").innerHTML = strikeStatus;
  }

// Manipulates the DOM to write the successfully guessed letters of the word, replacing them with dashes if not yet guessed
function drawWordProgress() {
  // your DOM manipulation code here
  // should iterate over revealedLetters, and if the value at each index is truthy, 
  //print the corresponding letter from word. Otherwise, it should print a -.
 var wordstatus = "";
  for (var i = 0; i < revealedLetters.length; i++) {
    if (revealedLetters[i] == true) {
      wordstatus = wordstatus.concat(word[i]);
    }
    else {
      wordstatus = wordstatus.concat("-");
    }
  }
  document.getElementById("wordtoguess").innerHTML = wordstatus;
}
// Manipulates the DOM to update the image of the gallows for the current game state.
function drawGallows() { 
    // your DOM manipulation code here 
    // should update an <img> element in the appropriate hangman.html section to point to "images/strike-"+strikes+".png"
    document.getElementById("gallow").src = "images/"+strikes+".jpg";
}
function generateButtons() {
  // 1. make a variable called letters which is an array of all the letters of the alphabet (use split(""))
  let letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  // 2. make a variable called buttonsHTML which will hold the html with all the buttons. Set the initial value to "".
  let buttonsHTML = "";
  // 2. write a for loop that will loop through each letter of the alphabet array 
  //    you just created. In the for-loop:
  //    A. Make a variable called letter and set it to the current letter based on the current index in the loop
  //    B. Make a variable called buttonHTML and set it equal to the html for a single button. Substitute 
  //       in the letter for button's id and text.
  //    C. concatenate the variable with the button html to the variable buttonsHTML
  for (var i = 0; i < letters.length; i++) {
    var letter = letters[i];
    let buttonHTML = `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="processGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `;
    buttonsHTML = buttonsHTML.concat(buttonHTML);
  }
  // 3. after the loop, set buttonsHTML as inner html to element with id = userguess
  document.getElementById('userguess').innerHTML = buttonsHTML;

}

function evalGuess(letter) {
  let signsOfLife = false;
  for (var i = 0; i < word.length; i++) {
    if (word[i] == letter) {
      revealedLetters[i] = true;
      signsOfLife = true;
    }
  }
  return signsOfLife;
}

function alreadyGuessedWrong(letter) {
  let guessed = false;
  for (var i = 0; i < strikeLetters.length; i++) {
    if (strikeLetters[i] == letter) {
      guessed = true;
    }
  }

  return guessed;
}

function didYouWin() {
  let win = true;
  for (var i = 0; i < revealedLetters.length; i++) {
    if (revealedLetters[i] === false)
      win = false;
  }
  if(win=== true){
    alert("You win");
  }
}

function processGuess(guess) {
  if (strikes < maxStrikes) {
// has this been guessed incorrectly already?
if (!alreadyGuessedWrong(guess)) {
  if (evalGuess(guess) == false) {
    strikeLetters[strikes] = guess;
    strikes++;
    drawGallows();
    drawStrikeLetters();
  } else {
    drawWordProgress();
    didYouWin();
  }
}

  } else {
    alert("You lost");
  }
  document.getElementById("strikenum").innerHTML = strikes;
} 





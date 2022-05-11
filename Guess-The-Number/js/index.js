/**
 * Guess The Number Game
 * DONE: Get user value from input and save it to variable numberGuess
 * DONE: Generate a random number 1 to 100 and save it to variable correctNumber
 * DONE: Console whether the guess is too high, too low, or is correct inside playGame function
 * DONE: Create a function called displayResult to move the logic for if the guess is too high, too low, or correct
 * DONE: Complete the showYouWon, showNumberAbove, showNumberBelow
 * DONE: Use the showYouWon... functions within displayResult to display the correct dialog
 * DONE: Save the guess history in a variable called guess
 * DONE: Display the guess history using displayHistory() function
 * DONE: Use the initGame() function to restart the game
 */

// Variable to store the list of guesses
let guesses = [];
// Variable for store the correct random number
let correctNumber = getRandomNumber();

window.onload = function () {
  keyboard();
  initGame();
  document.getElementById('number-submit').addEventListener('click', playGame);
  document.getElementById('restart-game').addEventListener('click', initGame);
  document.getElementById('reload').addEventListener('click', initGame);
};

/**
 * Functionality for playing the whole game
 */
function playGame() {
  // *CODE GOES BELOW HERE *
  let numberGuess = document.getElementById('number-guess').value;
  if ( numberGuess >= 1 ) {
    saveGuessHistory(numberGuess);
    displayHistory();
    displayResult(numberGuess);
} else {
    showError();
  }
}

/* BONUSES  */
function keyboard() {
  let input = document.getElementById('number-guess');
  input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      playGame();
    }
    if (event.keyCode === 27) {
      initGame();
    }
  });
}
/**
 * Show the result for if the guess it too high, too low, or correct
 * HINT: Use if, else if, else statement
 */
// *CODE GOES BELOW HERE *
function displayResult(numberGuesses) {
  if (numberGuesses > correctNumber) {
    showNumberAbove();
    //console.log("Your guess number is too high");
  } else if (numberGuesses < correctNumber) {
    showNumberBelow();
    //console.log("Your guess number is too low");
  } else if (numberGuesses = correctNumber) {
    showYouWon();
    //console.log("Your guess number is correct!");
  } else {
    showError();
    //console.log("Add Number before you Check! ");
  }
}

/**
 * Initialize a new game by resetting all values and content on the page
 * HINT: reset the correctNumber, guesses, and HTML content
 */
function initGame() {
  // *CODE GOES BELOW HERE *
  correctNumber = getRandomNumber();
  guesses = [];
  displayHistory();
  resetResultContent();
  clearInputText();
  // console.log('this is the correct number ' + correctNumber);
}

function clearInputText() {
  document.getElementById('number-guess').value = '';
}

/**
 * Reset the HTML content for guess history
 */
function resetResultContent() {
  document.getElementById('result').innerHTML = '';
}

/**
 * Return a random number between 1 and 100
 * HINT: Use Math.random
 */
function getRandomNumber() {
  // *CODE GOES BELOW HERE *
  return Math.floor(Math.random() * 100 + 1);
}

/**
 * Save guess history
 * HINT: Search Google "append to array in javascript"
 * HINT: Use the guesses variable
 */
function saveGuessHistory(guess) {
  // *CODE GOES BELOW HERE *
  guesses.push(guess);
}

/**
 * Display guess history to user
 * HTML TO USE:
 * <ul class='list-group'>
 *  <li class='list-group-item'>You guessed {number}</li>
 * </ul>
 * HINT: use while loop and string concatentation to create a list of guesses
 */
function displayHistory() {
  let index = guesses.length - 1; // TODO
  let list = "<ul class='list-group'>";
  let title = "<h1 class='position__text'>History</h1>";
  // *CODE GOES BELOW HERE *
  while (index >= 0) {
    list +=
      "<li class='list-group-item list-group-item-action list-group-item-dark'>" +
      'You guessed ' +
      guesses[index] +
      '</a>';
    index -= 1;
  }
  list += '</ul>';
  document.getElementById('history').innerHTML = list;

  if (list.length <= 28) {
      document.getElementById('historyTitle').innerHTML = "";
    } else {
      document.getElementById('historyTitle').innerHTML = title;
    }
}


/**
 * Retrieve the dialog based on if the guess is wrong or correct
 */
function getDialog(dialogType, text) {
  let dialog;
  switch (dialogType) {
    case 'warning':
      dialog = "<div class='alert alert-warning my-3 ' role='alert'>";
      break;
    case 'won':
      dialog = "<div class='alert alert-success my-3' role='alert'>";
      break;
    case 'error':
      dialog = "<div class='alert alert-danger my-3' role='alert'>";
      break;
  }
  dialog += text;
  dialog += '</div>';
  return dialog;
}

function showError() {
  const text = 'Add Number before you Check!';
  /**
   * Retrieve the dialog using the getDialog() function
   * and save it to variable called dialog
   * HINT: Use the 'error' and text parameters
   */
  // *CODE GOES BELOW HERE *
  let dialog = getDialog('error', text);
  document.getElementById('result').innerHTML = dialog;
}

function showYouWon() {
  const text = 'Awesome job, you got it!';
  /**
   * Retrieve the dialog using the getDialog() function
   * and save it to variable called dialog
   * HINT: Use the 'won' and text parameters
   */
  // *CODE GOES BELOW HERE *
  let dialog = getDialog('won', text);
  document.getElementById('result').innerHTML = dialog;
}

function showNumberAbove() {
  const text = 'Your guess is too high!';
  /**
   * Retrieve the dialog using the getDialog() function
   * and save it to variable called dialog
   * HINT: Use the 'warning' and text parameters
   */
  // *CODE GOES BELOW HERE *
  let dialog = getDialog('warning', text);
  document.getElementById('result').innerHTML = dialog;
}

function showNumberBelow() {
  const text = 'Your guess is too low!';
  /**
   * Retrieve the dialog using the getDialog() function
   * and save it to variable called dialog
   * HINT: Use the 'warning' and text parameters
   */
  // *CODE GOES BELOW HERE *
  let dialog = getDialog('warning', text);
  document.getElementById('result').innerHTML = dialog;
}

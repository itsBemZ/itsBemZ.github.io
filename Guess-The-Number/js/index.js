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


function playGame() {
  let numberGuess = document.getElementById('number-guess').value;
  if ( numberGuess >= 1 ) {
    saveGuessHistory(numberGuess);
    displayHistory();
    displayResult(numberGuess);
  } else {
    showError();
  }
}


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


function displayResult(numberGuesses) {
  if (numberGuesses > correctNumber) {
    showNumberAbove();
  } else if (numberGuesses < correctNumber) {
    showNumberBelow();
  } else if (numberGuesses = correctNumber) {
    showYouWon();
  } else {
    showError();

  }
}


function initGame() {
  correctNumber = getRandomNumber();
  guesses = [];
  displayHistory();
  resetResultContent();
  clearInputText();

}

function clearInputText() {
  document.getElementById('number-guess').value = '';
}

function resetResultContent() {
  document.getElementById('result').innerHTML = '';
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function saveGuessHistory(guess) {
  guesses.push(guess);
}

function displayHistory() {
  let index = guesses.length - 1;
  let list = "<ul class='list-group'>";
  let title = "<h1 class='position__text'>History</h1>";

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

  let dialog = getDialog('error', text);
  document.getElementById('result').innerHTML = dialog;
}

function showYouWon() {
  const text = 'Awesome job, you got it!';

  let dialog = getDialog('won', text);
  document.getElementById('result').innerHTML = dialog;
}

function showNumberAbove() {
  const text = 'Your guess is too high!';

  let dialog = getDialog('warning', text);
  document.getElementById('result').innerHTML = dialog;
}

function showNumberBelow() {
  const text = 'Your guess is too low!';

  let dialog = getDialog('warning', text);
  document.getElementById('result').innerHTML = dialog;
}

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
  refreshTime(setInterval(refreshTime, 1000));
};


function refreshTime() {
  let timeDisplay = document.getElementById("time");
  let dateString = new Date().toLocaleTimeString();
  timeDisplay.innerHTML = dateString;
}

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
    showAlert();
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
  if(guesses[guesses.length-1] != correctNumber){
  guesses.push(guess);
  }
}

function displayHistory() {
  let index = guesses.length - 1;
  let title = "<h1 class='position__text'>History</h1>";
  let list = "<ul class='list-group'>";
  let attempts = guesses.length;
  while (index >= 0 && attempts >= 0) {
    let text = correctNumber > guesses[index]?' which is pretty low!':(correctNumber < guesses[index]?' which is pretty high!':' 👏Bravo! 😍 you got it after ' + attempts + ' guess(es).');
    list +=
      "<li class='list-group-item list-group-item-action list-group-item-dark'>" +
      'You guessed ' +
      guesses[index] +
      text +
      '</li>';
    index -= 1;
    attempts -= 1;
  }
  list += '</ul>';
  document.getElementById('history').innerHTML = list;

  if (guesses.length <= 0) {
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

function showAlert() {
  let attempts = guesses.length;
  let message = '👏 Bravo! 😍 you got it after ' + attempts + ' guess(es).';
  if(guesses[guesses.length-2] != correctNumber){
    alert(message);
    }
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

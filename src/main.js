var player1Name = document.querySelector('#player1Name');
var player1Wins = document.querySelector('#player1Wins');
var player2Name = document.querySelector('#player2Name');
var player2Wins = document.querySelector('#player2Wins');

var gameTypeContainer = document.querySelector('#gameTypeContainer');
var championIconsContainer= document.querySelector('#championIconsContainer');
var gameInstructions = document.querySelector('#gameInstructions');
var gameResults = document.querySelector('#gameResults');

var player1Token = document.querySelector('#player1Token').src;
var player2Token = document.querySelector('#player2Token').src;
var championIcons = championIconsContainer.querySelectorAll('img');

var buttonChangeGame = document.querySelector('#changeGame');

var currentGame;

gameTypeContainer.addEventListener('click', displayGameBoard);
buttonChangeGame.addEventListener('click', displayGameMenu);

function getGameType(event) {
  return event.target.children[0].id;
}

function toggleElementVisibility(element, isVisible) {
  element.classList.toggle('hidden', isVisible);
}

function toggleGameTypeContainerVisibility() {
  toggleElementVisibility(gameTypeContainer);
}

function changeGameInstructionText() {
  if (gameTypeContainer.classList.contains('hidden')) {
    gameInstructions.innerText = 'Choose your Champion!';
  } else {
    gameInstructions.innerText = 'Choose your game!';
  }
}

function toggleChampionIconsContainerVisibility(gameType) {
  toggleElementVisibility(championIconsContainer);
  for (var i = 3; i < championIcons.length; i++) {
    toggleElementVisibility(championIcons[i], gameType === 'classic');
  }
}

function displayGameBoard(event) {
  toggleGameTypeContainerVisibility();
  toggleChampionIconsContainerVisibility(getGameType(event));
  changeGameInstructionText();
}

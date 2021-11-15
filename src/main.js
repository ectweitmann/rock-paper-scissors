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

window.addEventListener('load', addEventListenersToChampionIcons);
gameTypeContainer.addEventListener('click', displayGameBoard);
buttonChangeGame.addEventListener('click', displayGameMenu);

function getGameType(event) {
  return event.target.children[0].id;
}

function setUpGame(event) {
  currentGame = new Game(
    new Player(player1Name.innerText, player1Token, player1Wins.innerText),
    new Player(player2Name.innerText, player2Token, player2Wins.innerText),
    getGameType(event)
  );
}

function selectChampions(event) {
  currentGame.player1.takeTurn(event.target.id);
  currentGame.player1.championToken = event.target;
  toggleElementOrder(event.target);
  currentGame.player2.takeTurn();
  currentGame.player2.championToken = `assets/${currentGame.player2.champion}.png`;
}

function playGame(event) {
  selectChampions(event);
  declareGameResult(currentGame.compareChampions());
  toggleUnselectedChampionsVisibility();
  setTimeout(resetGameBoard, 1000);
}

function declareGameResult(winner) {
  toggleElementVisibility(gameInstructions, true);
  toggleElementVisibility(gameResults, false);
  gameResults.innerHTML = '';
  if (winner === 'tie') {
     return gameResults.innerHTML = `‍🪢 It\'s a tie! 🪢`;
  }
  gameResults.innerHTML = `
    <p class="game-tagline">
    <img class="game-result" src="assets/${winner.name}.png"> ${winner.name} won this round!
    <img class="game-result" src="assets/${winner.name}.png">
    </p>`;
  updatePlayerWins(winner);
}

function updatePlayerWins(winner) {
  if (winner === currentGame.player1) {
    player1Wins.innerText = `${winner.wins}`;
    winner.saveWinsToStorage();
  } else if (winner === currentGame.player2) {
    player2Wins.innerText = `${winner.wins}`;
    winner.saveWinsToStorage();
  }
}

function toggleUnselectedChampionsVisibility() {
  for (var i = 0; i < currentGame.gameLogic.champions.length; i++) {
    toggleElementVisibility(championIcons[i], true);
    if (championIcons[i].id === currentGame.player1.champion || championIcons[i].id === currentGame.player2.champion) {
      toggleElementVisibility(championIcons[i]);
    }
  }
}

function toggleElementOrder(element) {
  element.classList.toggle('p1-champion-order');
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
  if (!gameType) {
    return toggleElementVisibility(championIconsContainer);
  }
  toggleElementVisibility(championIconsContainer);
  for (var i = 3; i < championIcons.length; i++) {
    toggleElementVisibility(championIcons[i], gameType === 'classic');
  }
}

function addEventListenersToChampionIcons() {
  for (var i = 0; i < championIcons.length; i++) {
    championIcons[i].addEventListener('click', playGame);
  }
}

function displayGameBoard(event) {
  toggleGameTypeContainerVisibility();
  toggleChampionIconsContainerVisibility(getGameType(event));
  changeGameInstructionText();
  setUpGame(event);
}

function resetGameBoard() {
  toggleElementOrder(currentGame.player1.championToken);
  for (var i = 0; i < currentGame.gameLogic.champions.length; i++) {
    toggleElementVisibility(championIcons[i], false);
  }
  toggleElementVisibility(gameResults, true);
  toggleElementVisibility(gameInstructions , false);
  changeGameInstructionText();
  toggleElementVisibility(buttonChangeGame, false);
  currentGame.reset();
}

function displayGameMenu() {
  toggleChampionIconsContainerVisibility();
  toggleGameTypeContainerVisibility();
  changeGameInstructionText();
  toggleElementVisibility(buttonChangeGame);
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

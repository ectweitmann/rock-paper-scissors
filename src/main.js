var player1Name = document.querySelector('#player1Name');
var player1Wins = document.querySelector('#player1Wins');
var player1ChampionSelection = document.querySelector('#p1ChampionSelection');
var player2Name = document.querySelector('#player2Name');
var player2Wins = document.querySelector('#player2Wins');
var player2ChampionSelection = document.querySelector('#p2ChampionSelection');

var gameTypeContainer = document.querySelector('#gameTypeContainer');
var classicGameType = document.querySelector('#classicGameType');
var difficultGameType = document.querySelector('#difficultGameType');
var championIconsContainer= document.querySelector('#championIconsContainer');
var gameInstructions = document.querySelector('#gameInstructions');
var gameResults = document.querySelector('#gameResults');

var player1Token = document.querySelector('#player1Token').src;
var player2Token = document.querySelector('#player2Token').src;
var championIcons = championIconsContainer.querySelectorAll('img');

var buttonChangeGame = document.querySelector('#changeGame');
var buttonResetScore = document.querySelector('#resetScore');

var currentGame = new Game(
  new Player(player1Name.innerText, player1Token, player1Wins.innerText),
  new Player(player2Name.innerText, player2Token, player2Wins.innerText)
);

window.addEventListener('load', setUpGame);
classicGameType.addEventListener('click', displayGameBoard);
difficultGameType.addEventListener('click', displayGameBoard);
buttonChangeGame.addEventListener('click', displayGameMenu);
buttonResetScore.addEventListener('click', resetScore);

function getGameType(event) {
  return currentGame.type = event.target.children[0].id;
}

function applyGameType() {
  currentGame.establishGameType();
}

function setUpGame(event) {
  displayPlayerWins();
  addEventListenersToChampionIcons();
  if (player1Wins.innerText !== '0' || player1Wins.innerText !== '0') {
    toggleElementVisibility(buttonResetScore, false);
  }
}

function displayPlayerWins() {
  player1Wins.innerText = `${currentGame.player1.retrieveWinsFromStorage()}`;
  player2Wins.innerText = `${currentGame.player2.retrieveWinsFromStorage()}`;
}

function selectChampions(event) {
  currentGame.player1.takeTurn(event.target.id);
  currentGame.player1.championToken = event.target;
  player1ChampionSelection.src = event.target.src;
  toggleElementOrder(event.target);
  currentGame.player2.takeTurn();
  player2ChampionSelection.src = `assets/${currentGame.player2.champion}.png`;
}

function displayPlayerChampions() {
  toggleElementVisibility(p1ChampionSelection);
  toggleElementVisibility(p2ChampionSelection);
}

function playGame(event) {
  selectChampions(event);
  displayPlayerChampions();
  declareGameResult(currentGame.compareChampions());
  toggleUnselectedChampionsVisibility();
  setTimeout(resetGameBoard, 900);
}

function declareGameResult(winner) {
  toggleGameTaglines();
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

function updatePlayerWins(player) {
  if (player === currentGame.player1) {
    player1Wins.innerText = `${player.wins}`;
    player.saveWinsToStorage();
  } else if (player === currentGame.player2) {
    player2Wins.innerText = `${player.wins}`;
    player.saveWinsToStorage();
  } else if (player === 'reset') {
    player1Wins.innerText = '0';
    player2Wins.innerText = '0';
  }
}

function resetScore() {
  if (player1Wins.innerText !== '0' || player2Wins.innerText !== '0') {
    localStorage.clear()
    updatePlayerWins('reset');
  }
  toggleElementVisibility(buttonResetScore);
}

function toggleUnselectedChampionsVisibility() {
  for (var i = 0; i < currentGame.gameLogic.champions.length; i++) {
    toggleElementVisibility(championIcons[i], true);
    toggleElementClickability(championIcons[i]);
    if (championIcons[i].id === currentGame.player1.champion || championIcons[i].id === currentGame.player2.champion) {
      toggleElementVisibility(championIcons[i]);
    }
  }
}

function toggleElementOrder(element) {
  element.classList.toggle('p1-champion-order');
}

function toggleElementClickability(element) {
  element.classList.toggle('not-clickable');
}

function toggleElementVisibility(element, isVisible) {
  element.classList.toggle('hidden', isVisible);
}

function toggleGameTypeContainerVisibility() {
  toggleElementVisibility(gameTypeContainer);
}

function toggleGameTaglines() {
  toggleElementVisibility(gameInstructions);
  toggleElementVisibility(gameResults);
}

function changeGameInstructionText() {
  if (gameTypeContainer.classList.contains('hidden')) {
    gameInstructions.innerText = 'Choose your Champion!';
  } else {
    gameInstructions.innerText = 'Choose your game!';
  }
}

function toggleChampionIconsContainerVisibility(event) {
  toggleElementVisibility(championIconsContainer);
  toggleDifficultChampionsVisibility(event);
}

function toggleDifficultChampionsVisibility(gameType) {
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
  applyGameType(event);
}

function resetGameBoard() {
  toggleElementOrder(currentGame.player1.championToken);
  for (var i = 0; i < currentGame.gameLogic.champions.length; i++) {
    toggleElementVisibility(championIcons[i], false);
    toggleElementClickability(championIcons[i]);
  }
  toggleGameTaglines();
  changeGameInstructionText();
  toggleElementVisibility(buttonChangeGame, false);
  toggleElementVisibility(buttonResetScore, player1Wins.innerText === '0' && player2Wins.innerText === '0');
  displayPlayerChampions();
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

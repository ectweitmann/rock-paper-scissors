// Query Selectors
// Players
var player1Token = document.querySelector('#player1Token').src;
var player1Name = document.querySelector('#player1Name');
var player1Wins = document.querySelector('#player1Wins');
var player1ChampionSelection = document.querySelector('#p1ChampionSelection');
var player2Token = document.querySelector('#player2Token').src;
var player2Name = document.querySelector('#player2Name');
var player2Wins = document.querySelector('#player2Wins');
var player2ChampionSelection = document.querySelector('#p2ChampionSelection');

// Game Types
var gameTypeContainer = document.querySelector('#gameTypeContainer');
var classicGameType = document.querySelector('#classicGameType');
var difficultGameType = document.querySelector('#difficultGameType');

// Champions
var championIconsContainer = document.querySelector('#championIconsContainer');
var championIcons = championIconsContainer.querySelectorAll('img');

// Game Taglines
var gameInstructions = document.querySelector('#gameInstructions');
var gameResults = document.querySelector('#gameResults');

//Buttons
var buttonChangeGame = document.querySelector('#changeGame');
var buttonResetScore = document.querySelector('#resetScore');

// currentGame Variable
var currentGame = new Game(
  new Player(player1Name.innerText, player1Token, player1Wins.innerText),
  new Player(player2Name.innerText, player2Token, player2Wins.innerText)
);

// Event Listeners
window.addEventListener('load', setUpGame);
classicGameType.addEventListener('click', displayGameBoard);
difficultGameType.addEventListener('click', displayGameBoard);
buttonChangeGame.addEventListener('click', displayGameMenu);
buttonResetScore.addEventListener('click', resetScore);

// Callback Functions
function setUpGame(event) {
  displayPlayerWins();
  addEventListenersToChampionIcons();
  if (player1Wins.innerText !== '0' || player1Wins.innerText !== '0') {
    toggleElementVisibility(buttonResetScore, false);
  }
}

function playGame(event) {
  selectChampions(event);
  displayPlayerChampions();
  declareGameResult(currentGame.compareChampions());
  toggleUnselectedChampionsVisibility();
  disableButtons();
  setTimeout(resetGameBoard, 900);
}

function displayGameBoard(event) {
  toggleGameTypeContainerVisibility();
  toggleChampionIconsVisibility(getGameType(event));
  changeGameInstructionText();
  applyGameType(event);
}

function displayGameMenu() {
  toggleChampionIconsVisibility();
  toggleGameTypeContainerVisibility();
  changeGameInstructionText();
  toggleElementVisibility(buttonChangeGame);
}

function resetScore() {
  if (player1Wins.innerText !== '0' || player2Wins.innerText !== '0') {
    localStorage.clear()
    updatePlayerWins('Reset');
  }
  toggleElementVisibility(buttonResetScore);
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
  toggleElementVisibility(buttonResetScore,
    player1Wins.innerText === '0' && player2Wins.innerText === '0');
  displayPlayerChampions();
  enableButtons();
  currentGame.reset();
}

function getGameType(event) {
  return currentGame.type = event.target.children[0].id;
}

// Helper Functions
function applyGameType() {
  currentGame.establishGameType();
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

function declareGameResult(winner) {
  toggleGameTaglines();
  gameResults.innerHTML = '';
  if (winner === 'tie') {
     return gameResults.innerHTML = `‍🪢 It\'s a tie! 🪢`;
  }
  gameResults.innerHTML = `
    <p class="game-tagline">
    <img class="game-result" src="assets/${winner.name}.png">
    ${winner.name} won this round!
    <img class="game-result" src="assets/${winner.name}.png">
    </p>`;
  updatePlayerWins(winner);
}

function updatePlayerWins(player) {
  var updateWins = {
    'Human': function () {
      player1Wins.innerText = `${player.wins}`;
      player.saveWinsToStorage();
    },
    'Computer': function () {
      player2Wins.innerText = `${player.wins}`;
      player.saveWinsToStorage();
    },
    'Reset': function () {
      player1Wins.innerText = '0';
      player2Wins.innerText = '0';
    }
  }
  updateWins[player.name || player]();
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

function disableButtons() {
  buttonChangeGame.disabled = true;
  buttonResetScore.disabled = true;
  toggleElementClickability(buttonChangeGame);
  toggleElementClickability(buttonResetScore);
}

function enableButtons() {
  buttonChangeGame.disabled = false;
  buttonResetScore.disabled = false;
  toggleElementClickability(buttonChangeGame);
  toggleElementClickability(buttonResetScore);
}

function toggleElementOrder(element) {
  element.classList.toggle('p1-champion-order');
}

function toggleElementClickability(element) {
  if (element !== buttonResetScore && element !== buttonChangeGame) {
    element.classList.toggle('not-clickable');
  } else {
    element.classList.toggle('disable-button');
  }

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

function toggleChampionIconsVisibility(event) {
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

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

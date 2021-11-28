// Query Selectors
// Players
const player1Token = document.querySelector('#player1Token').src;
const player1Name = document.querySelector('#player1Name');
const player1Wins = document.querySelector('#player1Wins');
const player1ChampionSelection = document.querySelector('#p1ChampionSelection');
const player2Token = document.querySelector('#player2Token').src;
const player2Name = document.querySelector('#player2Name');
const player2Wins = document.querySelector('#player2Wins');
const player2ChampionSelection = document.querySelector('#p2ChampionSelection');

// Game Types
const gameTypeContainer = document.querySelector('#gameTypeContainer');
const classicGameType = document.querySelector('#classicGameType');
const difficultGameType = document.querySelector('#difficultGameType');

// Champions
const championIconsContainer = document.querySelector('#championIconsContainer');
const championIcons = championIconsContainer.querySelectorAll('img');

// Game Taglines
const gameInstructions = document.querySelector('#gameInstructions');
const gameResults = document.querySelector('#gameResults');

//Buttons
const buttonChangeGame = document.querySelector('#changeGame');
const buttonResetScore = document.querySelector('#resetScore');

// currentGame Variable
const currentGame = new Game(
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
  for (let i = 0; i < currentGame.gameLogic.champions.length; i++) {
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
  toggleElementVisibility(player1ChampionSelection);
  toggleElementVisibility(player2ChampionSelection);
}

function declareGameResult(winner) {
  toggleGameTaglines();
  gameResults.innerHTML = '';
  if (winner === 'tie') {
    return gameResults.innerHTML = `‍🪢 It's a tie! 🪢`;
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
  let updateWins = {
    'Human'() {
      player1Wins.innerText = `${player.wins}`;
      player.saveWinsToStorage();
    },
    'Computer'() {
      player2Wins.innerText = `${player.wins}`;
      player.saveWinsToStorage();
    },
    'Reset'() {
      player1Wins.innerText = '0';
      player2Wins.innerText = '0';
    }
  }
  updateWins[player.name || player]();
}

function toggleUnselectedChampionsVisibility() {
  for (let i = 0; i < currentGame.gameLogic.champions.length; i++) {
    toggleElementVisibility(championIcons[i], true);
    toggleElementClickability(championIcons[i]);
    if (
      championIcons[i].id === currentGame.player1.champion
      || championIcons[i].id === currentGame.player2.champion
    ) {
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
  for (let i = 3; i < championIcons.length; i++) {
    toggleElementVisibility(championIcons[i], gameType === 'classic');
  }
}

function addEventListenersToChampionIcons() {
  championIcons.forEach(championIcon => {
    championIcon.addEventListener('click', playGame)
  });
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

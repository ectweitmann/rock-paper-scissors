class Player {
  constructor(name, token, wins) {
    this.name = name;
    this.token = token;
    this.wins = wins;
  }

  saveWinsToStorage() {

  }

  retrieveWinsFromStorage() {

  }

  takeTurn(champion) {
    if (this.name === 'Human') {
      return this.champion = champion;
    } else {
      return this.champion = currentGame.gameLogic.champions[getRandomIndex(currentGame.gameLogic.champions)];
    }
  }
}

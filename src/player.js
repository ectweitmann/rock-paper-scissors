class Player {
  constructor(name, token, wins) {
    this.name = name;
    this.token = token;
    this.wins = wins;
  }

  saveWinsToStorage() {
    localStorage.setItem(this.name, JSON.stringify(this.wins));
  }

  retrieveWinsFromStorage() {
    return JSON.parse(localStorage.getItem(this.name)) || 0;
  }

  takeTurn(champion) {
    if (this.name === 'Human') {
      return this.champion = champion;
    } else {
      return this.champion = currentGame.gameLogic.champions[
        getRandomIndex(currentGame.gameLogic.champions)];
    }
  }
}

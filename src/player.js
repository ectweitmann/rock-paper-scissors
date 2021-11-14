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
    this.champion = champion;
  }
}

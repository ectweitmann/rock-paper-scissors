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
    if (this.name === 'Computer') {
      this.selection = champion[0].toUpperCase() + champion.slice(1);
    } else {
      this.selection = champion;
    }
  }
}

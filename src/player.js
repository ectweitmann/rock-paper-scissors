class Player {
  constructor(name, token) {
    this.name = name;
    this.token = token;
    this.wins = 0;
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

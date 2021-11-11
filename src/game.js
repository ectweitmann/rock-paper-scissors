class Game {
  constructor (player1, player2, version) {
    this.player1 = player1;
    this.player2 = player2;
    this.version = version;
  }

  playGame(version) {

  }

  compareChampions(version) {

  }

  selectChampion(player, champion) {

  }

  addWin(player) {

  }

  reset() {

  }
}

var originalChampions = {
  rock: {
    beatsPaper: false,
    beatsScissors: true,
  },
  paper: {
    beatsScissors: false,
    beatsRock: true,
  },
  scissors: {
    beatsRock: false,
    beatsPaper: true,
  },
};

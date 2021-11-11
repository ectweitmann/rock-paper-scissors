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
    player.wins++;
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

var alternateChampions = {
  rock: {
    beatsPaper: false,
    beatsSpock: false,
    beatsLizard: true,
    beatsScissors: true,
  },
  paper: {
    beatsScissors: false,
    beatsLizard: false,
    beatsSpock: true,
    beatsRock: true,
  },
  scissors: {
    beatsRock: false,
    beatsSpock: false,
    beatsLizard: true,
    beatsPaper: true,
  },
  lizard: {
    beatsRock: false,
    beatsScissors: false,
    beatsPaper: true,
    beatsSpock: true,
  },
  spock: {
    beatsPaper: false,
    beatsLizard: false,
    beatsScissors: true,
    beatsRock: true,
  },
};

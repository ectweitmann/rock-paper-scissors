class Game {
  constructor (player1, player2, version) {
    this.player1 = player1;
    this.player2 = player2;
    this.version = version;
  }

  playGame(version) {

  }

  compareChampions(version) {
    switch (version) {
      case 'original' :
        if (this.player1.selection === this.player2.selection.toLowerCase()) {
          /*return*/ console.log('‍🪢 It\'s a tie! 🪢');
        } else if (originalChampions[this.player1.selection][`beats${this.player2.selection}`]) {
          this.addWin(this.player1);
          /*return*/ console.log(`${this.player1.token} ${this.player1.name} won this round! ${this.player1.token}`);
        } else if (!originalChampions[this.player1.selection][`beats${this.player2.selection}`]) {
          this.addWin(this.player2);
          /*return*/ console.log(`${this.player2.token} ${this.player2.name} won this round! ${this.player2.token}`);
        }
        break;
      case 'alternate' :
        if (this.player1.selection === this.player2.selection.toLowerCase()) {
          /*return*/ console.log('‍🪢 It\'s a tie! 🪢');
        } else if (alternateChampions[this.player1.selection][`beats${this.player2.selection}`]) {
          this.addWin(this.player1);
          /*return*/ console.log(`${this.player1.token} ${this.player1.name} won this round! ${this.player1.token}`);
        } else if (!alternateChampions[this.player1.selection][`beats${this.player2.selection}`]) {
          this.addWin(this.player2);
          /*return*/ console.log(`${this.player2.token} ${this.player2.name} won this round! ${this.player2.token}`);
        }
        break;
    }
  }

  selectChampion(player, champion) {
    if (player.name === 'Computer') {
      player.selection = champion[0].toUpperCase() + champion.slice(1);
    } else {
      player.selection = champion;
    }
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

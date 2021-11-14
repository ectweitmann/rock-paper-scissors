class Game {
  constructor (player1, player2, type) {
    this.player1 = player1;
    this.player2 = player2;
    this.type = type;
    this.gameLogic = gameLogic[type];
  }

  compareChampions() {
    if (this.player1.champion === this.player2.champion) {
      return 'tie';
    } else if (this.gameLogic[this.player1.champion].beats.includes(this.player2.champion)) {
      return this.player1.name;
    }
    return this.player2.name;
  }

  selectChampions(event) {
    this.player1.takeTurn(event.target.id);
    this.player2.takeTurn(this.gameLogic.champions[getRandomIndex(this.gameLogic.champions)]);
  }

  addWin(player) {
    player.wins++;
  }

  reset() {
    resetGameBoard(this.type);
  }
}

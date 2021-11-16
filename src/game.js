class Game {
  constructor (player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  establishGameType() {
    this.gameLogic = gameLogic[this.type];
  }

  compareChampions() {
    if (this.player1.champion === this.player2.champion) {
      return 'tie';
    } else if (this.gameLogic[this.player1.champion].beats.includes(this.player2.champion)) {
      this.addWin(this.player1);
      return this.player1;
    }
    this.addWin(this.player2);
    return this.player2;
  }

  addWin(player) {
    player.wins = player.retrieveWinsFromStorage() + 1;
  }

  reset() {
    this.player1.champion = null;
    this.player1.championToken = null;
    this.player2.champion = null;
    this.player2.championToken = null;
  }
}

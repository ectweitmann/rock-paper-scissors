class Game {
  constructor (player1, player2, type) {
    this.player1 = player1;
    this.player2 = player2;
    this.gameLogic = gameLogic[type];
  }

  playGame() {
    this.compareChampions();
    this.reset();
  }

  compareChampions() {
    if (this.player1.selection === this.player2.selection) {
      return console.log('‍🪢 It\'s a tie! 🪢');
    } else if (this.gameLogic[this.player1.selection].beats.includes(this.player2.selection)) {
      this.addWin(this.player1);
      return console.log(`${this.player1.token} ${this.player1.name} won this round! ${this.player1.token}`);
    }
    this.addWin(this.player2);
    console.log(`${this.player2.token} ${this.player2.name} won this round! ${this.player2.token}`);
  }

  addWin(player) {
    player.wins++;
  }

  reset() {

  }
}

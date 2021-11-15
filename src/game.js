class Game {
  constructor (player1, player2, type) {
    this.player1 = player1;
    this.player2 = player2;
    this.type = type;
    this.gameLogic = gameLogic[type];
  }

  playGame(event) {
    this.selectChampions(event);
    declareGameResult(this.compareChampions());
    toggleUnselectedChampionsVisibility();
    this.reset();
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

  selectChampions(event) {
    this.player1.takeTurn(event.target.id);
    this.player1.championToken = event.target;
    toggleElementOrder(event.target);
    this.player2.takeTurn(this.gameLogic.champions[getRandomIndex(this.gameLogic.champions)]);
    this.player2.championToken = `assets/${this.player2.champion}.png`;
  }

  addWin(player) {
    player.wins++;
  }

  reset() {
    setTimeout(resetGameBoard, 1000);
  }
}

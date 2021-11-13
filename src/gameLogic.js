var gameLogic = {
  classic: {
    champions: ['rock', 'paper', 'scissors'],
    rock: {
      beats: ['scissors'],
      ties: 'rock',
    },
    paper: {
      beats: ['rock'],
      ties: 'paper',
    },
    scissors: {
      beats: ['paper'],
      ties: 'scissors',
    }
  },
  difficult: {
    champions: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
    rock: {
      beats: ['lizard', 'scissors'],
      ties: 'rock',
    },
    paper: {
      beats: ['spock', 'rock'],
      ties: 'paper',
    },
    scissors: {
      beats: ['lizard', 'paper'],
      ties: 'scissors',
    },
    lizard: {
      beats: ['paper', 'spock'],
      ties: 'lizard',
    },
    spock: {
      beats: ['scissors', 'rock'],
      ties: 'spock',
    }
  }
};

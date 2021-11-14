var player1Name = document.querySelector('#player1Name');
var player1Wins = document.querySelector('#player1Wins');
var player2Name = document.querySelector('#player2Name');
var player2Wins = document.querySelector('#player2Wins');

var gameTypeContainer = document.querySelector('#gameTypeContainer');
var championIconsContainer= document.querySelector('#championIconsContainer');
var gameInstructions = document.querySelector('#gameInstructions');
var gameResults = document.querySelector('#gameResults');

var player1Token = document.querySelector('#player1Token').src;
var player2Token = document.querySelector('#player2Token').src;
var championIcons = championIconsContainer.querySelectorAll('img');

var buttonChangeGame = document.querySelector('#changeGame');

var currentGame;

gameTypeContainer.addEventListener('click', displayGameBoard);
buttonChangeGame.addEventListener('click', displayGameMenu);

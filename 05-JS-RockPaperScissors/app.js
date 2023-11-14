"use strict"

// DOM
const gameResults = document.querySelector('.match-results');
const roundResults = document.querySelector('.game__round-result-message');
const roundPickedHands = document.querySelector('.game__round-hands');
const roundUserPick = document.querySelector('.picked-hand-user');
const roundComputerPick = document.querySelector('.picked-hand-pc');
const player = document.querySelector('.game__player-1');
const computer = document.querySelector('.game__player-2')
const userChoices = [...document.querySelectorAll('.user-choices')];

const playerFinalScore = player.querySelector('.game__player-score');
const computerFinalScore = computer.querySelector('.game__player-score');

let userHand;
let computerHand;
let userScore = 0;
let computerScore = 0;

playerFinalScore.innerText = userScore;
computerFinalScore.innerText = computerScore;

// Functions
const displayUserHand = function (hand){
  roundUserPick.src = `./img/${hand}.png`;
}

const displayComputerHand = function (hand){
  roundComputerPick.src = `./img/${hand}.png`;
}

const displayPickedHands = function (userHand, computerHand){
  displayUserHand(userHand);
  displayComputerHand(computerHand);
  roundPickedHands.classList.add('active');
}

const generateComputerHand = function(){
  const moves = ['rock', 'paper', 'scissors'];
  let randomNumber = Math.floor(Math.random()* 3);
  const randomMove = moves[randomNumber];


  return randomMove;
}

const gameResult = function(userScore, computerScore){
  if(userScore === 3 || computerScore === 3){
    gameResults.classList.add('active');

    if(userScore === 3) {
      gameResults.innerText = `You have won a game!`;
    }
    if(computerScore === 3){
      gameResults.innerText = `Computer has won a game!`;
    }

  }
}

const calculateRound = function calculateRoundResult(user, computer){
  roundResults.classList.add('active');

  if(user === computer){
    roundResults.innerText = `It's a tie`;
    return
  }

  if(user === 'rock' && computer === 'paper'){
    computerScore += 1;
    roundResults.innerText = `Computer won this round`;
  }

  if(user === 'rock' && computer === 'scissors'){
    userScore += 1;
    roundResults.innerText = `User won this round`;
  }

  if(user === 'paper' && computer === 'rock'){
    userScore += 1;
    roundResults.innerText = `User won this round`;
  }

  if(user === 'paper' && computer === 'scissors'){
    computerScore += 1;
    roundResults.innerText = `Computer won this round`;
  }

  if(user === 'scissors' && computer === 'rock'){
    computerScore += 1;
    roundResults.innerText = `Computer won this round`;
  }

  if(user === 'scissors' && computer === 'paper'){
    userScore += 1;
    roundResults.innerText = `User won this round`;
  }

  playerFinalScore.innerText = userScore;
  computerFinalScore.innerText = computerScore;

  gameResult(userScore, computerScore);

}

const resetGame = function(){
  userScore = 0;
  computerScore = 0;
  gameResults.classList.remove('active');
  roundResults.classList.remove('active');
  roundPickedHands.classList.remove('active');  
  playerFinalScore.innerText = userScore;
  computerFinalScore.innerText = computerScore;

}




userChoices.forEach((item) => {
  item.addEventListener('click', ()=>{
      if (userScore === 3 || computerScore === 3){
        resetGame();
      }  
    
      computerHand = generateComputerHand();

      if(item.classList.contains('choice-rock')){
        userHand = 'rock';
        calculateRound(userHand, computerHand);
      }else if (item.classList.contains('choice-paper')){
        userHand = 'paper';
        calculateRound(userHand, computerHand);
      }else if (item.classList.contains('choice-scissors')){
        userHand = 'scissors';
        calculateRound(userHand, computerHand);
      }   
      
      displayPickedHands(userHand, computerHand)
  })

})



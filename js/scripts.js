// Business Logic - - - - - - - - - - - - - - - - - - -



function Player(name){
  this.score = 0,
  this.player = name,
  this.pool = 0
}

function rollDice() {
  var dice = Math.floor(Math.random() * 6) + 1;
  if( dice === 1){
    return false;
  } else {
    return dice;
  }
}

function switchPlayer(turn) {
  if(turn === 0){
    turn = 1;
  } else {
    turn = 0;
  }
  console.log("swapping players");
  return turn;
}

Player.prototype.increasePool = function(currentPlayer) {
  var roll = rollDice();
  if (roll) {
    this.pool += roll;
    console.log(this.player + "'s current pool is: " + this.pool);
    return roll;
  } else {
    this.pool = 0;
    console.log("oh no, you rolled a 1");
    return false;
  }
}

Player.prototype.hold = function(currentPlayer){
  this.score += this.pool;
  this.pool = 0;
  if(this.score >= 10){

    return true;
  } else {
    console.log(this.player + "'s score is now: " + this.score)
    return false;
  }
}



// UI Logic - - - - - - - - - - - - - - - - - - -

function updateScore(p1currentScore, p2currentScore, p1currentPool, p2currentPool, diceRoll="no roll") {
  $("#p1score").text(p1currentScore);
  $("#p1pool").text(p1currentPool);
  $("#p2score").text(p2currentScore);
  $("#p2pool").text(p2currentPool);
  $("#die").text(diceRoll);
}
function displayWinner(playersArray, currentPlayer){
  var winner = playersArray[currentPlayer];
  var loser = playersArray[switchPlayer(currentPlayer)];
  console.log("the winner is: " + winner.player + " and the loser is: " + loser.player);
  $("#winner-name").text(winner.player);
  $("#loser-name").text(loser.player);
  $("#Wscore").text(winner.score);
  $("#Lscore").text(loser.score);
  $(".winnerdisplay").toggle();


}



$(document).ready(function() {
  var playerOne = new Player("player1");
  var playerTwo = new Player("player2");
  var players = [playerOne, playerTwo];
  var currentPlayer = 0;
  $("#roll-dice-btn").click(function(event){
    event.preventDefault();

    var dice = players[currentPlayer].increasePool(currentPlayer);
    if(!dice){
      currentPlayer = switchPlayer(currentPlayer);
      dice = "BUST"
    }
    var p1score = players[0].score
    var p1pool = players[0].pool
    var p2score = players[1].score
    var p2pool = players[1].pool
    updateScore(p1score, p2score, p1pool, p2pool, dice);
  });
  $("#hold-btn").click(function(event) {
    event.preventDefault();

    var turn = players[currentPlayer].hold(currentPlayer);
    if (turn) {
      displayWinner(players, currentPlayer);
    } else {
      currentPlayer = switchPlayer(currentPlayer);
    }

    var p1score = players[0].score
    var p1pool = players[0].pool
    var p2score = players[1].score
    var p2pool = players[1].pool
    updateScore(p1score, p2score, p1pool, p2pool);



  });
});

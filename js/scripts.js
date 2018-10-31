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
  return turn;
}

Player.prototype.increasePool = function(currentPlayer) {
  var roll = rollDice();
  if (roll) {
    this.pool += roll;
    return this.pool;
  } else {
    this.pool = 0;
    return false;
  }
}

Player.prototype.hold = function(currentPlayer){
  this.score += this.pool;
  this.pool = 0;
  if(this.score >= 100){

    return true;
  } else {
    console.log("your score is now: " + this.score)
    return false;
  }
}



// UI Logic - - - - - - - - - - - - - - - - - - -

// if (!increasePool || !hold) {
//   currentPlayer = switchPlayer(currentPlayer);
// }





// players[currentPlayer].increasePool








$(document).ready(function() {
  var playerOne = new Player("testers");
  var playerTwo = new Player("enemy");
  var players = [playerOne, playerTwo];
  var currentPlayer = 0;
  $("#roll-dice-btn").click(function(event){
    event.preventDefault();
    var dice = players[currentPlayer].increasePool(currentPlayer);
    if(!== dice){
      currentPlayer = switchPlayer(currentPlayer);
    }
  });
  $("#hold-btn").click(function(event) {
    event.preventDefault();

      var turn = players[currentPlayer].hold(currentPlayer);
      if (turn) {
        console.log("You are the winner!!!!!");
      } else {
        currentPlayer = switchPlayer(currentPlayer);
      }




  });
});

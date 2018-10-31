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

Player.prototype.increasePool = function() {
  var roll = rollDice();
  if (roll) {
    this.pool += roll;
    return roll;
  } else {
    this.pool = 0;
    return false;
  }
}

Player.prototype.hold = function() {
  this.score += this.pool;
  this.pool = 0;
  if(this.score >= 10){

    return true;
  } else {
    return false;
  }
}

Player.prototype.resetGame = function() {
  this.score = 0;
  this.pool = 0;
}


// UI Logic - - - - - - - - - - - - - - - - - - -

// function updateScoreScreen(p1currentScore, p2currentScore, p1currentPool, p2currentPool, diceRoll="no roll") {
//
//   $("#p1score").text(p1currentScore);
//   $("#p1pool").text(p1currentPool);
//   $("#p2score").text(p2currentScore);
//   $("#p2pool").text(p2currentPool);
//   $("#die").text(diceRoll);
// }

function updateScoreScreen(playerArray, diceRoll="no roll") {

  p1currentScore = playerArray[0].score;
  p1currentPool = playerArray[0].pool;
  p2currentScore = playerArray[1].score;
  p2currentPool = playerArray[1].pool;

  $("#p1score").text(p1currentScore);
  $("#p1pool").text(p1currentPool);
  $("#p2score").text(p2currentScore);
  $("#p2pool").text(p2currentPool);
  $("#die").text(diceRoll);

}


function displayWinner(playersArray, currentPlayer){
  var winner = playersArray[currentPlayer];
  var loser = playersArray[switchPlayer(currentPlayer)];

  $("#winner-name").text(winner.player);
  $("#loser-name").text(loser.player);
  $("#Wscore").text(winner.score);
  $("#Lscore").text(loser.score);
  $(".winnerdisplay").toggle();
  $("#pigs").toggle();

}



$(document).ready(function() {
  var playerOne = new Player("player1");
  var playerTwo = new Player("player2");
  var players = [playerOne, playerTwo];
  var currentPlayer = 0;

  $("#name-input").submit(function(event){
    event.preventDefault();

    var p1header = $("#playeronename").val();
    var p2header = $("#playertwoname").val();

    // if (p1header) {
    //   p1header = "Player 1";
    // } else {
    //   players[0].player = p1header;
    // }
    // if (p2header) {
    //   p2header = "Player 2";
    // } else {
    //   players[1].player = p2header;
    // }

    if (!p1header) {
      p1header = "Player 1";
    }
    if (!p2header) {
      p2header = "Player 2";
    }
    players[0].player = p1header;
    players[1].player = p2header;
    $("#playeronename").val("");
    $("#playertwoname").val("");

    $("#player-one-header").text(p1header);
    $("#player-two-header").text(p2header);
    $("#name-input").toggle();
    $("#pigs").toggle();
  });



  $("#roll-dice-btn").click(function(event){
    event.preventDefault();

    var dice = players[currentPlayer].increasePool();
    if(!dice){
      currentPlayer = switchPlayer(currentPlayer);
      dice = "BUST"
    }
    // var p1score = players[0].score
    // var p1pool = players[0].pool
    // var p2score = players[1].score
    // var p2pool = players[1].pool
    //
    // updateScoreScreen(p1score, p2score, p1pool, p2pool, dice);
    updateScoreScreen(players, dice);
  });


  $("#hold-btn").click(function(event) {
    event.preventDefault();

    var turn = players[currentPlayer].hold();
    if (turn) {
      displayWinner(players, currentPlayer);
    } else {
      currentPlayer = switchPlayer(currentPlayer);
    }

    // var p1score = players[0].score
    // var p1pool = players[0].pool
    // var p2score = players[1].score
    // var p2pool = players[1].pool
    //
    // updateScoreScreen(p1score, p2score, p1pool, p2pool);
    updateScoreScreen(players)
  });


  $("#replay").click(function(event){
    event.preventDefault();
    $(".winnerdisplay").toggle();
    $("#name-input").toggle();
    players[0].resetGame();
    players[1].resetGame();
    updateScoreScreen(players);
  })
});

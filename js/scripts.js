// Business Logic - - - - - - - - - - - - - - - - - - -



function Player(name, index = 1){
  this.score = 0,
  this.player = name,
  this.pool = 0,
  this.index = index
}

function rollDice() {
  var dice = Math.floor(Math.random() * 6) + 1;
  if( dice === 1){
    return false;
  } else {
    return dice;
  }
}
Player.prototype.easyAiOneDice = function(){
  var roll = rollDice();
  var easy = []

  if (roll){
    this.pool += roll;
    easy.push(roll)
    roll = rollDice()

    if (roll) {
      this.pool += roll;
      easy.push(roll)

    } else {
      this.pool = 0;
      easy.push("bust");
    }

  } else {
    this.pool = 0;
    easy.push("bust")
  }

  this.score += this.pool;
  this.pool = 0;
return easy;

}

var cpu = new Player("cpu");

Player.prototype.increaseDoubleDice = function(){
  var double =  rollDice()
  var double2 = rollDice()
  if(double && double2){
    this.pool += double + double2;
    console.log("rolled " + double + " and " + double2);
    return [double, double2];

  } else if (!double && !double2) {
    this.score = 0;
    this.pool = 0;
    console.log("rolled snake eyes " + double + " and " + double2);
    return false;
  } else {
    this.pool = 0;
    console.log("rolled one '1': " + double + " and " + double2);
    return [1];
  }


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
  if(this.score >= 100){

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
function high() {

    $("#p2-field").toggleClass( "highlight" );
    $("#p1-field").toggleClass( "highlight" );
}

function switchPlayer(turn, index) {
  if(turn === 0){
    turn = index;
  } else {
    turn = 0;
  }
  high();

  return turn;

}


function updateScoreScreen(playerArray, index = 1, diceRoll="no roll") {

  p1currentScore = playerArray[0].score;
  p1currentPool = playerArray[0].pool;
  p2currentScore = playerArray[index].score;
  p2currentPool = playerArray[index].pool;

  $("#p1score").text(p1currentScore);
  $("#p1pool").text(p1currentPool);
  $("#p2score").text(p2currentScore);
  $("#p2pool").text(p2currentPool);
  $("#die").text(diceRoll);

}


function displayWinner(playersArray, currentPlayer, index){
  var winner = playersArray[currentPlayer];
  var loser = playersArray[switchPlayer(currentPlayer, index)];

  $("#winner-name").text(winner.player);
  $("#loser-name").text(loser.player);
  $("#Wscore").text(winner.score);
  $("#Lscore").text(loser.score);
  $(".winnerdisplay").toggle();
  $("#pigs").toggle();
  $("body").toggleClass( "pig" );

}



$(document).ready(function() {
  var playerOne = new Player("player1", 0);
  var playerTwo = new Player("player2", 0);
  var compPlayerEasy = new Player("Easy Ai", 1);
  var compPlayerHard = new Player("Hard Ai", 2);


  var players = [playerOne, playerTwo, compPlayerEasy,compPlayerHard];
  var index = 2; // at some point click a button to choose enemy type
  var aiWinCheck = false;
  var currentPlayer = 0;

  $("#name-input").submit(function(event){
    event.preventDefault();

    var p1header = $("#playeronename").val();
    var p2header = $("#playertwoname").val();



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

    updateScoreScreen(players, index);

    if (currentPlayer != 0) {
      high();
    }
    currentPlayer = 0;

    $("#name-input").toggle();
    $("#pigs").toggle();
  });

  $("#select-roll-two").click(function(event){
    event.preventDefault();
    $("#roll-one-div").hide();
    $("#roll-two-div").show();

  });

  $("#select-roll-one").click(function(event){
    event.preventDefault();
    $("#roll-two-div").hide();
    $("#roll-one-div").show();
  });

  $("#roll-two-dice-btn").click(function(event){
    event.preventDefault();

    var dice = players[currentPlayer].increaseDoubleDice();
    var diceString = "";
    if(!dice[0] && !dice[1]){
      currentPlayer = switchPlayer(currentPlayer);
      diceString = "snake eyes"
    } else if (dice[0] === 1) {
      currentPlayer = switchPlayer(currentPlayer);
      dice.join("");
      diceString = 'BUST';
    } else {
      diceString = dice.join(", ");
    }


    updateScoreScreen(players,index, diceString);

  });

  $("#roll-dice-btn").click(function(event){
    event.preventDefault();

    var dice = players[currentPlayer].increasePool();
    if(!dice){
      dice = "BUST"
      console.log("You 'busted'")
      if (index > 1 && players[index].index != 0) {
        setTimeout(function(){ aiRollfunction(players, index); }, 2000);
        high();
      } else {
        currentPlayer = switchPlayer(currentPlayer, index);
      }
    }

    updateScoreScreen(players,index, dice);

    console.log("your roll was " + dice);


  });


  aiRollfunction = function(players, index) {
    var AiDiceResults = players[index].easyAiOneDice();
    updateScoreScreen(players,index, AiDiceResults)
    console.log("Ai rolled");
    currentPlayer = switchPlayer(AiDiceResults, currentPlayer, index);
    return AiDiceResults;

  }

  $("#hold-btn").click(function(event) {
    event.preventDefault();

    var turn = players[currentPlayer].hold();
    if (turn) {
      displayWinner(players, currentPlayer, index);
    } else {
      currentPlayer = switchPlayer(currentPlayer, index);
    }
    console.log("you held ");

    updateScoreScreen(players, index)
    if (index > 1 && players[index].index != 0) {
      setTimeout(function(){ aiRollfunction(players, index); }, 2000);
    }


  });


  $("#replay").click(function(event){
    event.preventDefault();
    $("body").toggleClass( "pig" );
    $(".winnerdisplay").toggle();
    $("#name-input").toggle();
    players[0].resetGame();
    players[1].resetGame();
    high();

  })
});

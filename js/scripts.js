// Business Logic - - - - - - - - - - - - - - - - - - -

function PigDice(){
  this.score = 0;
  this.pool = 0;

}

function rollDice(){
  var dice = Math.floor(Math.random() * 6) + 1;
    return dice;
  // find number between 1 and 6

}
PigDice.prototype.increasePool = function() {
  var roll = rollDice();
  if (roll > 1){
    this.pool += roll;
  } else {
    this.pool = 0;
  }
  return roll;
  // if rolls a number >1 adds that roll to pool if it rolls a 1 resets pool to 0
}
PigDice.prototype.hold = function(){
  this.score = this.score + this.pool;
  this.pool = 0 ;
  // adding the pool to the score and  setting the pool back to 0
}
PigDice.prototype.resetGame = function(){
  this.score = 0;
  this.pool = 0;
  // this is resetting the score and pool back to 0 when you restart the game
}
PigDice.prototype.rollTwo = function(){
  var roll1 = rollDice();
  var roll2 = rollDice();
  if (roll1 + roll2 === 1 + 1){
    this.pool = 0;
    this.score = 0;
    return ("snake eyes");
  } else if (roll1 === 1 || roll2 === 1) {
    this.pool = 0;
    return ("bust")
  }
  else {
    this.pool += roll1 + roll2;
    return roll1 + roll2;
  }
  // if both dice are equal to 1  turns pool and score to 0 and returns snake eyes, if either dice roll a 1 but did not roll a snake eyes  it is a bust. if they dont hit a fail state adds roll to pool and returns both dice amounts added together.
}





// ui logic /////////////////////////////////////////

var playerOne = new PigDice();
// making a variable called playerone that is infused with the parameteres that make up Pigdice ( this.score,this.pool).
// Enter into console to check.

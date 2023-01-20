
let boardArray = [null, null, null, null, null, null, null, null, null]; // keep track of which player's turn it is
let turn = "X";
let pre = turn;
let updated = false;
let moves = 0;
let board = document.getElementById("board");
let square = document.createElement("div");
let message = document.getElementById("message");
const reloadGame = document.getElementById('reload');
const resetGame = document.getElementById('reset');
const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');
const scoreT = document.querySelector('.scoreT');
const hintBtn = document.getElementById('hint');
const none = document.getElementsByClassName('.none');
const card = document.querySelector('.card');
const turnMsg = document.querySelector('.turn');
const hintContainer = document.querySelector('.hint-container');

turnMsg.innerHTML = `${turn}'s turn`
let scoreOne = 0,
    scoreTwo = 0, 
    scoreTie = 0;
score1.innerHTML= `${scoreOne}`;
score2.innerHTML = `${scoreTwo}`;
scoreT.innerHTML = `${scoreTie}`;

function buildTable(){
    for(var i = 0; i<9; i++){
        var square = document.createElement("div");
        square.setAttribute("class", "square");
        square.setAttribute("data-index", i);
        board.appendChild(square);
        square.innerHTML = ""
    }
}
function render(index) {
  // loop through each cell in the array
    console.log("index: ", index)
    var target = document.querySelectorAll("[data-index='"+index+"']");
    // create an HTML element for each cell
    if (boardArray[index] === "X") {
        target[0].setAttribute("class", "player1");
        target[0].innerHTML = "X";
      
    } else if (boardArray[index] === "O") {
      target[0].innerHTML = "O";
      target[0].setAttribute("class", "player2");
    } else {
      target[0].innerHTML = "-";
    } // add the element to the page
    
}
buildTable(); // create a function to handle clicks on the board elements
function clickHandler(event) {
  console.log("event: ", event)
  if (event.target && event.target.matches(".square")) {
    var index = event.target.getAttribute("data-index");
    
    if (boardArray[index] === null) {
      boardArray[index] = turn;  
      moves++;
      render(index);
      if (moves >= 5) {
          checkWin()
        };
      turn = turn === "X" ? "O" : "X";
      if(!updated){
        turnMsg.innerHTML = `${turn}'s turn`
      }
      
      console.log(turn + "'s turn!");
      console.log(moves + " moves made");
      console.log(boardArray);     
    }  
  }
}
document.addEventListener("click", clickHandler);
// create a function to check for wins and ties after each move is made
function checkWin() {
  console.log("boardArray: ", boardArray);
  if (
    ((boardArray[0] === boardArray[1]) && (boardArray[1] === boardArray[2]) &&( boardArray[0] !== null)) ||
    ((boardArray[3] === boardArray[4]) && (boardArray[4] === boardArray[5]) &&(boardArray[3] !== null)) ||
    ((boardArray[6] === boardArray[7]) && (boardArray[7] === boardArray[8]) && (boardArray[6] !== null)) ||
    ((boardArray[0] === boardArray[3]) && (boardArray[3] === boardArray[6]) &&( boardArray[0] !== null)) ||
    ((boardArray[1] === boardArray[4]) && (boardArray[4] === boardArray[7]) &&( boardArray[1] !== null)) ||
    ((boardArray[2] === boardArray[5]) && (boardArray[5] === boardArray[8]) &&( boardArray[2] !== null)) ||
    ((boardArray[0] === boardArray[4]) && (boardArray[4] === boardArray[8]) &&( boardArray[0] !== null)) ||
    ((boardArray[4] === boardArray[6]) && (boardArray[2] === boardArray[4]) &&( boardArray[4] !== null))
  ) {
    if(turn==='X' && !updated){
      scoreOne += 1;
      score1.innerHTML = `${scoreOne}`;
      turnMsg.innerHTML= 'player 1 won!';
      updated = true;
    }else if (turn ==='O' && !updated){
      scoreTwo += 1;
      score2.innerHTML = `${scoreTwo}`;
      turnMsg.innerHTML= 'player 2 won!';
      updated = true;
    } 
  } else if (moves >= 9 && !updated) {
    scoreTie += 1;
    turnMsg.innerHTML= `It's a tie`;
    scoreT.innerHTML= `${scoreTie}`;  
    updated=true;  
  }
} // create a function to reset the game state
function reset() {
  if (pre === "X"){
    turn = "O";
    pre = turn;
  }else{
    turn = "X";
    pre = turn ;
  } 
  updated = false;
  turnMsg.innerHTML = `${turn}'s turn`
  moves = 0;
  for (var i = 0; i < 9; i++) {
    boardArray[i] = null;
  }
  board.innerHTML = "";
 
  buildTable();
  
}
function reload() {
  turn = "X";
  turnMsg.innerHTML = `${turn}'s turn`
  moves = 0;
  for (var i = 0; i < 9; i++) {
    boardArray[i] = null;
  }
  scoreOne = 0;
  scoreTwo = 0;
  scoreTie = 0;
  score1.innerHTML= `${scoreOne}`;
  score2.innerHTML = `${scoreTwo}`;
  scoreT.innerHTML = `${scoreTie}`;
  board.innerHTML = "";
  updated = false;
  buildTable();
}
hintBtn.addEventListener('click', ()=>{
  hintContainer.classList.toggle('clicked');
  // hintContainer.style.top === "-300%"? hintContainer.style.top = "100%" : hintContainer.style.top = "-300%"
})
resetGame.addEventListener('click', reset);
reloadGame.addEventListener('click', reload);

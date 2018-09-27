'use strict';

var player = 1;
var lineColor = "#3d3d29";

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 300;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.3, 0.3);
var tempplayer=1;
// GLOBAL VARIABLES
var moves = 0,
    winner = 0,
	playerstat=0,
    x = 1,
    o = 3,
    playerAI = x,
    computer = o,
    whoseTurn = x,
    gameOver = false,
    score = {
        ties: 0,
        player: 0,
        computer: 0,
		friend:0
    },
    xText = "<span class=\"x\">&times;</class>",
    oText = "<span class=\"o\">o</class>",
    playerText = xText,
    computerText = oText,
    difficulty = 1,
    myGrid = null;
var box  = [
    [0,1,2],
    [3,4,5],
	[6,7,8],
	 
]; 
 
function getInitialBoard (defaultValue) {
  var board = [];
 myGrid = new Grid();
    moves = 0;
    winner = 0;
    gameOver = false;
    whoseTurn = player; // default, this may change
    for (var i = 0; i <= myGrid.cells.length - 1; i++) {
        myGrid.cells[i] = 0;
    }
  for (var x = 0;x < 3;x++) {
    board.push([]);

    for (var y = 0;y < 3;y++) {
      board[x].push(defaultValue);
    }
  }
   setTimeout(showOptions, 500);
  return board;
}

var board = getInitialBoard("");

function addPlayingPiece (mouse) {
  var xCordinate;
  var yCordinate;
 	 	 
 
  for (var x = 0;x <= 3;x++) {
    for (var y = 0;y <= 3;y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;
			 
      if (
          mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
          mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
        ) {
        
          
	//clearPlayingArea(xCordinate, yCordinate);
        if (player === 1 && myGrid.cells[box[x][y]]==0 ) {
		 //box[x][y]=1;
		 moves += 1;
		   myGrid.cells[box[x][y]] = 1;
		 drawX(xCordinate, yCordinate);
		 } else  if (player === 2 && myGrid.cells[box[x][y]]==0 ){
				//	 box[x][y]=2;
			 moves += 1;
				myGrid.cells[box[x][y]] = 2;
					 drawO(xCordinate, yCordinate);
		}else  if (player === 1||player === 2 && myGrid.cells[box[x][y]]!=0 ){
					 tempplayer=player;
					 player= 3;
			 }
		
		//document.getElementById("demo").innerHTML = box+'  x='+x+'  y='+y+' box['+x+']['+y+']=='+box[x][y] +'';
      }
    }
  }
  if (moves >= 5) {
        winner = checkWinPlayer();
    }
	
	if(winner==1){
 
	console.log("score.player"+score.player);
	endGame(winner);
	announceWinner("player x wins!");
	}else if(winner==2){
	 
	  
	  endGame(winner);
	announceWinner("player o wins!");
	}
}

function clearPlayingArea (xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  ); 
}
function drawO (xCordinate, yCordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 40 ) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 3 * Math.PI;

  context.lineWidth = 5;
  context.strokeStyle = "#01bBC2";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX (xCordinate, yCordinate) {
  context.strokeStyle = "#ff704d";

  context.beginPath();
  
  var offset = 30;
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
}

function drawLines (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  /*
   * Garis Horizontal   
   */
  for (var y = 1;y <= 2;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  /*
   * Garis Vertical   
   */
  for (var x = 1;x <= 2;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

drawLines(3, lineColor);

function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mouseup', function (event) {
  if (player === 1  ) {
     player = 2;
  } else if(player === 2  ){
    player = 1;
  } else if(player === 3  ){
    player = tempplayer;
  } 


  var canvasMousePosition = getCanvasMousePosition(event);
  addPlayingPiece(canvasMousePosition);
  drawLines(3, lineColor);
  
});
 
 
 
function checkWinPlayer() {
    winner = 0;

    // rows
    for (var i = 0; i <= 2; i++) {
        var row = myGrid.getRowValues(i);
        if (row[0] > 0 && row[0] == row[1] && row[0] == row[2]) {
            if (row[0] == 2) {
                score.friend++;
                winner = player;
                // console.log("computer wins");
            } else {
                score.player++;
                winner = player;
                // console.log("player wins");
            }
            
            return winner;
        }
    }

    // columns
    for (i = 0; i <= 2; i++) {
        var col = myGrid.getColumnValues(i);
        if (col[0] > 0 && col[0] == col[1] && col[0] == col[2]) {
            if (col[0] == 2) {
                score.friend++;
                winner = player;
                // console.log("computer wins");
            } else {
                score.player++;
                winner = player;
                // console.log("player wins");
            }
        
            return winner;
        }
    }

    // diagonals
    for (i = 0; i <= 1; i++) {
        var diagonal = myGrid.getDiagValues(i);
        if (diagonal[0] > 0 && diagonal[0] == diagonal[1] && diagonal[0] == diagonal[2]) {
            if (diagonal[0] == 2) {
                score.friend++;
                winner = player;
                // console.log("computer wins");
            } else {
                score.player++;
                winner = player;
                // console.log("player wins");
            }
            
            return winner;
        }
    }

    // If we haven't returned a winner by now, if the board is full, it's a tie
    var myArr = myGrid.getFreeCellIndices();
	console.log("pp"+myArr);
    if (myArr.length === 0) {
		console.log(myArr);
        winner = 10;
        score.ties++;
        endGame(winner);
        return winner;
    }

    return winner;
}

"use strict";

/*

A SIMPLE TIC-TAC-TOE GAME IN JAVASCRIPT

(1) Grid layout

The game grid is represented in the array Grid.cells as follows:

[0] [1] [2]
[3] [4] [5]
[6] [7] [8]

The cells (array elements) hold the following numeric values:
0 if not occupied, 1 for playerAI, 3 for computer.
This allows us to quickly get an overview of the game state:
if the sum of all the cells in a row is 9, the computer wins,
if it is 3 and all the cells are occupied, the human playerAI wins,
etc.

(2) Strategy of makeComputerMove()

The computer first  looks for almost completed rows, columns, and
diagonals, where there are two fields occupied either by the human
playerAI or by the computer itself. If the computer can win by
completing a sequence, it does so; if it can block the playerAI from
winning with the next move, it does that. If none of that applies,
it plays the center field if that's free, otherwise it selects a
random free field. This is not a 100 % certain strategy, but the
gameplay experience is fairly decent.

*/

//==================================
// EVENT BINDINGS
//==================================

// Bind Esc key to closing the modal dialog
document.onkeypress = function (evt) {
    evt = evt || window.event;
    var modal = document.getElementsByClassName("modal")[0];
    if (evt.keyCode === 27) {
        modal.style.display = "none";
    }
};

// When the user clicks anywhere outside of the modal dialog, close it
window.onclick = function (evt) {
    var modal = document.getElementsByClassName("modal")[0];
    if (evt.target === modal) {
        modal.style.display = "none";
    }
};

//==================================
// HELPER FUNCTIONS
//==================================
function sumArray(array) {
    var sum = 0,
        i = 0;
    for (i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

function isInArray(element, array) {
    if (array.indexOf(element) > -1) {
        return true;
    }
    return false;
}

function shuffleArray(array) {
    var counter = array.length,
        temp,
        index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function intRandom(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

 
//==================================
// GRID OBJECT
//==================================

// Grid constructor
//=================
function Grid() {
    this.cells = new Array(9);
}

// Grid methods
//=============

// Get free cells in an array.
// Returns an array of indices in the original Grid.cells array, not the values
// of the array elements.
// Their values can be accessed as Grid.cells[index].
Grid.prototype.getFreeCellIndices = function () {
    var i = 0,
        resultArray = [];
    for (i = 0; i < this.cells.length; i++) {
        if (this.cells[i] === 0) {
            resultArray.push(i);
        }
    }
    // console.log("resultArray: " + resultArray.toString());
    // debugger;
    return resultArray;
};

// Get a row (accepts 0, 1, or 2 as argument).
// Returns the values of the elements.
Grid.prototype.getRowValues = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getRowValues!");
        return undefined;
    }
    var i = index * 3;
    return this.cells.slice(i, i + 3);
};

// Get a row (accepts 0, 1, or 2 as argument).
// Returns an array with the indices, not their values.
Grid.prototype.getRowIndices = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getRowIndices!");
        return undefined;
    }
    var row = [];
    index = index * 3;
    row.push(index);
    row.push(index + 1);
    row.push(index + 2);
    return row;
};

// get a column (values)
Grid.prototype.getColumnValues = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getColumnValues!");
        return undefined;
    }
    var i, column = [];
    for (i = index; i < this.cells.length; i += 3) {
        column.push(this.cells[i]);
    }
    return column;
};

// get a column (indices)
Grid.prototype.getColumnIndices = function (index) {
    if (index !== 0 && index !== 1 && index !== 2) {
        console.error("Wrong arg for getColumnIndices!");
        return undefined;
    }
    var i, column = [];
    for (i = index; i < this.cells.length; i += 3) {
        column.push(i);
    }
    return column;
};

// get diagonal cells
// arg 0: from top-left
// arg 1: from top-right
Grid.prototype.getDiagValues = function (arg) {
    var cells = [];
    if (arg !== 1 && arg !== 0) {
        console.error("Wrong arg for getDiagValues!");
        return undefined;
    } else if (arg === 0) {
        cells.push(this.cells[0]);
        cells.push(this.cells[4]);
        cells.push(this.cells[8]);
    } else {
        cells.push(this.cells[2]);
        cells.push(this.cells[4]);
        cells.push(this.cells[6]);
    }
    return cells;
};

// get diagonal cells
// arg 0: from top-left
// arg 1: from top-right
Grid.prototype.getDiagIndices = function (arg) {
    if (arg !== 1 && arg !== 0) {
        console.error("Wrong arg for getDiagIndices!");
        return undefined;
    } else if (arg === 0) {
        return [0, 4, 8];
    } else {
        return [2, 4, 6];
    }
};

// Get first index with two in a row (accepts computer or playerAI as argument)
Grid.prototype.getFirstWithTwoInARow = function (agent) {
    if (agent !== computer && agent !== playerAI) {
        console.error("Function getFirstWithTwoInARow accepts only playerAI or computer as argument.");
        return undefined;
    }
    var sum = agent * 2,
        freeCells = shuffleArray(this.getFreeCellIndices());
    for (var i = 0; i < freeCells.length; i++) {
        for (var j = 0; j < 3; j++) {
            var rowV = this.getRowValues(j);
            var rowI = this.getRowIndices(j);
            var colV = this.getColumnValues(j);
            var colI = this.getColumnIndices(j);
            if (sumArray(rowV) == sum && isInArray(freeCells[i], rowI)) {
                return freeCells[i];
            } else if (sumArray(colV) == sum && isInArray(freeCells[i], colI)) {
                return freeCells[i];
            }
        }
        for (j = 0; j < 2; j++) {
            var diagV = this.getDiagValues(j);
            var diagI = this.getDiagIndices(j);
            if (sumArray(diagV) == sum && isInArray(freeCells[i], diagI)) {
                return freeCells[i];
            }
        }
    }
    return false;
};

Grid.prototype.reset = function () {
    for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = 0;
    }
    return true;
};

//==================================
// MAIN FUNCTIONS
//==================================

// executed when the page loads
function initialize() {
    myGrid = new Grid();
    moves = 0;
    winner = 0;
    gameOver = false;
    whoseTurn = playerAI; // default, this may change
    for (var i = 0; i <= myGrid.cells.length - 1; i++) {
        myGrid.cells[i] = 0;
    }
    // setTimeout(assignRoles, 500);
    setTimeout(showOptions, 500);
    // debugger;
}

// Ask playerAI if they want to play as X or O. X goes first.
function assignRoles() {
    askUser("Do you want to go first?");
    document.getElementById("yesBtn").addEventListener("click", makeplayerAIX);
    document.getElementById("noBtn").addEventListener("click", makeplayerAIO);
}

function makeplayerAIX() {
    playerAI = x;
    computer = o;
    whoseTurn = playerAI;
    playerText = xText;
    computerText = oText;
    document.getElementById("userFeedback").style.display = "none";
    document.getElementById("yesBtn").removeEventListener("click", makeplayerAIX);
    document.getElementById("noBtn").removeEventListener("click", makeplayerAIO);
}

function makeplayerAIO() {
    playerAI = o;
    computer = x;
    whoseTurn = computer;
    playerText = oText;
    computerText = xText;
    setTimeout(makeComputerMove, 400);
    document.getElementById("userFeedback").style.display = "none";
    document.getElementById("yesBtn").removeEventListener("click", makeplayerAIX);
    document.getElementById("noBtn").removeEventListener("click", makeplayerAIO);
}

// executed when playerAI clicks one of the table cells
function cellClicked(id) {
    // The last character of the id corresponds to the numeric index in Grid.cells:
    var idName = id.toString();
    var cell = parseInt(idName[idName.length - 1]);
    if (myGrid.cells[cell] > 0 || whoseTurn !== playerAI || gameOver) {
        // cell is already occupied or something else is wrong
        return false;
    }
    moves += 1;
    document.getElementById(id).innerHTML = playerText;
    // randomize orientation (for looks only)
    var rand = Math.random();
    if (rand < 0.3) {
        document.getElementById(id).style.transform = "rotate(180deg)";
    } else if (rand > 0.6) {
        document.getElementById(id).style.transform = "rotate(90deg)";
    }
    document.getElementById(id).style.cursor = "default";
    myGrid.cells[cell] = playerAI;
    // Test if we have a winner:
    if (moves >= 5) {
        winner = checkWin();
    }
    if (winner === 0) {
        whoseTurn = computer;
        makeComputerMove();
    }
    return true;
}

// Executed when playerAI hits restart button.
// ask should be true if we should ask users if they want to play as X or O
function restartGame(ask) {
    if (moves > 0) {
        var response = confirm("Are you sure you want to start over?");
        if (response === false) {
            return;
        }
    }
    gameOver = false;
    moves = 0;
    winner = 0;
    whoseTurn = x;
    myGrid.reset();
    for (var i = 0; i <= 8; i++) {
        var id = "cell" + i.toString();
        document.getElementById(id).innerHTML = "";
        document.getElementById(id).style.cursor = "pointer";
        document.getElementById(id).classList.remove("win-color");
    }
    if (ask === true) {
        // setTimeout(assignRoles, 200);
		console.log("tes");
		  for (var x = 0;x <  3;x++) {
    for (var y = 0;y <  3;y++) {
    var  xCordinate = x * sectionSize;
     var yCordinate = y * sectionSize;
	  clearPlayingArea(xCordinate, yCordinate);
	  }}
	  board = getInitialBoard("");
	  drawLines(3, lineColor);
        setTimeout(showOptions, 200);
    } else if (whoseTurn == computer) {
        setTimeout(makeComputerMove, 800);
    }
}

// The core logic of the game AI:
function makeComputerMove() {
    // debugger;
    if (gameOver) {
        return false;
    }
    var cell = -1,
        myArr = [],
        corners = [0,2,6,8];
    if (moves >= 3) {
        cell = myGrid.getFirstWithTwoInARow(computer);
        if (cell === false) {
            cell = myGrid.getFirstWithTwoInARow(playerAI);
        }
        if (cell === false) {
            if (myGrid.cells[4] === 0 && difficulty == 1) {
                cell = 4;
            } else {
                myArr = myGrid.getFreeCellIndices();
                cell = myArr[intRandom(0, myArr.length - 1)];
            }
        }
        // Avoid a catch-22 situation:
        if (moves == 3 && myGrid.cells[4] == computer && playerAI == x && difficulty == 1) {
            if (myGrid.cells[7] == playerAI && (myGrid.cells[0] == playerAI || myGrid.cells[2] == playerAI)) {
                myArr = [6,8];
                cell = myArr[intRandom(0,1)];
            }
            else if (myGrid.cells[5] == playerAI && (myGrid.cells[0] == playerAI || myGrid.cells[6] == playerAI)) {
                myArr = [2,8];
                cell = myArr[intRandom(0,1)];
            }
            else if (myGrid.cells[3] == playerAI && (myGrid.cells[2] == playerAI || myGrid.cells[8] == playerAI)) {
                myArr = [0,6];
                cell = myArr[intRandom(0,1)];
            }
            else if (myGrid.cells[1] == playerAI && (myGrid.cells[6] == playerAI || myGrid.cells[8] == playerAI)) {
                myArr = [0,2];
                cell = myArr[intRandom(0,1)];
            }
        }
        else if (moves == 3 && myGrid.cells[4] == playerAI && playerAI == x && difficulty == 1) {
            if (myGrid.cells[2] == playerAI && myGrid.cells[6] == computer) {
                cell = 8;
            }
            else if (myGrid.cells[0] == playerAI && myGrid.cells[8] == computer) {
                cell = 6;
            }
            else if (myGrid.cells[8] == playerAI && myGrid.cells[0] == computer) {
                cell = 2;
            }
            else if (myGrid.cells[6] == playerAI && myGrid.cells[2] == computer) {
                cell = 0;
            }
        }
    } else if (moves === 1 && myGrid.cells[4] == playerAI && difficulty == 1) {
        // if playerAI is X and played center, play one of the corners
        cell = corners[intRandom(0,3)];
    } else if (moves === 2 && myGrid.cells[4] == playerAI && computer == x && difficulty == 1) {
        // if playerAI is O and played center, take two opposite corners
        if (myGrid.cells[0] == computer) {
            cell = 8;
        }
        else if (myGrid.cells[2] == computer) {
            cell = 6;
        }
        else if (myGrid.cells[6] == computer) {
            cell = 2;
        }
        else if (myGrid.cells[8] == computer) {
            cell = 0;
        }
    } else if (moves === 0 && intRandom(1,10) < 8) {
        // if computer is X, start with one of the corners sometimes
        cell = corners[intRandom(0,3)];
    } else {
        // choose the center of the board if possible
        if (myGrid.cells[4] === 0 && difficulty == 1) {
            cell = 4;
        } else {
            myArr = myGrid.getFreeCellIndices();
            cell = myArr[intRandom(0, myArr.length - 1)];
        }
    }
    var id = "cell" + cell.toString();
    // console.log("computer chooses " + id);
    document.getElementById(id).innerHTML = computerText;
    document.getElementById(id).style.cursor = "default";
    // randomize rotation of marks on the board to make them look
    // as if they were handwritten
    var rand = Math.random();
    if (rand < 0.3) {
        document.getElementById(id).style.transform = "rotate(180deg)";
    } else if (rand > 0.6) {
        document.getElementById(id).style.transform = "rotate(90deg)";
    }
    myGrid.cells[cell] = computer;
    moves += 1;
    if (moves >= 5) {
        winner = checkWin();
    }
    if (winner === 0 && !gameOver) {
        whoseTurn = playerAI;
    }
}

// Check if the game is over and determine winner
function checkWin() {
    winner = 0;

    // rows
    for (var i = 0; i <= 2; i++) {
        var row = myGrid.getRowValues(i);
        if (row[0] > 0 && row[0] == row[1] && row[0] == row[2]) {
            if (row[0] == computer) {
                score.computer++;
                winner = computer;
                // console.log("computer wins");
            } else {
                score.playerAI++;
                winner = playerAI;
                // console.log("playerAI wins");
            }
            // Give the winning row/column/diagonal a different bg-color
            var tmpAr = myGrid.getRowIndices(i);
            for (var j = 0; j < tmpAr.length; j++) {
                var str = "cell" + tmpAr[j];
                document.getElementById(str).classList.add("win-color");
            }
            setTimeout(endGame, 1000, winner);
            return winner;
        }
    }

    // columns
    for (i = 0; i <= 2; i++) {
        var col = myGrid.getColumnValues(i);
        if (col[0] > 0 && col[0] == col[1] && col[0] == col[2]) {
            if (col[0] == computer) {
                score.computer++;
                winner = computer;
                // console.log("computer wins");
            } else {
                score.playerAI++;
                winner = playerAI;
                // console.log("playerAI wins");
            }
            // Give the winning row/column/diagonal a different bg-color
            var tmpAr = myGrid.getColumnIndices(i);
            for (var j = 0; j < tmpAr.length; j++) {
                var str = "cell" + tmpAr[j];
                document.getElementById(str).classList.add("win-color");
            }
            setTimeout(endGame, 1000, winner);
            return winner;
        }
    }

    // diagonals
    for (i = 0; i <= 1; i++) {
        var diagonal = myGrid.getDiagValues(i);
        if (diagonal[0] > 0 && diagonal[0] == diagonal[1] && diagonal[0] == diagonal[2]) {
            if (diagonal[0] == computer) {
                score.computer++;
                winner = computer;
                // console.log("computer wins");
            } else {
                score.playerAI++;
                winner = playerAI;
                // console.log("playerAI wins");
            }
            // Give the winning row/column/diagonal a different bg-color
            var tmpAr = myGrid.getDiagIndices(i);
            for (var j = 0; j < tmpAr.length; j++) {
                var str = "cell" + tmpAr[j];
                document.getElementById(str).classList.add("win-color");
            }
            setTimeout(endGame, 1000, winner);
            return winner;
        }
    }

    // If we haven't returned a winner by now, if the board is full, it's a tie
    var myArr = myGrid.getFreeCellIndices();
    if (myArr.length === 0) {
        winner = 10;
        score.ties++;
        endGame(winner);
        return winner;
    }

    return winner;
}

function announceWinner(text) {
    document.getElementById("winText").innerHTML = text;
    document.getElementById("winAnnounce").style.display = "block";
    setTimeout(closeModal, 1400, "winAnnounce");
}

function askUser(text) {
    document.getElementById("questionText").innerHTML = text;
    document.getElementById("userFeedback").style.display = "block";
}

function showOptions() {
    if (playerAI == o) {
        document.getElementById("rx").checked = false;
        document.getElementById("ro").checked = true;
    }
    /*else if (playerAI == x) {
        document.getElementById("rx").checked = true;
        document.getElementById("ro").checked = false;
    }*/
    if (difficulty === 0) {
        document.getElementById("r0").checked = true;
        document.getElementById("r1").checked = false;
    }
    else {
        document.getElementById("r0").checked = false;
        document.getElementById("r1").checked = true;
    }
    document.getElementById("optionsDlg").style.display = "block";
}

function getOptions() {
    var diffs = document.getElementsByName('difficulty');
    for (var i = 0; i < diffs.length; i++) {
        if (diffs[i].checked) {
            difficulty = parseInt(diffs[i].value);
            break;
            // debugger;
        }
    }
    //if (document.getElementById('rx').checked === true) {
        playerAI = x;
        computer = o;
        whoseTurn = playerAI;
        playerText = xText;
        computerText = oText;
   /* }
    else {
        playerAI = o;
        computer = x;
        whoseTurn = computer;
        playerText = oText;
        computerText = xText;
        setTimeout(makeComputerMove, 400);
    }*/
	 if (document.getElementById('pp').checked === true) {
	 playerstat=1;
	document.getElementById("playcomputer").style.visibility = "hidden"; 
	document.getElementById("playplayer").style.visibility = "visible";
	}
	 if (document.getElementById('pc').checked === true) {
	 playerstat=2;
	document.getElementById("playplayer").style.visibility = "hidden";
document.getElementById("playcomputer").style.visibility = "visible"; 	
	}
    document.getElementById("optionsDlg").style.display = "none";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function endGame(who) {
    if (who == playerAI) {
        announceWinner("Congratulations, you won!");
    } else if (who == computer) {
        announceWinner("Computer wins!");
    } else {
        announceWinner("It's a tie!");
    }
    gameOver = true;
    whoseTurn = 0;
    moves = 0;
    winner = 0;
	
	document.getElementById("friend_score").innerHTML = score.friend==undefined ?0:score.friend;
    document.getElementById("computer_score").innerHTML = score.computer==undefined ?0:score.computer;
    document.getElementById("tie_score").innerHTML = score.ties;
	 
    document.getElementById("player_score").innerHTML = score.player ==undefined ?0:score.player  ; 
    for (var i = 0; i <= 8; i++) {
        var id = "cell" + i.toString();
        document.getElementById(id).style.cursor = "default";
    }
    setTimeout(restartGame, 800);
}

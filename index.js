'use strict';

var player = 1;
var lineColor = "#3d3d29";

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 500;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);
var tempplayer=1;
 
var box  = [
    [0,0,0],
    [0,0,0],
	[0,0,0],
	 
]; 
 
function getInitialBoard (defaultValue) {
  var board = [];

  for (var x = 0;x < 3;x++) {
    board.push([]);

    for (var y = 0;y < 3;y++) {
      board[x].push(defaultValue);
    }
  }

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
        if (player === 1 && box[x][y]==0 ) {
		 box[x][y]=1;
		 drawX(xCordinate, yCordinate);
		 } else  if (player === 2 && box[x][y]==0 ){
					 box[x][y]=2;
					 drawO(xCordinate, yCordinate);
		}else  if (player === 1||player === 2 && box[x][y]!=0 ){
					 tempplayer=player;
					 player= 3;
			 }
		
		//document.getElementById("demo").innerHTML = box+'  x='+x+'  y='+y+' box['+x+']['+y+']=='+box[x][y] +'';
      }
    }
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
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#01bBC2";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX (xCordinate, yCordinate) {
  context.strokeStyle = "#ff704d";

  context.beginPath();
  
  var offset = 50;
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

drawLines(10, lineColor);

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
  drawLines(10, lineColor);
  
});
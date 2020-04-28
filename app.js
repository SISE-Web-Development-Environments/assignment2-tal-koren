var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var pacInterval;
var monsterInterval;
var pac_face;
var strikes;
var monstersArr;
var prevVal;
var right;
var left;
var up;
var down;
var music= new Audio('resource\\Thunderstruck.mp3');
var monserPlace;

$(document).ready(function() {
	context = canvas.getContext("2d");
	music.play();
	Start();
});

function ResetGame(){
	removeEventListener("keydown",updateDownKey);
	removeEventListener("keyup",updateUpKey);
	clearInterval(pacInterval);
	clearInterval(monsterInterval);
	music.pause();
	music.currentTime = 0;
	music.play();
	Start();
}

function Start() {
	monsterPlace = new Array();
	right = 39;
	left = 37;
	down = 40;
	up = 38;
	let monsterNum = 4;
	monstersArr = new Array();
	prevVal = new Array();
	let greeny = new Image();
	greeny.src = "resource\\greenMonster.gif";
	monstersArr[0] = greeny;//1-monster
	prevVal[0] = 0;
	if(monsterNum > 1){
		let orangey = new Image();
		orangey.src = "resource\\orangeMonster.png";
		monstersArr[1] = orangey;//2-monster
		prevVal[1] = 0;
		if(monsterNum > 2){
			let pinky = new Image();
			pinky.src = "resource\\pinkMonster.gif";
			monstersArr[2] = pinky;//3-monster
			prevVal[2] = 0;
			if(monsterNum > 3){
				let reddy = new Image();
				reddy.src = "resource\\redMonster.gif";
				monstersArr[3] = reddy;//4-monster
				prevVal[3] = 0;
			}
		}
	}
	pac_face = 4;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	let monsterCount = monsterNum;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;//wall
			} else {
				if((i == 0 && j == 0) && (monsterCount > 0)){
					monsterCount--;
					board[i][j] = 10;//1-monster
					monsterPlace[0].x = i;
					monsterPlace[0].y = j;
 					continue;
				}
				else if((i == 0 && j == 9) && (monsterCount > 0)){
					monsterCount--;
					board[i][j] = 9;//2-monster
					monsterPlace[1].x = i;
					monsterPlace[1].y = j;
					continue;
				}
				else if((i == 9 && j == 0) && (monsterCount > 0)){
					monsterCount--;
					board[i][j] = 8;//3-monster
					monsterPlace[2].x = i;
					monsterPlace[2].y = j;
					continue;
				}
				else if((i == 9 && j == 9) && (monsterCount > 0)){
					monsterCount--;
					board[i][j] = 7;//4-monster
					monsterPlace[3].x = i;
					monsterPlace[3].y = j;
					continue;
				}
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;//food
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;//packman
				} else {
					board[i][j] = 0;//empty
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener("keydown", updateDownKey);
	addEventListener("keyup", updateUpKey);
	pacInterval = setInterval(UpdatePacPosition, 150);
	monsterInterval = setInterval(UpdateMonstersPosition, 1500);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up]) {
		return 1;
	}
	if (keysDown[down]) {
		return 2;
	}
	if (keysDown[left]) {
		return 3;
	}
	if (keysDown[right]) {
		return 4;
	}
}

function updateDownKey(e) {
	keysDown[e.keyCode] = true;
}

function updateUpKey(e) {
	keysDown[e.keyCode] = false;
}

function Draw() {
	let rotate = 0;
	let centerizeX = 5;
	let centerizeY = -15;
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 50 + 25;
			center.y = j * 50 + 25;
			if (board[i][j] == 2) {
				if(pac_face == 4){//right
					rotate = 0;
					centerizeX = 4;
					centerizeY = -12;
				}
				else if(pac_face == 3){//left
					rotate = Math.PI;
					centerizeX = -4;
					centerizeY = -12;
				}
				else if(pac_face == 2){//down
					rotate = 0.5 * Math.PI;
					centerizeX = -12;
					centerizeY = 4;
				}
				else if (pac_face == 1){//up
					rotate =1.5 * Math.PI;
					centerizeX = 12;
					centerizeY = -4;
				}
				context.beginPath();
				context.arc(center.x , center.y, 18, 0.15 * Math.PI + rotate, 1.85 * Math.PI + rotate); // pac circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + centerizeX, center.y + centerizeY, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			else if(board[i][j] == 10){//draw 1-monster
				context.drawImage(monstersArr[0], center.x - 15, center.y - 15);
			}
			else if(board[i][j] == 9){//draw 2-monster
				context.drawImage(monstersArr[1], center.x - 15, center.y-15);
			}
			else if(board[i][j] == 8){//draw 3-monster
				context.drawImage(monstersArr[2], center.x - 15, center.y-15);
			}
			else if(board[i][j] == 7){//draw 4-monster
				context.drawImage(monstersArr[3], center.x - 15, center.y-15);
			}
		}
	}
}

function UpdatePacPosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
		pac_face = 1;
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
		pac_face = 2;
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
		pac_face = 3;
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
		pac_face = 4;
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(pacInterval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function UpdateMonstersPosition() {
	for(var i=0; i<monsterCount; i++){

	}
}
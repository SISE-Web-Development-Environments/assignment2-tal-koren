var context;
var shape = new Object();
var board = new Array();
var pac_color = "yellow";
var start_time;
var time_elapsed;
var pacInterval;
var monsterInterval;
var pac_face = 4;;
var strikes = 5;
var food = 90;
var monstersPicArr = new Array();;
var prevMonsterVal = new Array();;
var monsterPlace = new Array();
var right = 39;
var left = 37;
var down = 40;
var up = 38;
var score = 0;
var circleEaten = 0;
var music= new Audio('resource\\Thunderstruck.mp3');
var monsterCount = 4;
var game_time = 60;
var leftFreeOnBoard = new Array();


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function ResetGame(){
	removeEventListener("keydown",updateDownKey);
	removeEventListener("keyup",updateUpKey);
	clearInterval(pacInterval);
	clearInterval(monsterInterval);
	music.pause();
	music.currentTime = 0;
	strikes = 5;
	monstersPicArr = new Array();;
	prevMonsterVal = new Array();;
	monsterPlace = new Array();
	board = new Array();
	pac_color = "yellow";
	score = 0;
	circleEaten = 0;
	Start();
}

function Start() {
	//music.play();
	let greeny = new Image();
	greeny.src = "resource\\greenMonster.gif";
	monstersPicArr[0] = greeny;//1-monster
	prevMonsterVal[0] = 0;
	if(monsterCount > 1){
		let orangey = new Image();
		orangey.src = "resource\\orangeMonster.png";
		monstersPicArr[1] = orangey;//2-monster
		prevMonsterVal[1] = 0;
		if(monsterCount > 2){
			let pinky = new Image();
			pinky.src = "resource\\pinkMonster.gif";
			monstersPicArr[2] = pinky;//3-monster
			prevMonsterVal[2] = 0;
			if(monsterCount > 3){
				let reddy = new Image();
				reddy.src = "resource\\redMonster.gif";
				monstersPicArr[3] = reddy;//4-monster
				prevMonsterVal[3] = 0;
			}
		}
	}
	let food_remain = food;
	var cnt = 100;
	var pacman_remain = 1;
	start_time = new Date();
	let count = monsterCount;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		for (var j = 0; j < 10; j++) {
			leftFreeOnBoard.push(i*10+j);
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;//wall
				leftFreeOnBoard.pop();
			} else {
				if((i == 0 && j == 0) && (count > 0)){
					count--;
					board[i][j] = 10;//1-monster
					monsterPlace[0] = new Object();
					monsterPlace[0].i = i;
					monsterPlace[0].j = j;
					leftFreeOnBoard.pop();
 					continue;
				}
				else if((i == 0 && j == 9) && (count > 0)){
					count--;
					board[i][j] = 9;//2-monster
					monsterPlace[1] = new Object();
					monsterPlace[1].i = i;
					monsterPlace[1].j = j;
					leftFreeOnBoard.pop();
					continue;
				}
				else if((i == 9 && j == 0) && (count > 0)){
					count--;
					board[i][j] = 8;//3-monster
					monsterPlace[2] = new Object();
					monsterPlace[2].i = i;
					monsterPlace[2].j = j;
					leftFreeOnBoard.pop();
					continue;
				}
				else if((i == 9 && j == 9) && (count > 0)){
					count--;
					board[i][j] = 7;//4-monster
					monsterPlace[3] = new Object();
					monsterPlace[3].i = i;
					monsterPlace[3].j = j;
					leftFreeOnBoard.pop();
					continue;
				}
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;//food
					leftFreeOnBoard.pop();
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;//packman
					leftFreeOnBoard.pop();
				} else {
					board[i][j] = 0;//empty
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(leftFreeOnBoard);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener("keydown", updateDownKey);
	addEventListener("keyup", updateUpKey);
	pacInterval = setInterval(UpdatePacPosition, 150);
	monsterInterval = setInterval(UpdateMonstersPosition, 1200);
}

function findRandomEmptyCell(leftFreeOnBoard) {
	var take = Math.floor(Math.random() * leftFreeOnBoard.length);
	let outer = leftFreeOnBoard[take];
	leftFreeOnBoard.splice(take,1);
	return [Math.floor(outer/10), outer%10];
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
				context.drawImage(monstersPicArr[0], center.x - 15, center.y - 15);
			}
			else if(board[i][j] == 9){//draw 2-monster
				context.drawImage(monstersPicArr[1], center.x - 15, center.y-15);
			}
			else if(board[i][j] == 8){//draw 3-monster
				context.drawImage(monstersPicArr[2], center.x - 15, center.y-15);
			}
			else if(board[i][j] == 7){//draw 4-monster
				context.drawImage(monstersPicArr[3], center.x - 15, center.y-15);
			}
		}
	}
}

function UpdatePacPosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] < 4) {
			shape.j--;
		}
		else if(shape.j > 0 && board[shape.i][shape.j - 1] > 4){
			pacEaten();
		}
		pac_face = 1;
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] < 4) {
			shape.j++;
		}
		else if (shape.j < 9 && board[shape.i][shape.j + 1] > 4) {
			pacEaten();
		}
		pac_face = 2;
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] < 4) {
			shape.i--;
		}
		else if (shape.i > 0 && board[shape.i - 1][shape.j] > 4) {
			pacEaten();
		}
		pac_face = 3;
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] < 4) {
			shape.i++;
		}
		else if (shape.i < 9 && board[shape.i + 1][shape.j] > 4) {
			pacEaten();
		}
		pac_face = 4;
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
		circleEaten++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if(time_elapsed > game_time){
		window.clearInterval(pacInterval);
		window.clearInterval(monsterInterval);
		if(score >= 100){
			window.alert("Winner!!!");
		}
		else{
			window.alert("You are better than " + score + " points!");
		}
	}
	if (circleEaten == food) {
		window.clearInterval(pacInterval);
		window.clearInterval(monsterInterval);	
		window.alert("Winner!!!");
	} else {
		Draw();
	}
}

function UpdateMonstersPosition() {
	for(var k=0; k<monsterCount; k++){
		if(shape.j == monsterPlace[k].j){//same j
			if(shape.i < monsterPlace[k].i){
				if(board[monsterPlace[k].i - 1][monsterPlace[k].j] >= 4){
					moveRandFree(monsterPlace[k], k);
					continue;
				}
				else{
					board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
					monsterPlace[k].i--;
					if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
						pacEaten()
						break;
					}
					else{
						prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
					}
					board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
				}
			}
			else{
				if(board[monsterPlace[k].i + 1][monsterPlace[k].j] >= 4){
					moveRandFree(monsterPlace[k], k);
					continue;
				}
				else{
					board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
					monsterPlace[k].i++;
					if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
						pacEaten();
						break;
					}
					else{
						prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
					}
					board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
				}
			}
		}
		else if(shape.i == monsterPlace[k].i){//same i
			if(shape.j < monsterPlace[k].j){
				if(board[monsterPlace[k].i][monsterPlace[k].j - 1] >= 4){
					moveRandFree(monsterPlace[k], k);
					continue;
				}
				else{
					board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
					monsterPlace[k].j--;
					if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
						pacEaten();
						break;
					}
					else{
						prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
					}
					board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
				}
			}
			else{
				if(board[monsterPlace[k].i][monsterPlace[k].j + 1] >= 4){
					moveRandFree(monsterPlace[k], k);
					continue;
				}
				else{
					board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
					monsterPlace[k].j++;
					if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
						pacEaten();
						break;
					}
					else{
						prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
					}
					board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
				}
			}
		}
		else{
			let rand = Math.random();
			if(rand < 0.5){//handle i:
				handleChaseI(k, 0);
			}
			else{//handle j:
				handleChaseJ(k, 0);
			}
		}
	}
}

function handleChaseI(k, countTimes){
	countTimes++;
	if(countTimes == 10){
		return;
	}
	if(shape.i < monsterPlace[k].i){
		if(board[monsterPlace[k].i - 1][monsterPlace[k].j] >= 4){
			handleChaseJ(k, countTimes);
		}
		else{
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			monsterPlace[k].i--;
			if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
				pacEaten();
				return;
			}
			else{
				prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
			}
			board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
		}
	}
	else{
		if(board[monsterPlace[k].i + 1][monsterPlace[k].j] >= 4){
			handleChaseJ(k, countTimes);
		}
		else{
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			monsterPlace[k].i++;
			if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
				pacEaten();
				return;
			}
			else{
				prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
			}
			board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
		}
	}
}

function handleChaseJ(k, countTimes){
	countTimes++;
	if(countTimes == 10){
		return;
	}
	if(shape.j < monsterPlace[k].j){
		if(board[monsterPlace[k].i][monsterPlace[k].j - 1] >= 4){
			handleChaseI(k, countTimes);
		}
		else{
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			monsterPlace[k].j--;
			if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
				pacEaten();
				return;
			}
			else{
				prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
			}
			board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
		}
	}
	else{
		if(board[monsterPlace[k].i][monsterPlace[k].j + 1] >= 4){
			handleChaseI(k, countTimes);
		}
		else{
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			monsterPlace[k].j++;
			if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
				pacEaten();
				return;
			}
			else{
				prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
			}
			board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
		}
	}
}

function pacEaten(){
	strikes--;
	score = score - 10;
	if(strikes == 0){
		window.clearInterval(pacInterval);
		window.clearInterval(monsterInterval);	
		window.alert("Loser!");
	}
	else{
		//handle the monsters
		for(var k=0; k<monsterCount; k++){
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			prevMonsterVal[k] = 0;
			if(k == 0){
				monsterPlace[k].i = 0;
				monsterPlace[k].j = 0;
			}
			else if(k == 1){
				monsterPlace[k].i = 0;
				monsterPlace[k].j = 9;
			}
			else if(k == 2){
				monsterPlace[k].i = 9;
				monsterPlace[k].j = 0;
			}
			else{//k = 3
				monsterPlace[k].i = 9;
				monsterPlace[k].j = 9;
			}
			board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
		}
		//handle the pacman
		let emptyCell = findRandomEmptyCell(leftFreeOnBoard);
		board[shape.i][shape.j] = 0;
		board[emptyCell[0]][emptyCell[1]] = 2;
		shape.i = emptyCell[0];
		shape.j = emptyCell[1]
	}
}

function moveRandFree(place, k){
	if(place.j < 9 && board[place.i][place.j + 1] < 4){
		board[place.i][place.j] = prevMonsterVal[k];
		place.j++;
		prevMonsterVal[k] = board[place.i][place.j];
		board[place.i][place.j] = 10 - k;
	}
	else if(place.i < 9 && board[place.i + 1][place.j] < 4){
		board[place.i][place.j] = prevMonsterVal[k];
		place.i++;
		prevMonsterVal[k] = board[place.i][place.j];
		board[place.i][place.j] = 10 - k;
	}
	else if(place.j > 0 && board[place.i][place.j - 1] < 4){
		board[place.i][place.j] = prevMonsterVal[k];
		place.j--;
		prevMonsterVal[k] = board[place.i][place.j];
		board[place.i][place.j] = 10 - k;
	}
	else if(place.i > 0 && board[place.i - 1][place.j] < 4){
		board[place.i][place.j] = prevMonsterVal[k];
		place.i--;
		prevMonsterVal[k] = board[place.i][place.j];
		board[place.i][place.j] = 10 - k;
	}
}

function pdateSettingsInApp(ballsNum, ghostNum, gameTime, _5color, _15color, _25color, rightKey, leftKey, upKey, downKey){
	monsterCount = ghostNum;
	right = rightKey;
	left = leftKey;
	up = upKey;
	down = downKey;
	food = ballsNum;
	game_time = gameTime;
}


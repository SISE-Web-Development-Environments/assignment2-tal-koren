var context;
var shape = new Object();
var board = new Array();
var pac_color = "yellow";
var start_time;
var time_elapsed;
var pacInterval;
var monsterInterval;
var randomShapeInterval;
var pac_face = 4;;
var strikes = 5;
var food = 90;
var monstersPicArr = new Array();
var prevMonsterVal = new Array();
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
var giftPic;
var prevValGift;
var giftPlace;
var giftEaten;
var color5 = "blue";
var color15 = "orange";
var color25 = "red";
var count25;
var count15;
var count5;

$(document).ready(function() {
	context = canvas.getContext("2d");
});

function ResetGame(){
	removeEventListener("keydown",updateDownKey);
	removeEventListener("keyup",updateUpKey);
	clearInterval(pacInterval);
	clearInterval(monsterInterval);
	clearInterval(randomShapeInterval);
	music.pause();
	music.currentTime = 0;
	strikes = 5;
	monstersPicArr = new Array();;
	prevMonsterVal = new Array();;
	monsterPlace = new Array();
	shape = new Object();
	board = new Array();
	leftFreeOnBoard = new Array();
	pac_color = "yellow";
	score = 0;
	circleEaten = 0;
	Start();
}

function Start() {
	music.play();
	count25 = Math.floor(0.1 * food);
	count15 = Math.floor(0.3 * food);
	count5 = food - count25 - count15;

	giftEaten = false;
	giftPlace = new Object();
	giftPic = new Image();
	giftPic.src = "resource\\gift.png";
	let reddy = new Image();
	reddy.src = "resource\\redMonster.gif";
	monstersPicArr[0] = reddy;//4-monster
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
				let greeny = new Image();
				greeny.src = "resource\\greenMonster.gif";
				monstersPicArr[3] = greeny;//1-monster
				prevMonsterVal[3] = 0;
			}
		}
	}
	let food_remain = food;
	let cnt = 100;
	let pacman_remain = 1;
	start_time = new Date();
	let count = monsterCount;
	let updaterArr = new Array();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		for (var j = 0; j < 10; j++) {
			leftFreeOnBoard.push(i*10+j);
			if(food > 80){
				if (
					(i == 3 && j == 3) ||
					(i == 3 && j == 5) ||
					(i == 6 && j == 1) ||
					(i == 6 && j == 2) ||
					(i == 3 && j == 7)
				) {
					board[i][j] = 4;//wall
					leftFreeOnBoard.pop();
				}
				else{
					updaterArr = continuePlacing(i, j, cnt, pacman_remain, count, food_remain);
					cnt = updaterArr[0];
					pacman_remain = updaterArr[1];
					count = updaterArr[2];
					food_remain = updaterArr[3];
				}
			}
			else if(food > 70){
				if (
					(i == 3 && j == 3) ||
					(i == 3 && j == 5) ||
					(i == 6 && j == 1) ||
					(i == 6 && j == 2) ||
					(i == 3 && j == 7) ||
					(i == 0 && j == 5) ||
					(i == 7 && j == 7) ||
					(i == 8 && j == 7)
				) {
					board[i][j] = 4;//wall
					leftFreeOnBoard.pop();
				}
				else{
					updaterArr = continuePlacing(i, j, cnt, pacman_remain, count, food_remain);
					cnt = updaterArr[0];
					pacman_remain = updaterArr[1];
					count = updaterArr[2];
					food_remain = updaterArr[3];
				}
			}
			else{
				if (
					(i == 3 && j == 3) ||
					(i == 3 && j == 5) ||
					(i == 6 && j == 1) ||
					(i == 6 && j == 2) ||
					(i == 3 && j == 7) ||
					(i == 0 && j == 5) ||
					(i == 7 && j == 7) ||
					(i == 8 && j == 7) || 
					(i == 9 && j == 3) ||
					(i == 5 && j == 3) ||
					(i == 4 && j == 6)
				) {
					board[i][j] = 4;//wall
					leftFreeOnBoard.pop();
				}
				else{
					updaterArr = continuePlacing(i, j, cnt, pacman_remain, count, food_remain);
					cnt = updaterArr[0];
					pacman_remain = updaterArr[1];
					count = updaterArr[2];
					food_remain = updaterArr[3];
				}
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell();
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	giftPlace.i = 0;
	giftPlace.j = 0;
	while(board[giftPlace.i][giftPlace.j] >= 4 || board[giftPlace.i][giftPlace.j] == 2){ 
		giftPlace.i = Math.floor(Math.random() * 9 + 1)
		giftPlace.j = Math.floor(Math.random() * 9 + 1)
	}
	prevValGift = board[giftPlace.i][giftPlace.j];
	keysDown = {};
	addEventListener("keydown", updateDownKey);
	addEventListener("keyup", updateUpKey);
	pacInterval = setInterval(UpdatePacPosition, 150);
	monsterInterval = setInterval(UpdateMonstersPosition, 1200);
	randomShapeInterval = setInterval(updateRandomShape, 800);
}


function continuePlacing(i, j, cnt, pacman_remain, count, food_remain){
	let updaterArr = new Array();
	updaterArr[0] = cnt;
	updaterArr[1] = pacman_remain;
	updaterArr[2] = count;
	updaterArr[3] = food_remain;
	if((i == 0 && j == 0) && (count > 0)){
		count--;
		board[i][j] = 10;//1-monster
		monsterPlace[0] = new Object();
		monsterPlace[0].i = i;
		monsterPlace[0].j = j;
		leftFreeOnBoard.pop();
		updaterArr[0] = cnt;
		updaterArr[1] = pacman_remain;
		updaterArr[2] = count;
		updaterArr[3] = food_remain;
		return updaterArr;
	}
	else if((i == 0 && j == 9) && (count > 0)){
		count--;
		board[i][j] = 9;//2-monster
		monsterPlace[1] = new Object();
		monsterPlace[1].i = i;
		monsterPlace[1].j = j;
		leftFreeOnBoard.pop();
		updaterArr[0] = cnt;
		updaterArr[1] = pacman_remain;
		updaterArr[2] = count;
		updaterArr[3] = food_remain;
		return updaterArr;
	}
	else if((i == 9 && j == 0) && (count > 0)){
		count--;
		board[i][j] = 8;//3-monster
		monsterPlace[2] = new Object();
		monsterPlace[2].i = i;
		monsterPlace[2].j = j;
		leftFreeOnBoard.pop();
		updaterArr[0] = cnt;
		updaterArr[1] = pacman_remain;
		updaterArr[2] = count;
		updaterArr[3] = food_remain;
		return updaterArr;
	}
	else if((i == 9 && j == 9) && (count > 0)){
		count--;
		board[i][j] = 7;//4-monster
		monsterPlace[3] = new Object();
		monsterPlace[3].i = i;
		monsterPlace[3].j = j;
		leftFreeOnBoard.pop();
		updaterArr[0] = cnt;
		updaterArr[1] = pacman_remain;
		updaterArr[2] = count;
		updaterArr[3] = food_remain;
		return updaterArr;
	}
	var randomNum = Math.random();
	if (randomNum <= (1.0 * food_remain) / cnt) {
		food_remain--;
		board[i][j] = pickBall();//food
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
	updaterArr[0] = cnt;
	updaterArr[1] = pacman_remain;
	updaterArr[2] = count;
	updaterArr[3] = food_remain;
	return updaterArr;
}

function pickBall(){//returns random ball to place in board
	let randandino = Math.random();
	if(count5 > 0 && count15 > 0 && count25 > 0){
		if(randandino < 0.5){
			count5--;
			return 0.8;
		}
		else if(randandino < 0.8){
			count15--;
			return 1;
		}
		else{
			count25--;
			return 1.2;
		}
	}
	else if(count5 > 0 && count15 > 0){
		if(randandino < 0.7){
			count5--;
			return 0.8;
		}
		else{
			count15--;
			return 1;
		}
	}
	else if(count5 > 0 && count25 > 0){
		if(randandino < 0.8){
			count5--;
			return 0.8;
		}
		else{
			count25--;
			return 1.2;
		}
	}
	else if(count15 > 0 && count25 > 0){
		if(randandino < 0.666){
			count15--;
			return 1;
		}
		else{
			count25--;
			return 1.2;
		}
	}
	else if(count5 > 0){
		count5--;
		return 0.8
	}
	else if(count15 > 0){
		count15--;
		return 1;
	}
	else if(count25 > 0){
		count25--;
		return 1.2;
	}
}

function findRandomEmptyCell() {
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
	lblStrikes.value = 5 - strikes;
	lblUserName.value = getUserName();
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
			} else if (board[i][j] == 0.8) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = color5; //color 5 points
				context.fill();
			}else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = color15; //color 15 points
				context.fill();
			}else if (board[i][j] == 1.2) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0, 2 * Math.PI); // circle
				context.fillStyle = color25; //color 25 points
				context.fill();
			}else if(board[i][j] == 3){//draw 50 points gift
				context.drawImage(giftPic, center.x - 15, center.y - 15);
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
			leftFreeOnBoard.push(shape.i*10 + shape.j);
		}
		else if(shape.j > 0 && board[shape.i][shape.j - 1] > 4){
			if(board[shape.i][shape.j - 1] == 10){
				pacEaten(true);
			}
			else{
				pacEaten(false);
			}
		}
		pac_face = 1;
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] < 4) {
			shape.j++;
			leftFreeOnBoard.push(shape.i*10 + shape.j);
		}
		else if (shape.j < 9 && board[shape.i][shape.j + 1] > 4) {
			if(board[shape.i][shape.j + 1] == 10){
				pacEaten(true);
			}
			else{
				pacEaten(false);
			}
		}
		pac_face = 2;
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] < 4) {
			shape.i--;
			leftFreeOnBoard.push(shape.i*10 + shape.j);
		}
		else if (shape.i > 0 && board[shape.i - 1][shape.j] > 4) {
			if(board[shape.i - 1][shape.j] == 10){
				pacEaten(true);
			}
			else{
				pacEaten(false);
			}
		}
		pac_face = 3;
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] < 4) {
			shape.i++;
			leftFreeOnBoard.push(shape.i*10 + shape.j);
		}
		else if (shape.i < 9 && board[shape.i + 1][shape.j] > 4) {
			if(board[shape.i + 1][shape.j] == 10){
				pacEaten(true);
			}
			else{
				pacEaten(false);
			}
		}
		pac_face = 4;
	}
	if (board[shape.i][shape.j] == 1.2) {
		score += 25;
		circleEaten++;
	}
	if (board[shape.i][shape.j] == 1) {
		score += 15;
		circleEaten++;
	}
	if (board[shape.i][shape.j] == 0.8) {
		score += 5;
		circleEaten++;
	}
	if (board[shape.i][shape.j] == 3) {//eat gift
		score += 50;
		giftEaten = true;
		if(prevValGift == 1.2){
			circleEaten++;
			score += 25;
		}
		else if(prevValGift == 1){
			circleEaten++;
			score += 15;
		}
		else if(prevValGift == 0.8){
			circleEaten++;
			score += 5;
		}
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 50 && time_elapsed <= 10) {
		pac_color = "red";
	}
	if(time_elapsed > game_time){
		stop();
		if(score >= 100){
			hideGame();
			window.alert("Winner!!!");
		}
		else{
			hideGame();
			window.alert("You are better than " + score + " points!");
		}
	}
	if (circleEaten == food) {
		stop();	
		hideGame();
		window.alert("Winner!!!");
	} else {
		Draw();
	}
}

function UpdateMonstersPosition() {
	for(var k=0; k<monsterCount; k++){
		if(shape.j == monsterPlace[k].j){//same j
			if(shape.i < monsterPlace[k].i){
				if(board[monsterPlace[k].i - 1][monsterPlace[k].j] >= 3){
					moveRandFree(monsterPlace[k], k);
					continue;
				}
				else{
					board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
					monsterPlace[k].i--;
					if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
						if(k == 0){
							pacEaten(true);
						}
						else{
							pacEaten(false);
						}
						break;
					}
					else{
						prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
					}
					board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
				}
			}
			else{
				if(board[monsterPlace[k].i + 1][monsterPlace[k].j] >= 3){
					moveRandFree(monsterPlace[k], k);
					continue;
				}
				else{
					board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
					monsterPlace[k].i++;
					if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
						if(k == 0){
							pacEaten(true);
						}
						else{
							pacEaten(false);
						}
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
				if(board[monsterPlace[k].i][monsterPlace[k].j - 1] >= 3){
					moveRandFree(monsterPlace[k], k);
					continue;
				}
				else{
					board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
					monsterPlace[k].j--;
					if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
						if(k == 0){
							pacEaten(true);
						}
						else{
							pacEaten(false);
						}
						break;
					}
					else{
						prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
					}
					board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
				}
			}
			else{
				if(board[monsterPlace[k].i][monsterPlace[k].j + 1] >= 3){
					moveRandFree(monsterPlace[k], k);
					continue;
				}
				else{
					board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
					monsterPlace[k].j++;
					if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
						if(k == 0){
							pacEaten(true);
						}
						else{
							pacEaten(false);
						}
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
		if(board[monsterPlace[k].i - 1][monsterPlace[k].j] >= 3){
			handleChaseJ(k, countTimes);
		}
		else{
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			monsterPlace[k].i--;
			if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
				if(k == 0){
					pacEaten(true);
				}
				else{
					pacEaten(false);
				}
				return;
			}
			else{
				prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
			}
			board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
		}
	}
	else{
		if(board[monsterPlace[k].i + 1][monsterPlace[k].j] >= 3){
			handleChaseJ(k, countTimes);
		}
		else{
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			monsterPlace[k].i++;
			if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
				if(k == 0){
					pacEaten(true);
				}
				else{
					pacEaten(false);
				}
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
		if(board[monsterPlace[k].i][monsterPlace[k].j - 1] >= 3){
			handleChaseI(k, countTimes);
		}
		else{
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			monsterPlace[k].j--;
			if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
				if(k == 0){
					pacEaten(true);
				}
				else{
					pacEaten(false);
				}
				return;
			}
			else{
				prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
			}
			board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
		}
	}
	else{
		if(board[monsterPlace[k].i][monsterPlace[k].j + 1] >= 3){
			handleChaseI(k, countTimes);
		}
		else{
			board[monsterPlace[k].i][monsterPlace[k].j] = prevMonsterVal[k];
			monsterPlace[k].j++;
			if(board[monsterPlace[k].i][monsterPlace[k].j] == 2){
				if(k == 0){
					pacEaten(true);
				}
				else{
					pacEaten(false);
				}
				return;
			}
			else{
				prevMonsterVal[k] = board[monsterPlace[k].i][monsterPlace[k].j];
			}
			board[monsterPlace[k].i][monsterPlace[k].j] = 10 - k;
		}
	}
}

function pacEaten(bool){
	if(bool){
		score = score - 20;
		strikes = strikes - 2;
	}
	else{
		score = score - 10;
		strikes--;
	}
	if(strikes <= 0){
		stop();	
		hideGame();
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
		let emptyCell = findRandomEmptyCell();
		board[shape.i][shape.j] = 0;
		if(board[emptyCell[0]][emptyCell[1]] == 3){
			score += 50;
			giftEaten = true;
		}
		board[emptyCell[0]][emptyCell[1]] = 2;
		shape.i = emptyCell[0];
		shape.j = emptyCell[1]
	}
}

function moveRandFree(place, k){
	if(place.j < 9 && board[place.i][place.j + 1] < 3){
		board[place.i][place.j] = prevMonsterVal[k];
		place.j++;
		prevMonsterVal[k] = board[place.i][place.j];
		board[place.i][place.j] = 10 - k;
	}
	else if(place.i < 9 && board[place.i + 1][place.j] < 3){
		board[place.i][place.j] = prevMonsterVal[k];
		place.i++;
		prevMonsterVal[k] = board[place.i][place.j];
		board[place.i][place.j] = 10 - k;
	}
	else if(place.j > 0 && board[place.i][place.j - 1] < 3){
		board[place.i][place.j] = prevMonsterVal[k];
		place.j--;
		prevMonsterVal[k] = board[place.i][place.j];
		board[place.i][place.j] = 10 - k;
	}
	else if(place.i > 0 && board[place.i - 1][place.j] < 3){
		board[place.i][place.j] = prevMonsterVal[k];
		place.i--;
		prevMonsterVal[k] = board[place.i][place.j];
		board[place.i][place.j] = 10 - k;
	}
}

function updateRandomShape(){
	if(!giftEaten){
		let freeNeighboars = getFreeNeighboards();
		if(freeNeighboars.length == 0){
			return;
		}
		let rando = Math.floor(Math.random() * freeNeighboars.length);
		board[giftPlace.i][giftPlace.j] = prevValGift;
		giftPlace = freeNeighboars[rando];
		if(shape.i == giftPlace.i && shape.j == giftPlace.j){//collide with pacman
			score += 50;
			board[giftPlace.i][giftPlace.j] = 2;
			giftEaten = true;
		}
		else{
			prevValGift = board[giftPlace.i][giftPlace.j];
			board[giftPlace.i][giftPlace.j] = 3;
		}
	}
}

function getFreeNeighboards(){
	let freeNeighboars = new Array();
	if(giftPlace.j < 9 && board[giftPlace.i][giftPlace.j + 1] < 4){
		let p1 = new Object();
		p1.i = giftPlace.i;
		p1.j = giftPlace.j + 1;
		freeNeighboars.push(p1);
	}
	if(giftPlace.i < 9 && board[giftPlace.i + 1][giftPlace.j] < 4){
		let p2 = new Object();
		p2.i = giftPlace.i + 1;
		p2.j = giftPlace.j;
		freeNeighboars.push(p2);
	}
	if(giftPlace.j > 0 && board[giftPlace.i][giftPlace.j - 1] < 4){
		let p3 = new Object();
		p3.i = giftPlace.i;
		p3.j = giftPlace.j - 1;
		freeNeighboars.push(p3);
	}
	if(giftPlace.i > 0 && board[giftPlace.i - 1][giftPlace.j] < 4){
		let p4 = new Object();
		p4.i = giftPlace.i - 1;
		p4.j = giftPlace.j;
		freeNeighboars.push(p4);
	}
	return freeNeighboars;
}

function updateSettingsInApp(ballsNum, ghostNum, gameTime, _5color, _15color, _25color, rightKey, leftKey, upKey, downKey){
	monsterCount = ghostNum;
	right = rightKey;
	left = leftKey;
	up = upKey;
	down = downKey;
	food = ballsNum;
	game_time = gameTime;
	color5 = _5color;
	color15 = _15color;
	color25 = _25color;
}

function stop() {
	clearInterval(monsterInterval);
	clearInterval(pacInterval);
	clearInterval(randomShapeInterval);
	music.pause();
	music.currentTime = 0;
}


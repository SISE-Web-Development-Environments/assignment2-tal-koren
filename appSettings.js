var ballsNum, ghostNum, gameTime, _5color, _15color, _25color, rightKey, leftKey, upKey, downKey;

$(function() {

    function randomizeSettings(){
        document.getElementById("ballsNumber").value = getRandomBetween(50,90);
        document.getElementById("ghostNumber").value = getRandomBetween(1,4);
        document.getElementById("gameTime").value = getRandomBetween(60,600);
        document.getElementById("_5color").value = getRandomColor();
        document.getElementById("_15color").value = getRandomColor();
        document.getElementById("_25color").value = getRandomColor();
    }

    randomizeSettingsButton.addEventListener("click", randomizeSettings);

    $('#settings-form').validate({
    rules: {
        ballsNumber: {
          required: true,
          range: [50, 90]
        },
        ghostNumber: {
            required: true,
            range: [1, 4]
        
        },
        gameTime: {
            required: true,
            range: [60, 600]
        }
    }
    });

    $('#settings-form').submit(function(event){
    event.preventDefault(); 
    if($('#settings-form').valid()){
        /*saving settings*/

        /*simple settings*/
        ballsNum = document.getElementById("ballsNumber").value;
        ghostNum = document.getElementById("ghostNumber").value;
        gameTime = document.getElementById("gameTime").value;
        _5color =  document.getElementById("_5color").value;
        _15color =  document.getElementById("_15color").value;
        _25color =  document.getElementById("_25color").value;

        /*direction keys - arrows if empty*/
        rightKey = "";
        if (document.getElementById("rightKey").value=="") {
            rightKey = 39; /*right arrow key*/
        }
        else {
            rightKey=document.getElementById("rightKey").value.toUpperCase().charCodeAt(0);
        }
        leftKey = "";
        if (document.getElementById("leftKey").value=="") {
            leftKey = 37; /*left arrow key*/
        }
        else {
            leftKey=document.getElementById("leftKey").value.toUpperCase().charCodeAt(0);
        }
        upKey = "";
        if (document.getElementById("upKey").value=="") {
            upKey = 38; /*up arrow key*/
        }
        else {
            upKey=document.getElementById("upKey").value.toUpperCase().charCodeAt(0);
        }
        downKey = "";
        if (document.getElementById("downKey").value=="") {
            downKey = 40; /*down arrow key*/
        }
        else {
            downKey=document.getElementById("downKey").value.toUpperCase().charCodeAt(0);
        }
        updateSettingsInApp(ballsNum, ghostNum, gameTime, _5color, _15color, _25color,
                                rightKey, leftKey, upKey, downKey);
        showGame();
        document.getElementById('Settings').style.display="none";
    }
    });



    function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
    }

    function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }

})

function showSettings() {
    if (upKey>=37 && upKey<=40) {
        lblUp.value="Up arrow"
    }
    else {
        lblUp.value=String.fromCharCode(upKey);
    }
    if (downKey>=37 && downKey<=40) {
        lblDown.value="Down arrow"
    }
    else {
        lblDown.value=String.fromCharCode(downKey);
    }
    if (rightKey>=37 && rightKey<=40) {
        lblRight.value="Right key";
    }
    else {
        lblRight.value=String.fromCharCode(rightKey);
    }
    if (leftKey>=37 && leftKey<=40) {
        leftKey=value="Left key";
    }
    else {
        lblLeft.value=String.fromCharCode(leftKey);
    }   

    lblBallsNum.value=ballsNum;
    lbl5BallsColor.value=_5color;
    lbl15BallsColor.value=_15color;
    lbl25BallsColor.value=_25color;

    lblGameTime.value=gameTime;

    lblGhostNumber.value=ghostNum;
}